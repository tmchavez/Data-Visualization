var direction = "down";
var freq = 440;
var arrayPlay;

var highFreq = 800;
var lowFreq = 200;

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
}

function clearSeries(){
  arrayPlay.removeAll();
}

// function initializeSeries(){
//   for(var i=0; i<arr.length; i++){
//       Tone.Transport.scheduleOnce(function(time){
//         piano.triggerAttackRelease(arr[i], '16n', time)
//       }, i);
//    }
//    console.log(arr);
// }

function initializeSeries(arr){
  var toneArr = scaleArray(arr);

  arrayPlay = new Tone.Sequence(function(time, note){
      piano.triggerAttackRelease(note, "16n", time);
  }, toneArr, "2n").start(0).stop(arr.length*2);
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

Tone.Transport.bpm.value = 60;


$(function(){
  Tone.Master.volume.rampTo(-Infinity, 0.05);
});

//function inputArray(){
//  arr = $('#inputArray').val().split(" ");
//  initializeSeries();
//  playSeries();
//}
