var rows;

/************************************************
Callback for Add operation, once triggered it updates
table and bars
*************************************************/
function handleAdd(data, status){
	if (data.success) {
		getMovement(month,data.type);
		getAvg(data.type);
		getTotal(month, data.type);
	}
}

/************************************************
Callback for Modify operation, once triggered it updates
table and bars
*************************************************/
function handleModify(data, status){
	if (data.success) {
		getMovement(month,data.type);
		getAvg(data.type);
		getTotal(month, data.type);
	}
}

/************************************************
Callback for Remove operation, once triggered it updates
table and bars
*************************************************/
function handleDelete(data, status){
	if (data.success) {
		removeRowFromTable(data.movementID);
	    getAvg(data.type);
		getTotal(month, data.type);
	}
}

/************************************************
Callback for Get operation, once triggered it updates
table
*************************************************/
function handleGet(data, status){
	if (data.success) {
		rows = JSON.parse(JSON.stringify(data.data));
		updateTable(rows);
	}
}

/************************************************
Callback for Avg operation, once triggered it updates
a given avg bar
*************************************************/
function handleAvg(data, status){
	if (data.success) {
		var avg = data.avg;
		var type = data.type;
		updateBarAvg(type,avg);
	}
}

/************************************************
Callback for total operation, once triggered it updates
a given total bar
*************************************************/
function handleTotal(data, status){
	if (data.success) {
		var total = data.total;
		var type = data.type;
		updateBarTotal(type,total);
	}
}


/************************************************
Sort of a Controller, I still need to separate
more view from controller.
*************************************************/

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