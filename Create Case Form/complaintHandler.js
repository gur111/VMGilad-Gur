var amountByRole = {"sued":0, "suer":0, "judge":0, "innocent":0};
var placeHolderByRole = {"suer":"שם התובע", "sued":"שם הנתבע"};

// Complaint Setup
function complaintSetup(){
	generalSetup();
}

MIN_CHARS_FOR_DESC = 50;
// Updates decription counter.
function updateCounter(doc) {
	var length = doc.value.length;
	var holder = document.getElementById('count');
	var noticeText = "";

	if (length >= MIN_CHARS_FOR_DESC) {
		holder.style.background = "#5cb85c";
		noticeText = "תיאור תקין";
	} else {
		holder.style.background = "#d9534f";
		if(length == 0)
			noticeText = "לא הוכנס תיאור";
		else if(length > 0 && length < MIN_CHARS_FOR_DESC)
			noticeText = length + "/" + MIN_CHARS_FOR_DESC + " תווים";
	}

	holder.innerHTML = noticeText;
}


/*######################~~~~~SENDING PART~~~~#################*/
// Local part. Collect details and everything.
function sendComplaint(){
  var suers=[], sued=[], desc;
	var status = 1, errors = [];
  var element;
  var i = 0;
  var suers = collectNames("suer");
	var sued = collectNames("sued");
  var desc = getDesc();

	// Details Confimation
	if(suers.length == 0){
		errors.push("כמות התובעים קטנה מדי");
		status = 0;
	}
	if(sued.length == 0){
		errors.push("כמות הנתבעים קטנה מדי");
		status = 0;
	}
	if(!validDesc(desc)){
		errors.push("הינך מנסה לשלוח תלונה ללא תיאור או שהתיאור קצר מדי");
		status = 0;
	}
	// Return errors
	if(status == 0){
		goodLookingAlert(errors);
		return;
	}
	// User confimation
	if(confirm("האם אתה בטוח שהינך רוצה לשלוח את התלונה הבאה?\nתובעים: "+String(suers).replace(/,/g,", ")+"\nנתבעים: "+String(sued).replace(/,/g,", ")+"\nתאור המקרה:\n"+desc)){
		document.getElementById("form").innerHTML = "שולח את התלונה, אנא לא לסגור חלון זה עדיין.";
		send(encodeURI(suers), encodeURI(sued), encodeURI(desc));
	}else{
		goodLookingAlert("השליחה בוטלה!",false, "blue");
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
			document.getElementById("form").innerHTML = "התלונה עברה בהצלחה, אפשר לסגור חלון זה";
			document.getElementById("form").style.color = "green";
			goodLookingAlert(xhttp.responseText, false);
			// alert(xhttp.responseText);
        }else if(xhttp.readyState == 4){
            document.getElementById("form").style.color = "red";
			document.getElementById("form").innerHTML = "שליחת התלונה נכשלה. אנא נסה שנית מאוחר יותר.\nאם שגיאה זו חוזרת אנא פנה לתמיכה הטכנית של הועדה.";
			document.getElementById("dummy").focus();
            goodLookingAlert("החיבור נכשל");
        }
    };
}




/*
 * The following functions handle the errors prompt showing.
 * The first receives an array of errors and prompts them,
 * 	the second animates it, and the third set its proper position.
 */
 // Recieves an ARRAY of errors to present
 function goodLookingAlert(messages, err, color, titleText){
	 // alert(messages);
  // if string, turn into array
	if(typeof messages === 'string' || messages instanceof String)
		messages = [messages];

	msg = "<h1>שגיאות</h1><ul>";
	if(titleText != undefined)
		msg = "<h1>"+titleText+"</h1><ul>";
	else if(err == false)
		msg = "<h1>הודעה</h1><ul>";
	for (var errNum in messages) {
		msg += "<li>" + messages[errNum] + "</li>";
	}
	msg += "</ul>";
	$("#errors-container").html(msg);
	
	if(color != undefined){
		document.getElementById("errors-container").style.backgroundColor= color;
	}
	else if(err == false){
		document.getElementById("errors-container").style.backgroundColor = "green";
	}else{
		document.getElementById("errors-container").style.backgroundColor = "red";
	}
	animateErrorsEntry();
 }

var animatingAlready = false;
function animateErrorsEntry(){
	if(animatingAlready)
		return;
	animatingAlready = true;
	centerPrompt();
	var prompt = $("#errors-container");
	// animate intro, then wait 6sec and the exit
	prompt.animate({top: "50px", opacity: 1})
				.delay( 6000 )
				.animate({top: "-" + (prompt.outerHeight()+ 30) + "px", opacity: 0},
					function() { animatingAlready = false; });
}

function centerPrompt(){
	var prompt = $("#errors-container");
	var screenWidth = $(window).width();
	if(screenWidth < 400){
		prompt.css({
			right: 0,
			width: "100%",
			top: -prompt.outerHeight() + "px"
		});
		return;
	} else
		prompt.css({width: ""});

	/* The whole "centeredLoops" is to make it run one mire time
			after the (prompt.css("left") != "0px") if true.
	 */
	var centeredLoops = 0;
	while(centeredLoops < 2){
		var promptWidth = prompt.outerWidth();
		var promptHeight = prompt.outerHeight();

		var newLoc = {
			right : parseInt((screenWidth - promptWidth)/2) + "px",
			top   : "-" + promptHeight + "px"
		}
		prompt.css(newLoc);

		if(prompt.css("left") != "0px")
			centeredLoops++;
	}
}
