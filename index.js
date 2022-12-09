const express = require('express')
const app = express()
const port = 3001
const fs = require("fs")
const { parse } = require('path')
const bodyParser = require('body-parser');
const cors = require("cors");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true, // <= Accept credentials (cookies) sent by the client
}));

app.get('/', (req, res) => {
    res.send('Hi Shamil Irfan!');
});
app.get("/dress", (req, res) => {
    fs.readFile("database", "utf8", (err, data) => {
        const allData = JSON.parse(data);
        res.send(JSON.stringify(allData.dress));
    });
});
app.post("/add-dress", (req, res) => {
    fs.readFile("database", "utf8", (err, data) => {
        const allData = JSON.parse(data);
        const dressData = req.body;
        dressData.id = allData.dress.length + 1;
        allData.dress.push(dressData);
        fs.writeFile("database", JSON.stringify(allData), () => { });
        res.send(`${req.body.name}`);
    });
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});



