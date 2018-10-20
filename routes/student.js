var express = require("express");
var router  = express.Router(),
    Student = require("../models/students"),
    User    = require("../models/user");

//==============================
//MAIN USER PROFILE PAGE DISPLAY
//==============================
router.get("/my-user-profile/:id", function(req, res){
    User.findById(req.params.id, function(err, foundUserMy){
        if(err){
                console.log(err);
            }else{
                console.log(foundUserMy);
                res.render("my-user-profile", {foundUser: foundUserMy});
            }
    });//user findbyid end
});

//===============================
//VIEWING THE IDIVIDUAL USER MARK
//===============================
router.get("/user-roll-get",function(req, res){
    res.render("user-roll-get");
});
router.post("/user-roll-get", function(req, res){

    Student.find({'REGNO': req.body.regno}, function(err, lancer){
        if(err){
            console.log(err);
        }else {
            console.log(lancer);
            console.log(req.body.regno);
            res.render("student-info",{info: lancer});
        }
    });

});

module.exports = router;