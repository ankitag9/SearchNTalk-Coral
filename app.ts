///<reference path='./_references.d.ts'/>
///<reference path='./common/Config.ts'/>
///<reference path='./delegates/MysqlDelegate.ts'/>
///<reference path='./middleware/ValidateRequest.ts'/>
import express          = require('express');
var app = express();

// all environments
//app.set('port', common.Config.get('Coral.port') || 3000);
app.use(express.bodyParser());
app.use(express.methodOverride());
//app.use(middleware.ValidateRequest.parseBody);
app.enable('trust proxy');

// Create relationships in models based on db schema
/*
delegates.MysqlDelegate.createConnection()
    .then(
    function getForeignKeysFromSchemaAfterConnection(connection)
    {
        return delegates.MysqlDelegate.executeQuery('SELECT referenced_table_name, table_name, column_name, referenced_column_name ' +
            'FROM information_schema.KEY_COLUMN_USAGE  ' +
            'WHERE referenced_table_name IS NOT NULL ' +
            'AND constraint_name != "PRIMARY" ' +
            'AND table_schema = ' + common.Config.get('database.name'));
    })
    .then(
    function populateModelsWithForeignKeys(rows:Array<any>)
    {
        for (var constraint in rows)
        {
            var srcTable = constraint['table_name'];
            var srcColumn = constraint['column_name'];
            var targetTable = constraint['referenced_table_name'];
            var targetColumn = constraint['referenced_table_name'];
        }
    });
*/

// development only
/*if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}*/

// REST APIs
require('./api')(app);

app.listen(app.get('port'), function()
{
    console.log("Demo Express server listening on port %d in %s mode", app.get('port'), app.settings.env);
});