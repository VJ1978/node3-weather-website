const request = require('request')

const geocode = (city, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + city + '.json?access_token=pk.eyJ1IjoidmlqYXkxOTc4IiwiYSI6ImNrZWxjeTl3cjBtc2wydms3bXl1bWdpbWcifQ.s3yqNYtUrGNazMtyMWKMJA&limit=1'
    console.log(url)
    request ({url: url, json: true}, (error, data) => {
        if(error)
        {
            callback('error getting geocode', undefined)

        }else if (data.message)
        {
            callback('some error occured and cannot geocode', undefined)

        } else if (data.body.features.length === 0)
        {
            callback('Unable to find Address', undefined)

        } else 
        {

            // console.log(data.location.lon)

            callback(undefined, {
                place_name: data.body.features[0].place_name
                // latitude: data.location.lat,
                // longitude: data.location.lon
            })
        }
    })
}

module.exports = geocode