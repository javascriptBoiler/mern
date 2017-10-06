var express = require('express');
var bodyparser = require('body-parser');
var ejs = require('ejs');
var morgan = require('morgan');
var app = new express();

app.use(express.static(__dirname+'/app'));

app.get('/',function(req,res){
	res.sendFile(__dirname+'/app/index.html')
}).listen(3000,function(){
	console.log('server is runing on loclahost port 3000')
});


//...................start..........

app.use(bodyparser.urlencoded({extended: true})); 
app.use(bodyparser.json());
app.use(morgan('dev'));

app.set('view engine', 'html');
app.engine('html', ejs.renderFile);


var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/page',function(err){
	if(err){
		console.log(err);
	}else{
		console.log('we are connect to the db')
	}
})

var Model = require('./module');

app.get('/pagi', function (req, res) {
  Model.getdata(1,function(data){
	console.log(data);
	res.send(data);
  });
})

app.post('/page', function (req, res) {
  var model = new Model({
			name: req.body.names,
			phoneNo: req.body.number
});

		model.save(function (err) {
			if (err) {
				
					res.send(err);
			}
			res.json({ message: 'new user has been created' });
		});
})



app.get('/home', function (req, res) {
  Model.getdata(1,function(data){
    var namelist = data.docs;
   res.render(__dirname + '/view/main',{namelist: namelist})
  });
  
})
//...................end............



