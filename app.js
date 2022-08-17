const express = require("express");
const app = express();
const bodyParser = require("body-parser");
var xlsx = require("xlsx");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

//Set Up Master List

var wb = xlsx.readFile("master_list_new.xlsx");

var ws = wb.Sheets["Master_1"];

var master_json = xlsx.utils.sheet_to_json(ws);// This used to be var master

//swing, pop, latin, rock, ballad, waltz

//...................Variables......................................
var setlist = [];
var swings = master_json.filter(tune => tune.Genre === "Swing");
var pops = master_json.filter(tune => tune.Genre === "Pop");
var latins = master_json.filter(tune => tune.Genre === "Latin");
var rocks = master_json.filter(tune => tune.Genre === "Rock");
var ballads = master_json.filter(tune => tune.Genre === "Ballad");
var waltzs = master_json.filter(tune => tune.Genre === "Waltz");
var r;
var temparr = [];

//..........................................................................
//This function works: outputs false if object exists in list and true if object does not exist 
function containsObject(obj, list) {
  var i;
  for (i = 0; i < list.length; i++) {
		console.log(list[i]);
    if (list[i] === obj) {
			// console.log("object exists within list");
      return false;
    }
  }
	// console.log("object does not exist within list");
  return true;
}

//...................SWING FUNC.....................................
function swing_func(){
	r = Math.floor(Math.random() * swings.length);
	while(temparr.length === 0){
		if(containsObject(swings[r], temparr) === true){
			temparr = swings.splice(r, 1);
		} else {
			r = Math.floor(Math.random() * swings.length);
		}
	}
	setlist.push(temparr.splice(0, 1));
}

//...................POP FUNC.....................................
function pop_func(){
	r = Math.floor(Math.random() * pops.length);
	while(temparr.length === 0){
		if(containsObject(pops[r], temparr) === true){
			temparr = pops.splice(r, 1);
		} else {
			r = Math.floor(Math.random() * pops.length);
		}
	}
	setlist.push(temparr.splice(0, 1));
}

//...................LATIN FUNC.....................................
function latin_func(){
	r = Math.floor(Math.random() * latins.length);
	while(temparr.length === 0){
		if(containsObject(latins[r], temparr) === true){
			temparr = latins.splice(r, 1);
		} else {
			r = Math.floor(Math.random() * latins.length);
		}
	}
	setlist.push(temparr.splice(0, 1));
}

//...................ROCK FUNC.....................................
function rock_func(){
	r = Math.floor(Math.random() * rocks.length);
	while(temparr.length === 0){
		if(containsObject(rocks[r], temparr) === true){
			temparr = rocks.splice(r, 1);
		} else {
			r = Math.floor(Math.random() * rocks.length);
		}
	}
	setlist.push(temparr.splice(0, 1));
}

//...................BALLAD FUNC.....................................
function ballad_func(){
	r = Math.floor(Math.random() * ballads.length);
	while(temparr.length === 0){
		if(containsObject(ballads[r], temparr) === true){
			temparr = ballads.splice(r, 1);
		} else {
			r = Math.floor(Math.random() * ballads.length);
		}
	}
	setlist.push(temparr.splice(0, 1));
}

//...................WALTZ FUNC.....................................
function waltz_func(){
	r = Math.floor(Math.random() * waltzs.length);
	while(temparr.length === 0){
		if(containsObject(waltzs[r], temparr) === true){
			temparr = waltzs.splice(r, 1);
		} else {
			r = Math.floor(Math.random() * waltzs.length);
		}
	}
	setlist.push(temparr.splice(0, 1));
}

//...................make_setlist FUNC..............................
function make_setlist(){
	while (setlist.length < 30) {
		swing_func();
		pop_func();
		latin_func();
		rock_func();
		ballad_func();
		waltz_func();
	}
}

//...........................call functions.....................................
make_setlist();
// swing_func();
console.log(setlist);
// console.log(typeof setlist);
// console.log(typeof master_json);
// console.log(master_json);

console.log(setlist[0][0].Number);
console.log(setlist[0][0][1]); //not working
// console.log(setlist[0][0].Number + " " + setlist[0][0].Name + " --- " + setlist[0][0].Genre);
// console.log(setlist[0][1].Number + " " + setlist[0][1].Name + " --- " + setlist[0][1].Genre);
// console.log(setlist[0][2].Number + " " + setlist[0][2].Name + " --- " + setlist[0][2].Genre);
// console.log(setlist[0][3].Number + " " + setlist[0][3].Name + " --- " + setlist[0][3].Genre);

// for (var i = 0; i < 30; i++) {
// 	console.log(setlist[i][0].Title);

// }


app.get("/", function(req, res){
	res.render("home");
});

app.listen(8000, function() { 
  console.log('Jazz setlist App has started and Server listening on port 8000'); 
});

// console.log(master);

//........Make New workbook.......

var newWB = xlsx.utils.book_new();
var newWS = xlsx.utils.aoa_to_sheet(setlist);

xlsx.utils.book_append_sheet(newWB, newWS, "Remy");

xlsx.writeFile(newWB, "new_setlist.xlsx");




//new idea

//go through master and add tune to setlist
	//

