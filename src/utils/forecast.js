const request = require('request')

const forecast = (city, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=75afa32a7e946041f6b30a5af267609d&query=' + city + '&units=f'
    request( {url: url, json: true}, (error, data) => {

        if(error) {

            callback('Unable to connect to weather service', undefined)
        } else if ( data.body.error)
        {
            callback('Unable to find location', undefined)

        } else {
            callback(undefined, data.body.current)
        }

    })
}

module.exports = forecast
