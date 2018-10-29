var direction = "down";
var freq = [440, 440, 440];
var osc = [];

var shepLength = 8;

function togglePlay(){
  if($('#toggle-play').is(':checked')){
    for(let e in freq){
      freq[e] = 440;
    }
    Tone.Transport.stop();
    for(v in osc){
      osc[v].start();
    }
    Tone.Master.volume.rampTo(0, 0.1);
    Tone.Transport.start();
  }else{
    Tone.Master.volume.rampTo(-Infinity, 0.1);
  }
}

function toggleDir(){
  if($('#toggle-dir').is(':checked')){
    direction = "up";
  }else{
    direction = "down";
  }
}

var osc1 = new Tone.Oscillator({
			"frequency" : 110,
			"volume" : -Infinity,
      "type" : "sine"
}).toMaster();

var osc2 = new Tone.Oscillator({
			"frequency" : 220,
			"volume" : -17,
      "type" : "sine"
}).toMaster();

var osc3 = new Tone.Oscillator({
			"frequency" : 440,
			"volume" : -10,
      "type" : "sine"
}).toMaster();

var osc4 = new Tone.Oscillator({
      "frequency" : 880,
      "volume" : -15,
      "type" : "sine"
}).toMaster();

function updateTime(){
	requestAnimationFrame(updateTime);

   if(direction == "up"){
     for(v in osc){
        var f = osc[v].frequency;
        var v = osc[v].volume;
        if(f.value == 110){
            f.rampTo(220, shepLength);
            v.rampTo(-17, shepLength);
        }else if(f.value == 220){
            f.rampTo(440, shepLength);
            v.rampTo(-10, shepLength);
        }else if(f.value == 440){
            f.rampTo(880, shepLength);
            v.rampTo(-15, shepLength);
        }else if(f.value == 880){
            f.rampTo(1760, shepLength);
            v.rampTo(-Infinity, shepLength);
        }else if(f.value == 1760){
            f.value = 110;
        }
     }
   }else{
     for(v in osc){
        var f = osc[v].frequency;
        var v = osc[v].volume;
        if(f.value == 1760){
            f.rampTo(880, shepLength);
            v.rampTo(-17, shepLength);
        }else if(f.value == 880){
            f.rampTo(440, shepLength);
            v.rampTo(-10, shepLength);
        }else if(f.value == 440){
            f.rampTo(220, shepLength);
            v.rampTo(-15, shepLength);
        }else if(f.value == 220){
            f.rampTo(110, shepLength);
            v.rampTo(-Infinity, shepLength);
        }else if(f.value == 110){
            f.value = 1760;
        }
     }
   }
}
updateTime();



$(function(){
  Tone.Master.volume.rampTo(-Infinity, 0.05);
  osc.push(osc1);
  osc.push(osc2);
  osc.push(osc3);
  osc.push(osc4);
});
