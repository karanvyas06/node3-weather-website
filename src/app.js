const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forcast = require('./utils/forcast')
const { resolveSoa } = require('dns')

const app = express()
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')
const viewpath = path.join(__dirname,'../templates/views')
const partialspath  = path.join(__dirname,'../templates/partials')
const footerpath = path.join(__dirname,'../templates/partials')


app.set('view engine', 'hbs')
app.set('views',viewpath)
hbs.registerPartials(partialspath)
hbs.registerPartials(footerpath)

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'karan'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'karan'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title:'Help',
        name:'karan'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error:'You must provide address'
        })
    }

    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            res.send({error})
        }
        forcast(latitude,longitude,(error,forcastdata)=>{
            if(error){
                res.send({eroor})
            }
            res.send({
                forcast: forcastdata,
                location,
                address:req.query.address
            })
        })
    })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'You mush have put search object for you are looking'
        })
    }
    console.log(req.query)
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404 help',
        name:'karan',
        errortext:'help article not found'
    })
})
app.get('*',(req,res)=>{
    res.render('404',{
        errortext:'This is 4040 error page.',
        title:'404 error',
        name:'karan'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})