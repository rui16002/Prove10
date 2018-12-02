	function barScale(amount){
	return (5 + (amount * 100)/2000);
}

		var types = ["Income", "Donations", "Education", "Transportation", "Loans", "Credit cards", "Health", "Home" ];

function addNewBar(title) {
	var bar = document.createElement("div");
	bar.setAttribute("class", "cat-bar-item");

	var barTitle = document.createElement("div");
	barTitle.setAttribute("class", "cat_title");
	var barTitleTxt = document.createTextNode(types[title]);
	barTitle.appendChild(barTitleTxt)

	var barAmountContainer = document.createElement("div");
	barAmountContainer.setAttribute("class", "cat-bar-total text-right");
	barAmountContainer.setAttribute("id", "cat-bar-total-"+title);

	var barAmount = document.createElement("span");
	barAmount.setAttribute("class", "cat-bar-amount");	
	barAmount.setAttribute("id", "cat-bar-amount-"+title);
	barAmountContainer.appendChild(barAmount);

	var barBenchmarkContainer = document.createElement("div");
	barBenchmarkContainer.setAttribute("class", "cat-bar-benchmark text-right");
	barBenchmarkContainer.setAttribute("id", "cat-bar-benchmark-"+title);

	var barBenchmark = document.createElement("span");
	barBenchmark.setAttribute("class", "cat-bar-avg");
	barBenchmark.setAttribute("id", "cat-bar-avg-"+title);
	barBenchmarkContainer.appendChild(barBenchmark);

	bar.appendChild(barTitle);
	bar.appendChild(barAmountContainer);
	bar.appendChild(barBenchmarkContainer);
	return bar;
}

function addNewRow(row){
	var newRow = document.createElement('tr');
	var rowid = document.createElement('td');
	var rowidtxt = document.createTextNode(row.movementid);
	rowid.appendChild(rowidtxt);
	newRow.appendChild(rowid);

	var rowdate = document.createElement('td');
	var rowdatetxt = document.createTextNode(row.movementdate);
	rowdate.appendChild(rowdatetxt);
	newRow.appendChild(rowdate);

	var rowtype = document.createElement('td');
	var typeIcon = document.createElement('span');
	typeIcon.setAttribute("class", "glyphicon glyphicon-search");
	rowtype.appendChild(typeIcon);
	var rowtypetxt = document.createTextNode(row.typeid);
	rowtype.appendChild(rowtypetxt);
	newRow.appendChild(rowtype);

	var rowname = document.createElement('td');
	var rownametxt = document.createTextNode(row.name);
	rowname.appendChild(rownametxt);
	newRow.appendChild(rowname);

	var rowamount = document.createElement('td');
	rowamount.setAttribute("class", "text-right")
	var rowamounttxt = document.createTextNode(row.amount+" €");
	rowamount.appendChild(rowamounttxt);
	newRow.appendChild(rowamount);
	return newRow;
}