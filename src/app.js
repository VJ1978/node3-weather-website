const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

const viewsPath =path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


//Setup Handlbars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(path.join(__dirname, '../public')))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather Application',
        name: 'Vijay Sharma'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Meeta Sharma'
    })

})


app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is Help Text',
        title: 'Help',
        name: 'Vijay Sharma'

    })
})


app.get('/weather', (req, res) => {

    if (!req.query.address)
    {
        return res.send({
            error: 'You must provide an address!'
        })
    }
    geocode(req.query.address, (error, {place_name } = {}) => {

        if(error)
        {
            return res.send( {error})
        }
        forecast(place_name, (error,forecastData) => {
            if(error) {
                return res.send({error})
            }

            res.send({
                forecast: forecastData.weather_descriptions[0],
                location: req.query.address,
                address: req.query.address
            })
        })

    })
})

app.get('/products', (req, res) =>
{
    if(!req.query.search) {
        return res.send({
            error: 'You Must Provide a search term'
        })

    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('error',{
        errorText : 'Help Article Not Found',
        name: 'Vijay Sharma',
        title: 'Help'
    })

})

app.get('*', (req,res) => {
    res.render('error',{
        errorText: 'Page Not Found',
        name: 'Vijay Sharma',
        title: 'Not Found'
    })

})


// app.listen(3000, () => {
//     console.log('Server is Up on Port : 3000.')
// })

app.listen(port, () => {
    console.log('Server is Up on Port : ' + port)
})