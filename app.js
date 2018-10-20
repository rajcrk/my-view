var express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  fileUpload = require("express-fileupload"),
  Student = require("./models/students"),
  User = require("./models/user"),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  mongoXlsx = require("mongo-xlsx"),
  passport = require("passport"),
  LocalStrategy = require("passport-local"),
  passportLocalMongoose = require("passport-local-mongoose");
var staffRoutes = require("./routes/staff");
var studentRoutes = require("./routes/student");
var indexRoutes = require("./routes/index");
const session = require("express-session");
var MongoStore = require("connect-mongo")(session);

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/myView");
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: "Rusty is the best and cutest dog in the world",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    cookie: { maxAge: 180 * 60 * 1000 }
  })
);

app.use(express.static(__dirname + "/public"));
app.use(passport.initialize());
app.use(passport.session());

//  Routes app.use
app.use(indexRoutes);
app.use(staffRoutes);
app.use(studentRoutes);


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

app.get("/staff-mark-view/:batch/:subject/:sem", function(req, res) {
  var sem_var = req.params.sem;
  if (sem_var == "SEM1") {
    var query = Student.find({ BATCH: req.params.batch }).select(
      "SEM1 REGNO NAME BATCH"
    );
    query.exec(function(err, someValue) {
      if (err) console.log(err);
      console.log(someValue);
      var subject = req.params.subject;
      console.log("--->");
      someValue.subject = subject;
      console.log(someValue.subject);
      res.render("students-edit-view", { foundStudent: someValue });
    });
  } else if (sem_var == "SEM2") {
    var query = Student.find({ BATCH: req.params.batch }).select(
      "SEM2 REGNO NAME BATCH"
    );
    query.exec(function(err, someValue) {
      if (err) console.log(err);
      console.log(someValue);
      var subject = req.params.subject;
      console.log("--->");
      someValue.subject = subject;
      console.log(someValue.subject);
      res.render("students-edit-view-2s", { foundStudent: someValue });
    });
  } else if (sem_var == "SEM3") {
    var query = Student.find({ BATCH: req.params.batch }).select(
      "SEM3 REGNO NAME BATCH"
    );
    query.exec(function(err, someValue) {
      if (err) console.log(err);
      console.log(someValue);
      var subject = req.params.subject;
      console.log("--->");
      someValue.subject = subject;
      console.log(someValue.subject);
      res.render("students-edit-view-3s", { foundStudent: someValue });
    });
  } else if (sem_var == "SEM4") {
    var query = Student.find({ BATCH: req.params.batch }).select(
      "SEM4 REGNO NAME BATCH"
    );
    query.exec(function(err, someValue) {
      if (err) console.log(err);
      console.log(someValue);
      var subject = req.params.subject;
      console.log("--->");
      someValue.subject = subject;
      console.log(someValue.subject);
      res.render("students-edit-view-4s", { foundStudent: someValue });
    });
  } else if (sem_var == "SEM5") {
    var query = Student.find({ BATCH: req.params.batch }).select(
      "SEM5 REGNO NAME BATCH"
    );
    query.exec(function(err, someValue) {
      if (err) console.log(err);
      console.log(someValue);
      var subject = req.params.subject;
      console.log("--->");
      someValue.subject = subject;
      console.log(someValue.subject);
      res.render("students-edit-view-5s", { foundStudent: someValue });
    });
  } else if (sem_var == "SEM6") {
    var query = Student.find({ BATCH: req.params.batch }).select(
      "SEM6 REGNO NAME BATCH"
    );
    query.exec(function(err, someValue) {
      if (err) console.log(err);
      console.log(someValue);
      var subject = req.params.subject;
      console.log("--->");
      someValue.subject = subject;
      console.log(someValue.subject);
      res.render("students-edit-view-6s", { foundStudent: someValue });
    });
  } else if (sem_var == "SEM7") {
    var query = Student.find({ BATCH: req.params.batch }).select(
      "SEM7 REGNO NAME BATCH"
    );
    query.exec(function(err, someValue) {
      if (err) console.log(err);
      console.log(someValue);
      var subject = req.params.subject;
      console.log("--->");
      someValue.subject = subject;
      console.log(someValue.subject);
      res.render("students-edit-view-7s", { foundStudent: someValue });
    });
  } else if (sem_var == "SEM8") {
    var query = Student.find({ BATCH: req.params.batch }).select(
      "SEM8 REGNO NAME BATCH"
    );
    query.exec(function(err, someValue) {
      if (err) console.log(err);
      console.log(someValue);
      var subject = req.params.subject;
      console.log("--->");
      someValue.subject = subject;
      console.log(someValue.subject);
      res.render("students-edit-view-8s", { foundStudent: someValue });
    });
  }
});

//=======================
//FINISHED DATABASE ENTRY
//=======================

app.post("/staff-upload", function(req, res) {
  if (!req.files) return res.status(400).send("No files were uploaded.");
  req.files.xlsxfile.mv("public/files/filename.xlsx", function(err) {
    if (err) return res.status(500).send(err);

    res.send("File uploaded!");
  });

  mongoXlsx.xlsx2MongoData("public/files/filename.xlsx", model, function(
    err,
    mongoData
  ) {
    console.log("Mongo data:", mongoData[1]);
    var model = mongoXlsx.buildDynamicModel(mongoData);
    console.log(model);
    mongoData.forEach(function(entry) {
      console.log(entry);
      var stu = new Student(entry);
      stu.save(function(err, result) {
        if (err) {
          console.log(err);
        } else {
        }
      }); //save ending
    }); //for each ending
  }); //mongoXlsx
});

//========================//
// Development Port Number//
// //========================//
app.listen(3300, function() {
  console.log("The Server Has Started at 3300");
});

//========================//
// Production Port Number//
//========================//
// app.listen(process.env.PORT, process.env.IP, function(){
//     console.log("The Server Has Started");
// });
