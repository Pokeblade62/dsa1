//jshint esversion:6

const express=require("express");
const mongoose=require("mongoose");
const app=express();
const bodyParser=require("body-parser");
app.use(express.static("public"));
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect('mongodb+srv://admin-yeshu:Minatoflash821@cluster0.wykvt.mongodb.net/myapp', {useNewUrlParser: true});

const dataSchema={
  name: String,
  email: String,
  seat: Number
};

const signupSchema={
  f0Name: String,
  l0Name: String,
  e0Mail: String,
  passWord: String
};

const SignUp= mongoose.model("Sign",signupSchema);
const List = mongoose.model("List",dataSchema);



const list1=new List({
name: "Yeshu",
email: "pokeblade62@gmail.com",
seat: 100
});

const list2=new List({
name: "Jack",
email: "jackblade62@gmail.com",
seat: 101
});

const defaultlist=[list1,list2];

app.get("/register", function(req, res){

List.find({},function(err, found){

if(found.length===0){

  List.insertMany(defaultlist, function(err){
  if(err){
    console.log("yeet");
  }else{
    console.log("Successfully added defaults");
  }
  });

}
List.find({},function(err,foundd){
if(err){
console.log(err);
}

res.render(__dirname+"/views/index.ejs",{lool:foundd});
});

});
});

app.get("/",function(req,res){

res.render(__dirname+"/views/first.ejs");

});

app.post("/",function(req,res){
res.redirect("/signup");
});

app.get("/signup",function(req,res){
  res.render(__dirname+"/views/signup.ejs");
});


app.post("/signup",function(req,res){
var fName=req.body.first;
var lName=req.body.last;
var eMail=req.body.email;
var pass=req.body.pass2;

const signup1=new SignUp({
  f0Name: fName,
  l0Name: lName,
  e0Mail: eMail,
  passWord: pass

});
signup1.save();
res.redirect("/register");
});



app.post("/register",function(req,res){
var namek= req.body.field1;
var emailk= req.body.field2;
var seatt= req.body.go;

app.post("/lkl",function(req,res){
  res.redirect("/register");
});


console.log(namek,emailk,seatt);

const list=new List({
name: namek,
email: emailk,
seat: seatt
});

list.save();
res.render(__dirname+"/views/register.ejs");

});
app.post("/registered",function(req,res){

  List.find({},function(err,founddd){
  if(err){
  console.log(err);
  }
  res.render(__dirname+"/views/registered.ejs",{hehe:founddd});
  });


});




let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port,function(){
  console.log("Listening");
});
