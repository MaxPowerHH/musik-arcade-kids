'use strict';
const RELEASE='full02-645f0573-pwa01',CACHE_ID='full02-645f0573-pwa01-ca52dfbd56b674fd';
const ASSETS={".nojekyll": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855", "index.html": "abd0c33e93631cf52aa8e331400cfd3bd53279bf37395192cf7baa3de3eb6272", "manifest.webmanifest": "9b341eec939ee2dc26e7df4105b6dae3e1ebc8e04025d52af3a5fb14527addc9", "offline.html": "e7c816564acdf629aa74650adc9ea5770dbfe30048d5b937cf6391e69443db51", "releases/full02-645f0573-pwa01/Arcade_Start.html": "f14c94acc48ae5282df18dc9fb0aa0d926f73501202184b35c930bf108f336ee", "releases/full02-645f0573-pwa01/Arcade_Touch_MIDI_Rhythmus.html": "24380670525dcab38e079bebe141713b4a6bcee0fd5b41d1f06f481e55b09857", "releases/full02-645f0573-pwa01/Drei_Musikspiele.html": "881475bea4da2f69b4edcabb2d8a9237441516f15e97fdd9f6a3988f167308d2", "releases/full02-645f0573-pwa01/Notenfresser.html": "755a6215895c5206b79790a4928182b2e30255b40b9245ec7a25db794e3a1a42", "releases/full02-645f0573-pwa01/arcade_audio.js": "4ea7a0f092ff00e69b9ab952f826c169ae308d23eab71999f219ec9e0e4962d9", "releases/full02-645f0573-pwa01/arcade_day.js": "06d7306e7c87c3f89fc20d914d0a25c6133386c2f4edb17e337995872d60c8ef", "releases/full02-645f0573-pwa01/icons/icon-180.png": "193f41984ee5ee05131b419b2ae1bc171b3dce780aec042e399d554a1c2cacc5", "releases/full02-645f0573-pwa01/icons/icon-192.png": "687fdceade59f9fb607c9d4caa6ccddb3d7d13e96ded772c9ff489c26142e90d", "releases/full02-645f0573-pwa01/icons/icon-512.png": "c2cd1feedb0d7809a9f44917bacc5775128a3bcc73cfa3de1f147569bb87309d", "releases/full02-645f0573-pwa01/julia_sprite.png": "26aaa44424d52b2158553f71b7df9f894ff4b58a2f74ebbc069ee30b6d373370", "releases/full02-645f0573-pwa01/naemi_sprite.png": "dd4bf27a7e7d27940fb91f9487af370849d822a9a615f619d55082518356d8c6", "releases/full02-645f0573-pwa01/pwa.css": "9cbdc3bfd15f1fc9a029e4f7177c89d87453c9cca4dd4a60dae82c18cb2f9b13", "releases/full02-645f0573-pwa01/pwa.js": "7d3302073670c1fe4125807c54b0c86ae6b942ee327790341fb1537f652b02c1", "releases/full02-645f0573-pwa01/sophia_sprite.png": "a6ca7c0e4b2402ec8503e5c46ebd5ddf9c70b7a26afd1c317a87940208ac2192", "releases/full02-645f0573-pwa01/tom_sprite.png": "5870b233ddd8c514f0fa8b2e19246fa9490af13dcd3c7f30186f57e0d2c10838"};
const BASE=new URL(self.registration.scope),PREFIX='musik-arcade:'+BASE.pathname+':',CACHE=PREFIX+CACHE_ID;
const url=path=>new URL(path,BASE).href;
async function verified(path){
  const response=await fetch(new Request(url(path),{cache:'no-store',credentials:'same-origin',redirect:'error'}));
  if(!response.ok||response.type==='opaque')throw Error('Asset unavailable: '+path);
  const data=await response.clone().arrayBuffer();
  const digest=Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',data)),b=>b.toString(16).padStart(2,'0')).join('');
  if(digest!==ASSETS[path])throw Error('Asset integrity: '+path);
  return response;
}
self.addEventListener('install',event=>event.waitUntil((async()=>{
  // Fetch and verify the complete release before exposing a cache as usable.
  const responses=await Promise.all(Object.keys(ASSETS).map(async path=>[path,await verified(path)]));
  try{const cache=await caches.open(CACHE);for(const [path,response] of responses)await cache.put(url(path),response)}
  catch(error){await caches.delete(CACHE);throw error}
  // Deliberately no skipWaiting: an in-use version must finish first.
})()));
self.addEventListener('activate',event=>event.waitUntil((async()=>{
  for(const name of await caches.keys())if(name.startsWith(PREFIX)&&name!==CACHE)await caches.delete(name);
  // No clients.claim: do not take over an already open, uncontrolled version.
})()));
function failure(){return new Response('Arcade-Datei momentan nicht verfügbar. Mit Verbindung erneut öffnen. Spielstand nicht löschen.',{status:503,headers:{'Content-Type':'text/plain; charset=utf-8'}})}
self.addEventListener('fetch',event=>{
  const request=event.request,u=new URL(request.url);
  if(request.method!=='GET'||u.origin!==BASE.origin||!u.pathname.startsWith(BASE.pathname))return;
  const path=u.pathname.slice(BASE.pathname.length)||'index.html';
  if(Object.prototype.hasOwnProperty.call(ASSETS,path)){
    event.respondWith((async()=>{const cache=await caches.open(CACHE),cached=await cache.match(url(path));if(cached)return cached;
      try{const response=await verified(path);await cache.put(url(path),response.clone());return response}catch(e){return failure()}})());return;
  }
  // No HTML fallback for scripts or a different immutable release.
  if(path.startsWith('releases/')){event.respondWith(Promise.resolve(failure()));return}
  if(request.mode==='navigate')event.respondWith((async()=>{
    const cache=await caches.open(CACHE),offline=await cache.match(url('offline.html'));
    if(!offline)return failure();
    // Absolute in-scope links work even when the unknown URL is deeply nested.
    const html=(await offline.text()).replace('href="./releases/', 'href="'+url('releases/')).replace('href="./index.html"','href="'+url('index.html')+'"');
    return new Response(html,{status:404,headers:{'Content-Type':'text/html; charset=utf-8'}});
  })());
});
self.addEventListener('message',event=>{
  if(!event.data||event.data.type!=='ARCADE_CACHE_STATUS'||!event.ports||!event.ports[0])return;
  event.waitUntil((async()=>{const cache=await caches.open(CACHE);const present=await Promise.all(Object.keys(ASSETS).map(path=>cache.match(url(path))));event.ports[0].postMessage({release:RELEASE,complete:present.every(Boolean)})})());
});
