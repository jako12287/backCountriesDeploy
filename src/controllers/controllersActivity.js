const { Country, Activity} = require('../db')



let createActivity = async(name, difficulty, duration, season, idCountry)=>{
    try {
        season = season.toLowerCase()
        name = name.toLowerCase()
        if(difficulty <= 0 || difficulty > 5) return `difficulty must be a number between 1 and 5`
        if(season !== 'summer' && season !== 'autumn' && season !== 'winter' && season !=='spring') return `season is invalid`
        let check = await Activity.findOne({
            where:{name:name}
        })

        if(!check){

            
            let create = await Activity.create({
                name, 
                difficulty,
                duration, 
                season
            })
            
            let ADDCountry = await Country.findAll({
                where: {id: idCountry }
            })
            
            create.addCountry(ADDCountry)
            return `success created ${create} and aDDCountry ${ADDCountry}`
        }else{
            return `name exist`
        }
        
    } catch (err) {
        res.status(500).send(`Upps Internal Server Error`)
        
        
    }
    
}
let getAll = async()=>{
    let get = await Activity.findAll()
    return get 
}

let getActivity = async(name)=>{
    name.toLowerCase()
   let get = await Activity.findAll({
       where:{name:name},
       include: Country
   })
   if(!get){
       return res.send('no found activity')
    }else{
        let getMap = get.map((el)=>el.countries)
        
        return getMap[0]
    }
}

module.exports = {
    createActivity,
    getActivity,
    getAll
}


