const express = require('express');
const axios = require('axios');
const app = express();

app.get('/image', async (req, res) => {
    try {
        const { url } = req.query;
        const response = await axios.get( url, {
            responseType: 'arraybuffer',
        });
        res.setHeader('Content-Type', response.headers['content-type']);
        res.setHeader('Content-Length', response.headers['content-length']);
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
        res.send(response.data);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal server error');
    }
});

app.listen(3000);