const express = require('express')
const { model } = require('mongoose')
const router = express.Router()

router.post('/foodData', async (req,res)=>{
    try{
        res.send([global.food_items,global.food_cat])
    }catch(err){
        console.log("Error message")
        res.send("Server Error")
    }
})

module.exports = router;