const express=require("express");
const bodyparser=require("body-parser");

const app=express();
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set('view engine','ejs');
var items=[];
app.get("/",function(req,res){
  var date =new Date();

  var options={
    weekday:"long",
    day:"numeric",
    month:"long"
  }
  var day =date.toLocaleDateString("en-US",options);


res.render("index",{f:day,items:items});
})
app.post("/",function(req,res){
var body
  var item=req.body.itam;
  items.push(item);
  res.redirect("/");
})
app.listen(300,function(){
console.log("server on");
})
