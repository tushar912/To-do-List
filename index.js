const express=require("express");
const bodyparser=require("body-parser");
const mongoose=require("mongoose");
const app=express();
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set('view engine','ejs');
mongoose.connect("mongodb://localhost:27017/todolistdb",{useUnifiedTopology:true,useNewUrlParser:true});
const itemsSchema={
  name:String
};
const Item=mongoose.model("Item",itemsSchema);

var workitems=[];
var date =new Date();
const item1=new Item({name:"todolist"});
const item2=new Item({name:"hi"});
const arr=[item1,item2];
const listSchema={
  name:String,
  items:[itemsSchema]
};
const list=mongoose.model("List",listSchema);


var options={
  weekday:"long",
  day:"numeric",
  month:"long"
};
var day =date.toLocaleDateString("en-US",options);

app.get("/",function(req,res){
  Item.find({},function(err,founditems){
    if(founditems.length==0){
      Item.insertMany(arr,function(err){
        if(err){
          console.log("err");
        }
        else{
          console.log("added success");
        }
      })
        res.redirect("/");
    }
    else
    res.render("index",{f:"today",items:founditems,v:"list"});

  })

})
app.get("/:customListName",function(req,res){

  const customListName=req.params.customListName;
  list.findOne({name:customListName},function(err,foundlist){
    if(!err){
      if(!foundlist){
        const li=new list({
          name:customListName,
          items:arr
        });
        li.save();
        res.redirect("/"+customListName);
      }
      else{
        res.render("index",{f:foundlist.name,items:foundlist.items,v:"list"});
      }
    }

  })

})
app.post("/delete",function(req,res){
  const id=req.body.check;
  Item.findByIdAndRemove(id,function(err){
    if(err)
    console.log("err");
    else
    console.log("success");
  })
  res.redirect("/");
})
app.post("/",function(req,res){
  const a=req.body.itam;
  const nam=req.body.button;
    const i =new Item({name:a});
    if (nam=== "day"){
      i.save();
      res.redirect("/");
    } else {
      list.findOne({name: nam}, function(err, foundList){
        foundList.items.push(i);
        foundList.save();
        res.redirect("/" + nam);
      });
    }
  })



app.listen(3000,function(){
console.log("server on");
})
