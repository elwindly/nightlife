require('./../config/config');
const {mongoose} = require("./../db/mongoose");
const {Place} = require("./../models/places");

const fs = require("fs");

const Yelp = require('yelp');
 
const yelp = new Yelp({
  consumer_key: process.env.cons_key,
  consumer_secret: process.env.cons_secret,
  token: process.env.token,
  token_secret: process.env.token_secret,
});

// const place = new Place({
//   placeId: "Exploratorium After Dark",
//   city:"san francisko"
// });

// const place2 = new Place({
//   placeId: "exploratorium-after-dark-san-francisco-2",
//   city:"san francisko"
// });

// const place3 = new Place({
//   placeId: "exploratorium-after-dark-san-francisco-2",
//   city:"something"
// });

// place.save().then(()=>{
//   console.log("Ok");
// }).catch((e)=>{
//   console.log(e);
// });
// place2.save().then(()=>{
//   console.log("Ok");
// }).catch((e)=>{
//   console.log(e);
// });
// place3.save().then(()=>{
//   console.log("Ok");
// }).catch((e)=>{
//   console.log(e);
// });
 
// let operations = { "op1":"$push"}
  // Place.findOneAndUpdate( {
  //       placeId: "exploratorium-after-dark-san-francisco-2"
  //     }, {
  //       $inc: {"going":1}, 
  //       $push: {listOfUsers:{userName:"testerzz"}},
  //     }, function(err, raw) {
  //       if (err) console.log(err);
  //       console.log(raw);
  //     });
  // Place.findOneAndUpdate( {
  //       placeId: "exploratorium-after-dark-san-francisco-2"
  //     }, {
  //       $inc: {"going":-1}, 
  //       $pull: {listOfUsers:{userName:"testerawefef"}},
  //     }, function(err, raw) {
  //       if (err) console.log(err);
  //       console.log(raw.going);
  //     });

Place.findOne({placeId: "exploratorium-after-dark-san-francisco-2"}).then((place)=>{
  place.update({   
         $inc: {"going":-1}, 
         $pull: {listOfUsers:{userName:"Theodor"}},
  });
  place.save();
  console.log(place);

}).catch((e)=>{
  console.log(e);
});




//See http://www.yelp.com/developers/documentation/v2/search_api 
// yelp.search({ term: 'nightlife', location: 'san francisko', limit:4 })
// .then(function (data) {
//    let arr = data.businesses;
//    let placeList = [];
   
//    //fs.writeFileSync('notes.json',JSON.stringify(arr));

//     Place.find({city:'san francisko'}).then((found)=>{
//       let dataBaseIds = found.map((elem)=>{
//         return elem.placeId;
//       });
//       console.log(dataBaseIds);
//        return arr.map((place, index)=>{
//         let placeAttr = {};
//         if(dataBaseIds.indexOf(place.id) == -1){
//           placeAttr.going = 0;
//         }else{
//           placeAttr.going = found[index].going;
//           placeAttr.listOfUsers = found[index].listOfUsers;
//         }
//           placeAttr.id = place.id;
//           placeAttr.rating_img_url = place.rating_img_url;
//           placeAttr.url = place.url;
//           placeAttr.display_address = place.display_address;
//           placeAttr.snippet_text = place.snippet_text;
//          return placeAttr;
//        });
//   }).then((data)=>{
//           console.log(JSON.stringify(data,"",2));
//        });  
// });
  //console.log(JSON.stringify(placeList,"",2));




 