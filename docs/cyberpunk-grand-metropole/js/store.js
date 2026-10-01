/* Camada de ARMAZENAMENTO (equivale ao Firestore do Green Área): 1 documento por conta, chat público, mensagens diretas, lista de contas.
   Dois modos com a MESMA interface (assíncrona, baseada em Promise):
     - local: localStorage + BroadcastChannel (funciona sem servidor; várias abas do mesmo navegador "conversam" entre si)
     - firebase: Firestore, se `window.NG_FIREBASE_CONFIG` existir (config.js). Coleções: ng_saves, ng_chat, ng_dm. (NÃO testado ainda -- só o modo local foi exercitado.)
   O resto do jogo nunca sabe qual está em uso. */
(function(){
'use strict';
var NS = 'ng_';
var bc = null; try{ bc = new BroadcastChannel('grand-metropole'); }catch(e){}
var ouvintes = { chat:[], dm:[], conta:[] };
function lerJSON(k, pad){ try{ var v = localStorage.getItem(NS+k); return v ? JSON.parse(v) : pad; }catch(e){ return pad; } }
function gravaJSON(k, v){ try{ localStorage.setItem(NS+k, JSON.stringify(v)); return true; }catch(e){ return false; } }
function avisa(tipo, dado){ ouvintes[tipo].forEach(function(f){ try{ f(dado); }catch(e){} }); }
if(bc) bc.onmessage = function(e){ if(e.data && e.data.tipo) avisa(e.data.tipo, e.data.dado); };
function difunde(tipo, dado){ if(bc) bc.postMessage({ tipo:tipo, dado:dado }); }

var Local = {
  modo:'local',
  getConta: function(id){ return Promise.resolve(lerJSON('conta_'+id, null)); },
  salvaConta: function(id, dados){ var idx = lerJSON('contas', []); if(idx.indexOf(id)<0){ idx.push(id); gravaJSON('contas', idx); } gravaJSON('conta_'+id, dados); difunde('conta', { id:id }); return Promise.resolve(); },
  apagaConta: function(id){ var idx = lerJSON('contas', []).filter(function(x){ return x!==id; }); gravaJSON('contas', idx); try{ localStorage.removeItem(NS+'conta_'+id); }catch(e){} return Promise.resolve(); },
  listaContas: function(){ return Promise.resolve(lerJSON('contas', []).map(function(id){ var c = lerJSON('conta_'+id, {}); return { id:id, nome:c.nome, nivel:c.nivel, atualizado:c.atualizadoEm, admin:!!c.adminConcedido }; })); },
  enviaChat: function(msg){ var l = lerJSON('chat', []); l.push(msg); if(l.length>200) l = l.slice(-200); gravaJSON('chat', l); difunde('chat', msg); return Promise.resolve(); },
  lerChat: function(){ return Promise.resolve(lerJSON('chat', [])); },
  enviaDM: function(a, b, msg){ var k = 'dm_'+[a,b].sort().join('__'); var l = lerJSON(k, []); l.push(msg); gravaJSON(k, l); difunde('dm', { par:[a,b], msg:msg }); return Promise.resolve(); },
  lerDM: function(a, b){ return Promise.resolve(lerJSON('dm_'+[a,b].sort().join('__'), [])); },
  aoChat: function(f){ ouvintes.chat.push(f); }, aoDM: function(f){ ouvintes.dm.push(f); }, aoConta: function(f){ ouvintes.conta.push(f); }
};
if(typeof window!=='undefined') window.addEventListener('storage', function(e){
  if(!e.key || e.key.indexOf(NS)!==0) return;
  if(e.key===NS+'chat') avisa('chat', null);
  if(e.key.indexOf(NS+'dm_')===0) avisa('dm', null);
});

/* Firestore (carrega o SDK sob demanda). Mesmo contrato do Local. */
function criaFirebase(cfg){
  var db = null, pronto = null;
  function carrega(){
    if(pronto) return pronto;
    function js(src){ return new Promise(function(ok, no){ var s = document.createElement('script'); s.src = src; s.onload = ok; s.onerror = no; document.head.appendChild(s); }); }
    pronto = js('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js').then(function(){ return js('https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore-compat.js'); })
      .then(function(){ if(!firebase.apps.length) firebase.initializeApp(cfg); db = firebase.firestore(); });
    return pronto;
  }
  function limpa(o){ return JSON.parse(JSON.stringify(o)); }
  var F = {
    modo:'firebase',
    getConta: function(id){ return carrega().then(function(){ return db.collection('ng_saves').doc(id).get(); }).then(function(d){ return d.exists ? d.data() : null; }); },
    salvaConta: function(id, dados){ return carrega().then(function(){ return db.collection('ng_saves').doc(id).set(limpa(dados)); }); },
    apagaConta: function(id){ return carrega().then(function(){ return db.collection('ng_saves').doc(id).delete(); }); },
    listaContas: function(){ return carrega().then(function(){ return db.collection('ng_saves').get(); }).then(function(q){ return q.docs.map(function(d){ var c = d.data(); return { id:d.id, nome:c.nome, nivel:c.nivel, atualizado:c.atualizadoEm, admin:!!c.adminConcedido }; }); }); },
    enviaChat: function(msg){ return carrega().then(function(){ return db.collection('ng_chat').doc('publico').set({ mensagens: firebase.firestore.FieldValue.arrayUnion(limpa(msg)) }, { merge:true }); }); },
    lerChat: function(){ return carrega().then(function(){ return db.collection('ng_chat').doc('publico').get(); }).then(function(d){ return d.exists ? (d.data().mensagens||[]) : []; }); },
    enviaDM: function(a, b, msg){ var k = [a,b].sort().join('__'); return carrega().then(function(){ return db.collection('ng_dm').doc(k).set({ mensagens: firebase.firestore.FieldValue.arrayUnion(limpa(msg)) }, { merge:true }); }); },
    lerDM: function(a, b){ var k = [a,b].sort().join('__'); return carrega().then(function(){ return db.collection('ng_dm').doc(k).get(); }).then(function(d){ return d.exists ? (d.data().mensagens||[]) : []; }); },
    aoChat: function(f){ carrega().then(function(){ db.collection('ng_chat').doc('publico').onSnapshot(function(){ f(null); }); }); },
    aoDM: function(){}, aoConta: function(){}
  };
  return F;
}
window.NGStore = (typeof window!=='undefined' && window.NG_FIREBASE_CONFIG) ? criaFirebase(window.NG_FIREBASE_CONFIG) : Local;
})();
