const Joi = require('@hapi/joi');
const express = require('express');
const router = express.Router();
const newsArray = [
    {
        id: 1,
        name: "Nitin"
    },
    {
        id: 2,
        name: "Slava"
    },
    {
        id: 3,
        name: "Jack"
    },
    {
        id: 4,
        name: "Kohli"
    }
];

class CustomError extends Error{
    constructor(text, status){
        super(text)
        this.status = status
    }
}

const validateNews = (newsObj)=> {
    const schema = {
        name: Joi.string().min(4).required()
    }
    return Joi.validate(newsObj, schema);
}

router.get('/', (req, res, next) => {
    res.status(200).json({
        newsArrayJSON: newsArray
    })    
});

router.get('/:id', (req, res, next) => {
    const newsObj = newsArray.find(item => item.id === parseInt(req.params.id))
    if(!newsObj) { 
        throw new CustomError('The news id was not found', 400)
    }
    res.status(200).json({
        message: 'Single News!',
        newsId: req.params.id,
        obj: newsObj
    })
});

router.post('/', (req, res, next) => {
    const {error} = validateNews(req.body);    
    if(error) {
        throw new CustomError('Not Found', 400)
    }
    const newsObj = {
        id: newsArray.length + 1,
        name: req.body.name
    }
    newsArray.push(newsObj);
    res.status(201).json({
        Message: 'Successfully created a News!',
        newObj: newsObj,
    })
});

router.put('/:id', (req,res,next) => {
    const newsObj = newsArray.find(item => item.id === parseInt(req.params.id))
    if(!newsObj) { 
        throw new CustomError('The news id was not found', 404)
    }
    const {error} = validateNews(req.body);
    if(error) {
        throw new CustomError('Bad Request error', 400)
    }
    newsObj.name = req.body.name;
    res.status(200).json({
        message: 'Successfully updated a News!',
        updatedObj: newsObj
    })
})

router.delete('/:id', (req, res, next) => {
    const newsObj = newsArray.find(item => item.id === parseInt(req.params.id))
    if(!newsObj) { 
        throw new CustomError('The news id was not found', 404)
    }
    const index = newsArray.indexOf(newsObj);
    newsArray.splice(index, 1);
    res.status(200).json({
        message: 'Successfully deleted a News!',
        deletedObj: newsObj
    });
});

module.exports = router;

