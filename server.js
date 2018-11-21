var express = require('express');
var app = express();

const { Pool } = require("pg");
const connectionString = process.env.DATABASE_URL || "postgres://steven:password@localhost:5432/familyhistory";
const pool = new Pool({connectionString: connectionString});

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/getPerson', getPerson);
app.get('/getParents', getParents);
app.get('/getChildren', getChildren);

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

function getPerson(req, res) {
	var id = req.query.id;

	 getPersonFromDb(id, function(error, result) {
		if (error || result == null || result.length != 1) {
			 res.status(500).json({success: false, data: error});
		 } else {
			 var person = result[0];
			 res.status(200).json(result[0]);
		}
	 });
}
function getPersonFromDb(id, callback) {
	console.log("Getting person from DB with id: " + id);

		var sql = "SELECT id, first, last, birthdate FROM person WHERE id = $1::int";
	var params = [id];

	pool.query(sql, params, function(err, result) {
		if (err) {
			console.log("Error in query: ")
			console.log(err);
			callback(err, null);
		}

		console.log("Found result: " + JSON.stringify(result.rows));

		callback(null, result.rows);
	});

} 


function getParents(req, res) {
	var id = req.query.id;

	 getParentsFromDb(id, function(error, result) {
		if (error || result == null || result.length === 0) {
			 res.status(500).json({success: false, data: error});
		 } else {
			 res.status(200).json(result);
		}
	 });
}
function getParentsFromDb(id, callback) {
	console.log("Getting person from DB with id: " + id);

		var sql = "SELECT person.first AS firstname, person.last AS lastname FROM relationship INNER JOIN person ON other_person_id = person.id WHERE person_id = $1::int AND relationship_type = 0";
	var params = [id];

	pool.query(sql, params, function(err, result) {
		if (err) {
			console.log("Error in query: ")
			console.log(err);
			callback(err, null);
		}

		console.log("Found result: " + JSON.stringify(result.rows));

		callback(null, result.rows);
	});

} 


function getChildren(req, res) {
	var id = req.query.id;

	 getChildrenFromDb(id, function(error, result) {
		if (error || result == null || result.length === 0) {
			 res.status(500).json({success: false, data: error});
		 } else {
			 res.status(200).json(result);
		}
	 });
}
function getChildrenFromDb(id, callback) {
	console.log("Getting person from DB with id: " + id);

		var sql = "SELECT person.first AS firstname, person.last AS lastname FROM relationship INNER JOIN person ON other_person_id = person.id WHERE person_id = $1::int AND relationship_type = 1";
	var params = [id];

	pool.query(sql, params, function(err, result) {
		if (err) {
			console.log("Error in query: ")
			console.log(err);
			callback(err, null);
		}

		console.log("Found result: " + JSON.stringify(result.rows));

		callback(null, result.rows);
	});

} 