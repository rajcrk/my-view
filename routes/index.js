var express = require("express");
var router = express.Router();

router.get("/", function(req ,res){
    res.render("index");
});
//================================
//Help Line Page Get Request 
//Thats why its at the end ! 
//================================
router.get("/help-line", function(req, res){
    res.render("help-line");
});

module.exports = router;