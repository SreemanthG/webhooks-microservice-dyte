const axios = require("axios");


// const sendRequest = (webhooks, ipAddress, logArray = []) => {
//     // console.log(webhooks);

//     webhooks.forEach((wh,i) => {
//         axios.post(wh.targetUrl, {ipAddress, timestamp:Date.now()})
//         .then((res)=>{
//             logArray.push({index:i,statusCode:res.status, error:false})
//             console.log(logArray);
//         })
//         .catch((err)=>{
//             if(!err.response){
//                 logArray.push({index:i,errorMessage:err.message, error:true})
//             } else{
//                 logArray.push({index:i,statusCode:err.response.status, error:true})
//             }
//             console.log(logArray);
//         })
//     });

// }


const sendRequest = async (webhooks, ipAddress) => {
    const concurrencyLimit = 10;
    let results = [];
    const numberOfOperations = webhooks.length;
    const batchesCount = Math.ceil(numberOfOperations / concurrencyLimit);
    const listOfArguments = [];

    webhooks.forEach(wh=>{
        listOfArguments.push(wh.targetUrl);
    })

    // Running Promises in parallel in batches
    for (let i = 0; i < batchesCount; i++) {
      const batchStart = i * concurrencyLimit;
      const batchArguments = listOfArguments.slice(batchStart, batchStart + concurrencyLimit);
      const batchPromises = batchArguments.map((url)=>axiosPost(url,ipAddress));
      // Harvesting
      const batchResults = await Promise.all(batchPromises);
      results = results.concat(batchResults);
    }
    return results;
}

const axiosPost = (url,ipAddress,retries=0,maxRetries=5) => {
    return new Promise((resolve,reject) => {
            axios.post(url,{ipAddress, timestamp:Date.now()})
            .then((res)=>{
                resolve(res.status);
            })
            .catch((err)=>{
                if(retries==maxRetries){
                    resolve(err.response.status)
                } else{
                    resolve(axiosPost(url,ipAddress,retries+1));
                }
            })
    });
}
module.exports = sendRequest;