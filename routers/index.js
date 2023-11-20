const express = require('express');
const router = express.Router();

const Url = require('../model/url')

// Code for redirecting short url to long url
router.get('/:code', async (req, res)=>{
    try {
        const url = await Url.findOne({urlCode: req.params.code})

        if(url){
            return res.redirect(url.longUrl);
        }else{
            return res.status(404).json("Not found")
        }
    }catch(err){
        console.error(err);
        res.status(500).json("Server error")
    }
})

module.exports = router;
