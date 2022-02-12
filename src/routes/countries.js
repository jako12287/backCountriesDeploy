const express = require('express')
const countries = express.Router()
const {getCountry, getDetails, getQuery} = require('../controllers/controllersCountry')

countries.use(express.json())
countries.get('/',async(req, res, next)=>{
    try {
        let {name} = req.query
        if(!name){
            next()
        }else{
        let getfill = await getQuery(name)    
            res.send(getfill)
        }
        
    } catch (err) {
        res.status(500).send(`Upps Internal Server Error`)
    }
})

countries.get('/',async(req, res)=>{
    try {
        let get = await getCountry() 
        res.send(get)
        
    } catch (err) {
        res.status(500).send(`Upps Internal Server Error`)
    }
     
})

countries.get('/:id',async(req, res)=>{
    try {
        let {id} = req.params
        let details = await getDetails(id)
         
         res.send(details)
        
    } catch (err) {
        res.status(500).send(`Upps Internal Server Error`)
    }
})











module.exports = countries;
