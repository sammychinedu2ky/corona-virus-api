let fetch = require('node-fetch')
let fs = require('fs')
const cheerio = require('cheerio');
// the obj variable would be used to store the data of countries
let obj = {}

let middleWare = (req, res, next) => {
    fetch('https://www.worldometers.info/coronavirus/')
        .then(res => res.text())
        .then(res => {
            //I am passing in the response into the cheerio method

            $ = cheerio.load(res);
            // $('th','tr') selects the th element in the tr element
            let header = $('th', 'tr')
            // I'm using the header of the table to creating the
            // properties of the object above
            $(header).each(function (i, elem) {
                let tab = $(elem).text()
                obj[tab] = []
            });
            //the body variable selects the tr element inside a tbody element.

            let body = $('tr', 'tbody')
            // I'm looping through the child elements to get the fields required 
            $(body).each(function (i, elem) {
                $('td', elem).each(function (i, elem) {
                    let key = Object.keys(obj)
                    let val = $(elem).text()
                    // I'm pushing the values of the subfields into their
                    // assigned arrays in the object above
                    obj[key[i]].push(val)
                })
            })
            //here I'm checking to see if the request from a user is available in the object above
            let getIndex = obj["Country,Other"].findIndex((i) => i.toLowerCase() == req.params.country.toLowerCase())
            if (getIndex == -1) {
                // I'm appending the data property to the request object
                // if the user input is not found in the object above
                req.data = { error: 'Country not found' }
                next()
            }
            let keys = Object.keys(obj)
            let newRes = { ...obj }
                       keys.forEach(i => {
                newRes[i] = newRes[i][getIndex]
            })
            console.log(newRes)
            req.data = { data: newRes }
            next()
        })
}

module.exports = middleWare