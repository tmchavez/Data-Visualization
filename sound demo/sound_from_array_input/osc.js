var direction = "down";
var freq = 440;
var arr = [0];

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

function playSeries(){
  osc.set({
      "frequency" : arr[0]
  });
  osc.start();
  Tone.Master.volume.rampTo(0, 0.1);
  Tone.Transport.start();

}

var osc = new Tone.Oscillator({
			"frequency" : 440,
			"volume" : -10,
      "type" : "triangle8"
}).toMaster();

function updateTime(){
	requestAnimationFrame(updateTime);
	//the time elapsed in seconds
  var currentSec = Math.floor(Tone.Transport.seconds);
  osc.set({
      "frequency" : arr[currentSec]
  });
}
updateTime();



$(function(){
  Tone.Master.volume.rampTo(-Infinity, 0.05);
});

function inputArray(){
  arr = $('#inputArray').val().split(" ");
  console.log(arr);
  Tone.Transport.stop();
  playSeries();
}
