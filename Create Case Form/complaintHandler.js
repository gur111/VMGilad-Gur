var amountByRole = {"sued":0, "suer":0, "judge":0, "innocent":0};
var placeHolderByRole = {"suer":"שם התובע", "sued":"שם הנתבע"};


// Complaint Setup
function complaintSetup(){
	generalSetup();
}

// Updates decription counter.
function updateCounter(doc) {
	var length = doc.value.length;
	var holder = document.getElementById('count');
	holder.innerHTML = "תווים: " + (length);
	if(length < 50)
		holder.style.color = "red";
	else
		holder.style.color = "green"
}


/*######################~~~~~SENDING PART~~~~#################*/
// Local part. Collect details and everything.
function sendComplaint(){
    var suers=[], sued=[], desc;
	var status = 1, err = "";
    var element;
    var i = 0;
    suers = collectNames("suer");
	sued = collectNames("sued");
    desc = getDesc();
	// Details Confimation
	if(suers.length == 0){
		err+=("כמות התובעים קטנה מדי\n");
		status = 0;
	}
	if(sued.length == 0){
		err+=("כמות הנתבעים קטנה מדי\n");
		status = 0;
	}
	if(!validDesc(desc)){
		err+=("הינך מנסה לשלוח תלונה ללא תיאור או שהתיאור קצר מדי.\n");
		status = 0;
	}
	// Return errors
	if(status == 0){
		alert(err);
		return;
	}
	// User confimation
	if(confirm("האם אתה בטוח שהינך רוצה לשלוח את התלונה הבאה?\nתובעים: "+String(suers).replace(/,/g,", ")+"\nנתבעים: "+String(sued).replace(/,/g,", ")+"\nתאור המקרה:\n"+desc)){
		document.getElementById("form").innerHTML = "שולח את התלונה, אנא לא לסגור חלון זה עדיין.";
		send(encodeURI(suers), encodeURI(sued), encodeURI(desc));
	}else{
		alert("השליחה בוטלה!");
	}
}

// The networking part of the sending
function send(suers, sued, desc){
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST",url, true);
    xhttp.request
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("suers="+JSON.stringify(suers)+"&sued="+JSON.stringify(sued)+"&desc="+desc);
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
			document.getElementById("form").innerHTML = "התלונה עברקה בהצלחה, אפשר לסגור חלון זה";
			document.getElementById("form").style.color = "green";
			alert(xhttp.responseText);
        }else if(xhttp.readyState == 4){
            document.getElementById("form").style.color = "red";
			document.getElementById("form").innerHTML = "שליחת התלונה נכשלה. אנא נסה שנית מאוחר יותר.\nאם שגיאה זו חוזרת אנא פנה לתמיכה הטכנית של הועדה.";
			document.getElementById("dummy").focus();
            alert("החיבור נכשל");
        }
    };
}