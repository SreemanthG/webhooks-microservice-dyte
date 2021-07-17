const cluster = require("cluster");
const axios = require("axios");

const {cpus} = require("os");
const process = require("process");
const startDate = new Date();
const numCPUs = cpus().length;


module.exports = (doc) => {
console.log(cluster.isMaster);

    if (cluster.isMaster) {

        for (let i = 0; i < numCPUs; i++) {
            cluster.fork();
        }
    
        cluster.on('exit', (worker, code, signal) => {
            console.log(`worker ${worker.process.pid} died`);
        });
    
        let i = 0
        for(let wid in cluster.workers) {
            i++
            if (i > doc.length) {return}
            cluster.workers[wid].send({
            type: 'request',
            data: {
                number: i
            }
            })
        }
    } else {
        process.on('message', function(message) {
        if(message.type === 'request') {
            axios.post(doc[message.data.number]["targetUrl"], {ipAddress:ctx.params.ipAddress, timestamp:Date.now()}).then((res)=>{
            console.log(message.data.number);
            if(message.data.number==doc.length){
                const endDate   = new Date();
                console.log((endDate.getTime() - startDate.getTime()) / 1000);
            }
            }).catch((err)=>{
                // console.log(err);
                console.log(message.data.number);
                if(message.data.number==doc.length-1){
                    const endDate   = new Date();
                    console.log("###########################");
                    console.log((endDate.getTime() - startDate.getTime()) / 1000);
                }
            })
            console.log(`Worker ${process.pid} started`);
            }
        })
    }
}
