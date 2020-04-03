const express=require("express");
const bodyparser=require("body-parser");

const app=express();
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set('view engine','ejs');
var items=[];
var workitems=[];
var date =new Date();

var options={
  weekday:"long",
  day:"numeric",
  month:"long"
};
var day =date.toLocaleDateString("en-US",options);

app.get("/",function(req,res){


res.render("index",{f:day,items:items,v:"list"});
})
app.post("/",function(req,res){
  var item=req.body.itam;

  if(req.body.button==="work"){
workitems.push(item);
    res.redirect("/work");
  }
  else{

  items.push(item);
  res.redirect("/");
}
})

app.get("/work",function(req,res){
  res.render("index",{f:day,items:workitems,v:"work"});

})

app.listen(300,function(){
console.log("server on");
})
