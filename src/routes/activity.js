const express = require('express');
const activity = express.Router();
const {createActivity, getActivity, getAll} = require('../controllers/controllersActivity')
activity.use(express.json())
const cors = require('cors')


activity.post('/',cors(), async(req,res)=>{
  try {
    let {name, difficulty, duration, season, countryID} = req.body
    let postDB = await createActivity(name, difficulty, duration, season, countryID)
    res.send(postDB)
    
  } catch (err) {
    console.log('ii',err)
  }

})


activity.get('/', async(req, res, next)=>{
  let {name}= req.query
  if(!name){
    next()
  }else{

    let get = await getActivity(name)
    res.send(get)
  }
})

activity.get('/', async(req,res)=>{
     let get = await getAll()
     res.send(get)
})
module.exports = activity;
