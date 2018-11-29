var direction = "down";
var freq = 440;
var arrayPlay;

var highFreq = 800;
var lowFreq = 200;

Tone.Transport.bpm.value = 23;

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
  Tone.Transport.stop();
  Tone.Master.volume.rampTo(0, 0.1);
  Tone.Transport.start('+0.1');
  console.log("playing");
}

function clearSeries(){
  arrayPlay.removeAll();
}

function initializeSeries(arr){
  var toneArr = scaleArray(arr);

  arrayPlay = new Tone.Sequence(function(time, note){
      piano.triggerAttackRelease(note, "32n", time);
  }, toneArr, "4n").start(0);

  arrayPlay.loop = 0;

  console.log("intialize done");
  console.log(toneArr);
}

function scaleArray(arr){
  var toneArr = arr;
  var max = Math.max(...arr);
  var min = Math.min(...arr);

  for(var i = 0; i<arr.length; i++){
      var percent = (arr[i] - min) / (max - min);
      toneArr[i] = percent * (highFreq - lowFreq) + lowFreq;
  }
  return toneArr;
}

var piano = new Tone.PolySynth(4, Tone.Synth, {
    "volume" : -8,
    "oscillator" : {
      "partials" : [1, 2, 1],
    },
    "portamento" : 0.05
}).toMaster()


$(function(){
  Tone.Master.volume.rampTo(-Infinity, 0.05);
});
