"use strict";

const DbMixin = require("../mixins/db.mixin");
const sendRequest = require("../utils/sendRequest");
/**
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 */

module.exports = {
	name: "webhooks",

    /**
	 * Mixins
	 */
	mixins: [DbMixin("webhooks")],
    
	/**
	 * Settings
	 */
	settings: {
        fields: [
			"_id",
			"targetUrl",
		],

        // Validator for the `create` & `insert` actions.
		entityValidator: {
			targetUrl: "string",
		}
	},

	/**
	 * Dependencies
	 */
	dependencies: [],

	/**
	 * Actions
	 */
	actions: {
         /**
             * Registers a new Target URL.
             */
		register: {
            rest: {
                method: "POST",
                path: "/register"
            },
            params:{
                targetUrl:"string",
            },
            async handler(ctx) {

                
               const res = await ctx.call("webhooks.create",{"targetUrl":ctx.params.targetUrl});
               const result = {_id: res._id};
               return result;
            }
            
        },
        
         /**
             * Updates a specific Target URL.
             */
		update: {
            rest: {
                method: "PUT",
                path: "/update/:id"
            },
        },
        /**
             * Sends requests to all the targetUrls.
             */
        trigger: {
            rest: {
                method: "GET",
                path: "/ip"
            },
            params: {
                ipAddress: "string"
            },
            async handler(ctx) {

                
                const doc = await this.adapter.find(); 
                const json = await this.transformDocuments(ctx, ctx.params, doc);
                const results = await sendRequest(doc,ctx.params.ipAddress);
                doc.forEach((res,i) => {
                    res.status = results[i].status;
                    res.retries = results[i].retries;
                });
                return doc;
            }
            
        },

        
	},
   
	/**
	 * Events
	 */
	events: {

	},

	/**
	 * Methods
	 */
	methods: {

	},

	/**
	 * Service created lifecycle event handler
	 */
	created() {

	},

	/**
	 * Service started lifecycle event handler
	 */
	async started() {

	},

	/**
	 * Service stopped lifecycle event handler
	 */
	async stopped() {

	}
};
