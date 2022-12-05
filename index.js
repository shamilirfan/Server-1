const express = require('express')
const app = express()
const port = 3000
const fs = require('fs');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('Hi Shamil Irfan!');
});
app.get("/employee", (req, res) => {
    fs.readFile("database", "utf8", (err, data) => {
        const allData = JSON.parse(data);
        res.send(JSON.stringify(allData.employee));
    });
});
app.post("/add-employee", (req, res) => {
    fs.readFile("database", "utf8", (err, data) => {
        const allData = JSON.parse(data);
        const employeeData=req.body;
        employeeData.id=allData.employee.length+1;
        allData.employee.push(employeeData);
        fs.writeFile("database", JSON.stringify(allData), () => { });
        res.send(`${req.body.name} added`);
    });
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

