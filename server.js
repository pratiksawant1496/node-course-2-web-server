const express = require('express');
const hbs = require('hbs');
const fs =require('fs');

//making new express app
var app = express();

hbs.registerPartials(__dirname + '/views/partials');        //partials helps to reuse the code instead of writing it multiple time by injecting wherever you want .  here __dirname refers to the root directory
app.set('View Engine','hbs');         //lets us to set up some of the express confg

//////makng the middleware///////

//logger
app.use( (req,res,next) => {          //registering the middleware  .
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log',log + '\n',(err) => {                 //fs.appendFile allows you to append a new file which wont exist & display the data into that file
    if(err){
      console.log('unable to append to server.log');
    }
  });
  next();                      //next will tell the express when we are done
});


// //maintainance middleware
// app.use((req,res,next) => {
//   res.render('maintainance.hbs');
// });

app.use(express.static(__dirname + '/public'));               //it lets us to use middlware function

///////////////////
hbs.registerHelper('getCurrentYear',() => {             //creating the helper method for data getting injected
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text) => {
    return text.toUpperCase();
});

app.get('/',(req,res) => {                  // app.get() helps to setup the handler for the http requets where we pass the URL as 1st argument
//res.send('<h1>hello express!<h1>');
// res.send({                        //passing an object in request
//   name:'pratik',
//   likes:[
//     'biking',
//     'cities'
//   ]
// });

  res.render('home.hbs',{
    pageTitle:'Home page',
    welcomeMessage:'welcome to my website'
  });
});

app.get('/about',(req,res) => {     //making multiple pages
//  res.send('about page');
    res.render('about.hbs',{         //res.render()  helps to render any of your template with current view engine
        pageTitle:'About page'                 //this data will get injected to the template
    });
});

app.get('/bad',(req,res) => {
  res.send({
    errorMessage:'unable to handle request'
  });
});

app.listen(3030,() => {            //it helps to bind the app to port on our machine
console.log('server is up on port 3030');
});
