const express=require("express")
const app=express()
const bodyparser=require("body-parser")
app.use(bodyparser.urlencoded({extended:true}))
app.use(express.json())
const port = 3000
let count=0
//products
let products=[]



//get products
app.get('/products', (req, res) => {
  res.send(products)
})


//home
app.get('/home', (req, res) => {
  res.sendFile(__dirname+"/index.html")
})



//post
app.post("/insert",(req,res)=>{
  let product={}
  product["id"]=count;
  product["name"]=req.body.pname;
  console.log(product);
  products.push(product)
  count++;
  res.redirect("/home")
})


//update 
app.post("/update", (req, res) => {
  const pid = Number(req.body.pid);
  console.log(pid);
 products.forEach((e)=>{
   if(e.id===pid){
    console.log(e);
    e.name=req.body.pname
   }
  })
  res.redirect("/home") 
})

//delete
app.post("/delete", (req, res) => {
  const pid = Number(req.body.pid);
  console.log(pid);
 products.forEach((e)=>{
   if(e.id===pid){
    console.log(e);
    products.pop(e)
   }
  })
  count--;
  res.redirect("/home") 
})








app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})