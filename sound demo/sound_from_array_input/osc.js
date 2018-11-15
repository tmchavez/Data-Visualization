var direction = "down";
var freq = 440;
var currentSec = 0;

function togglePlay(){
  if($('#toggle-play').is(':checked')){
    freq = 440;
    Tone.Transport.stop();
    osc.start();
    Tone.Master.volume.rampTo(0, 0.1);
    Tone.Transport.start();
  }else{
    Tone.Master.volume.rampTo(-Infinity, 0.05);
  }
}

function playSeries(arr){
  for(var i=0; i<arr.length; i++){
    Tone.Transport.schedule(function(time){
      osc.set({
          "frequency" : arr[i]
      });
    }, i);
  }
  Tone.Transport.start();
  osc.start();

}

var osc = new Tone.Oscillator({
			"frequency" : 440,
			"volume" : -10,
      "type" : "triangle8"
}).toMaster();

function updateTime(){
	requestAnimationFrame(updateTime);
	//the time elapsed in seconds
  currentSec = Math.floor(Tone.Transport.seconds);
}
updateTime();



$(function(){
  Tone.Master.volume.rampTo(-Infinity, 0.05);
});

function inputArray(){
  var arr = $('#inputArray').val().split(" ");
  console.log(arr);
  Tone.Transport.stop();
  playSeries(arr);
}
