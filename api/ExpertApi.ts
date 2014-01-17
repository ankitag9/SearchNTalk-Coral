import q                                = require('q');
import express                          = require('express');
import _                                = require('underscore');
import ApiConstants                     = require('./ApiConstants');
import AccessControl                    = require('../middleware/AccessControl');
import ApiUrlDelegate                   = require('../delegates/ApiUrlDelegate');
import IntegrationDelegate              = require('../delegates/IntegrationDelegate');
import IntegrationMemberDelegate        = require('../delegates/IntegrationMemberDelegate');
import UserDelegate                     = require('../delegates/UserDelegate');
import IntegrationMember                = require('../models/IntegrationMember');
import IntegrationMemberRole            = require('../enums/IntegrationMemberRole');
import ApiFlags                         = require('../enums/ApiFlags');

/**
 * API calls for managing settings to IntegrationMembers who are experts
 * e.g. Call schedules, viewing reports, manage payment details
 */
class ExpertApi
{

    constructor(app)
    {
        var integrationMemberDelegate = new IntegrationMemberDelegate();
        var userDelegate = new UserDelegate();

        /** Search expert **/
        app.get(ApiUrlDelegate.expert(), AccessControl.allowDashboard, function (req:express.ExpressServerRequest, res:express.ExpressServerResponse)
        {
            var searchCriteria:Object = req.body;

            integrationMemberDelegate.search(searchCriteria)
                .then(
                function handleExpertSearched(result) { res.json(result); },
                function handleExpertSearchError(err) { res.status(500).json(err); }
            );
        });

        /** Get expert profile  **/
        app.get(ApiUrlDelegate.expertById(), function (req:express.ExpressServerRequest, res:express.ExpressServerResponse)
        {
            var expertId = req.params[ApiConstants.EXPERT_ID];
            var flags = req.query[ApiConstants.FLAG];

            integrationMemberDelegate.get(expertId)
                .then(
                function handleExpertSearched(integrationMember)
                {
                    var flagTasks = [];
                    _.each(flags, function(flag) {
                        switch(flag) {
                            case ApiFlags.INCLUDE_USER:
                                flagTasks.push(userDelegate.get(integrationMember.user_id));
                                break;
                        }
                    });
                    q.all(flagTasks)
                        .then(
                            function (...args) {
                                for (var i = 0; i < args.length; i++)
                                    integrationMember[flags[i].replace('include_', '')] = args[i][0];
                                res.json(integrationMember);
                            }
                        )
                },
                function handleExpertSearchError(err) { res.status(500).json(err); }
            );
        });

        /** Convert user to expert for integrationId **/
        app.put(ApiUrlDelegate.expert(), AccessControl.allowDashboard, function (req:express.ExpressServerRequest, res:express.ExpressServerResponse)
        {
            var integrationMember:IntegrationMember = new IntegrationMember(req.body);
            integrationMember.setRole(IntegrationMemberRole.EXPERT);

            if (integrationMember.getUserId() != null)
                integrationMemberDelegate.create(integrationMember)
                    .then(
                    function expertCreated(integrationMemberExpert:IntegrationMember) { res.json(integrationMemberExpert); },
                    function expertCreateFailed(error) { res.status(500).json(error); }
                )
            else
                res.status(401).json('User needs to be registered before becoming an expert');
        });

        /** Remove expert status of user for integrationId **/
        app.delete(ApiUrlDelegate.expertById(), AccessControl.allowAdmin, function (req:express.ExpressServerRequest, res:express.ExpressServerResponse)
        {
            var expertId = req.params[ApiConstants.EXPERT_ID];

            integrationMemberDelegate.delete(expertId)
                .then(
                function expertDeleted(result) { res.json(result); },
                function expertDeleteFailed(error) { res.status(500).json(error); }
            );
        });

        /**
         * Update expert's details (revenue share, enabled/disabled status)
         * Allow owner or admin
         **/
        app.post(ApiUrlDelegate.expertById(), AccessControl.allowDashboard, function (req:express.ExpressServerRequest, res:express.ExpressServerResponse)
        {
            var expertId = req.params[ApiConstants.EXPERT_ID];
            var integrationMember:IntegrationMember = req.body[ApiConstants.EXPERT];

            integrationMemberDelegate.updateById(expertId, integrationMember)
                .then(
                function expertUpdated(result) { res.json(result); },
                function expertUpdateFailed(error) { res.status(500).json(error); }
            );

        });

        /**
         * Get activity summary for expert
         * Allow expert
         */
        app.get(ApiUrlDelegate.expertActivitySummary(), AccessControl.allowExpert, function (req:express.ExpressServerRequest, res:express.ExpressServerResponse)
        {

        });

    }

}
export = ExpertApi