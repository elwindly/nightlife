const mongoose = require("mongoose");

const commonRules ={
        type:String,
        required:true,
        trim:true,
        minlength:1    
}

var PlaceSchema = new mongoose.Schema({
    placeId:commonRules,
    city:commonRules,
    going:{type: Number, default:0},
    listOfUsers:[{userName: {
      type: String,
      required: true
    }}]
});



var Place = mongoose.model('Place', PlaceSchema);

module.exports = {Place};

