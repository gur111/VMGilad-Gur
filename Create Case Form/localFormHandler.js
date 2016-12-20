var suersAmount = 0;
var suedAmount = 0;

function addSuer(){
    // Container <div> where dynamic content will be placed
    var container = document.getElementById("suersContainer");
    
    if(suersAmount == 0 && document.getElementById("suer0").value == ""){
        return;
    }
    if(container.lastChild.value != ""){
       // Create an <input> element, set its type and name attributes
       var input = document.createElement("input");
       input.type = "text";
       input.name = "suer" + (suersAmount + 1);
       input.id = "suer" + (suersAmount + 1);
       input.placeholder = "שם תובע";
       input.addEventListener("blur", function(){validName(this.value, true, this.id)});
       input.addEventListener("focus", function(){focusAction(this.value)});
       input.onkeyup=function(){Complete(this,event)};
       input.backspace='false';
       input.onblur = "validName(this.value, true, this.id)"
       container.appendChild(input);
       suersAmount++;                 
    }
}

function addSued(){
    // Container <div> where dynamic content will be placed
    var container = document.getElementById("suedContainer");
    if(suedAmount == 0 && document.getElementById("sued0").value == ""){
        return;
    }
    if(container.lastChild.value != ""){
        // Create an <input> element, set its type and name attributes
        var input = document.createElement("input");
        input.type = "text";
        input.name = input.id = "sued" + (suedAmount + 1);
        input.id = "sued" + (suersAmount + 1);
        input.placeholder = "שם נתבע";
        input.addEventListener("blur", function(){validName(this.value, true, this.id)});
        input.addEventListener("focus", function(){focusAction(this.value)});
        input.onkeyup=function(){Complete(this,event)};
        input.backspace='false';
        input.onblur = "validName(this.value, true, this.id)"
        container.appendChild(input);
        suedAmount++;
   }
}


/*######################~~~~~SENDING PART~~~~#################*/

function sendComplaint(){
    var suers=[], sued=[], desc;
	var status = 1, err = "";
    var element;
    var i = 0;
    while(i <= suersAmount){
        if((element = document.getElementById("suer"+i)) == undefined){
            break;
        }
        if(element.value != ""){
            suers.push(element.value);
        }
        i++;
    }
    i = 0;
    while(i <= suedAmount){
        if((element = document.getElementById("sued"+i)) == undefined){
            break;
        }
        if(element.value != ""){
            sued.push(element.value);
        }
        i++;
    }
    desc = document.getElementById("description").value;
	if(suers.length == 0){
		err+=("כמות התובעים קטנה מדי\n");
		status = 0;
	}
	if(sued.length == 0){
		err+=("כמות הנתבעים קטנה מדי\n");
		status = 0;
	}
	if(desc == "" || desc == undefined || desc.length < 50){
		err+=("הינך מנסה לשלוח תלונה ללא תיאור או שהתיאור קצר מדי.\n");
		status = 0;
	}
	if(status == 0){
		alert(err);
		return;
	}
	if(confirm("האם אתה בטוח שהינך רוצה לשלוח את התלונה הבאה?\nתובעים: "+String(suers).replace(/,/g,", ")+"\nנתבעים: "+String(sued).replace(/,/g,", ")+"\nתאור המקרה:\n"+desc)){
		document.getElementById("form").innerHTML = "";
		send(encodeURI(suers), encodeURI(sued), encodeURI(desc));
	}else{
		alert("השליחה בוטלה!");
	}
}

function send(suers, sued, desc){
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST",url, true);
    xhttp.request
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("suers="+JSON.stringify(suers)+"&sued="+JSON.stringify(sued)+"&desc="+desc);
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            alert(xhttp.responseText);
        }else if(xhttp.readyState == 4){
            document.getElementById("dummy").focus();
            alert("החיבור נכשל");
        }
    };
}