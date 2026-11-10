(function(root){'use strict';
const stages=['notes','ear','rhythm','quiz'];
const names={notes:'Notenlesen',ear:'Gehörbildung',rhythm:'Rhythmus',quiz:'Musikquiz'};
const tips={notes:'Übe die Noten der falsch beantworteten Aufgaben noch einmal.',ear:'Höre die falsch beantworteten Tonpaare nochmals in Ruhe.',rhythm:'Wiederhole die markierten Schläge mit dem Zählraster.',quiz:'Schau dir die falsch beantworteten Musikfragen nochmals an.'};
function fresh(date){return {date,results:{},done:false,stars:0}}
function next(d){return stages.find(x=>!Object.prototype.hasOwnProperty.call(d.results,x))||null}
function answersFor(answers,hits,total){
 if(answers===undefined)return undefined;
 if(!Array.isArray(answers)||answers.length!==total||answers.some(a=>!a||typeof a.ok!=='boolean')||answers.filter(a=>a.ok).length!==hits)throw Error('Antwortprotokoll passt nicht zum Ergebnis');
 return answers.map(a=>{const out={ok:a.ok};for(const key of ['id','prompt','chosen','expected','detail'])if(a[key]!==undefined)out[key]=String(a[key]).slice(0,1000);return out});
}
function record(d,kind,hits,total,answers){if(!stages.includes(kind)||!Number.isInteger(hits)||total!==5||hits<0||hits>5)throw Error('5er-Aufgabe ungültig');const log=answersFor(answers,hits,total);if(d.done||d.results[kind])return {day:d,changed:false};if(next(d)!==kind)throw Error('Falsche Etappe');let results={...d.results,[kind]:{hits,total,...(log?{answers:log}:{})}};let done=stages.every(x=>results[x]);return {day:{...d,results,done,stars:done?1:0},changed:true}}
function validDay(o,date){if(!o||o.date!==date||!o.results)return fresh(date);let d=fresh(date);for(let k of stages){let r=o.results[k];if(!r)break;let hits=Number(r.hits),total=Number(r.total);if(![5,10].includes(total)||!Number.isInteger(hits)||hits<0||hits>total)break;d.results[k]={hits,total};try{const log=answersFor(r.answers,hits,total);if(log)d.results[k].answers=log}catch(e){/* Legacy totals survive an invalid optional detailed log. */}}d.done=stages.every(x=>d.results[x]);d.stars=d.done?Math.min(1,Math.max(0,Number(o.stars)||0)):0;return {...o,...d}}
function summary(d){if(!d.done)throw Error('Tag nicht fertig');const areas=stages.map(k=>({k,name:names[k],...d.results[k],wrong:d.results[k].total-d.results[k].hits,rate:d.results[k].hits/d.results[k].total})),best=areas.reduce((a,b)=>b.rate>a.rate?b:a),weak=areas.reduce((a,b)=>b.rate<a.rate?b:a),perfect=areas.every(a=>a.wrong===0);return {hits:areas.reduce((x,r)=>x+r.hits,0),total:areas.reduce((x,r)=>x+r.total,0),best:names[best.k],bestAreas:areas.filter(a=>a.rate===best.rate).map(a=>a.name),practice:perfect?null:names[weak.k],tip:perfect?'Heute wurden keine Fehler beobachtet. Du kannst freiwillig wiederholen.':tips[weak.k],perfect,areas}}
function newId(){return Date.now().toString(36)+'-'+Math.random().toString(36).slice(2,12)}
function session(date,mode='daily',results={}){return {version:2,id:newId(),date,mode,results:{...results},progress:{},pending:null,practice:null,finished:false}}
function validSession(o){if(!o||o.version!==2||typeof o.id!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(o.date)||!['daily','replay'].includes(o.mode))return null;const s=session(o.date,o.mode,validDay({date:o.date,results:o.results},o.date).results);s.id=o.id.slice(0,120);s.progress=o.progress&&typeof o.progress==='object'?o.progress:{};s.pending=stages.includes(o.pending)?o.pending:null;s.practice=stages.includes(o.practice)?o.practice:null;s.finished=!!o.finished;return s}
root.ArcadeDay={stages,names,fresh,next,record,validDay,summary,newId,session,validSession};if(typeof module!=='undefined')module.exports=root.ArcadeDay;
})(typeof window!=='undefined'?window:globalThis);
