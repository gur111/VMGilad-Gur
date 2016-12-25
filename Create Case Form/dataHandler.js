var url = "https://script.google.com/macros/s/AKfycbyGgCq620zVimQWpbejY5O7IOaolRLRpkUrzTdVjXKaTd-Wj6E/exec"
var names, usedNames = {}, lastName;


function generalSetup(){
	if(names == undefined){ // Loading Names
        loadNames();
    }
}

function loadNames(){
	var request = url + "?func=getNames";
	var xhttp = new XMLHttpRequest();
	xhttp.open("GET",request, true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send();
	xhttp.onreadystatechange = function() {
		if (xhttp.readyState == 4 && xhttp.status == 200) {
			names = xhttp.responseText;
			names = JSON.parse(names);
			names.sort();
			// remove loading animation
			$("#loading-cont").animate({opacity: 0, height: 0},
				function(){ $(this).hide() });

			//debuger(names); /* TODO: Debug*/
		}else if(xhttp.readyState == 4){
			document.getElementById("dummy").focus();
			goodLookingAlert("החיבור נכשל");
		}
	};
}

function focusAction(name){
    if(names == undefined){ // Loading Names
        loadNames();
    }else{
        debuger(name);//TODO: debug
        usedNames[name] = false;

    }
}

function validName(name, doAlert, focus){
    if(name == ""){
        return true;
    }else if(names === undefined){
        document.getElementById(focus).value = "";
        goodLookingAlert("אין חיבור לאינטרנט");
        return false;
    }else if(usedNames[name] != true){
        for( var i = 0; i<names.length; i++){
            if(name == names[i]){
                usedNames[names[i]] = true;
                return true;
            }
        }
    }else{
        debuger(usedNames[name]);//TODO: debug
    }
    document.getElementById(focus).value = "";
    if(doAlert === true){
        goodLookingAlert("שם לא חוקי, אנא הכנס שם משפחה ולאחת מכן שם פרטי");
    }
    return false;
}

function validDesc(desc){
    if(desc == "" || desc == undefined || desc.length < 50){
		return false;
	}
	return true; //TODO: Add requirements
}

function collectNames(role){
	collected = [];
	var i = 0;
	while(i <= amountByRole[role]){
        if((element = document.getElementById(role+i)) == undefined){
            break;
        }
        if(element.value != ""){
            collected.push(element.value);
        }
        i++;
    }
	return collected;

}

function getDesc(){
	return document.getElementById("description").value;
}


function debuger(msg){
    if(document.getElementById("dummy").innerHTML !== undefined)
        document.getElementById("dummy").innerHTML += "<br>DEBUG: "+msg;
    else
        document.getElementById("dummy").innerHTML = "DEBUG: "+ msg;
	console.log(msg);
}


/*################~~~~API~~~~################*/

function CompleteName(obj, evt) {
    if(names == undefined){
        obj.value = "";
        obj.blur;
        goodLookingAlert("אנא חכה לטעינת השמות");
        return;
    }else if(obj.backspace == true){
        return;
    }
    aMail = names;
    if ((!obj) || (!evt) || (aMail.length == 0)) {
        return;
    }

    if (obj.value.length == 0) {
        return;
    }

    var elm = (obj.setSelectionRange) ? evt.which : evt.keyCode;

    if ((elm < 32) || (elm >= 33 && elm <= 46) || (elm >= 112 && elm <= 123)) {
        return;
    }

    var txt = obj.value.replace(/;/gi, ",");
    elm = txt.split(",");
    txt = elm.pop();
    txt = txt.replace(/^\s*/, "");

    if (txt.length == 0) {
        return;
    }

    if (obj.createTextRange) {
        var rng = document.selection.createRange();
        if (rng.parentElement() == obj) {
            elm = rng.text;
            var ini = obj.value.lastIndexOf(elm);
        }
    } else if (obj.setSelectionRange) {
        var ini = obj.selectionStart;
    }

    for (var i = 0; i < aMail.length; i++) {
        elm = aMail[i].toString();
        if(usedNames[elm] == true){
            continue;
        }

        if (elm.toLowerCase().indexOf(txt.toLowerCase()) == 0) {
            obj.value += elm.substring(txt.length, elm.length);
            break;
        }
    }

    if (obj.createTextRange) {
        rng = obj.createTextRange();
        rng.moveStart("character", ini);
        rng.moveEnd("character", obj.value.length);
        rng.select();
    } else if (obj.setSelectionRange) {
        obj.setSelectionRange(ini, obj.value.length);
    }
}
