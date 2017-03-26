console.log("if u see this shit then its working");

function getDisease() {
	//figure out how to do the disease stuff
	var disease = "TRISOMY 21";
	console.log("here");
	writeDisease(disease);
}

function writeDisease(disease) {
	var pretext = "You are confirmed to have: "
	document.getElementById("answer").innerHTML = pretext.concat(disease);
}
