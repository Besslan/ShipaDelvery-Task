const fs = require('fs');
const { getWeatherSummary } = require('./api.js');
const { addWeatherFeed } = require('../db/db.js');

function addToLog(currentWeather) {
    return new Promise((resolve, reject) => {
        fs.appendFile(
            'weather.log',
            `${JSON.stringify(currentWeather)} \r\n`,
            function (err) {
                if (err) reject(err);
                console.log('Saved!');
                resolve();
            },
        );
    });
}

function addToDb(currentWeather) {
    return new Promise((resolve, reject) => {
        addWeatherFeed(currentWeather, (err, result) => {
            if (err) {
                reject(err)
            }
            console.log('Inserted in DB');
            resolve();
        });
    });
}



setInterval( () => {
    getWeatherSummary(weather => {
        const currentWeather = {};
        currentWeather.lastUpdated = weather.current.last_updated;
        currentWeather.weatherStatus = weather.current.condition.text;
        currentWeather.currentTempreture = weather.current.temp_c;
        currentWeather.windSpeed = weather.current.wind_kph;
        console.log(currentWeather);

        Promise.all([addToLog(currentWeather), addToDb(currentWeather)]).then(
            () => {
                console.log('all done');
            },
        );
    });
}, 300000);