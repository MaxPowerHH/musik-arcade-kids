/* Original offline WebAudio instrument approximation; no sampled or copyrighted preset assets. */
(function(){'use strict';
 function attachPianoOscillators(ctx,target,f,t){
  const oscs=[];
  for(const [ratio,level,decay] of [[1,.75,1.1],[2,.24,.50],[3,.12,.29],[4,.055,.20],[5,.025,.15],[6,.012,.12]]){
   const o=ctx.createOscillator(),g=ctx.createGain();o.type='sine';o.frequency.setValueAtTime(f*ratio,t);
   g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(level,t+.008);
   g.gain.exponentialRampToValueAtTime(.0001,t+decay);
   o.connect(g);g.connect(target);o.start(t);oscs.push(o);
 }return oscs;
 }
 function attachDx7Oscillators(ctx,target,f,t){
  const mod=ctx.createOscillator(),depth=ctx.createGain(),carrier=ctx.createOscillator();
  mod.type='sine';mod.frequency.setValueAtTime(f*2,t);
  depth.gain.setValueAtTime(f*1.4,t);depth.gain.exponentialRampToValueAtTime(.1,t+.34);
  mod.connect(depth);depth.connect(carrier.frequency);
  carrier.type='sine';carrier.frequency.setValueAtTime(f,t);carrier.connect(target);
  mod.start(t);carrier.start(t);return [mod,carrier];
 }
 function schedule(ctx,f,t,duration=.75,output=ctx.destination,level=.13){
  const env=ctx.createGain();env.gain.setValueAtTime(.0001,t);
  env.gain.exponentialRampToValueAtTime(level,t+.012);
  env.gain.exponentialRampToValueAtTime(.0001,t+Math.max(.11,duration));env.connect(output);
  const oscs=attachPianoOscillators(ctx,env,f,t);
  for(const o of oscs)o.stop(t+Math.max(.13,duration)+.02);
  return {stop(){for(const o of oscs){try{o.stop()}catch(e){}}}};
 }
 let context=null;
 function playMidi(note,timbre="piano"){try{const A=window.AudioContext||window.webkitAudioContext;context??=new A();context.resume();const t=context.currentTime+.006; const f=440*Math.pow(2,(note-69)/12);
  if(timbre==='dx7'){
   const g=context.createGain();g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(.12,t+.01);
   g.gain.exponentialRampToValueAtTime(.0001,t+.34);g.connect(context.destination);
   for(const o of attachDx7Oscillators(context,g,f,t))o.stop(t+.36);
  }else schedule(context,f,t,.75);
 }catch(e){}}
 window.ArcadePiano=Object.freeze({attachPianoOscillators,attachDx7Oscillators,schedule,playMidi});
})();
