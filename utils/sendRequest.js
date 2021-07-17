const axios = require("axios");


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
                resolve({status:res.status,retries:retries});
            })
            .catch((err)=>{
                if(retries==maxRetries){
                    if(err.response)
                    resolve({status:err.response.status,retries:retries})
                    else
                    resolve({status:err.message,retries:retries})
                } else{
                    resolve(axiosPost(url,ipAddress,retries+1));
                }
            })
    });
}
module.exports = sendRequest;