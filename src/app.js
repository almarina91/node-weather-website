const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const port = process.env.PORT || 3000;

const app = express();

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('',(req, res)=>{
    res.render('index', {
        title: 'Weather',
        name: 'Marina'
    });
});

app.get('/about', (req, res)=>{
    res.render('about', {
        title:'About page',
        name: 'Marina'
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        title:'Help page',
        name: 'Marina',
        message: 'Welcome to our customer support. If you want to contact us, please send an email to us.'
    })
})

app.get('/weather', (req, res)=>{
    if(!req.query.address) {
       return res.send({error: 'Please, provide a valid location.'})
    }
    geocode(req.query.address, (err, response) => {
        if (err) {
            res.send({
                error: err
            })
        } else {
            res.send({
                description: response.description,
                address: req.query.address,
                location: `This is a current temperature for ${response.name}, ${response.country}`,
                forecast:`It is currently ${response.currentTemperature} degrees out. It feels like ${response.feelsLike} degrees out.`
            })
        }
    })
})

app.get('/help/*', (req, res)=>{
    res.render('404', {
        name: 'Marina',
        title: '404',
        message: 'help page not found'
    })
})

app.get('*', (req, res)=>{
    res.render('404', {
        name: 'Marina',
        title: '404',
        message: 'page not found'
    })
})

app.listen(port, ()=> {console.log(`server is running on port ${port}`)});
