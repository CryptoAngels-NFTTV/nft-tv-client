const express = require('express');
const axios = require('axios');
const cors = require('cors')
const app = express();

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
  
app.get('/image', cors(corsOptions), async (req, res) => {
    try {
        const { url } = req.query;
        const response = await axios.get( url, {
            responseType: 'arraybuffer',
        });
        res.setHeader('Content-Type', response.headers['content-type']);
        res.setHeader('Content-Length', response.headers['content-length']);
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.send(response.data);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal server error');
    }
});

app.get('/status',(req, res) => {
    res.send("Proxy server is up")
});


app.listen(3000, function () {
    console.log('CORS-enabled web server listening on port 3000')
});