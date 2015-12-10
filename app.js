var express = require("express");
var app = express();
var path = require("path");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var morgan = require("morgan");

app.use(express.static(path.join(__dirname, "/public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(morgan("dev"));
// create routes
app.get("/", function(req, res){
  res.render("index.html");
});

app.use("/workouts", require("./controllers/workouts"));
app.use("/exercises", require("./controllers/exercises"));

app.listen(3000, function(){
  console.log("Listening on port 3000");
});
