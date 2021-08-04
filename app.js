// DOM_nodes

const output = document.querySelector('.output');
const hold = document.querySelector('.hold');
const numbers = document.querySelectorAll('#number');
const decimal = document.getElementById('decimal');
const operators = document.querySelectorAll('.operator');
const clearScreen = document.querySelector('#clear-screen');
const reset = document.getElementById('reset');
const equals = document.getElementById('equal');
const erase = document.getElementById('backspace');

// Globals

let result = 0,operatorClicked = false,lastOperation = "",equalClicked = false,localValue = "";

// Numbers

numbers.forEach(num => num.addEventListener('click',() => {

	if(operatorClicked){
		operatorClicked = false;
		output.innerText = "";
	}

	if(output.innerText.length <= 11){
		 if(output.innerText === "0"){
		 	if(num.innerText !== "0"){
		 		output.innerText = "";
		 		output.innerText += num.innerText;
		 	}
	    }
		 else{
		 	output.innerText += num.innerText
		 }
	}
	
}))

// Decimals

decimal.addEventListener('click',() => {
	if(!output.innerText.includes(".")) output.innerText += "."
})

// Operators 

operators.forEach(operator => operator.addEventListener('click',() => {

	   if(operatorClicked){
	   	equalClicked = false;
	   	lastOperation = operator.innerText;
	   	hold.innerText = result.toString()+ ` ${operator.innerText}`;
	   	return;
	   }

	   if(lastOperation !== "" && lastOperation !== operator.innerText)
	   {
	   		operatorClicked = true;
	   		PerformOperation(result,lastOperation,output.innerText);
	   		lastOperation = operator.innerText;
	   		hold.innerText = result.toString()+ ` ${lastOperation}`;
	   		return;
	   }

	    operatorClicked = true;
		lastOperation = operator.innerText;
		PerformOperation(result,lastOperation,output.innerText)

}))

// Performing the current Operation

function PerformOperation(currentResult, operator, currentOutput, equalOperator = false)
{

    outputResize();
    if(hold.innerText === "" && operator === "﹣") {
    	currentResult = Number(currentOutput);
    	currentOutput = "0";
    }

    if(hold.innerText === "" && (operator === "×" || operator === "÷")) {
    	currentResult = Number(currentOutput);
    	currentOutput = "1";
    }

	if(operator === "﹢") result = currentResult + Number(currentOutput);

	else if(operator === "﹣") result = currentResult - Number(currentOutput);

	else if(operator === "×") result = currentResult * Number(currentOutput);

	else result = currentResult / Number(currentOutput);

	output.innerText = result.toString();
	outputResize();
	if(!equalOperator) hold.innerText = result.toString()+ ` ${operator}`

}

// Equals

equals.addEventListener('click',() => {

	if(lastOperation !== ""){
	  if(!equalClicked)
	    {
	    	localValue = output.innerText;
	    }
	  operatorClicked = true;
	  equalClicked = true;
	  hold.innerText = result.toString() + ` ${lastOperation} ` + localValue + " =";
	  PerformOperation(result,lastOperation,localValue,true);
	}
})

// Clear Output...

clearScreen.addEventListener('click',() => {
	output.innerText = "0";
	output.style.fontSize = "2.5rem"
})

// Reset

reset.addEventListener('click',() => {
	result = 0;
	operatorClicked = false;
	hold.innerText = "";
	output.innerText = "0";
	lastOperation = "";
	localValue = "";
	equalClicked = false;
	output.style.fontSize = "2.5rem";
})

// Erase 

erase.addEventListener('click',() => {

    if(!output.innerText.includes("e")){
    	outputResize()
		output.innerText = output.innerText.substring(0,output.innerText.length - 1);
		if(output.innerText === "") output.innerText = "0"
    }
   		
})

// Resize Output Text

function outputResize(){
	
	if(output.innerText.length > 12) output.style.fontSize = "1.4rem";
    else output.style.fontSize = "2.5rem";
}
