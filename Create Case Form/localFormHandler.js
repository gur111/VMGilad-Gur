
/* Old version of adding fields
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
       input.onkeyup=function(){CompleteName(this,event)};
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
        input.onkeyup=function(){CompleteName(this,event)};
        input.backspace='false';
        input.onblur = "validName(this.value, true, this.id)"
        container.appendChild(input);
        suedAmount++;
   }
}
*/

function addName(role){
	    // Container <div> where dynamic content will be placed
    var container = document.getElementById(role+"Container");
    if(amountByRole[role] == 0 && document.getElementById(role+"0").value == ""){
        return;
    }
    if(container.lastChild.value != ""){
        // Create an <input> element, set its type and name attributes
        var input = document.createElement("input");
        input.type = "text";
        input.name = input.id = role + (amountByRole[role] + 1);
        input.id = role + (amountByRole[role] + 1);
        input.placeholder = placeHolderByRole[role];
        input.addEventListener("blur", function(){validName(this.value, true, this.id)});
        input.addEventListener("focus", function(){focusAction(this.value)});
        input.onkeyup=function(){CompleteName(this,event)};
        input.backspace='false';
		input.class=role+" names";
        input.onblur = "validName(this.value, true, this.id)"
        container.appendChild(input);
        amountByRole[role]++;
   }
}
