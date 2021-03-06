const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=53969e3b2ba52384a524793f0662184e&query=' + latitude + ',' + longitude;

    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to weather services!', undefined);
        } else if(body.error){
            callback('Unable to find location', undefined);
        } else {
            callback(undefined, `It is ${body.current.weather_descriptions[0]} and ${body.current.temperature} degrees out. But feels like ${body.current.feelslike} degrees out!`)
        }
    })
}

module.exports = forecast