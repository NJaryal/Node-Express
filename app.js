const express = require('express');
const app = express();
const logger = require('./utils/loggers')
app.use(express.json());

const newsRoutes = require('./api/routes/news');

//CORS Handling
app.use((req,res,next) =>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','Origin, Content-Type, Accept, Authorization')    
    next();
})

//Routes to handle Request
app.use('/news', newsRoutes)

app.use((req,res,next)=> {
    const error = new Error('Not Found!')
    error.status = 404
    next(error)
})
app.use((error,req,res,next)=> {
    res.status(error.status || 500);
    res.json({
        error: {
            status: error.status,
            message: error.message
        }
    }) 
})
//Logger to capture Api Endpoint, method and Timestamp
app.use((req,res,next) => {
    if((res.status(201)) || (res.status(200))){
        logger.info(`Api EndPoint:${req.originalUrl}, Api Method: ${req.method}`, new Date())
    } else {
        logger.warn(`Error ${error.status} ` ,new Error(error.message));
    }        
    next();
})

module.exports = app;