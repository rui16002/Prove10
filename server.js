var express = require('express');
var app = express();

const { Pool } = require("pg");
//const connectionString = process.env.DATABASE_URL || "postgres://rui16002:rui16002@localhost:5432/expensetracker";
const connectionString = process.env.DATABASE_URL || "postgres://efxluiqvrhrgzy:db9c539cdae3ed30fbadf4275becc73eb5fddaa2c182785ddaf9660403828ead@ec2-50-17-203-51.compute-1.amazonaws.com:5432/d514ujq56t7saq";
const pool = new Pool({connectionString: connectionString});

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

//Use POST method here
app.post('/AddMovement', addMovement);

//Use GET method here
app.get('/GetMovement', getMovement);
app.get('/GetAvg', getAvg);
app.get('/GetTotal', getTotal);

//Use PUT Method here
app.put('/ModifyMovement', modifyMovement);

//Use DELETE method here
app.delete('/DeleteMovement', deleteMovement);


app.listen(app.get('port'), function() {
	console.log('Node app is running on port', app.get('port'));
});

/* ----- addMovement-----------------------------------
Data from client: type, date, name, amount
Data returned: ExpenseID or null
-------------------------------------------------------*/
function addMovement(req, res) {
	var query = req.query;
	var type = query.type;
	var date = query.date;
	var name = query.name;
	var amount = query.amount;
	console.log("Adding movement: " + name);
	var sql = "INSERT INTO movements(typeID, name, movementDate, amount) VALUES ($1, $2, $3, $4)";
	var params = [type, name, date, amount];

	dbTransaction(sql, params, function(error, result) {
		if (error || result == null) {
			res.writeHead(500);
		} else {
			res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(result));
		}
	})
}
/* ----- getMovement----------------------------------- 
Data from client: Month, Type
Data returned: List of Expenses for the given type
-------------------------------------------------------*/
function getMovement(req, res) {
	var query = req.query;
	console.log(query);
	var d = new Date(2018, query.month, 0);
    var enddate = '2018/'+ query.month +'/' + d.getDate();
	var startdate = '2018/' + query.month + '/01';
	var type = query.type;
	console.log("getting movements of " + type + " from " + d.getMonth());

	var sql = "SELECT typeID, name, movementDate, amount FROM movements WHERE typeID = $1 AND movementDate BETWEEN $2 AND $3";
	var params = [type, startdate, enddate];

	dbTransaction(sql, params, function(error, result) {
		 if (error || result == null) {
		 	 res.status(500).json({success: false, data: error});
		  } else {
			 res.status(200).json(result);
		 }
	})
}
/* ----- getAvg----------------------------------------
Data from client: Type
Data returned: Avg expense on a given category
-------------------------------------------------------*/
function getAvg(req, res) {
	var type = req.query.type;
	console.log("Getting avg from type: " + type);

	var sql = "SELECT AVG(amount) FROM movements WHERE typeID = $1";
	var params = [type];

	dbTransaction(sql, params, function(error, result) {
		 if (error || result == null) {
		 	 res.status(500).json({success: false, data: error});
		  } else {
			 res.status(200).json(result);
		 }
	})
}
/* ----- getTotal--------------------------------------
Data from client: Type, Month
Data returned: Total expenses on a given category
-------------------------------------------------------*/
function getTotal(req, res) {
	var query = req.query;
	var d = new Date(2018, query.month, 0);
    var enddate = '2018/'+ query.month +'/' + d.getDate();
	var startdate = '2018/' + query.month + '/01';
	var type = query.type;
	var total = 100.6;
	console.log("getting total from type: "+ type);

	var sql = "SELECT SUM(amount) FROM movements WHERE typeID = $1 AND movementDate BETWEEN $2 AND $3";
	var params = [type, startdate, enddate];

	dbTransaction(sql, params, function(error, result) {
		 if (error || result == null) {
		 	 res.status(500).json({success: false, data: error});
		  } else {
			 res.status(200).json(result);
		 }
	})
}
/* ----- modifyMovement---------------------------------
Data from client: MovementID, type, name, amount
Data returned: true/false depending on successful modification
-------------------------------------------------------*/
function modifyMovement(req, res) {
	var query = req.query;
	var movementID = query.movementID;
	var type = query.type;
	var name = query.name;
	var date = query.date;
	var amount = query.amount;
	console.log("Modifying movement: "+ name);
	var sql = "UPDATE movements SET typeID = $1, name = $2, movementDate = $3, amount = $4 WHERE movementID = $5";
	var params = [type, name, date, amount, movementID];

	dbTransaction(sql, params, function(error, result) {
		 if (error || result == null) {
		 	 res.status(500).json({success: false, data: error});
		  } else {
			 res.status(200).json(result);
		 }
	})
	}
/* ----- deleteMovement--------------------------------
Data from client: MovementID
Data returned: true/false depending on successful deletion
-------------------------------------------------------*/
function deleteMovement(req, res) {
	var movementID = req.query.movementID;
	console.log("Deleting movement: " + movementID);
	var sql = "DELETE FROM movements WHERE movementID = $1";
	var params = [movementID];

	dbTransaction(sql, params, function(error, result) {
		 if (error || result == null) {
		 	 res.status(500).json({success: false, data: error});
		  } else {
			 res.status(200).json(result);
		 }
	})
	}

function dbTransaction(sql, params, callback) {
	pool.query(sql, params, function(err, result) {
		if (err) {
			console.log("Transaction failed: " + err);
			callback(err, null);
		}

		console.log("Transaction successful: " + JSON.stringify(result.rows));

		callback(null, result.rows);
	});

}