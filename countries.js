let fetch = require('node-fetch')
let fs = require('fs')
const cheerio = require('cheerio');
let obj = {}
let middleWare = (req,res,next)=>{
    fetch('https://www.worldometers.info/coronavirus/')
    .then(res => res.text())
    .then(res => {
        $ = cheerio.load(res);
        let header = $('th', 'tr')
        $(header).each(function (i, elem) {
            let tab = $(elem).text()
            obj[tab] = []
        });
        let body = $('tr', 'tbody')
        $(body).each(function (i, elem) {
            $('td', elem).each(function (i, elem) {
                let key = Object.keys(obj)
                let val = $(elem).text()
                obj[key[i]].push(val)
            })
                    })
              // I'm appending the list of countries you can search for 
              // to a list property on the request object.
        req.list={data:obj["Country,Other"]}
        next()
    })
}



module.exports=middleWare