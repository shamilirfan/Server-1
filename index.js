const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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
        res.send(`${req.body.name} added`);
    });
});
app.get("/color", (req, res) => {
    fs.readFile("database", "utf8", (err, data) => {
        const allData = JSON.parse(data);
        res.send(JSON.stringify(allData.color));
    });
});
app.post("/add-color", (req, res) => {
    fs.readFile("database", "utf8", (err, data) => {
        const allData = JSON.parse(data);
        const colorData = req.body;
        colorData.id = allData.color.length + 1;
        allData.color.push(colorData);
        fs.writeFile("database", JSON.stringify(allData), () => { });
        res.send(`${req.body.name} added`);
    });
});
app.get("/size", (req, res) => {
    fs.readFile("database", "utf8", (err, data) => {
        const allData = JSON.parse(data);
        res.send(JSON.stringify(allData.size));
    });
});
app.post("/add-size", (req, res) => {
    fs.readFile("database", "utf8", (err, data) => {
        const allData = JSON.parse(data);
        const sizeData = req.body;
        sizeData.id = allData.size.length + 1;
        allData.size.push(sizeData);
        fs.writeFile("database", JSON.stringify(allData), () => { });
        res.send(`${req.body.name} added`);
    });
});
app.get("/brand", (req, res) => {
    fs.readFile("database", "utf8", (err, data) => {
        const allData = JSON.parse(data);
        res.send(JSON.stringify(allData.brand));
    });
});
app.post("/add-brand", (req, res) => {
    fs.readFile("database", "utf8", (err, data) => {
        const allData = JSON.parse(data);
        const brandData = req.body;
        brandData.id = allData.brand.length + 1;
        allData.brand.push(brandData);
        fs.writeFile("database", JSON.stringify(allData), () => { });
        res.send(`${req.body.name} added`);
    });
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});



