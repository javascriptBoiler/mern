var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var schema = new mongoose.Schema({
    name: { type: String},
	phoneNo: { type: String }
});

schema.plugin(mongoosePaginate);
mongoose.Promise = global.Promise;

schema.statics.getdata = function(data,callback){
    this.paginate({}, { page: data, limit: 10 }, function (err, result) {
        //console.log(data);
        if(err){
         return callback(err)   
        }
        return callback(result);
  });
}

module.exports = mongoose.model('Model',  schema);