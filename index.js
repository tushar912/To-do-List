const express=require("express");
const bodyparser=require("body-parser");

const app=express();
app.set('view engine','ejs');
app.get("/",function(req,res){
  var date =new Date();
  var currentday=date.getDay();
  if(currentday===6||currentday===0){
var k="weekend";

}
else{
  var k="weekday";

}
res.render("index",{f:k});
})
app.listen(300,function(){
console.log("server on");
})
