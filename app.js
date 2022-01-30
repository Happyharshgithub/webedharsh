
const { response } = require('express');
const express = require('express');
const session = require('express-session')
const morgan = require('morgan');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Blog = require('./model/blog.js')
const Blogr = require('./model/blogreg.js')
var expressValidator = require('express-validator');
//image
const path = require('path');
const formidable = require('formidable');
const fs = require('fs');
const bcrypt = require('bcrypt');
const connectflash = require('connect-flash')
const router = express.Router();





//require('dotenv/config');
// Step 6 - load the mongoose model for Image
var imgModel = require('./model/blog');

//const { dirname } = require('path/posix');
//const port = 3000;
const port = process.env.PORT || 3000;
const app = express ();



//app.use(session({secret: "sssjjjj"}));
app.use(session({
    secret: 'fdsfdsf',
    resave: true,
    saveUninitialized: true
}));
// Step 4 - set up EJS
  
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public folder

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views'); // set express to look in this folder to render our view

// Step 5 - set up multer for storing uploaded files
  
var multer = require('multer');
const { render, redirect } = require('express/lib/response');
const flash = require('connect-flash/lib/flash');

  
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
  
var upload = multer({ storage: storage });



const dbURI = 'mongodb+srv://app:nagar%40123@cluster0.w5tpa.mongodb.net/blogs?retryWrites=true&w=majority';
               

mongoose.connect( dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then (result => {
    console.log('database connected')

    app.listen (port);

    app.use(session({
  
        // It holds the secret key for session
        secret: 'Your_Secret_Key',
        // Forces the session to be saved        // back to the session store
        resave: true,
        // Forces a session that is "uninitialized"        // to be saved to the store
        saveUninitialized: true
    }))


console.log('server running at ', port);

})
.catch(err => {
    console.log(err);
})




// morgan
app.use(morgan('dev'));
//static
app.use('/public', express.static('public'));


//url parse
app.use(express.urlencoded({ extended: true }));




//app.get('/' , (req,res) =>{
   // res.render('rr' , { title : 'rr' });
//})

//app.get('/' , (req,res) =>const blog= { name: 'hai', } res.render('index' , { title : 'home', blog: blog });})



app.get('/' , (req,res) =>{

    //let blogarray = [
       // {heading : 'headingone', body: 'bodyone', author: 'authorone'},
       // {heading : 'headintttgone', body: 'bodyone', author: 'authorone'},
       // {heading : 'headiddfngone', body: 'bodyone', author: 'authorone'},
        //{heading : 'headingxvxcone', body: 'bodyone', author: 'authorone'},

  //  ]
   
//console.log(req.session);
sess=req.session;
sess.username;
sess.username="Ramesh";
//console.log(req.session.username);
//var passedVariable = req.query.valid;
var passedVariable = req.session.valid;
const sv = req.searchvalue;
//console.log(passedVariable)


    Blog.find().sort({ createdAt: -1 })
    .then(result => {

        res.render('index', {root: __dirname, title: 'Home', blogs: result, userstatus: passedVariable , sv1: sv });
    })
    .catch(err => console.log(err))
    //res.render('index' , { title : 'home', blogs : blogarray });
})
//app.get('/create' , (req,res) =>{    res.sendFile('./views/create.html', {root: __dirname});})
//homepage
app.get('/homepage' , (req,res) =>{

  //  console.log(req.session.username);
    //res.render('index' , { title : 'home', blogs: result  });
    var passedVariable = req.session.valid;
    const sv = req.searchvalue;
    Blog.find().sort({ createdAt: -1 })
    .then(result => {

        res.render('index', { title: 'Home', blogs: result,userstatus: passedVariable, sv1: sv });

    })
    .catch(err => console.log(err))

})

//search
app.get('/searchresults..', (req,res) =>{
    res.redirect('/register')
})

app.get('/search', (req,res) =>{
    res.render('search')
})
app.get('/test', (req,res) =>{
    res.render('test')
})


//logout
app.get('/logout' , (req,res) =>{

    
      
      req.session.valid=null;
      var passedVariable = req.session.valid;

      Blog.find().sort({ createdAt: -1 })
      .then(result => {
  
         // res.render('index', { title: 'Home', blogs: result,userstatus: passedVariable });
             res.redirect('/');
      })
      .catch(err => console.log(err))
  
  })
  

//about blog
app.get('/about1' , (req,res) =>{
    var passedVariable = req.session.valid;
    res.render('about',{userstatus: passedVariable });
})


//blog
app.get('/blogss' , (req,res) =>{
    var passedVariable = req.session.valid;
    res.render('blogss',{userstatus: passedVariable });
})


// single blog ................................................

app.get('/blogss/:id', (req, res) => {

    var passedVariable = req.session.valid;
    var passedVariable1 = req.session.valid1;
    const id = req.params.id;


    Blog.findById(id)
        .then(result => {
            console.log(result);

            res.render('blogss', { title: 'Blog' ,blog:result, userstatus: passedVariable,  userstatus1: passedVariable1 });

        })
        .catch(err => console.log(err))


});


//single blog delete
app.delete('/blog/:id', (req, res) => {
    
    const id = req.params.id;
    const passedVariable = req.session.valid;
    const pn_blogr = req.session.valid1;
    //const pn_blog=id2.substring(24);
    //const id = id2.substring(0,24);

   


    const myresponse = {
        status:'sucess'
    }
        
                      
    

    Blog.findByIdAndDelete(id)
        .then(result => {
        
           res.json(myresponse)
        })
        .catch(err => console.log(err))

         
    

});



//create blog
app.get('/create/edit' , (req,res) =>{
    var passedVariable = req.session.valid;
    var passedVariable1 = req.session.valid1;
    var passedVariable2 = req.session.valid2;
    res.render('create', {root: __dirname ,userstatus: passedVariable,userstatus1: passedVariable1,userstatus2: passedVariable2});
})

//register
app.get('/register' , (req,res) =>{
    var passedVariable = req.session.valid;
    res.render('register', {root: __dirname, userstatus: passedVariable});
})

//edit
//app.get('/edit' , (req,res) =>{
   // var passedVariable = req.session.valid;
    //var passedVariable1 = req.session.valid1;
    //var passedVariable2 = req.session.valid2;
    //var id = req.params.id;
  //  Blog.findById(id)
   // .then(result => {
    //    console.log(result);

     //   res.render('edit', {root: __dirname, userstatus: passedVariable, userstatus1: passedVariable1, userstatus2: passedVariable2});
//
   // })
  //  .catch(err => console.log(err))

    
//})
app.get('/edit/:id', (req, res) => {

    var passedVariable = req.session.valid;
    var passedVariable1 = req.session.valid1;
    var passedVariable2 = req.session.valid2;
    const id = req.params.id;


    Blog.findById(id)
        .then(result => {
            console.log(result);
            
            res.render('edit', { title: 'Blog' ,blog:result, userstatus: passedVariable,  userstatus1: passedVariable1, userstatus2: passedVariable2});

        })
        .catch(err => console.log(err))


});

app.post('/edit', (req, res) => {

    var passedVariable = req.session.valid;
    var passedVariable1 = req.session.valid1;
    var passedVariable2 = req.session.valid2;
    //const id = req.params.id;
    //var heading_edit=req.body.hea;
var obj = req.body;

    const id=req.id_edit;
    console.log(obj);
    console.log(obj.id_edit);

        Blog.findByIdAndUpdate(obj.id_edit, { heading: obj.heading, body: obj.body },
                function (err, docs) {
        if (err){
        console.log(err)
        }
        else{
        console.log("Updated User : ", docs);
        }
        });


        //  res.render('edit', { title: 'Blog' ,blog:result, userstatus: passedVariable,  userstatus1: passedVariable1, userstatus2: passedVariable2});
          res.redirect('/');
    


});



//allblogs
app.get('/allblogs' , (req,res) =>{
    var passedVariable = req.session.valid;
    var passedVariable1 = req.session.valid1;
    sess=req.session;
sess.username;
sess.username="Ramesh";
console.log(req.session.username);
var obj = req.body;
const sv = "";
console.log( req.body);

    Blog.find().sort({ createdAt: -1 })
    .then(result => {
        
        res.render('all', { title: 'Home', blogs: result, userstatus: passedVariable, userstatus1: passedVariable1, sv1: sv });

    })
    .catch(err => console.log(err))
    
})

app.post('/allblogs' , (req,res) =>{
    var passedVariable = req.session.valid;
    var passedVariable1 = req.session.valid1;
    var obj = req.body;
const sv = obj.searchvalue;
console.log( req.body);

    sess=req.session;
sess.username;
sess.username="Ramesh";
console.log(req.session.username);

console.log( req.searchvalue);
    Blog.find().sort({ createdAt: -1 })
    .then(result => {

        res.render('all', { title: 'Home', blogs: result, userstatus: passedVariable,  userstatus1: passedVariable1, sv1: sv });

    })
    .catch(err => console.log(err))
    
})

app.post('/create/edit' , (req,res) =>{
  
    const blog = new Blog(req.body);
console.log(req.body);
    blog.save()
        .then(result => {
            res.redirect('/' );
        })
        .catch(err => console.log(err));

})

app.post('/create/edit1', upload.single('image'), (req, res, next) => {
  
    var obj = {
        name: req.body.name,
        desc: req.body.desc,
        img: {
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
            contentType: 'image/png'
        }
    }
    imgModel.create(obj, (err, item) => {
        if (err) {
            console.log(err);
        }
        else {
            // item.save();
            res.redirect('/');
        }
    });
});



app.get('/login/register' , (req,res) =>{
    var passedVariable = req.session.valid;
    res.render('login', {root: __dirname, userstatus: passedVariable});
})

//app.post('/login/register' , (req,res) =>{


  

  //  const id = req.params.username;
  //  Blogr.findById(req.username)
  //  //Blogr.findById(id)
  //  const id = req.params.pa;
  //  Blogr.findById(req.username)
  //      .then(result => {
  //          console.log(result);
       //     res.redirect('/');
     //   })
    //    .catch(err => console.log(err))
  //      res.redirect('/');


//})



//register post handle
app.post('/register',(req,res)=>{
    var passedVariable = req.session.valid;
  const {name,email,username,penname,password, password2} = req.body;
  let errors = [];
  console.log(' Name ' + name+ ' email :' + email+ ' pass:' + password);
  
  //check if match
  if(password !== password2) {
      errors.push({msg : "passwords dont match"});
  }
  
  //check if password is more than 6 characters
  if(password.length < 6 ) {
      errors.push({msg : 'password atleast 6 characters'})
  }
  if(errors.length > 0 ) {
  res.render('register', {
      errors : errors,
      name : name,
      penname : penname,
      username : username,
      email : email,
      password : password,
      password2 : password2,
      userstatus: passedVariable})
   } else {
      //validation passed
     Blogr.findOne({username : username}).exec((err,user)=>{
      console.log(user);   
      if(user) {
          errors.push({msg: 'username already exists'});
          res.render('register',{errors,name,email,penname,username,password,password2, userstatus: passedVariable})  
         } else { 
          const newUser = new Blogr({
              name : name,
              email : email,
              username : username,
              penname : penname,
              password : password
          });
  
          //hash password
          bcrypt.genSalt(10,(err,salt)=> 
          bcrypt.hash(newUser.password,salt,
              (err,hash)=> {
                  if(err) throw err;
                      //save pass to hash
                      newUser.password = hash;
                  //save user
                  newUser.save()
                  .then((value)=>{
                      console.log(value)
                  res.redirect('/login/register');
                  })
                  .catch(value=> console.log(value));
                    
              }));
           }
     })
  }
  })

  //login post

  app.post('/login/register',(req,res)=>{
    var passedVariable = req.session.valid;
    const {username,password} = req.body;
    let errors = [];
    //console.log(' Name ' + name+ ' email :' + email+ ' pass:' + password);
    
    
    
    
        //validation passed
       Blogr.findOne({username : username}).exec((err,user)=>{
       // console.log(user);   
        if(user) {
         //  console.log(user.password)
           bcrypt.compare(password,user.password,(err,isMatch)=>{
            if(err) throw err;

            if(isMatch) {
              // res.redirect('/')
             // res.render('index',{{title:'Home',blogs:result}})
            //  res.redirect('/'+req.user.username)
           // var string = encodeURIComponent(user.username);
               // res.redirect('/?valid=' + string);
                req.session.valid = true;
                req.session.valid=user.username;
                req.session.valid1=user.penname;
                req.session.valid2=user.email;

               res.redirect('/')   

            } else {
                //return done(null,false,{message : 'pass incorrect'});
                errors.push({msg: 'password incorrect'});
          res.render('login',{errors,username,password, userstatus: passedVariable})
            }
        })

                       
           } else {  errors.push({msg: 'incorrect credentials'});
           res.render('login',{errors,username,password, userstatus: passedVariable})
            
                 
       
    }
    })
  })


//register
//app.post('/register' , (req,res) =>{

    //const {name,email,penname,username, password, password2} = req.body;
//let errors = [];
//console.log(' Name ' + name+ ' email :' + email+ ' pass:' + password);
//if(!name || !email || !password || !password2) {
   // errors.push({msg : "Please fill in all fields"})
//}
//check if match
//if(password !== password2) {
  //errors.push({msg : "passwords dont match"});
//}

//check if password is more than 6 characters
//if(password.length < 6 ) {
    //errors.push({msg : 'password atleast 6 characters'})
//}

//Blogr.findOne({email : email}).exec((err,user)=>{          
 //   console.log(user); })
 //if(user) { 
   // errors.push({msg: 'email already registered'});}

//})

 //})


//if(errors.length > 0 ) {
//res.render('register',{
   // errors : errors,
   //name : name,
  // email : email,
   //username : username,
   //penname: penname,
   //password : password,
   // password2 : password2
//})
//{
   // errors : errors,
   // name : name,
  //  email : email,
  //  password : password,
  //  password2 : password2})
//} 
//else {

    //console.log(1);
    //validation passed
   //Blogr.findOne({email : email}).exec((err,user)=>{          
   //console.log(user); 
  
//if(user) { console.log(2);
     // errors.push({msg: 'email already registered'});}
         

     // if(errors.length > 0 ) {
       // res.render('register',{
          //  errors : errors,
          // name : name,
          // email : email,
          // username : username,
          // penname: penname,
          // password : password,
          //  password2 : password2
       // });


    
    // 
   // }
   // })
        //render(res,errors,name,email,username,penname,password,password2);
       // render('register');
      // }
      // else {     
      //  User.getUserByUsername(username, function(err, user){ //must check if user exists
         //   if(err) throw err;
          //  if(user){
         //     console.log('existing...'); //may be deleted
         //     req.flash('error_msg', 'This username already exists');
         //     res.redirect('/register');
           // } else {
          //    User.createUser(newUser, function(err, user){
          //    if(err) throw err;
           ///   console.log(user);//may be deleted
           //   });
          
           // req.flash('success_msg', 'You registered successfuly and you can now login');
          //  res.redirect('/login/register');
          //  }
        //  })                                           
       // console.log(3);
        //const newUser = new Blogr({
          //  name : name,
          //  email : email,
           // penname : penname,
           // username : username,
          // password : password,
          // userstatus :1,
       // }); console.log(4);
    //hash password
    //bcrypt.genSalt(10,(err,salt)=> 
    //bcrypt.hash(newUser.password,salt,
        //(err,hash)=> {
            //if(err) throw err;
                //save pass to hash
               // newUser.password = hash;
            //save user
           // newUser.save()
           // .then((value)=>{
             //   console.log(value)
          //  res.render('login/register');
        //    })
      //      .catch(value=> console.log(value));
              
      //  })); console.log(5);
    
    //  //ELSE statement ends here
   //  console.log(6);
  //  res.redirect('/login/register');

//; }
//console.log(7);
        //const blogr = new Blogr(req.body);
   // console.log(req.body);
       // blogr.save()
            //.then(result => {
               // res.redirect('/');
         //  })
           // .catch(err => console.log(err))
    
           // res.redirect('/');
    

//})




//middlewere
//app.use( (req,res) =>{
 //   res.send('404** not found, opps !')
//})
app.use(express.static('public'));
