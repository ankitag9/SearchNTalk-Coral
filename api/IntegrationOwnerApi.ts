import express                          = require('express');
///<reference path='./ApiConstants'/>;
///<reference path='../middleware/AccessControl'/>;
///<reference path='../delegates/ApiUrlDelegate'/>;
///<reference path='../delegates/IntegrationMemberDelegate'/>;
///<reference path='../models/IntegrationMember'/>;

/**
 * API calls for managing settings to IntegrationMembers who are owners
 * e.g. Viewing reports, manage payment details, manage admins
 */
class IntegrationOwnerApi {

    constructor(app)
    {
        var integrationMemberDelegate = new delegates.IntegrationMemberDelegate();

        /**
         * Add another member
         **/
        app.put(delegates.ApiUrlDelegate.integrationMember(), middleware.AccessControl.allowOwner, function(req:express.ExpressServerRequest, res:express.ExpressServerResponse)
        {
            var integrationId = req.params[api.ApiConstants.INTEGRATION_ID];
            var userId = req.query[api.ApiConstants.USER_ID];
            var role = req.query[api.ApiConstants.ROLE];

            integrationMemberDelegate.create({'user_id': userId, 'role': role, 'integration_id': integrationId})
                .then(
                function handleMemberAdded(result) { res.json(result); },
                function handleMemberAddError(err) { res.status(500).json(err); }
            );
        });

        /**
         * Get integration members
         * Allow owner and admin
         */
        app.get(delegates.ApiUrlDelegate.integrationMember(), middleware.AccessControl.allowAdmin, function(req:express.ExpressServerRequest, res:express.ExpressServerResponse)
        {
            var integrationId = req.params[api.ApiConstants.INTEGRATION_ID];

            integrationMemberDelegate.search({'integration_id': integrationId})
                .then(
                function handleMemberSearched(result) { res.json(result); },
                function handleMemberSearchError(err) { res.status(500).json(err); }
            );
        });

        /**
         * Remove a member
         * Allow owner and admin
         */
        app.delete(delegates.ApiUrlDelegate.integrationMemberById(), middleware.AccessControl.allowAdmin, function(req:express.ExpressServerRequest, res:express.ExpressServerResponse)
        {
            var integrationId = req.params[api.ApiConstants.INTEGRATION_ID];

            integrationMemberDelegate.delete(integrationId)
                .then(
                function handleMemberSearched(result) { res.json(result); },
                function handleMemberSearchError(err) { res.status(500).json(err); }
            );
        });

        /**
         * Update settings for member
         * Allow owner or admin
         */
        app.post(delegates.ApiUrlDelegate.integrationMemberById(), middleware.AccessControl.allowAdmin, function(req:express.ExpressServerRequest, res:express.ExpressServerResponse)
        {
            var integrationId = req.params[api.ApiConstants.INTEGRATION_ID];
            var integrationMember:models.IntegrationMember = req.body[api.ApiConstants.INTEGRATION_MEMBER];

            integrationMemberDelegate.update({'integration_id': integrationId}, integrationMember)
                .then(
                function handleMemberSearched(result) { res.json(result); },
                function handleMemberSearchError(err) { res.status(500).json(err); }
            );
        });

        /**
         * Get activity summary
         * Allow owner and admin
         **/
        app.get(delegates.ApiUrlDelegate.ownerActivitySummary(), function(req:express.ExpressServerRequest, res:express.ExpressServerResponse)
        {

        });
    }

}
export = IntegrationOwnerApi