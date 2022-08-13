//check if browsers supports input date - check if works for week
function checkInput(type) {
    var input = document.createElement("input");
    input.setAttribute("type", type);
    return input.type == type;
}




function loading() {
	var eqs = ["Molino SAG 60x30", "Molino SAG 2", "Molino de bolas X"];
	var eqs_count = eqs.length;
	var camp=["C21-A", " - "];
	var ton=["1.3 MTon", " - "];
	var last=["21-02-2021", " - "];	
	for (i = 0; i < eqs_count; i++) {
	  var temp = document.createElement('div');
	  temp.className = 'eq';
	  temp.innerHTML = '<div class="eq_img"><img src="eq_icon.png" /></div>'+
	  '<div class="eq_name">'+eqs[i]+'</div>'+
	  '<div class="eq_info"><h3>Campaña en curso</h3>'+camp[i]+'</div>' +
	  '<div class="eq_info"><h3>Tonelaje procesado</h3>'+ton[i]+'</div>' +
	  '<div class="eq_info"><h3>Última actualización</h3>'+last[i]+'</div>';
	  document.getElementsByClassName('eq_div')[0].appendChild(temp);
	}
	
	if (eqs_count>0){  
	    for(i in eqs){
			var select = document.getElementById("eqs");
			select.options[select.options.length] = new Option(eqs[i]);
		}
    }
}

function selectEq () {
	var eq = document.getElementById("eqs").value;
	google.script.run.withSuccessHandler(updateEq).getEq();

}

function updateEq (eq1,eq2,eq3,camp) {
	document.getElementById("eq_info_1").innerText = eq1;
	document.getElementById("eq_info_2").innerText = eq2;
	document.getElementById("eq_info_3").innerText = eq3;
	document.getElementById("camp").innerText = camp;
}

function selectCamp () {
	var camp = document.getElementById("camp").value;
	google.script.run.withSuccessHandler(updateCamp).getCamp();
}

function updateCamp (camp1,camp2,camp3, ton1, ton2, ton3, ton4) {
	document.getElementById("camp_info_1").innerText = camp1;
	document.getElementById("camp_info_2").innerText = camp2;
	document.getElementById("camp_info_3").innerText = camp3;
	document.getElementById("camp_info_3").innerText = camp3;
	document.getElementById("ton_info_1").innerText = ton1;
	document.getElementById("ton_info_2").innerText = ton2;
	document.getElementById("ton_info_3").innerText = ton3;
	document.getElementById("ton_info_4").innerText = ton4;
	if (ton1=="-") {
		document.getElementById("compo").innerText = "";
	} else {
		selectPart();
	}
}

function selectCompo () {
	var compo = document.getElementById("compo").value;
	google.script.run.withSuccessHandler(updatePartList).getPartList();
}

function updatePartList ([parts]) {
	for(i in parts){
		var select = document.getElementById("part");
		select.options[select.options.length] = new Option(parts[i]);
	}
}

function selectPart () {
	var part = document.getElementById("part").value;
	google.script.run.withSuccessHandler(updatePart).getPart();
	selectMeds(part);
}

function updatePart (part1,part2) {
	document.getElementById("part_info_1").innerText = part1;
	document.getElementById("part_info_2").innerText = part2;
}

function selectMeds (part) {
	google.script.run.withSuccessHandler(updatePart).getPart();
}

function selectTasaDesg () {
	var part = document.getElementById("part").value;	
	google.script.run.withSuccessHandler(calcTasaDesg).getTasaDesg(part);
}

function calcTasaDesg (desg1, desg2, ton) {
	var xton = document.getElementById("xton").innerText;	
	var tasa1 = (desg1/ton)*xton/1000000;
	var tasa2 = (desg2/ton)*xton/1000000;	
	document.getElementById("desg_lifter").innerText = tasa1;	
	document.getElementById("desg_placa").innerText = tasa2;	
}

function showForecast (desg,ton) {
	const crit1=150;
	const desg1 = 200;
	var tasa1 = document.getElementById("desg_lifter").innerText;	
	var tasa2 = document.getElementById("desg_placa").innerText;
	var remain_tons1 = (desg1-crit1)/tasa1;
	var remain_tons2 = (desg2-crit2)/tasa2;	
	var rate = document.getElementById("ton_info_4").innerText;
	var remain_days1 = remain_tons1/rate;
	var remain_days2 = remain_tons2/rate;
	var last_date = document.getElementById("ton_info_2").innerText;
	var replace_date1 = last_date + remain_days1;
	var replace_date2 = last_date + remain_days2;
	var initCamp_date = document.getElementById("camp_info_2").innerText;
	var total_days1 = replace_date1 - initCamp_date;
	var total_days2 = replace_date2 - initCamp_date;	
	var tons = document.getElementById("ton_info_1").innerText;
	var total_tons1 = tons + remain_tons1;
	var total_tons2 = tons + remain_tons2;	
	
	document.getElementById("remain_tons_lifter").innerText = remain_tons1;
	document.getElementById("remain_tons_placa").innerText = remain_tons2;
	document.getElementById("remain_days_lifter").innerText = remain_days1;
	document.getElementById("remain_days_placa").innerText = remain_days2;
	document.getElementById("replace_date_lifter").innerText = replace_date1;
	document.getElementById("replace_date_placa").innerText = replace_date2;
	document.getElementById("total_days_lifter").innerText = total_days1;
	document.getElementById("total_days_placa").innerText = total_days2;
	document.getElementById("total_tons_lifer").innerText = total_tons1;
	document.getElementById("total_tons_placa").innerText = total_tons2;	
}
