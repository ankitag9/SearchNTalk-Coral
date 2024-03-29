import express              = require('express');
///<reference path='../delegates/ApiUrlDelegate'/>;

/**
 * API calls for managing payment transactions
 * Allow only through searchntalk.com
 */
class TransactionApi
{
    constructor(app)
    {
        /** Create a new transaction **/
        app.put(delegates.ApiUrlDelegate.transaction(), function(req:express.ExpressServerRequest, res:express.ExpressServerResponse)
        {
            // Validate item to be added
        });

        /** Update transaction **/
        app.post(delegates.ApiUrlDelegate.transactionById(), function(req:express.ExpressServerRequest, res:express.ExpressServerResponse)
        {

        });

        /** Add item **/
        app.put(delegates.ApiUrlDelegate.transactionItem(), function(req:express.ExpressServerRequest, res:express.ExpressServerResponse)
        {

        });

        /**
         * Update item
         * Remove all rows for item and insert again
         **/
        app.post(delegates.ApiUrlDelegate.transactionItemById(), function(req:express.ExpressServerRequest, res:express.ExpressServerResponse)
        {

        });

        /**
         * Remove item
         */
        app.delete(delegates.ApiUrlDelegate.transactionItemById(), function(req:express.ExpressServerRequest, res:express.ExpressServerResponse)
        {

        });

        /**
         * Get transaction
         * Fields : [summary, items, discounts, invoice]
         **/
        app.get(delegates.ApiUrlDelegate.transactionById(), function(req:express.ExpressServerRequest, res:express.ExpressServerResponse)
        {

        });

    }

}

export = TransactionApi