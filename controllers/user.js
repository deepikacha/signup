const User = require('../models/user');

exports.getUser=(req,res,next)=>{
    User.findAll()
    .then(users=>{
        res.render('user-list',{
            users:users,
            pageTitle:'Add User',
            path:'/users'
          
    
        })
    })
    .catch((err)=>console.log(err))
   
}
exports.postAddUser=(req,res,next)=>{
    const name=req.body.name;
    const email=req.body.email;
    const password=req.body.password;
   
    User.create({
        name:name,
        email:email,
       password:password
    })
    .then((createdUser) => {
        console.log('User created:', createdUser);
        res.status(201).json({ 
            message: 'User created successfully!',
            user: createdUser
        });
    })

    .catch((err) => {
        console.error(err);
        res.status(500).json({ 
            message: 'An error occurred', 
            error: err 
        });
    });
}



