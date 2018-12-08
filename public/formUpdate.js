var mov_ID = document.getElementById('m_ID');
var mov_type = document.getElementById('m_type');
var mov_name = document.getElementById('m_name');
var mov_date = document.getElementById('m_date');
var mov_amount = document.getElementById('m_amount');
var btn_add = document.getElementById('btn_add');
var btn_mod = document.getElementById('btn_mod');
var btn_del = document.getElementById('btn_del');

function prepareAdd(){
	mov_ID.disabled=true;
	mov_type.disabled=false;
	mov_name.disabled=false;
	mov_date.disabled=false;
	mov_amount.disabled=false;
	btn_add.style.display='block';
	btn_mod.style.display='none';
	btn_del.style.display='none';
}

function prepareMod(){
	mov_ID.disabled=false;
	mov_type.disabled=false;
	mov_name.disabled=false;
	mov_date.disabled=false;
	mov_amount.disabled=false;
	btn_add.style.display='none';
	btn_mod.style.display='block';
	btn_del.style.display='none';
}

function prepareDel(){
	mov_ID.disabled=false;
	mov_type.disabled=true;
	mov_name.disabled=true;
	mov_date.disabled=true;
	mov_amount.disabled=true;
	btn_add.style.display='none';
	btn_mod.style.display='none';
	btn_del.style.display='block';
}

/************************************************
This function controls which buttons and fields 
are available for a given operation
*************************************************/
function alterForm(tab){
	switch (tab){
		case 'add':prepareAdd();break;
		case 'mod':prepareMod();break;
		case 'del':prepareDel();break;
	}
}

function rowExist(row){
	var container = document.getElementById("table_rows");
	var tablerow = container.getElementsByClassName('movrow');
	var ids = container.getElementsByClassName('idcol');
	if (!tablerow) {
		return false;
	}
	else if (!ids) {
		return false;
	}
	else
	{
		for (var i = 0; i < ids.length; i++) {
			var tableId = parseInt(ids[i].innerHTML);
			var dataID = parseInt(row.movementid);
			if (tableId == dataID) {
				return i;
			}
		}
	}
}

function removeRowFromTable(id){
	var container = document.getElementById("table_rows");
	var tablerow = container.getElementsByClassName('movrow');
	var ids = container.getElementsByClassName('idcol');
	for (var i = ids.length - 1; i >= 0; i--) {	
		var tableId = parseInt(ids[i].innerHTML);
		if (tableId==id) {container.removeChild(tablerow[i]);}
	}
}

/************************************************
This function adds new values to the table or modify existing
*************************************************/
function updateTable(data){
	var container = document.getElementById("table_rows");
	var tablerow = container.getElementsByClassName('movrow');

	if (data && data.length > 0){
		for (var i = data.length - 1; i >= 0; i--) {
			if (!rowExist(data[i])) {
				container.appendChild(addNewRow(data[i]));
			}
			else
			{
				container.replaceChild(addNewRow(data[i]),tablerow[rowExist(data[i])]);
			}
		}
	}
}

/************************************************
This function redimention total bar and assign
value to it
*************************************************/
function updateBarTotal(name,total){
	var barAmount = document.getElementById('cat-bar-total-'+name);
	barAmount.style.width = barScale(total)+"%";
	var barAmountTxt = document.createTextNode(total+"€");
	var barAmountspan = document.getElementById('cat-bar-amount-'+name);
	barAmountspan.innerHTML = '';
	barAmountspan.appendChild(barAmountTxt);
}

/************************************************
This function redimention avg bar and assign
value to it
*************************************************/
function updateBarAvg(name,avg){
	var barBenchmark = document.getElementById('cat-bar-benchmark-'+name);
	barBenchmark.style.width = barScale(avg)+"%";
	var barBenchmarkTxt = document.createTextNode(avg+"€");
	var barBenchmarkspan = document.getElementById('cat-bar-avg-'+name);
	barBenchmarkspan.innerHTML = '';
	barBenchmarkspan.appendChild(barBenchmarkTxt);
}
