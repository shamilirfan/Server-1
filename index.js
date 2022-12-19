const express = require('express')
const app = express()
const port = 3001
const fs = require("fs")
const { parse } = require('path')
const bodyParser = require('body-parser');
const cors = require("cors");
const { json } = require('express')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(express.static("public"))
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));

app.post("/signin", (req, res) => {
    fs.readFile("database", "utf8", (err, data) => {
        const allData = JSON.parse(data);
        const userData = req.body;
        const fusers = allData.users
            .filter(user => user.username === userData.username && user.password === userData.password)
        if (fusers.length > 0) {
            res.send(JSON.stringify(fusers[0]));
        }
        else {
            res.status(400).send()
        }
    });
});
app.post("/signup", (req, res) => {
    fs.readFile("database", "utf8", (err, data) => {
        const allData = JSON.parse(data);
        const userData = req.body;
        userData.id = allData.users.length + 1;
        allData.users.push(userData);
        fs.writeFile("database", JSON.stringify(allData), () => { });
        res.send(JSON.stringify(userData));
    });
});
app.post("/ImgUpload", (req, res) => {
    fs.readFile("database", "utf8", (err, data) => {
        const allData = JSON.parse(data);
        const imageData = req.body;
        const rawImageString = imageData.image.replace(/^data:image\/jpeg;base64,/, "")
        const buffer = Buffer.from(rawImageString, "base64");
        imageData.id = allData.image.length + 1;
        fs.writeFile(`public/${imageData.id}.jpg`, buffer, () => { });
        imageData.image = `${imageData.id}.jpg`;
        allData.image.push(imageData);
        fs.writeFile("database", JSON.stringify(allData), () => { });
        res.send(JSON.stringify(imageData));
    });
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});



