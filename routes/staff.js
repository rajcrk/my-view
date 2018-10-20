var express  = require("express");
var app = express();
var router   = express.Router(),
    passport = require("passport"),
    Student  = require("../models/students"),
    User     = require("../models/user");

app.use(passport.initialize());
router.get("/staff-home", function(req, res){
    res.render("staff-home");
});
router.post("/staff-home", passport.authenticate("local", {
    failureRedirect: "/staff-home"
}) ,function(req, res){
    console.log("ho");
    res.redirect("my-user-profile/"+req.user._id);
});

router.get("/teacher-reg", function(req, res){
    res.render("teacher-reg");
});
router.post("/teacher-reg", function(req, res, next){
    User.register(new User(
        {
            username: req.body.username
        }), req.body.password, function(err, user){

        if(err){
            console.log(err);
            return res.render('teacher-reg');
        }
        passport.authenticate("local")(req, res, function(){
           res.redirect("/my-user-profile/"+req.user._id);
        });
    });
});
//==========================
//ADDING BATCH TO PROFESSORS 
//==========================
router.post("/batch-add/:id", function(req, res){
    var array_batch = { "batch": req.body.batch, "subject": req.body.subject, "sem": req.body.sem};
    User.findById(req.params.id, function(err, foundUserMy){
        if(err){
                console.log(err);
            }else{
                // console.log(foundUserMy);
                foundUserMy.batch.push(array_batch);
                foundUserMy.save();
                res.redirect("/my-user-profile/"+req.user._id);
            }
    });//user findbyid end
});
//===============================
//CHANGING THE GRADE OF A STUDENT
//===============================
router.post("/staff-mark-view/student-grade-change", function(req, res){
    var name_tmp = req.body.changeSub; 
    var changeSem_tmp = req.body.changeSem;
    var myQuery = { 
        _id: req.body.changeId,
    };
    // var changeSem_tmp = req.body.changeSem;
    var changeGrade_tmp = req.body.changeGrade;
    var changeSetValue = changeSem_tmp+"."+name_tmp;
    console.log("--------");
    console.log(changeSetValue);
    var setVar = {};
    var name = changeSetValue;
    setVar[name] = changeGrade_tmp;
    console.log(setVar);

    var newvalues = { $set: setVar};
    console.log(newvalues);
    Student.updateOne(myQuery, newvalues, function(err, res){
        if(err) console.log(err);
        console.log("SEM Grade Maupulated Ha Ha Ha !. That`s evil laugh BTW ");
        console.log(res);
        
    });
    res.send("hi");
    //res.redirect("/my-user-profile/"+req.user._id);
});

router.get("/staff-upload", function(req, res){
    res.render("staff-upload");
});


module.exports = router;