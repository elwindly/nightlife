const express = require('express');
const {ObjectID} = require("mongodb");
const Yelp = require('yelp');
const _ = require('lodash');
const {Place} = require('./../models/places');
const {yelpSearch} = require('./../middleware/helper');

function  SearchController() {

    this.showSearchPanel = ((req, res) => {
        res.render('index', {  title: 'NightLife'});
    });

    this.getSearchResults = ((req, res) => {
            let searchTerm = req.body.searchTerm.toLowerCase();
            let userName = req.session.name;
            yelpSearch(searchTerm, userName).then((data)=>{
            res.send(data);
        }).catch((e)=>{
            res.status(400).send();
        });
    });

    this.goingPlaces = ((req, res) => {

        if (!req.session.xAuth) {
        return res.send({shouldLogIn:true})
        }
        let placeId = req.body.placeId;
        let addOrDeduct = req.body.addOrDeduct;
        let city = req.body.city.toLowerCase();

        Place.findOne({placeId: placeId}).then((place)=>{
        if (place == null){
            let newPlace = new Place({
            placeId:placeId,
            city:city,
            going:1,
            listOfUsers:[{userName:req.session.name}]
            });
            newPlace.save().then(()=>{
            return res.status(200).send({going:0});
            }).catch((e)=>{
            return res.status(400).send();
            });
        }else {
            if (addOrDeduct == 1) {
            Place.findOneAndUpdate( {
                placeId: placeId
                }, {
                $inc: {"going":1}, 
                $push: {listOfUsers:{userName:req.session.name}},
                }, function(err, raw) {
                if (err) return res.status(400).send();
                res.status(200).send(raw);
                });
            } else {
                Place.findOneAndUpdate( {
                placeId: placeId
                }, {
                $inc: {"going":-1}, 
                $pull: {listOfUsers:{userName:req.session.name}},
                }, function(err, raw) {
                if (err) return res.status(400).send();
                res.status(200).send(raw);
                });
            }
        }
        }).catch((e)=>{
        return res.status(400).send();
        });
    });
}


module.exports = SearchController;