function getDisease() {
	var symptoms = new Array();
	var multiSelect = document.getElementById("symptoms");
	for (var i = 0; i < multiSelect.selectedOptions.length; i++) {
		var x = multiSelect.selectedOptions[i].value;
		symptoms[symptoms.length] = parseInt(x);
	}
	for (var i = 0; i < symptoms.length; i++) {
		console.log(symptoms[i]);
	}
	//create array to be sent to Azure machine learning, 0s and 1s
	var sendArray = new Array(32);
	for (var i = 0; i < sendArray.length; i++) {
		if (exists(i, symptoms)) {
			sendArray[i] = 1;
		} else {
			sendArray[i] = 0;
		}
	}
	//sendArray is now 1s and 0s based on whether symptom exists or not
	var name = getFirstWord(document.getElementById("name-input").value);
	var disease = "TRISOMY 21";
	writeDisease(disease, name);
}

function writeDisease(disease, name) {
	var pretext = name.concat(", you are confirmed to have: ")
	document.getElementById("answer").innerHTML = pretext.concat(disease);
}

function getFirstWord(str) {
	if (str.indexOf(" ") == -1)
		return str;
	else
		return str.substr(0, str.indexOf(" "));
}

function exists(num, symptoms) {
	for (var i = 0; i < symptoms.length; i++) {
		if (symptoms[i] ===  num)
			return true;
	}
	return false;
}