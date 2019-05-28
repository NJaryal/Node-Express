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
    if(!newsObj) return res.status(404).send("The news object with given id was not found.")
    res.status(200).json({
        message: 'Single News!',
        newsId: req.params.id,
        obj: newsObj
    })
});

router.post('/', (req, res, next) => {
    const {error} = validateNews(req.body);
    if(error) return res.status(400).send(error.details[0].message)
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
    if(!newsObj) return res.status(404).send("The news object with given id was not found.")
    const {error} = validateNews(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    newsObj.name = req.body.name;
    res.status(200).json({
        message: 'Successfully updated a News!',
        updatedObj: newsObj
    })
})

router.delete('/:id', (req, res, next) => {
    const newsObj = newsArray.find(item => item.id === parseInt(req.params.id))
    if(!newsObj) return res.status(404).send("The news object with given id was not found.")
    const index = newsArray.indexOf(newsObj);
    newsArray.splice(index, 1);
    res.status(200).json({
        message: 'Successfully deleted a News!',
        deletedObj: newsObj
    });
});

module.exports = router;

