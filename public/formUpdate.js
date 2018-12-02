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

function alterForm(tab){
	switch (tab){
		case 'add':prepareAdd();break;
		case 'mod':prepareMod();break;
		case 'del':prepareDel();break;
	}
}
