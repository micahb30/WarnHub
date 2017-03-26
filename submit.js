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
	// Sending and receiving data in JSON format using POST mothod
	//
	xhr = new XMLHttpRequest();
	var url = "https://ussouthcentral.services.azureml.net/workspaces/ad5113b472ae4bea907d66f675f48c21/services/f031c70202334304b90c8e41bdef0c50/execute?api-version=2.0&details=true";
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json");
	xhr.setRequestHeader("Authorization", "vGOQhvqJdfIrQoR92FiGfj5FRNoP/VQOgTlFovCN0QcU11DD1F++GWKe1ufygd7dCzwDvKOB5j5WbeEGYP1dZA==")
	xhr.setRequestHeader("Accept", "application/json");
	xhr.setRequestHeader("Access-Control-Allow-Origin", "true");
	xhr.onreadystatechange = function () { 
	    if (xhr.readyState == 4 && xhr.status == 200) {
	        var json = JSON.parse(xhr.responseText);
	        console.log(json.ColumnNames[1] + ", " + json.Values[1])
	    }
	}
	var data = JSON.stringify(sendArray);
	xhr.send(data);

	// Sending a receiving data in JSON format using GET method
	//
	xhr = new XMLHttpRequest();
	var url = "url?data=" + encodeURIComponent(JSON.stringify(sendArray));
	xhr.open("GET", url, true);
	xhr.setRequestHeader("Content-type", "application/json");
	xhr.onreadystatechange = function () { 
	    if (xhr.readyState == 4 && xhr.status == 200) {
	        var json = JSON.parse(xhr.responseText);
	    }
	}
	xhr.send();

	disease = ""; //Put json response here
	var name = getFirstWord(document.getElementById("name-input").value);
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
