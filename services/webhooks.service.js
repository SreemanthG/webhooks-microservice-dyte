"use strict";

const DbMixin = require("../mixins/db.mixin");
const axios = require("axios");

const {cpus} = require("os");
const process = require("process");
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
             * Sends requests to all the targetUrls.
             */
        trigger: {
            rest: {
                method: "POST",
                path: "/trigger"
            },
            params: {
                ipAddress: "string"
            },
            async handler(ctx) {

                
                const doc = await this.adapter.find(); //ctx.params.id, { $inc: { quantity: ctx.params.value } }
                const json = await this.transformDocuments(ctx, ctx.params, doc);
                // clusterNode(doc);
                console.log(doc);
                const results = await sendRequest(doc,ctx.params.ipAddress);
                console.log(results);

                // const cluster = require("cluster");

                // const startDate = new Date();
                // const numCPUs = cpus().length;

                // const doc = await this.adapter.find(); //ctx.params.id, { $inc: { quantity: ctx.params.value } }
                // const json = await this.transformDocuments(ctx, ctx.params, doc);
                // console.log(cluster.isMaster);
                // if (cluster.isMaster) {
                   
                //     for (let i = 0; i < numCPUs; i++) {
                //       cluster.fork();

                //     }
                  
                //     cluster.on('exit', (worker, code, signal) => {
                //       console.log(`worker ${worker.process.pid} died`);
                //     });

                //     let i = 0
                //     for(let wid in cluster.workers) {
                //       i++
                //       if (i > doc.length) {return}
                //       cluster.workers[wid].send({
                //         type: 'request',
                //         data: {
                //           number: i
                //         }
                //       })
                //     }
                //   } else {
                //     process.on('message', function(message) {
                //         if(message.type === 'request') {
                //     axios.post(doc[message.data.number]["targetUrl"], {ipAddress:ctx.params.ipAddress, timestamp:Date.now()}).then((res)=>{
                //         console.log(message.data.number);
                //         if(message.data.number==doc.length){
                //             const endDate   = new Date();
                //             console.log((endDate.getTime() - startDate.getTime()) / 1000);
                //         }
                //     }).catch((err)=>{
                //         // console.log(err);
                //         console.log(message.data.number);
                //         if(message.data.number==doc.length-1){
                //             const endDate   = new Date();
                //             console.log("###########################");
                //             console.log((endDate.getTime() - startDate.getTime()) / 1000);
                //         }
                //     })
                //     console.log(`Worker ${process.pid} started`);
                //         }
                //     })
                //   }
              
              
 
                // await this.entityChanged("updated", json, ctx);
                // doc.forEach((element,i) => {
                //     axios.post("http://www.google.com", {ipAddress:ctx.params.ipAddress, timestamp:Date.now()}).then((res)=>{
                //     }).catch((err)=>{
                //         // console.log(err);
                //         if(i==doc.length-1){
                //             const endDate   = new Date();
                //             console.log((endDate.getTime() - startDate.getTime()) / 1000);
                //         }
                //     })
                //     // console.log(element.targetUrl);
                // });

                return json;
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
