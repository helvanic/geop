//Dependencies
var app = require('express')();
var bodyParser = require('body-parser');
var log = require('./tools/log');
var cors = require('cors');

//Setup
var port = process.env.PORT || 3000;

//Middlewares
app.use(cors());
app.use(require('./middlewares/logger')); // This require our own middleware which is a logger
app.use(bodyParser.urlencoded({ extended: false })); // Body parser config
app.use(bodyParser.json());

//Routes
app.get('/', function(req, res){
  res.json({
    message : "This is the base of our API. Welcome."
  });
});

app.use('/users', require('./routes/users'));
  //Server Start
app.listen(port, function(err){
  if(err){
    log.error(err);
  }else{
    console.log(log.magenta("Listening on port "+port));
  }
});
