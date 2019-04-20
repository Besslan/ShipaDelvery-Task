const request = require('request');

module.exports.getWeatherSummary = (callback) =>

    request("http://api.apixu.com/v1/current.json?key=2cb6b9c413914d02bc775202180507&q=Dubai", (error, response, body) => {
        if (error) throw error;
        
        callback(JSON.parse(body));
    })
