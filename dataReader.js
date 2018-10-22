var entry = document.getElementById("value");
var enter = document.getElementById("enter");
var graph = document.getElementById("graph");
var clear = document.getElementById("clear");

var array[];
var index=0;

enter.addEventListner("mouseclick", addEntry());
clear.addEventListner("mouseclick", clearArray());
graph.addEventListner("mouseclick",print());





//functions

addEntry(){
	array[index]=parseFloat(entry.value);
	index=index+1;
}

clearArray(){
	for(int i=0;i<array.length();i++){
		array[i]=null;
	}
}


print(){
	for(int i=0;i<array.length();i++){
		//put it somewhere
	}
	clearArray();
}