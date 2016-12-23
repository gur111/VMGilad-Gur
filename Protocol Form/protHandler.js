var complaintFormUrl = "http://dlhvm.esy.es/raw/create%20complaint.html";


// Complete the judges name from the judge list.
function CompleteJudge(obj, evt) {// TODO: Make judge list
	return CompleteName(obj, evt);
}


// Protocol Setup
function protSetup(){
	generalSetup();
	var body = document.getElementsByName("body");/*
	var complaintForm = $('.form', $(getComplaintHtml()));
	body.innerHTML = complaintForm+"\n"+body.innerHTML*/
	
	w3IncludeHTML();
	
	body.innerHTML +='\n<div id="dummy" style="visibility:hidden">'
}

function getComplaintHtml()
{
	
    if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }
    else
    {// code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange=function()
    {
        if (xmlhttp.readyState==4 && xmlhttp.status==200)
        {
            return xmlhttp.responseText;
        }
    }
    xmlhttp.open("GET", complaintFormUrl, false );
    xmlhttp.send();    
}