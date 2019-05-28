const express = require('express');
const app = express();
app.use(express.json());

const newsRoutes = require('./api/routes/news');
const ordersRoutes = require('./api/routes/orders')

app.use('/news', newsRoutes)
app.use('/orders', ordersRoutes)

app.use((req,res,next)=> {
    const error = new Error('Not Found!')
    error.status = 404
    next(error)
})
app.use((error,req,res,next)=> {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})
module.exports = app;