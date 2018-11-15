var entry = document.getElementById("value");
var enter = document.getElementById("enter");
var graph = document.getElementById("graph");
var clear = document.getElementById("clear");

var array = [];
var index=0;

enter.addEventListener("mouseclick", addEntry());
clear.addEventListener("mouseclick", clearArray());
graph.addEventListener("mouseclick",print());





//functions

function addEntry(){
	array[index]=parseFloat(entry.value);
	index=index+1;
}

function clearArray(){
	for(let i=0;i<array.length;i++){
		array[i]=null;
	}
}


function print(){
	for(let i=0;i<array.length();i++){
		//put it somewhere
	}
	clearArray();
}
