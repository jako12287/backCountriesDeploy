const axios = require('axios')
const {Country, Activity} = require('../db')
const {API} = process.env


let getCountry = async()=>{
    try {
        
            let show = await Country.findAll({include: Activity})
        
        if(show.length === 0){
            let getCountries = await axios.get(`${API}`)
            let data = await getCountries.data
            let id = 1;
            let showApi = data.map((el)=>{
                return {
            id: el.cca3,    
            name:el.name.common,
            imageflag:el.flags[0],
            continent:el.continents[0],
            capitalcity:el.capital ? el.capital[0] : 'capital does not exist',
            subregion: el.subregion ? el.subregion : 'subregion does not exist',
            area: el.area,
            population: el.population}
        })
        let save = await data.map((el)=>{
            Country.create({
                id:el.cca3,
                name:el.name.common,
                imageflag:el.flags[0],
                continent:el.continents[0],
                capitalcity:el.capital ? el.capital[0] : 'capital does not exist',
                subregion: el.subregion ? el.subregion : 'subregion does not exist',
                area: `${el.area} Km2`,
                population: el.population
            })
        })
        return showApi
    }else{
        
        return show
    }
} catch (err) {
    res.status(500).send(`Upps Internal Server Error`)
}

}

let getDetails = async(id)=>{

    try {
        
        
        id = id.toUpperCase()
        let details = await Country.findAll({
            where:{id:id},
            include: Activity
        })
    return details
} catch (err) {
    
    res.status(500).send(`Upps Internal Server Error`)
    
}
}   

let getQuery = async(name)=>{
    try {
        
        let env;  
        let name1 = name.toLowerCase()
        
        let getBD = await Country.findAll({
            include:Activity
        })

        env = getBD.filter(el=>el.name.toLowerCase().includes(name1))
        if(env.length === 0){
            return []
        }else{
            return env
        }
    } catch (err) {
        res.status(500).send(`Upps Internal Server Error`)
    }
}

   module.exports = {
       getCountry,
       getDetails,
       getQuery,
    
    } 