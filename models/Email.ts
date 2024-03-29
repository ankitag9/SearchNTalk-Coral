///<reference path='./BaseModel.ts'/>
/**
 * Bean class for Email
 */
module models
{
    export class Email extends BaseModel
    {
        static TABLE_NAME:string = 'email';

        private recipient_email:string;
        private sender_email:string;
        private subject:string;
        private template:string;
        private data:Object;
        private scheduled_date:number;

        /* Getters */
        getRecipientEmail():string { return this.recipient_email; }
        getSenderEmail():string { return this.sender_email; }
        getSubject():string { return this.subject; }
        getTemplate():string { return this.template; }
        getEmailData():Object { return this.data; }
        getScheduledDate():number { return this.scheduled_date; }


        /* Setters */
        setRecipientEmail(val:string):void { this.recipient_email = val; }
        setSenderEmail(val:string):void { this.sender_email = val; }
        setSubject(val:string):void { this.subject = val; }
        setTemplate(val:string):void { this.template = val; }
        setEmailData(val:Object):void { this.data = val; }
        setScheduledDate(val:number):void { this.scheduled_date = val; }
    }
}