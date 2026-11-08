'use strict';
(() => {
  const RELEASE='full02-645f0573-pwa01';
  const status=document.getElementById('offlineStatus'),updates=document.getElementById('updateStatus');
  const install=document.getElementById('install'),help=document.getElementById('help');
  let prompt=null;
  document.getElementById('helpButton').addEventListener('click',()=>help.showModal());
  document.getElementById('closeHelp').addEventListener('click',()=>help.close());
  window.addEventListener('beforeinstallprompt',event=>{event.preventDefault();prompt=event;install.hidden=false});
  window.addEventListener('appinstalled',()=>{prompt=null;install.hidden=true});
  install.addEventListener('click',async()=>{if(!prompt)return;const choice=prompt;prompt=null;install.hidden=true;try{await choice.prompt();await choice.userChoice}catch(e){updates.hidden=false;updates.textContent='Installation abgebrochen. Du kannst im Browser weiterspielen.'}});
  function waiting(reg){if(reg.waiting&&reg.active){updates.hidden=false;updates.textContent='Neue Version bereit: alle Arcade-Fenster und die App schließen, danach neu öffnen. Der laufende Versuch wird nicht unterbrochen.'}else updates.hidden=true}
  async function cacheStatus(reg){
    const worker=reg.active;if(!worker){status.textContent='Offline-Speicherung noch nicht bereit. Bitte mit Verbindung geöffnet lassen.';return}
    const channel=new MessageChannel();
    const message=new Promise((resolve,reject)=>{const timer=setTimeout(()=>{channel.port1.close();reject(Error('timeout'))},6000);channel.port1.onmessage=event=>{clearTimeout(timer);channel.port1.close();resolve(event.data)}});
    worker.postMessage({type:'ARCADE_CACHE_STATUS'},[channel.port2]);
    try{const data=await message;status.textContent=data&&data.release===RELEASE&&data.complete?'Offline bereit · Spielstände bleiben nur auf diesem Gerät.':'Offline-Speicherung unvollständig. Mit Verbindung erneut öffnen.'}catch(e){status.textContent='Offline-Status nicht bestätigt. Bitte vorerst mit Verbindung spielen.'}
  }
  if(!window.isSecureContext||!('serviceWorker' in navigator)){status.textContent='Hier kein Offline-App-Modus. Für die PWA ist HTTPS oder localhost erforderlich.';return}
  navigator.serviceWorker.register('./sw.js',{scope:'./',updateViaCache:'none'}).then(async reg=>{
    const watch=worker=>{if(worker)worker.addEventListener('statechange',()=>{if(worker.state==='installed')waiting(reg);if(worker.state==='redundant')status.textContent='Offline-Installation fehlgeschlagen. Mit Verbindung erneut öffnen; die bisherige Version bleibt erhalten.'})};
    waiting(reg);watch(reg.installing);reg.addEventListener('updatefound',()=>watch(reg.installing));
    const ready=await navigator.serviceWorker.ready;waiting(ready);await cacheStatus(ready);
    window.addEventListener('online',()=>cacheStatus(ready));
    window.addEventListener('offline',()=>cacheStatus(ready));
    // No forced activation, reload, storage migration or game message interception.
  }).catch(()=>{status.textContent='Offline-Speicherung nicht möglich. Mit Verbindung spielen; Browser-/Speicherfreigaben prüfen.'});
})();
