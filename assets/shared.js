(function(){
  'use strict';
  var cfg=window.AB_CONFIG||{}, RECORDS='p207_records_v1', SESSION='p207_session_v1', PROFILE='p207_profile_v1', remoteQueue=Promise.resolve();
  function now(){return new Date().toISOString();}
  function escText(v){return String(v==null?'':v).trim();}
  function getLocalRecords(){try{var x=JSON.parse(localStorage.getItem(RECORDS)||'[]');return Array.isArray(x)?x:[];}catch(e){return [];}}
  function saveLocalRecord(rec){var rows=getLocalRecords(),i=rows.findIndex(function(x){return x.studyKey===rec.studyKey&&x.participantId===rec.participantId;});if(i>=0)rows[i]=Object.assign({},rows[i],rec);else rows.push(rec);localStorage.setItem(RECORDS,JSON.stringify(rows));return rec;}
  function clearLocalRecords(){localStorage.removeItem(RECORDS);}
  function normalizeProfile(p){if(!p||typeof p!=='object')return null;var o={studentId:escText(p.studentId),name:escText(p.name),className:escText(p.className)};return o.studentId&&o.name&&o.className?o:null;}
  function getProfile(){try{return normalizeProfile(JSON.parse(localStorage.getItem(PROFILE)||'null'));}catch(e){return null;}}
  function setProfile(p){var o=normalizeProfile(p);if(!o)throw new Error('profile incomplete');localStorage.setItem(PROFILE,JSON.stringify(o));return o;}
  function clearProfile(){localStorage.removeItem(PROFILE);}
  function hashProfile(p){var s=p.studentId+'|'+cfg.studyKey,h=2166136261;for(var i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619);}return 'participant-'+(h>>>0).toString(16).padStart(8,'0');}
  function previewVariant(){if(!cfg.allowPreviewOverride)return '';var p=new URLSearchParams(location.search).get('preview');p=(p||'').toUpperCase();return p==='A'||p==='B'?p:'';}
  function getSession(){try{return JSON.parse(localStorage.getItem(SESSION)||'null');}catch(e){return null;}}
  function setSession(s){localStorage.setItem(SESSION,JSON.stringify(s));return s;}
  function clearSession(){localStorage.removeItem(SESSION);}
  function createSession(forceNew){var pv=previewVariant(),profile=getProfile();if(!forceNew&&!pv){var old=getSession();if(old&&old.studyKey===cfg.studyKey&&(!profile||old.studentId===profile.studentId)){return old;}}
    var s={studyKey:cfg.studyKey,participantId:pv?'preview-'+pv.toLowerCase():(profile?hashProfile(profile):'participant-'+Math.random().toString(16).slice(2,10)),variant:pv||(crypto.getRandomValues(new Uint8Array(1))[0]<128?'A':'B'),preview:!!pv,startedAt:now(),impressionAt:'',clickedAt:'',completedAt:'',status:'started',clickCount:0,studentId:profile?profile.studentId:'',participantName:profile?profile.name:'',className:profile?profile.className:''};if(!pv)setSession(s);return s;}
  function apiUrl(path){var base=String(cfg.apiBase||'').replace(/\/$/,'');return base?base+path:'';}
  async function pushRecord(rec){if(rec.preview)return {ok:true,preview:true};var stored=Object.assign({},rec);saveLocalRecord(stored);var url=apiUrl('/api/participant');if(!url)return {ok:true,local:true};remoteQueue=remoteQueue.catch(function(){return null;}).then(function(){return fetch(url,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({studyKey:cfg.studyKey,record:stored})}).then(function(r){if(!r.ok)throw new Error('remote '+r.status);return r.json();});});return remoteQueue;}
  async function fetchResults(token){var url=apiUrl('/api/results?studyKey='+encodeURIComponent(cfg.studyKey));if(!url)return {ok:true,items:getLocalRecords(),source:'local'};var r=await fetch(url,{headers:{authorization:'Bearer '+(token||'')}});if(r.status===401||r.status===403)throw new Error('AUTH');if(!r.ok)throw new Error('remote '+r.status);var data=await r.json();data.source='remote';return data;}
  function summarize(items){items=(items||[]).filter(function(x){return x&&!x.preview;});function stats(v){var all=items.filter(function(x){return x.variant===v;}),clicks=all.filter(function(x){return Number(x.clickCount||0)>0||x.clickedAt;});return {exposures:all.length,clicks:clicks.length,ctr:all.length?clicks.length/all.length:0,done:all.filter(function(x){return x.status==='completed';}).length};}var A=stats('A'),B=stats('B'),diff=B.ctr-A.ctr;return {A:A,B:B,total:items.length,diff:diff,lift:A.ctr?diff/A.ctr:0};}
  window.P2={cfg:cfg,getLocalRecords:getLocalRecords,saveLocalRecord:saveLocalRecord,clearLocalRecords:clearLocalRecords,getProfile:getProfile,setProfile:setProfile,clearProfile:clearProfile,getSession:getSession,setSession:setSession,clearSession:clearSession,createSession:createSession,pushRecord:pushRecord,fetchResults:fetchResults,summarize:summarize,now:now};
})();
