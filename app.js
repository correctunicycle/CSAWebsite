const express = require('express')
const multer = require('multer')
const parsing = require('./public/js/parser')


const app = express()



app.use(express.static('public'))
app.use('/css',express.static(__dirname +'public/css'))
app.use('/js',express.static(__dirname +'public/js'))
app.set('view engine','hbs')



// sets storage destination to be the upload folder, and file name to be name of whatever file was uploaded
var uploadedFile
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
    uploadedFile = file.originalname

  }
})
//does the file upload, not entirely sure how this works tbh my advice would be to not touch it because it works
var upload = multer({ storage: storage })


app.post('/uploads', upload.single('myFile'), (req, res, next) => {
  const file = req.file
  console.log('file is called '+ uploadedFile )
  //parsing imported from newparser file and gets individual assembly instructions from uploaded cose
  var derivedCode = parsing(uploadedFile)
  console.log('derived assembly is:' + derivedCode)
  if (!file) {
    const error = new Error('Please upload a file')
    error.httpStatusCode = 400
    return next(error)
  }
    
    //res.send(file)
     res.render('animationTemplate',{
      //passes assembly intructions into front end of upload page using handlebars template engine
      instruction1: derivedCode[0],
      instruction2: derivedCode[1],
      instruction3: derivedCode[2],
      instruction4: derivedCode[3],
      instruction5: derivedCode[4],

    })


   //res.sendFile(__dirname+'/public/animationpage.html' 
})

//loads the example animation page
app.get('/exampleAnimation',(req,res,next)=>{
  res.render('animationTemplate',{
    instruction1: "ldur X1, #1",
    instruction2: "ldur X2, #2",
    instruction3: "add X3, X2, X1",
    instruction4: "sub X4, X3, X2",
    instruction5: "stur M1, X4",

  })

})



//sets webpage to run on port 3000

let port = process.env.PORT;
if (port == null || port == "") {
  port = 4000;
}
app.listen(port);

