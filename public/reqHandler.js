var rows;

function handleAdd(data, status){
	if (data.success) {
		console.log("Movement added.");
		alert("Movement added.");
		getMovement(month,data.type);
		getAvg(data.type);
		getTotal(month, data.type);
	}
}

function handleModify(data, status){
	if (data.success) {
		console.log("Movement modified.");
		alert("Movement modified.");
		getMovement(month,data.type);
		getAvg(data.type);
		getTotal(month, data.type);
	}
}

function handleDelete(data, status){
	if (data.success) {
		console.log("Movement deleted.");
		alert("Movement deleted.");
		//Do a Select before to see what type is it. and return it in the response.
		//getMovement(month,data.type);
		//getAvg(data.type);
		//getTotal(month, data.type);
	}
}

function handleGet(data, status){
	if (data.success) {
		console.log(JSON.stringify(data.data));
		rows = JSON.parse(JSON.stringify(data.data));
		updateTable(rows);
	}
}

function handleAvg(data, status){
	if (data.success) {
		var avg = data.avg;
		var type = data.type;
		console.log("updating avg of type: " + type + ":"+types[type]);
		updateBarAvg(type,avg);
	}
}

function handleTotal(data, status){
	if (data.success) {
		var total = data.total;
		var type = data.type;
		console.log("updating total of type: " + type + ":"+types[type]);
		updateBarTotal(type,total);
	}
}

//Use POST method here
function addMovement(){
	$.post("https://desolate-reaches-83720.herokuapp.com/addMovement", 
		{type: m_type.value, date: m_date.value, name: m_name.value, amount: m_amount.value}, handleAdd);
}

//Use GET method here
function getMovement(month, type){
	$.get("https://desolate-reaches-83720.herokuapp.com/getMovement", {month:month, type:type}, handleGet);
}

function getAvg(type){
	$.get("https://desolate-reaches-83720.herokuapp.com/getAvg", {type:type}, handleAvg);
}

function getTotal(month, type){
	$.get("https://desolate-reaches-83720.herokuapp.com/getTotal", {month:month, type:type}, handleTotal);

}

//Use PUT Method here
function modifyMovement(){
	var data={movementID:m_ID.value, type:m_type.value, name:m_name.value, amount:m_amount.value, date:m_date.value};
	$.ajax({
		url: "https://desolate-reaches-83720.herokuapp.com/modifyMovement"+"?"+$.param( data ),
		type: 'PUT',
		success: handleModify
	});
}

//Use DELETE method here
function deleteMovement(){
	var data={movementID:m_ID.value};
	$.ajax({
		url: "https://desolate-reaches-83720.herokuapp.com/DeleteMovement"+"?"+$.param( data ),
		type: 'DELETE',
		success: handleDelete
	});

}