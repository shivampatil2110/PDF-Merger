const express = require("express")
const path = require("path")
const multer = require("multer")
const upload = multer({dest: "uploads/"})
const app = express()
const {mergePdfs} = require("./merge")

app.use("/static",express.static("public"))

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,"./templates/index.html"))
})

app.post('/merge', upload.array('pdfs',2), async(req,res,next)=>{
    console.log(req.files)
    let d = await mergePdfs(path.join(__dirname,req.files[0].path),path.join(__dirname,req.files[1].path))
    res.redirect(`http://localhost:3000/static/${d}.pdf`)
})

app.listen(3000,()=>{
    console.log("server started")
})
