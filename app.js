var express               = require("express"),
    app                   = express(),
    bodyParser            = require('body-parser'),
    fileUpload            = require('express-fileupload'),
    Student               = require("./models/students"),
    User                  = require("./models/user"),
    bodyParser            = require("body-parser"),
    mongoose              = require("mongoose"),
    mongoXlsx             = require('mongo-xlsx'),
	passport              = require("passport"),
	LocalStrategy         = require("passport-local"),
	passportLocalMongoose = require("passport-local-mongoose");
	const session         = require('express-session');
	var MongoStore = require("connect-mongo")(session);


mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/myView");
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: "Rusty is the best and cutest dog in the world",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    cookie: { maxAge: 180 * 60 *1000 }
}));

app.use(express.static(__dirname + "/public"));
app.use(passport.initialize());
app.use(passport.session());
// default options
app.use(fileUpload());
var model = null;

//=====================================
//PASSPORT CONFIG FOR USER REGISTRATION
//=====================================
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//=====================================
//INITIAL SETUP DONE===================
//=====================================
app.get("/", function(req ,res){
    res.render("index");
});

app.get("/staff-home", function(req, res){
    res.render("staff-home");
});
app.post("/staff-home", function(req, res){

});
app.get("/teacher-reg", function(req, res){
    res.render("teacher-reg");
});
app.post("/teacher-reg", function(req, res, next){
    User.register(new User(
        {
            username: req.body.username
        }), req.body.password, function(err, user){

        if(err){
        	console.log("hi ");
            console.log(err);
            return res.render('teacher-reg');
        }
        passport.authenticate("local")(req, res, function(){
           res.redirect("/my-user-profile/"+req.user._id);
        });
    });
});


//==============================
//MAIN USER PROFILE PAGE DISPLAY
//==============================

app.get("/my-user-profile/:id", function(req, res){
    User.findById(req.params.id, function(err, foundUserMy){
        if(err){
                console.log(err);
            }else{
                console.log(foundUserMy);
                res.render("my-user-profile", {foundUser: foundUserMy});
            }
    });//user findbyid end
});

app.get("/staff-upload", function(req, res){
    res.render("staff-upload");
});

app.post("/staff-upload", function(req, res){
    if (!req.files)
    return res.status(400).send('No files were uploaded.');
    req.files.xlsxfile.mv('public/files/filename.xlsx', function(err) {
        if (err)
          return res.status(500).send(err);
     
        res.send('File uploaded!');
    });

    mongoXlsx.xlsx2MongoData('public/files/filename.xlsx', model, function(err, mongoData) {
    console.log('Mongo data:', mongoData[1]);
    var model = mongoXlsx.buildDynamicModel(mongoData);
    console.log(model);
    mongoData.forEach(function(entry) {
        console.log(entry);
        var stu = new Student(entry);
        stu.save(function(err, result){
        if(err){
            console.log(err);
        }else{}
    });//save ending
    });//for each ending
    
    });//mongoXlsx
    
});

//===============================
//VIEWING THE IDIVIDUAL USER MARK
//===============================
app.get("/user-roll-get",function(req, res){
    res.render("user-roll-get");
});

app.post("/user-roll-get", function(req, res){

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




app.listen(3300, function(){
    console.log("The Server Has Started");
});