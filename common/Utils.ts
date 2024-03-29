///<reference path='../_references.d.ts'/>

module common
{
    export class Utils
    {
        /* Get random string */
        static getRandomString(length:number, characters?:string)
        {
            var buf = [];
            var chars = characters || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

            for (var i = 0; i < length; ++i)
            {
                buf.push(chars[this.getRandomInt(0, length - 1)]);
            }

            return buf.join('');
        }

        /* Get random number */
        static getRandomInt(min, max)
        {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        /**
         * Get a promise that'll get rejected in next tick
         *  Used when we need to cancel an operation for invalid input
         */
        static getRejectedPromise(errorMessage:string)
        {
            var deferred = q.defer();
            process.nextTick(function fail()
            {
                deferred.reject(errorMessage);
            });
            return deferred.promise;
        }

        static isNullOrEmpty(str:any):boolean
        {
            return str == null || str == undefined || str.toString().trim().length == 0;
        }

        static getClassName(object:Object):string
        {
            var funcNameRegex = /function (.{1,})\(/;
            var results = (funcNameRegex).exec(object['constructor'].toString());
            return (results && results.length > 1) ? results[1] : "";
        }

        static copyProperties(source:any, target:any):void
        {
            for (var prop in source)
            {
                if (target[prop] !== undefined)
                {
                    target[prop] = source[prop];
                }
                else
                {
                    //log4js.getDefaultLogger().debug("Cannot set undefined property: " + prop);
                }
            }
        }

        static camelToUnderscore(camelCasedString:string)
        {
            var frags:Array<string> = camelCasedString.match(/[A-Z][a-z]+/g);
            var lowerCasedFrags:Array<string> = _.map(frags, function (frag:string)
            {
                return frag.toLowerCase();
            })
            return lowerCasedFrags.join('_');
        }

        static getObjectType(obj:any):string
        {
            return Object.prototype.toString.call(obj).replace('[object ', '').replace(']', '');
        }

        static surroundWithQuotes(val:any):string
        {
            if (this.getObjectType(val) != 'String')
                return val;
            return "'" + val + "'";
        }

    }
}