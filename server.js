const Joi = require('@hapi/joi');
const express = require('express');
const app = express();

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

app.use(express.json());
app.get('/', (req, res)=>{
    res.send(newsArray)
});

app.post('/news', (req, res)=>{
    //Error - Return 400
    const {error} = validateNews(req.body);
    if(error) return res.status(400).send(error.details[0].message)

    const newsObj = {
        id: newsArray.length + 1,
        name: req.body.name
    }
    newsArray.push(newsObj);
    res.send(newsObj);
});

app.put('/news/:id',(req, res)=> {
    const newsObj = newsArray.find(item => item.id === parseInt(req.params.id))
    if(!newsObj) return res.status(404).send("The news object with given id was not found.")

    //Error - Return 400
    const {error} = validateNews(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //Update News name
    newsObj.name = req.body.name;
    res.send(newsObj);
})

app.delete('/news/:id',(req,res)=> {
    const newsObj = newsArray.find(item => item.id === parseInt(req.params.id))
    if(!newsObj) return res.status(404).send("The news object with given id was not found.")

    const index = newsArray.indexOf(newsObj);
    newsArray.splice(index, 1);
    res.send(newsObj);
})

//Evironment variable
const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`Listen on port ${port}....`)
})

const validateNews = (newsObj)=> {
    const schema = {
        name: Joi.string().min(4).required()
    }
    return Joi.validate(newsObj, schema);
}