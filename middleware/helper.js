
require('./../config/config');

const Yelp = require('yelp');
const _ = require('lodash');
const {Place} = require('./../models/places');


const yelp = new Yelp({
  consumer_key: process.env.CONS_KEY,
  consumer_secret: process.env.CONS_SECRET,
  token: process.env.TOKEN,
  token_secret: process.env.TOKEN_SECRET,
});

let yelpSearch = (location, userToTest) =>{
    return yelp.search({ term: 'nightlife', location: location, limit:4 })
    .then(function (data) {
      let arr = data.businesses;
        return Place.find({city:location}).then((found)=>{
          let dataBaseIds = found.map((elem)=>{
            return elem.placeId;
          });
          return arr.map((place)=>{
            let placeAttr = {};

            let index = dataBaseIds.indexOf(place.id);
            placeAttr.listOfUsers = [];

            if(dataBaseIds.indexOf(place.id) == -1){
              placeAttr.going = 0;
            }else{
              placeAttr.going = found[index].going;
              placeAttr.listOfUsers = found[index].listOfUsers.map((user)=>{
                if(user.userName != userToTest){
                  return user.userName;
                }
                
              });             
            }
              placeAttr.isGoing = placeAttr.listOfUsers.indexOf(userToTest);
              placeAttr.id = place.id;
              placeAttr.name = place.name;
              placeAttr.rating_img_url = place.rating_img_url;
              placeAttr.url = place.url;
              placeAttr.image_url = place.image_url;
              placeAttr.display_address = place.location.display_address;
              placeAttr.snippet_text = place.snippet_text;
              return placeAttr;
          });
      }).then((data)=>{
              return data;
      }).catch((e)=>{
        console.log(e);       
      });
    }).catch((e)=>{
      console.log(e);        
    });
}


module.exports ={yelpSearch};