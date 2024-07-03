const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const path = require('path');
const UserModel = require('./models/UserModel');
const { decode } = require('punycode');
const PostModel = require('./models/PostModel');
const fs = require('fs');

const app = express();

// core object configuration
const corsObject = {
  origin: ['http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}

// To parse incomming json request into javascript object
app.use(express.json());

// For API call form client               corsObject
app.use(cors(corsObject));
// Parse the cookie sent by client for authentication
app.use(cookieParser());
// mongodb connection 
mongoose.connect('mongodb://127.0.0.1:27017/blog');

const verifyUser=(req, res, next)=>{
  const token= req.cookies.Token;
  if(!token){
    return res.json('The token not found');
  }else{
    jwt.verify(token, "email-user-name", (err, decode)=>{
      if(err){
        return res.json('the token is invalid');
      }else{
        req.email = decode.email;
        req.username = decode.username;
        next();
      }
    })
  }
}

app.get('/', verifyUser, (req, res)=>{
  return res.json({email: req.email, username: req.username});
})

// Register route
app.post('/register', (req, res)=>{
  const {username, email, password} = req.body;
  bcrypt.hash(password, 10)
  .then(hash => {
    UserModel.create({username, email, password:hash})
    .then(user=>res.json(user))
    .catch(err=> res.json(err))
  })
  .catch(err => console.log(err))
})

// login route
app.post('/login', (req, res)=>{
  const {email, password} = req.body;
  UserModel.findOne({email: email})
  .then(user => {
    if(user){
      bcrypt.compare(password, user.password, (err, data)=>{
        if(data){
          const token = jwt.sign({email: user.email, username: user.username}, "email-user-name");
          res.cookie("Token", token, {
            expires: new Date(Date.now() + 2000000),
            httpOnly: true,
            sameSite: 'Lax'
          });
         return res.json('Success');
        }else{
          return res.json('Password Incorrect');
        }
      })

    }else{
      res.json("User do not exist")
    }
  })
})
 // home route or dashbord

// app.get('/', (req, res) => {
//     res.send('Hello World!');
//   });
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(path.join(__dirname, 'Public')));

const storage = multer.diskStorage({
  destination: (req, file, cb)=>{
    cb(null, path.join(__dirname, 'Public'))
    // cb(null, 'Public')
  },
  filename: (req, file, cb)=>{
    cb(null, file.fieldname +'_' + Date.now()+ path.extname(file.originalname))
  }
})

const upload = multer({
  storage: storage
})

app.post('/create', verifyUser, upload.single('file'), (req, res)=>{
  PostModel.create({title: req.body.title,
     description: req.body.description,
      file: req.file.filename,
      email:req.body.email})
  .then( result => res.json(result))
  .catch(err => res.json(err))
})

app.get('/getposts', (req, res)=>{
    PostModel.find()
    .then(post => res.json(post))
    .catch(err => res.json(err))
})

app.get('/getpostsbyid/:id', (req, res)=>{
  const id = req.params.id;
  PostModel.findById({_id: id})
  .then(post => res.json(post))
  .catch(err => res.json(err))
})

app.put('/editpost/:id', (req, res)=>{
  const id = req.params.id;
  PostModel.findByIdAndUpdate({_id: id},
    {title: req.body.title,
    description: req.body.description})
    .then(result => res.json(result))
    .catch(err => res.json(err));
})

app.delete('/deletepost/:id', (req, res)=>{
  const id = req.params.id;

  PostModel.findById({ _id: id })
  .then(post => {
    if (post) {
      // Delete the file from the filesystem
      fs.unlink(path.join(__dirname, 'Public', post.file), (err) => {
        if (err) {
          return res.json({ error: 'File deletion failed', err });
        }

        // Delete the post from the database
        PostModel.findByIdAndDelete({ _id: id })
          .then(result => res.json('Success'))
          .catch(err => res.json(err));
      });
    } else {
      res.json('Post not found');
    }
  })
  .catch(err => res.json(err));
})

  app.get('/logout', (req, res) =>{
    res.clearCookie('Token');
    return res.json('Success');
  })

// Start the server
const port = 3001;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
