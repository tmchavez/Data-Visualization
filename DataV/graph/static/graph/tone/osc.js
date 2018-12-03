var direction = "down";
var freq = 440;
var arrayPlay;

var highFreq = 800;
var lowFreq = 200;

// in seconds
var totalTime = 6;

Tone.Transport.bpm.value = 23;

// EXECUTE SOUND FUNCTIONS ====================================================

function playSeries(numNotes){
  Tone.Transport.bpm.value = numNotes * 10;
  Tone.Transport.stop();

  Tone.Master.volume.rampTo(0, 0.1);
  Tone.Transport.start('+0.1');
  console.log("playing");
}

function playNote(){
    bellTone.triggerAttack();
}

function clearSeries(){
  arrayPlay.removeAll();
}

function initializeSeries(data){
  var arr = ripY(data);
  var toneArr = scaleArray(arr);

  arrayPlay = new Tone.Sequence(function(time, note){
      boopTone.triggerAttackRelease(note, "32n", time);
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

$(function(){
  Tone.Master.volume.rampTo(-Infinity, 0.05);
});

function ripY(data){
  var a = [];
  for(let i = 0; i<data.length; i++){
    a.push(data[i].value);
  }
  return a;
}

// CHANGE SOUND FUNCTIONS ====================================================

function setSquare(){
  boopTone.set({
    "oscillator" : {
      "type" : "square",
    }
  });
}

function setSine(){
  boopTone.set({
    "oscillator" : {
      "type" : "sine",
    }
  });
}

function setSaw(){
  boopTone.set({
    "oscillator" : {
      "type" : "sawtooth",
    }
  });
}

function setTriangle(){
  boopTone.set({
    "oscillator" : {
      "type" : "triangle",
    }
  });
}

// INSTRUMENTS  ===============================================================

var boopTone = new Tone.MonoSynth(4, Tone.Synth, {
    "volume" : -8,
    "oscillator" : {
      "type" : "sine",
      "partials" : [1, 3, 5],
    },
    "portamento" : 0.05
}).toMaster();

var bongTone = new Tone.MembraneSynth({
			"pitchDecay" : 0.008,
			"octaves" : 2,
			"envelope" : {
				"attack" : 0.0006,
				"decay" : 0.5,
				"sustain" : 0
			}
}).toMaster();

var bellTone = new Tone.MetalSynth({
      "harmonicity" : 20,
      "resonance" : 800,
      "modulationIndex" : 20,
      "pitchDecay" : 0.1,
      "oscillator" : {
          "type" : "sine",
      },
      "envelope" : {
        "decay" : 0.4,
      },
      "volume" : -8
}).toMaster();
