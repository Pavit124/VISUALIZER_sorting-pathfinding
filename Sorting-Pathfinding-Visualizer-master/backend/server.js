const express= require("express");
const mysql= require('mysql');
const cors= require('cors');

const app=express();
app.use(cors());
app.use(express.json());

const db= mysql.createConnection({
    host:"localhost",
    user: "root",
    password: "",
    database: "visualizer",
})

app.post('/Signup', (req, res) => {
    const sql="INSERT INTO credentials (`name`, `email`, `password`) VALUES (?, ?, ?)";
    const values = [
        req.body.name,
        req.body.email,
        req.body.password
    ]
    db.query(sql, values, (err, data) => {
        if (err) {
            console.log(err);
            return res.json("Error");
        }
        return res.json(data);
    })
})

app.post('/', (req, res) => {
    const sql = "SELECT name, email, password FROM credentials WHERE email = ?";
    const values = [
        req.body.email
    ]
    db.query(sql, values,  (err, data) => {
        if (err) {
            console.log(err);
            return res.json(false);
        }
        return res.json(data);
    });
});

app.listen(8081, ()=> {
    console.log("listening");
})
