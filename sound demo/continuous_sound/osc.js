var direction = "down";
var freq = 440;

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

function toggleDir(){
  if($('#toggle-dir').is(':checked')){
    direction = "up";
  }else{
    direction = "down";
  }
}

var osc = new Tone.Oscillator({
			"frequency" : 440,
			"volume" : -10,
      "type" : "triangle8"
}).toMaster();

function updateTime(){
	requestAnimationFrame(updateTime);
	//the time elapsed in seconds
   if(direction == "up"){
     freq = freq + 4;
   }else if(freq > 0){
     freq = freq - 4;
   }

   console.log(freq);
   osc.set({
      "frequency" : freq
   });
}
updateTime();



$(function(){
  Tone.Master.volume.rampTo(-Infinity, 0.05);
});
