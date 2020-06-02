let express = require('express');
let app = express();
let countryMiddleWare = require('./data')
let countryListMiddleWare = require('./countries')

//use this route to find the Corona information of a particular country
app.get('/:country', countryMiddleWare, (req, res) => {
     res.json(req.data)
})

//use this route to find the countries you can query their information
app.get('/list/countries', countryListMiddleWare, (req, res) => {
        res.json(req.list)
})

app.listen(3000, () => {
    console.log('server started')
})

