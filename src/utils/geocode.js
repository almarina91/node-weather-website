const request = require('postman-request');

const geocode = (address, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=6c07bfe5a887e2fb9104321f3a81db70&query=${address}&units=m`;
    request({url:url, json:true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect.', undefined);
        } else if (body.error){
            callback('Unable to find location.', undefined);
        } else {
            callback(undefined, {
                description: body.current.weather_descriptions[0],
                name: body.location.name,
                region: body.location.region,
                country: body.location.country,
                currentTemperature: body.current.temperature,
                feelsLike: body.current.feelslike,
                humidity: body.current.humidity,
                windSpeed: body.current.wind_speed,
                uvIndex: body.current.uv_index
            });
        }
    });
}

module.exports = geocode;
