const path=require('path')
const express=require('express')
const bodyParser=require('body-parser')
const sequelize=require('./util/database')
const userRoutes = require('./routes/user');
const expenseRoutes = require('./routes/expense');

const app=express()
app.set('view engine','ejs')
app.set('views','views')
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.json()); 
app.use(express.static(path.join(__dirname,'public')))
app.use(userRoutes);
app.use(expenseRoutes);
console.log(expenseRoutes);


app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

sequelize
  .sync()
  .then((result) => {
    console.log('Database connected.');
    app.listen(3000, () => {
      console.log('Server is running on http://localhost:3000');
    });
  })
  .catch((err) => console.log('Database connection error:', err));
