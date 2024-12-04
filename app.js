const path=require('path')
const express=require('express')
const bodyParser=require('body-parser')
const sequelize=require('./util/database')
const userRoutes = require('./routes/user');

const app=express()
app.set('view engine','ejs')
app.set('views','views')
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname,'public')))
app.use(express.json()); 
app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.use(userRoutes);
sequelize.sync()
.then((result)=>{
    console.log(result)
    app.listen(3000)
})
.catch((err)=>console.log(err))
