const mysql = require('mysql');

const connection = mysql.createConnection({
    host: "localhost",
    user: "admin",
    password: "1234567",
    database: "weather"
});

module.exports.addWeatherFeed = (weatherSummary, callback) => {

    let query = `INSERT INTO  weather  (last_updated ,weather_status ,current_tempreture ,wind_speed )
               VALUES('${weatherSummary.lastUpdated}', '${weatherSummary.weatherStatus}', '${weatherSummary.currentTempreture}', '${weatherSummary.windSpeed}')`;
    connection.query(query, (err, result) => {
        if (err) callback(err, result)

        callback(null, result)

    })
}