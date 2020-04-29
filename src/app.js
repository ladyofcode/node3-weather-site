const path = require('path');
const express = require('express'); //express is a function, not an object
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public') // '../' because we're in src
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Tabs F'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Tabs F'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'Here is some help message',
        name: 'Tabs F'
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.address;

    if(!address){
        return res.send({
            error: 'You must provide an address'
        })
    } 
    
    geocode(address, (error, {latitude, longitude, location} = {}) => {

        if(error){
                return console.log(error);
        }
            forecast(latitude, longitude, (error, forecastData) => {
                if(error){
                    return console.log(error)
                }

                return res.send({
                    forecast: forecastData,
                    location: address,
                });
            })        
    })
    

    
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }

    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Help article not found',
        message: 'Help article not found!',
        name: 'Tabs F'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Page not found',
        message: 'Here is some 404 message',
        name: 'Tabs F'
    })
})

app.listen(port, () => {
    console.log(`Server started on port ${port}.`);
}); // dev port; listen starts up server