var direction = "down";
var freq = 440;
var arr = [];
var arrayPlay;

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

function initializeSeries(){
  arrayPlay = new Tone.Sequence(function(time, note){
      piano.triggerAttackRelease(note, "16n", time);
  }, arr, "4n").start(0).stop(arr.length);
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

function inputArray(){
  arr = $('#inputArray').val().split(" ");
  // for(var i=0; i<arr.length; i++){
  //     arr[i] = parseInt(arr[i]);
  // }
  initializeSeries();
  playSeries();
}
