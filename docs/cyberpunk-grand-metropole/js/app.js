/* CYBERPUNK: GRAND METROPOLE — esqueleto de sistema copiado da ARQUITETURA do Green Área (sem as regras de Pokémon).
   Mesma ideia, peça por peça:
     STATE   progresso salvo da conta (equivale a `STATE` do Green Área)        SESSION  estado só da tela (abas, popups, formulários)
     DT      todos os handlers chamados pelos onclick="DT.xxx()"                render()   reescreve #app inteiro e preserva a rolagem
     screenHTML()  porta de entrada: login -> escolha do primeiro aliado -> luta -> popups -> tela atual (switch)
     NAV_GRUPOS    menu lateral em grupos (Social / Operações / Informação / Jogador), barra de baixo no celular
     Store         login Nome+PIN, 1 documento por conta, chat/DM (js/store.js: local ou Firestore)
     Energia (regenera sozinha) + Cartões -> Energia, Dia do jogo de 6h, quadro de Contratos (= Missões Diárias), Chefes 1x/dia, painel Admin
     Combate = js/regras.js (stub). Conteúdo = js/dados.js. */
(function(){
'use strict';
var DT = {}, NG = window.NG, R = window.NG_REGRAS, Store = window.NGStore;
var STATE = null, SESSION = null, appEl = null;
var SESSAO_KEY = 'ng_sessao_v1';
function novaSessao(aviso){ return { tela:'login', aviso:aviso||'', erro:'', modoLogin:'entrar', ocupado:false, menuAberto:false, grupoAberto:null, isAdmin:false, docId:null,
  chat:[], chatCarregando:false, amigosAbertos:null, dmCom:null, dmMsgs:[], contas:null, contasCarregando:false, confirmaApagar:null, fichaDe:null, pendIniciar:null, zonaSel:null }; }
SESSION = novaSessao();

/* ---------- utilidades ---------- */
function esc(s){ return String(s==null?'':s).replace(/[&<>"']/g, function(c){ return { '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c]; }); }
function clamp(v,a,b){ return Math.max(a, Math.min(b, v)); }
function idDoNome(n){ return String(n||'').trim().toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'').slice(0,40); }
function diaDoJogo(){ return Math.floor(Date.now()/(NG.diaEmHoras*3600*1000)); }
function el(id){ return document.getElementById(id); }
function val(id){ var e = el(id); return e ? e.value : ''; }
function uid(){ return Math.random().toString(36).slice(2,9); }

/* ---------- estado salvo ---------- */
function novoEstado(nome){
  return { versao:1, nome:nome, nivel:1, xp:0, hp:100, creditos:NG.creditosIniciais, energia:NG.energiaMax, energiaEm:Date.now(),
    cartoes:NG.cartoesIniciais, cartoesDia:diaDoJogo(), diaInicial:diaDoJogo(), personagem:null, corpo:{}, crew:[], itens:{ stim:3, cabos:1 }, amigos:[], banco:{}, battle:null, log:[],
    contratos:[null,null,null,null,null], contratoDia:{ dia:diaDoJogo(), usados:0 }, progresso:{ dia:diaDoJogo(), vencidas:0, chat:0, eventos:{}, zonas:{} },
    chefesDia:{}, adminConcedido:false, atualizadoEm:Date.now() };
}
function logar(txt){ STATE.log.unshift({ t:Date.now(), x:txt }); if(STATE.log.length>40) STATE.log.length = 40; }

/* ---------- tempo: energia, cartões por dia, virada de dia ---------- */
function tick(){
  if(!STATE) return false; var mudou = false, agora = Date.now();
  var passos = Math.floor((agora - STATE.energiaEm)/(10*60*1000));
  if(passos>0){ if(STATE.energia<NG.energiaMax) STATE.energia = clamp(STATE.energia + passos*NG.energiaPor10min, 0, NG.energiaMax); STATE.energiaEm += passos*10*60*1000; mudou = true; }
  var d = diaDoJogo();
  if(STATE.cartoesDia!==d){ STATE.cartoes = clamp(STATE.cartoes + NG.cartoesPorDia*Math.max(1,d-STATE.cartoesDia), 0, NG.cartoesMax); STATE.cartoesDia = d; mudou = true; }
  if(STATE.progresso.dia!==d){ STATE.progresso = { dia:d, vencidas:0, chat:0, eventos:{}, zonas:{} }; STATE.chefesDia = {}; mudou = true; }
  if(STATE.contratoDia.dia!==d){ STATE.contratoDia = { dia:d, usados:0 }; mudou = true; }
  return mudou;
}
/* relógio do jogo: o dia de 6 h reais vira 24 h de jogo */
function relogio(){
  var passo = NG.diaEmHoras*3600*1000, frac = (Date.now()%passo)/passo, min = Math.floor(frac*1440);
  return { hora:('0'+Math.floor(min/60)).slice(-2)+':'+('0'+(min%60)).slice(-2), dia:diaDoJogo()-(STATE&&STATE.diaInicial||diaDoJogo())+1, noite:min<360||min>=1140 };
}
function hudHTML(){
  var r = relogio();
  return '<div class="ng-hud"><b>'+esc(STATE.nome)+'</b><span>¥ '+STATE.creditos+'</span><span>⚡ '+STATE.energia+' / '+NG.energiaMax+'</span><span>'+(r.noite?'🌙':'☀️')+' '+r.hora+' · Dia '+r.dia+'</span></div>';
}
function horasParaDia(){ var passo = NG.diaEmHoras*3600*1000, falta = passo - (Date.now()%passo); var h = Math.floor(falta/3600000), m = Math.floor((falta%3600000)/60000); return h+'h'+('0'+m).slice(-2); }

/* ---------- salvar / carregar ---------- */
var salvarTimer = null;
function salvar(){ if(!STATE || !SESSION.docId) return; clearTimeout(salvarTimer); salvarTimer = setTimeout(function(){ STATE.atualizadoEm = Date.now(); Store.salvaConta(SESSION.docId, STATE).catch(function(){ SESSION.erro = 'Não consegui salvar. Verifique a conexão.'; render(); }); }, 250); }
function contaEhAdmin(id, c){ return NG.admins.indexOf(id)!==-1 || !!(c && c.adminConcedido); }
function aplicaConta(id, c){
  STATE = c;
  SESSION.docId = id; SESSION.isAdmin = contaEhAdmin(id, c); SESSION.tela = 'hub'; tick();
  /* garante campos de versões novas */
  var base = novoEstado(c.nome); Object.keys(base).forEach(function(k){ if(STATE[k]===undefined) STATE[k] = base[k]; });
}
function entrarComConta(id, pin){
  return Store.getConta(id).then(function(c){
    if(!c) throw new Error('Conta não encontrada.');
    if(String(c.pin)!==String(pin)) throw new Error('PIN incorreto.');
    aplicaConta(id, c); try{ localStorage.setItem(SESSAO_KEY, JSON.stringify({ id:id, pin:pin })); }catch(e){}
  });
}

/* ---------- ações (DT) ---------- */
DT.setModoLogin = function(m){ SESSION.modoLogin = m; SESSION.erro = ''; render(); };
DT.entrar = function(){
  var nome = val('ngNome'), pin = val('ngPin'), id = idDoNome(nome);
  if(!id || !pin){ SESSION.erro = 'Informe nome e PIN.'; return render(); }
  SESSION.ocupado = true; SESSION.erro = ''; render();
  entrarComConta(id, pin).then(function(){ SESSION.ocupado = false; render(); }).catch(function(e){ SESSION.ocupado = false; SESSION.erro = e.message || 'Erro ao entrar.'; render(); });
};
DT.criar = function(){
  var nome = String(val('ngNome2')).trim(), p1 = val('ngPin2a'), p2 = val('ngPin2b'), id = idDoNome(nome);
  if(!id){ SESSION.erro = 'Escolha um nome (letras e números).'; return render(); }
  if(p1.length<4){ SESSION.erro = 'O PIN precisa de pelo menos 4 dígitos.'; return render(); }
  if(p1!==p2){ SESSION.erro = 'Os PINs não batem.'; return render(); }
  SESSION.ocupado = true; SESSION.erro = ''; render();
  Store.getConta(id).then(function(ex){
    if(ex) throw new Error('Já existe um runner com esse nome.');
    var c = novoEstado(nome.slice(0,18)); c.pin = p1; return Store.salvaConta(id, c).then(function(){ return entrarComConta(id, p1); });
  }).then(function(){ SESSION.ocupado = false; render(); }).catch(function(e){ SESSION.ocupado = false; SESSION.erro = e.message || 'Erro ao criar.'; render(); });
};
DT.sair = function(){ try{ localStorage.removeItem(SESSAO_KEY); }catch(e){} STATE = null; SESSION = novaSessao('Você saiu da conta.'); render(); };
DT.irTela = function(t){ SESSION.tela = t; SESSION.erro = ''; SESSION.menuAberto = false; SESSION.grupoAberto = null; if(t==='centro') carregaChat(); if(t==='mensagens') abreMensagens(); if(t==='admin') carregaContas(); render(); };
DT.abrirGrupo = function(g){ SESSION.grupoAberto = SESSION.grupoAberto===g ? null : g; render(); };
DT.fecharGrupo = function(){ SESSION.grupoAberto = null; render(); };
DT.menu = function(){ SESSION.menuAberto = !SESSION.menuAberto; render(); };

/* personagem: criação (só nome por enquanto) e corpo */
DT.criarPersonagem = function(){
  var n = String(val('ngPersNome')).trim().slice(0,18); if(!n){ SESSION.erro = 'Escolha um nome para o personagem.'; return render(); }
  STATE.nome = n; STATE.personagem = { nome:n, criadoEm:Date.now() }; logar('Personagem criado: '+n+'.'); salvar(); SESSION.tela = 'personagem'; render();
};
DT.slotCorpo = function(id){ var p = NG.corpo.filter(function(x){ return x.id===id; })[0]; if(p){ SESSION.aviso = p.nome+': ainda não há implantes disponíveis.'; render(); } };

/* primeiro aliado */
DT.escolherInicial = function(tipo){
  var n = NG.iniciais.filter(function(i){ return i.tipo===tipo; })[0]; if(!n) return;
  STATE.crew.push({ id:uid(), tipo:tipo, apelido:n.nome, nivel:1 }); STATE.banco[tipo] = true; STATE.itens.stim = 3; STATE.itens.cabos = 1; logar('Recrutou '+n.nome+'.'); salvar(); render();
};

/* energia / cartões */
DT.usarCartoes = function(qtd){
  tick(); qtd = Math.min(qtd, STATE.cartoes); var espaco = NG.energiaMax - STATE.energia; var real = Math.min(qtd, Math.ceil(espaco/NG.energiaPorCartao));
  if(real<=0){ SESSION.erro = STATE.cartoes<=0 ? 'Sem cartões.' : 'Energia já está cheia.'; return render(); }
  STATE.cartoes -= real; STATE.energia = clamp(STATE.energia + real*NG.energiaPorCartao, 0, NG.energiaMax); logar('Usou '+real+' cartão(ões): +'+real*NG.energiaPorCartao+' de energia.'); salvar(); render();
};

/* luta (gate global: enquanto STATE.battle existir, nada mais navega) */
function pagaEnergia(custo){ tick(); if(STATE.energia<custo){ SESSION.erro = 'Energia insuficiente ('+STATE.energia+'/'+custo+'). Use um cartão ou espere.'; return false; } STATE.energia -= custo; return true; }
DT.iniciarZona = function(id){
  var z = NG.zonas.filter(function(x){ return x.id===id; })[0]; if(!z || STATE.battle) return;
  if(!STATE.crew.length){ SESSION.erro = 'Você precisa de pelo menos um aliado.'; return render(); }
  if(!pagaEnergia(z.custo)) return render();
  var nv = z.nivel[0] + Math.floor(Math.random()*(z.nivel[1]-z.nivel[0]+1));
  STATE.battle = R.iniciar({ zona:z, aliados:STATE.crew, nivel:nv }); STATE.progresso.zonas[z.id] = true; logar('Entrou em '+z.nome+'.'); salvar(); render();
};
DT.desafiarChefe = function(id){
  var c = NG.chefes.filter(function(x){ return x.id===id; })[0]; if(!c || STATE.battle) return;
  if(STATE.chefesDia[id]){ SESSION.erro = 'Esse chefe já foi desafiado hoje. Volta em '+horasParaDia()+'.'; return render(); }
  if(!pagaEnergia(c.custo)) return render();
  STATE.chefesDia[id] = true; STATE.battle = R.iniciar({ chefe:c, zona:NG.zonas.filter(function(z){ return z.id===c.zona; })[0], aliados:STATE.crew, nivel:c.nivel }); logar('Desafiou '+c.nome+'.'); salvar(); render();
};
DT.agir = function(acao){
  var b = STATE.battle; if(!b || b.fim) return; R.agir(b, acao, STATE); salvar(); render();
};
DT.encerrarLuta = function(){
  var b = STATE.battle; if(!b) return; var txt = '';
  if(b.fim==='venceu'){
    var r = R.recompensa(b, STATE) || {};
    STATE.creditos += r.creditos||0; STATE.xp += r.xp||0; STATE.cartoes = clamp(STATE.cartoes + (r.cartoes||0), 0, NG.cartoesMax);
    Object.keys(r.itens||{}).forEach(function(k){ STATE.itens[k] = (STATE.itens[k]||0) + r.itens[k]; });
    var chefe = b.chefe && NG.chefes.filter(function(c){ return c.id===b.chefe; })[0];
    if(chefe){ STATE.creditos += chefe.premio.creditos||0; STATE.cartoes = clamp(STATE.cartoes + (chefe.premio.cartoes||0), 0, NG.cartoesMax); }
    STATE.progresso.vencidas++; txt = 'Venceu '+esc(b.inimigo)+' (+'+(r.creditos||0)+'¥).'; subirNivel();
  } else if(b.fim==='perdeu'){ STATE.hp = 100; txt = 'Derrota. Você acorda na clínica (sem custo).'; }
  else txt = 'Fugiu.';
  logar(txt); STATE.battle = null; salvar(); render();
};
function subirNivel(){ var need = STATE.nivel*50; while(STATE.xp>=need){ STATE.xp -= need; STATE.nivel++; need = STATE.nivel*50; logar('Subiu para o nível '+STATE.nivel+'.'); } }

/* contratos diários: 5 slots, no máximo 5 por DIA do jogo (igual ao quadro de Missões Diárias) */
function contratoProgresso(s){
  var m = s.def.meta, p = STATE.progresso;
  if(m.tipo==='vencer') return Math.min(m.qtd, p.vencidas - (s.base||0));
  if(m.tipo==='chat') return Math.min(m.qtd, p.chat - (s.base||0));
  if(m.tipo==='ir') return p.zonas[m.alvo] ? 1 : 0; if(m.tipo==='evento') return p.eventos[m.alvo] ? 1 : 0; return 0;
}
function contratoMeta(s){ var m = s.def.meta; return m.qtd || 1; }
DT.pegarContrato = function(i){
  tick(); if(STATE.contratos[i]) return;
  if(STATE.contratoDia.usados>=NG.contratosPorDia){ SESSION.erro = 'Você já aceitou '+NG.contratosPorDia+' contratos hoje. Volta em '+horasParaDia()+'.'; return render(); }
  var ativos = STATE.contratos.filter(Boolean).map(function(s){ return s.def.id; });
  var livres = NG.contratos.filter(function(c){ return ativos.indexOf(c.id)<0; }); if(!livres.length){ SESSION.erro = 'Nenhum contrato disponível.'; return render(); }
  var def = livres[Math.floor(Math.random()*livres.length)];
  STATE.contratos[i] = { def:def, base:(def.meta.tipo==='vencer'?STATE.progresso.vencidas:(def.meta.tipo==='chat'?STATE.progresso.chat:0)), pronta:false };
  STATE.contratoDia.usados++; salvar(); render();
};
DT.entregarContrato = function(i){
  var s = STATE.contratos[i]; if(!s || contratoProgresso(s)<contratoMeta(s)) return;
  var r = s.def.recompensa; STATE.creditos += r.creditos||0; STATE.cartoes = clamp(STATE.cartoes + (r.cartoes||0), 0, NG.cartoesMax);
  Object.keys(r.itens||{}).forEach(function(k){ STATE.itens[k] = (STATE.itens[k]||0)+r.itens[k]; });
  logar('Contrato entregue: '+s.def.nome+'.'); STATE.contratos[i] = null; salvar(); render();
};
DT.abandonarContrato = function(i){ STATE.contratos[i] = null; salvar(); render(); };
function contratosProntos(){ return STATE.contratos.filter(function(s){ return s && contratoProgresso(s)>=contratoMeta(s); }).length; }

/* crew / mochila */
DT.renomear = function(id){ var a = STATE.crew.filter(function(x){ return x.id===id; })[0]; var n = prompt('Novo apelido:', a.apelido); if(n && n.trim()){ a.apelido = n.trim().slice(0,18); salvar(); render(); } };
DT.liberar = function(id){ if(STATE.crew.length<=1){ SESSION.erro = 'Você não pode ficar sem aliados.'; return render(); } if(!confirm('Dispensar este aliado?')) return; STATE.crew = STATE.crew.filter(function(x){ return x.id!==id; }); salvar(); render(); };
DT.comprar = function(k){ var it = NG.itens[k]; if(STATE.creditos<it.preco){ SESSION.erro = 'Créditos insuficientes.'; return render(); } STATE.creditos -= it.preco; STATE.itens[k] = (STATE.itens[k]||0)+1; salvar(); render(); };
DT.usarItem = function(k){ if(!(STATE.itens[k]>0)) return; STATE.itens[k]--; if(k==='stim'){ STATE.hp = Math.min(100, STATE.hp+30); } logar('Usou '+NG.itens[k].nome+'.'); salvar(); render(); };

/* social: chat público, amigos, mensagens diretas */
function carregaChat(){ SESSION.chatCarregando = true; Store.lerChat().then(function(l){ SESSION.chat = l; SESSION.chatCarregando = false; if(SESSION.tela==='centro') render(); }); }
DT.enviarChat = function(){ var t = String(val('ngChatTxt')).trim(); if(!t) return; var m = { de:SESSION.docId, nome:STATE.nome, texto:t.slice(0,200), ts:Date.now() }; STATE.progresso.chat++; el('ngChatTxt').value = ''; Store.enviaChat(m).then(function(){ carregaChat(); }); salvar(); };
DT.addAmigo = function(){ var id = idDoNome(val('ngAmigo')); if(!id || id===SESSION.docId){ SESSION.erro = 'Nome inválido.'; return render(); }
  Store.getConta(id).then(function(c){ if(!c){ SESSION.erro = 'Runner não encontrado.'; return render(); } if(STATE.amigos.indexOf(id)<0){ STATE.amigos.push(id); salvar(); } SESSION.aviso = c.nome+' foi adicionado aos amigos.'; render(); }); };
DT.rmAmigo = function(id){ STATE.amigos = STATE.amigos.filter(function(x){ return x!==id; }); salvar(); render(); };
function abreMensagens(){ if(SESSION.dmCom) DT.abrirDM(SESSION.dmCom); }
DT.abrirDM = function(id){ SESSION.dmCom = id; Store.lerDM(SESSION.docId, id).then(function(l){ SESSION.dmMsgs = l; if(SESSION.tela==='mensagens') render(); }); render(); };
DT.enviarDM = function(){ var t = String(val('ngDmTxt')).trim(); if(!t || !SESSION.dmCom) return; var m = { de:SESSION.docId, texto:t.slice(0,300), ts:Date.now() }; Store.enviaDM(SESSION.docId, SESSION.dmCom, m).then(function(){ DT.abrirDM(SESSION.dmCom); }); };
Store.aoChat(function(){ if(SESSION.tela==='centro' && STATE) carregaChat(); });
Store.aoDM(function(){ if(SESSION.tela==='mensagens' && SESSION.dmCom && STATE) DT.abrirDM(SESSION.dmCom); });

/* admin */
function carregaContas(){ if(!SESSION.isAdmin) return; SESSION.contasCarregando = true; Store.listaContas().then(function(l){ SESSION.contas = l; SESSION.contasCarregando = false; if(SESSION.tela==='admin') render(); }); }
DT.adminPromover = function(id, v){ Store.getConta(id).then(function(c){ c.adminConcedido = !!v; return Store.salvaConta(id, c); }).then(carregaContas); };
DT.adminApagar = function(id){ if(SESSION.confirmaApagar!==id){ SESSION.confirmaApagar = id; return render(); } SESSION.confirmaApagar = null; Store.apagaConta(id).then(carregaContas); };
DT.adminRecarregar = function(){ tick(); STATE.energia = NG.energiaMax; STATE.cartoes = NG.cartoesMax; STATE.creditos += 1000; salvar(); render(); };
DT.adminResetar = function(){ if(!confirm('Resetar o PROGRESSO desta conta?')) return; var pin = STATE.pin, nome = STATE.nome, adm = STATE.adminConcedido; STATE = novoEstado(nome); STATE.pin = pin; STATE.adminConcedido = adm; salvar(); SESSION.tela = 'hub'; render(); };
DT.adminAplicar = function(){
  tick(); var n = function(id, a, b, atual){ var v = parseInt(val(id), 10); return isNaN(v) ? atual : clamp(v, a, b); };
  STATE.creditos = n('adCred', 0, 999999999, STATE.creditos); STATE.energia = n('adEn', 0, NG.energiaMax, STATE.energia);
  STATE.cartoes = n('adCart', 0, NG.cartoesMax, STATE.cartoes); STATE.nivel = n('adNv', 1, 999, STATE.nivel); STATE.hp = n('adHp', 0, 100, STATE.hp);
  logar('Admin: valores ajustados.'); salvar(); SESSION.aviso = 'Valores aplicados.'; render();
};
DT.adminCorpo = function(){ NG.corpo.forEach(function(p){ var v = String(val('adCorpo_'+p.id)).trim().slice(0,24); if(v) STATE.corpo[p.id] = v; else delete STATE.corpo[p.id]; }); salvar(); SESSION.aviso = 'Corpo atualizado.'; render(); };
DT.adminZerarDia = function(){ STATE.contratoDia = { dia:diaDoJogo(), usados:0 }; STATE.chefesDia = {}; STATE.contratos = [null,null,null,null,null]; salvar(); SESSION.aviso = 'Contratos e chefes do dia renovados.'; render(); };
DT.adminRefazerPersonagem = function(){ if(!confirm('Refazer o personagem? (nome e corpo voltam ao início)')) return; STATE.personagem = null; STATE.corpo = {}; salvar(); render(); };
DT.adminApagarMinha = function(){
  if(SESSION.confirmaApagar!==SESSION.docId){ SESSION.confirmaApagar = SESSION.docId; SESSION.aviso = 'Clique de novo em "Apagar minha conta" para confirmar. Isso é definitivo.'; return render(); }
  var id = SESSION.docId; Store.apagaConta(id).then(function(){ DT.sair(); SESSION.aviso = 'Conta apagada.'; render(); });
};
DT.adminLimparSessoes = function(){ SESSION.aviso = 'Nada a limpar neste esqueleto.'; render(); };

/* ---------- telas ---------- */
function barra(v, max, cor){ return '<div class="ng-barra"><i style="width:'+clamp(v/max*100,0,100)+'%;background:'+cor+'"></i></div>'; }
function bannersHTML(){ return (SESSION.erro ? '<div class="ng-banner erro" onclick="DT.limpa()">'+esc(SESSION.erro)+'</div>' : '')+(SESSION.aviso ? '<div class="ng-banner ok" onclick="DT.limpa()">'+esc(SESSION.aviso)+'</div>' : ''); }
DT.limpa = function(){ SESSION.erro = ''; SESSION.aviso = ''; render(); };
var avisoT = null;
function agendaBanner(){ clearTimeout(avisoT); if(SESSION.erro || SESSION.aviso) avisoT = setTimeout(function(){ SESSION.erro = ''; SESSION.aviso = ''; render(); }, 5000); }

function loginHTML(){
  var m = SESSION.modoLogin, o = '<div class="ng-card ng-login"><div class="ng-logo">'+esc(NG.nome)+'</div><p class="ng-sub">'+esc(NG.sub)+'</p>'+
   '<div class="ng-abas"><button class="'+(m==='entrar'?'on':'')+'" onclick="DT.setModoLogin(\'entrar\')">Entrar</button><button class="'+(m==='criar'?'on':'')+'" onclick="DT.setModoLogin(\'criar\')">Criar runner</button></div>';
  if(m==='entrar') o += '<label>Nome<input id="ngNome" maxlength="18" autocomplete="username"></label><label>PIN<input id="ngPin" type="password" inputmode="numeric" maxlength="12" autocomplete="current-password"></label>'+
    '<button class="ng-btn pri" '+(SESSION.ocupado?'disabled':'')+' onclick="DT.entrar()">🔓 Entrar</button>';
  else o += '<label>Nome<input id="ngNome2" maxlength="18"></label><label>PIN (mín. 4 dígitos)<input id="ngPin2a" type="password" inputmode="numeric" maxlength="12"></label><label>Confirme o PIN<input id="ngPin2b" type="password" inputmode="numeric" maxlength="12"></label>'+
    '<button class="ng-btn pri" '+(SESSION.ocupado?'disabled':'')+' onclick="DT.criar()">➕ Criar</button>';
  return o + '<p class="ng-hint">Modo de armazenamento: <b>'+Store.modo+'</b>'+(Store.modo==='local'?' (só neste navegador)':'')+'</p></div>';
}
function atributosListaHTML(){ return '<div class="ng-attr-lista">'+NG.atributos.map(function(a){ return '<div><b>'+a.ic+' '+esc(a.nome)+'</b><small>'+esc(a.desc)+'</small></div>'; }).join('')+'</div>'; }
function criacaoPersonagemHTML(){
  return '<div class="ng-card ng-login"><div class="ng-logo">Crie seu personagem</div><p class="ng-sub">Seus atributos ainda não têm valores definidos.</p>'+
    '<label>Nome<input id="ngPersNome" maxlength="18" value="'+esc(STATE.nome)+'" onkeydown="if(event.key===\'Enter\')DT.criarPersonagem()"></label>'+
    '<h3>Atributos</h3>'+atributosListaHTML()+'<button class="ng-btn pri" onclick="DT.criarPersonagem()">✔ Criar personagem</button></div>';
}
function personagemHTML(){
  var L = 4, W = 100, H = 34, VB_W = 360, VB_H = 520;
  /* silhueta neutra: metade direita desenhada com curvas e espelhada; cabeça com mandíbula, pescoço, ombros, cintura, quadril, mãos e pés */
  var meia = 'M180 100 C192 100 204 103 214 108 C228 111 238 118 240 134 C242 160 246 190 247 214 C248 240 252 268 254 290 C257 300 258 312 254 320 C250 326 244 322 244 312 C241 296 238 270 236 248 C233 215 229 180 224 154 C220 170 211 196 209 228 C208 250 222 262 221 290 C221 322 217 352 213 382 C211 400 213 425 207 462 C206 474 210 484 222 488 L190 488 C190 470 192 440 192 410 C192 390 190 372 189 352 C188 330 183 310 180 296 Z';
  var cabeca = 'M180 34 C193 34 200 44 200 58 C200 70 193 80 186 84 L174 84 C167 80 160 70 160 58 C160 44 167 34 180 34 Z';
  var svg = '<svg class="ng-corpo-svg" viewBox="0 0 '+VB_W+' '+VB_H+'" role="img" aria-label="Corpo do personagem"><defs>'+
    '<linearGradient id="ngSil" gradientUnits="userSpaceOnUse" x1="0" y1="30" x2="0" y2="490"><stop offset="0" stop-color="#16394a"/><stop offset="1" stop-color="#08141c"/></linearGradient>'+
    '<filter id="ngGlow" x="-20%" y="-10%" width="140%" height="120%"><feGaussianBlur stdDeviation="2.2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>'+
    '<g class="sil" filter="url(#ngGlow)"><rect x="171" y="78" width="18" height="28" rx="5"/><path d="'+cabeca+'"/><path d="'+meia+'"/><path d="'+meia+'" transform="translate(360,0) scale(-1,1)"/><rect class="costura" x="178.6" y="101" width="2.8" height="194"/></g>';
  svg += NG.corpo.map(function(p){
    var x = p.lado==='e' ? L : VB_W-L-W, ex = p.lado==='e' ? x+W : x, cy = p.y+H/2, v = STATE.corpo[p.id];
    return '<line class="lin" x1="'+ex+'" y1="'+cy+'" x2="'+p.alvo[0]+'" y2="'+p.alvo[1]+'"/><circle class="pt" cx="'+p.alvo[0]+'" cy="'+p.alvo[1]+'" r="3"/>'+
      '<g class="slot" onclick="DT.slotCorpo(\''+p.id+'\')"><rect x="'+x+'" y="'+p.y+'" width="'+W+'" height="'+H+'" rx="4"/><text x="'+(x+8)+'" y="'+(p.y+15)+'">'+esc(p.nome)+'</text><text class="vz" x="'+(x+8)+'" y="'+(p.y+27)+'">'+esc(v||'— vazio —')+'</text></g>';
  }).join('');
  /* caixa de atributos (só nomes, sem valores) colada no canto esquerdo do campo do corpo */
  var attrs = '<div class="ng-attr-box"><b>ATRIBUTOS</b>'+NG.atributos.map(function(a){ return '<span title="'+esc(a.desc)+'">'+a.ic+' '+esc(a.nome)+'</span>'; }).join('')+'</div>';
  return '<div class="ng-card ng-corpo-card"><h2>'+esc(STATE.nome)+'</h2><p class="ng-hint">Cada quadrado é um ponto do corpo que poderá receber uma modificação.</p><div class="ng-corpo-campo">'+attrs+svg+'</svg></div></div>';
}
function escolhaInicialHTML(){
  return '<div class="ng-card ng-login"><div class="ng-logo">Escolha seu primeiro aliado</div><p class="ng-sub">Você vai começar a jornada com ele.</p><div class="ng-iniciais">'+
    NG.iniciais.map(function(i){ return '<button class="ng-inicial" onclick="DT.escolherInicial(\''+i.tipo+'\')"><span>'+i.ic+'</span><b>'+esc(i.nome)+'</b><small>'+esc(i.desc)+'</small></button>'; }).join('')+'</div></div>';
}
function hubHTML(){
  tick(); var p = STATE.contratoDia, prox = STATE.contratos.filter(Boolean).length;
  return '<div class="ng-card"><h2>Início</h2><div class="ng-grade">'+
    '<div class="ng-stat"><small>Energia</small><b>'+STATE.energia+' / '+NG.energiaMax+'</b>'+barra(STATE.energia, NG.energiaMax, '#00f0ff')+'<small>+'+NG.energiaPor10min+' a cada 10 min</small></div>'+
    '<div class="ng-stat"><small>HP</small><b>'+STATE.hp+' / 100</b>'+barra(STATE.hp, 100, '#ff2bd6')+'</div>'+
    '<div class="ng-stat"><small>Créditos</small><b>¥ '+STATE.creditos+'</b></div>'+
    '<div class="ng-stat"><small>Cartões de energia</small><b>🔋 '+STATE.cartoes+'</b><button class="ng-btn sm" onclick="DT.usarCartoes(1)">Usar 1 (+'+NG.energiaPorCartao+')</button></div>'+
    '<div class="ng-stat"><small>Nível '+STATE.nivel+'</small><b>'+STATE.xp+' / '+(STATE.nivel*50)+' XP</b>'+barra(STATE.xp, STATE.nivel*50, '#ffd36b')+'</div>'+
    '<div class="ng-stat"><small>Próximo dia em</small><b>'+horasParaDia()+'</b><small>Contratos hoje: '+p.usados+'/'+NG.contratosPorDia+' · ativos: '+prox+'</small></div>'+
    '</div><div class="ng-linha"><button class="ng-btn pri" onclick="DT.irTela(\'contratos\')">⚔️ Operações</button><button class="ng-btn" onclick="DT.irTela(\'diario\')">📔 Contratos'+(contratosProntos()?' ('+contratosProntos()+' prontos)':'')+'</button></div></div>'+
    '<div class="ng-card"><h3>Registro</h3>'+(STATE.log.length ? '<ul class="ng-log">'+STATE.log.slice(0,8).map(function(l){ return '<li><small>'+new Date(l.t).toLocaleTimeString().slice(0,5)+'</small> '+esc(l.x)+'</li>'; }).join('')+'</ul>' : '<p class="ng-hint">Nada ainda.</p>')+'</div>';
}
function contratosOpsHTML(){
  return '<div class="ng-card"><h2>Operações — zonas</h2><p class="ng-hint">Cada entrada gasta uma energia FIXA por zona. Energia: <b>'+STATE.energia+'</b></p><div class="ng-lista">'+
   NG.zonas.map(function(z){ return '<div class="ng-item"><div><b>'+esc(z.nome)+'</b><small>Nv '+z.nivel[0]+'–'+z.nivel[1]+' · '+esc(z.texto)+'</small></div><button class="ng-btn pri" onclick="DT.iniciarZona(\''+z.id+'\')">⚡ '+z.custo+'</button></div>'; }).join('')+'</div></div>';
}
function chefesHTML(){
  return '<div class="ng-card"><h2>Chefes</h2><p class="ng-hint">1 desafio por dia do jogo, por chefe.</p><div class="ng-lista">'+
   NG.chefes.map(function(c){ var feito = STATE.chefesDia[c.id]; return '<div class="ng-item"><div><b>'+c.ic+' '+esc(c.nome)+'</b><small>Nv '+c.nivel+' · prêmio ¥'+c.premio.creditos+' + '+c.premio.cartoes+' 🔋</small></div><button class="ng-btn '+(feito?'':'pri')+'" '+(feito?'disabled':'')+' onclick="DT.desafiarChefe(\''+c.id+'\')">'+(feito?'Hoje já foi':'⚡ '+c.custo)+'</button></div>'; }).join('')+'</div></div>';
}
function crewHTML(){
  return '<div class="ng-card"><h2>Crew</h2><div class="ng-lista">'+STATE.crew.map(function(a){ var t = NG.tipos[a.tipo]||{ ic:'❔', nome:a.tipo };
    return '<div class="ng-item"><div><b>'+t.ic+' '+esc(a.apelido)+'</b><small>'+esc(t.nome)+' · Nv '+a.nivel+'</small>'+'</div><div><button class="ng-btn sm" onclick="DT.renomear(\''+a.id+'\')">✏️</button> <button class="ng-btn sm" onclick="DT.liberar(\''+a.id+'\')">🗑️</button></div></div>'; }).join('')+'</div></div>';
}
function mochilaHTML(){
  var ks = Object.keys(NG.itens).filter(function(k){ return k!=='cartao'; });
  return '<div class="ng-card"><h2>Mochila</h2><div class="ng-lista">'+ks.map(function(k){ var it = NG.itens[k], q = STATE.itens[k]||0;
    return '<div class="ng-item"><div><b>'+it.ic+' '+esc(it.nome)+' ×'+q+'</b><small>'+esc(it.desc)+'</small></div><div>'+(k==='stim'?'<button class="ng-btn sm" '+(q?'':'disabled')+' onclick="DT.usarItem(\'stim\')">Usar</button> ':'')+
      '<button class="ng-btn sm" onclick="DT.comprar(\''+k+'\')">¥'+it.preco+'</button></div></div>'; }).join('')+'</div></div>';
}
function diarioHTML(){
  var o = '<div class="ng-card"><h2>Diário — contratos</h2><p class="ng-hint">Hoje: '+STATE.contratoDia.usados+'/'+NG.contratosPorDia+' aceitos · renova em '+horasParaDia()+'</p><div class="ng-lista">';
  STATE.contratos.forEach(function(s, i){
    if(!s){ o += '<div class="ng-item"><div><small>Espaço livre</small></div><button class="ng-btn pri" onclick="DT.pegarContrato('+i+')">+ Pegar</button></div>'; return; }
    var prog = contratoProgresso(s), meta = contratoMeta(s), ok = prog>=meta;
    o += '<div class="ng-item"><div><b>'+esc(s.def.nome)+'</b><small>'+prog+'/'+meta+' · ¥'+(s.def.recompensa.creditos||0)+(s.def.recompensa.cartoes?' + '+s.def.recompensa.cartoes+' 🔋':'')+'</small>'+barra(prog, meta, '#4cffb0')+'</div><div>'+(ok?'<button class="ng-btn pri" onclick="DT.entregarContrato('+i+')">Entregar</button>':'<button class="ng-btn sm" onclick="DT.abandonarContrato('+i+')">Abandonar</button>')+'</div></div>';
  });
  return o + '</div></div>';
}
function centroHTML(){
  var msgs = SESSION.chat.slice(-40).map(function(m){ return '<div class="ng-msg'+(m.de===SESSION.docId?' meu':'')+'"><b>'+esc(m.nome)+'</b> '+esc(m.texto)+'</div>'; }).join('');
  var am = STATE.amigos.map(function(id){ return '<div class="ng-item"><div><b>'+esc(id)+'</b></div><div><button class="ng-btn sm" onclick="SESSION_dm(\''+id+'\')">💬</button> <button class="ng-btn sm" onclick="DT.rmAmigo(\''+id+'\')">✖</button></div></div>'; }).join('') || '<p class="ng-hint">Sem amigos ainda.</p>';
  return '<div class="ng-card"><h2>Safehouse</h2><h3>Chat público</h3><div class="ng-chat" id="ngChatLog">'+(msgs||'<p class="ng-hint">Silêncio…</p>')+'</div>'+
    '<div class="ng-linha"><input id="ngChatTxt" maxlength="200" placeholder="Mensagem" onkeydown="if(event.key===\'Enter\')DT.enviarChat()"><button class="ng-btn pri" onclick="DT.enviarChat()">Enviar</button></div></div>'+
    '<div class="ng-card"><h3>Amigos</h3><div class="ng-linha"><input id="ngAmigo" maxlength="18" placeholder="Nome do runner"><button class="ng-btn" onclick="DT.addAmigo()">Adicionar</button></div><div class="ng-lista">'+am+'</div></div>';
}
window.SESSION_dm = function(id){ SESSION.tela = 'mensagens'; DT.abrirDM(id); };
function mensagensHTML(){
  var lista = STATE.amigos.map(function(id){ return '<button class="ng-btn '+(SESSION.dmCom===id?'pri':'')+'" onclick="DT.abrirDM(\''+id+'\')">'+esc(id)+'</button>'; }).join(' ') || '<p class="ng-hint">Adicione amigos na Safehouse para conversar.</p>';
  var conv = SESSION.dmCom ? '<div class="ng-chat">'+(SESSION.dmMsgs.map(function(m){ return '<div class="ng-msg'+(m.de===SESSION.docId?' meu':'')+'">'+esc(m.texto)+'</div>'; }).join('')||'<p class="ng-hint">Sem mensagens.</p>')+'</div><div class="ng-linha"><input id="ngDmTxt" maxlength="300" placeholder="Mensagem para '+esc(SESSION.dmCom)+'" onkeydown="if(event.key===\'Enter\')DT.enviarDM()"><button class="ng-btn pri" onclick="DT.enviarDM()">Enviar</button></div>' : '';
  return '<div class="ng-card"><h2>Mensagens</h2><div class="ng-linha">'+lista+'</div>'+conv+'</div>';
}
function infoHTML(titulo, lista, f){ return '<div class="ng-card"><h2>'+titulo+'</h2><div class="ng-lista">'+lista.map(f).join('')+'</div></div>'; }
function bancoHTML(){ return infoHTML('Banco de dados', NG.banco, function(b){ var v = STATE.banco[b.id]; return '<div class="ng-item"><div><b>'+(v?b.ic+' '+esc(b.nome):'❔ ???')+'</b><small>'+(v?'Visto':'Ainda não encontrado')+'</small></div></div>'; }); }
function habHTML(){ return infoHTML('Habilidades', NG.habilidades, function(h){ return '<div class="ng-item"><div><b>'+h.ic+' '+esc(h.nome)+'</b><small>Efeito definido em regras.js</small></div></div>'; }); }
function wikiHTML(){ return infoHTML('Wiki', NG.wiki, function(w){ return '<div class="ng-item"><div><b>'+esc(w.t)+'</b><small>'+esc(w.x)+'</small></div></div>'; }); }
function adminHTML(){
  if(!SESSION.isAdmin) return '<div class="ng-card"><p>Acesso negado.</p></div>';
  var l = SESSION.contas ? SESSION.contas.map(function(c){ var eu = c.id===SESSION.docId;
    return '<div class="ng-item"><div><b>'+esc(c.nome||c.id)+'</b><small>'+c.id+' · nv '+(c.nivel||1)+(c.admin?' · admin':'')+'</small></div><div>'+(eu?'':'<button class="ng-btn sm" onclick="DT.adminPromover(\''+c.id+'\','+(!c.admin)+')">'+(c.admin?'Rebaixar':'Dar admin')+'</button> <button class="ng-btn sm danger" onclick="DT.adminApagar(\''+c.id+'\')">'+(SESSION.confirmaApagar===c.id?'Confirmar?':'Apagar')+'</button>')+'</div></div>'; }).join('') : '<p class="ng-hint">'+(SESSION.contasCarregando?'Carregando…':'—')+'</p>';
  var campo = function(id, rot, v){ return '<label>'+rot+'<input id="'+id+'" type="number" value="'+v+'"></label>'; };
  var ferr = '<div class="ng-card"><h3>Meus valores</h3><div class="ng-grade">'+campo('adCred','Créditos',STATE.creditos)+campo('adEn','Energia (0–'+NG.energiaMax+')',STATE.energia)+campo('adCart','Cartões',STATE.cartoes)+campo('adNv','Nível',STATE.nivel)+campo('adHp','HP (0–100)',STATE.hp)+'</div>'+
    '<div class="ng-linha"><button class="ng-btn pri" onclick="DT.adminAplicar()">Aplicar</button><button class="ng-btn" onclick="DT.adminZerarDia()">🔄 Renovar contratos e chefes do dia</button></div></div>'+
    '<div class="ng-card"><h3>Corpo (implantes)</h3><div class="ng-grade">'+NG.corpo.map(function(p){ return '<label>'+esc(p.nome)+'<input id="adCorpo_'+p.id+'" maxlength="24" placeholder="vazio" value="'+esc(STATE.corpo[p.id]||'')+'"></label>'; }).join('')+'</div>'+
    '<div class="ng-linha"><button class="ng-btn pri" onclick="DT.adminCorpo()">Salvar corpo</button><button class="ng-btn" onclick="DT.adminRefazerPersonagem()">🧍 Refazer personagem</button></div></div>'+
    '<div class="ng-card"><h3>Detalhes da conta</h3><div class="ng-hint">'+['id: '+SESSION.docId,'nome: '+STATE.nome,'dia do jogo: '+diaDoJogo()+' (renova em '+horasParaDia()+')','store: '+Store.modo,'aliados: '+STATE.crew.length+' · vitórias hoje: '+STATE.progresso.vencidas,'contratos hoje: '+STATE.contratoDia.usados+'/'+NG.contratosPorDia,'atualizado: '+new Date(STATE.atualizadoEm).toLocaleString()].map(esc).join('<br>')+'</div>'+
    '<button class="ng-btn danger" onclick="DT.adminApagarMinha()">'+(SESSION.confirmaApagar===SESSION.docId?'⚠️ Confirmar: apagar minha conta':'🗑️ Apagar minha conta')+'</button></div>';
  return ferr+'<div class="ng-card"><h2>Painel Admin</h2><div class="ng-linha"><button class="ng-btn" onclick="DT.adminRecarregar()">⚡ Recarregar tudo</button><button class="ng-btn danger" onclick="DT.adminResetar()">♻️ Resetar minha conta</button></div><h3>Contas</h3><div class="ng-lista">'+l+'</div></div>';
}
function lutaHTML(){
  var b = STATE.battle, acoes = b.fim ? '' : R.acoes(b).map(function(a){ return '<button class="ng-btn pri" onclick="DT.agir(\''+a.id+'\')">'+a.ic+' '+esc(a.nome)+'</button>'; }).join(' ');
  return '<div class="ng-card ng-luta"><h2>⚔️ '+esc(b.inimigo)+'</h2><div class="ng-log">'+b.log.map(function(x){ return '<div>'+esc(x)+'</div>'; }).join('')+'</div>'+
    (b.fim ? '<button class="ng-btn pri" onclick="DT.encerrarLuta()">Concluir ('+b.fim+')</button>' : '<div class="ng-linha">'+acoes+'</div>')+'</div>';
}

/* ---------- navegação ---------- */
var NAV_GRUPOS = [
  { id:'social', ic:'👥', nome:'Social', itens:[ { id:'centro', ic:'🏚️', nome:'Safehouse' }, { id:'mensagens', ic:'💬', nome:'Mensagens' } ] },
  { id:'ops', ic:'⚔️', nome:'Operações', itens:[ { id:'contratos', ic:'🌃', nome:'Zonas' }, { id:'chefes', ic:'☠️', nome:'Chefes' } ] },
  { id:'info', ic:'📚', nome:'Informação', itens:[ { id:'habilidades', ic:'💻', nome:'Habilidades' }, { id:'banco', ic:'🗂️', nome:'Banco de dados' }, { id:'wiki', ic:'📖', nome:'Wiki' } ] },
  { id:'jogador', ic:'🎒', nome:'Jogador', itens:[ { id:'personagem', ic:'🧍', nome:'Personagem' }, { id:'crew', ic:'🦾', nome:'Crew' }, { id:'mochila', ic:'🧳', nome:'Mochila' }, { id:'diario', ic:'📔', nome:'Diário' } ] }
];
function badgeGrupo(g){ return g==='jogador' ? contratosProntos() : 0; }
function sidebarHTML(){
  var o = '<aside class="ng-side'+(SESSION.menuAberto?' aberto':'')+'"><div class="ng-marca">'+esc(NG.nome)+'</div>'+hudHTML()+'<nav>'+
   '<button class="'+(SESSION.tela==='hub'?'on':'')+'" onclick="DT.irTela(\'hub\')">🏠 Início</button>';
  NAV_GRUPOS.forEach(function(g){ var ativo = SESSION.grupoAberto===g.id || g.itens.some(function(i){ return i.id===SESSION.tela; }), b = badgeGrupo(g.id);
    o += '<button class="'+(ativo?'on':'')+'" onclick="DT.abrirGrupo(\''+g.id+'\')">'+g.ic+' '+g.nome+(b?' <span class="ng-ba">'+b+'</span>':'')+'</button>'; });
  if(SESSION.isAdmin) o += '<button class="'+(SESSION.tela==='admin'?'on':'')+'" onclick="DT.irTela(\'admin\')">🛠️ Admin</button>';
  return o+'<button onclick="DT.sair()">🚪 Sair</button></nav></aside>';
}
function grupoPopupHTML(){
  var g = NAV_GRUPOS.filter(function(x){ return x.id===SESSION.grupoAberto; })[0]; if(!g) return '';
  return '<div class="ng-overlay" onclick="DT.fecharGrupo()"><div class="ng-pop" onclick="event.stopPropagation()"><h3>'+g.ic+' '+g.nome+'</h3>'+
   g.itens.map(function(i){ return '<button class="ng-btn '+(SESSION.tela===i.id?'pri':'')+'" onclick="DT.irTela(\''+i.id+'\')">'+i.ic+' '+i.nome+'</button>'; }).join('')+'</div></div>';
}
function topbarMovelHTML(){ return '<div class="ng-topo"><div class="ng-topo-l"><button class="ng-btn sm" onclick="DT.menu()">☰</button><b>'+esc(NG.nome)+'</b></div>'+hudHTML()+'</div>'; }
function tabbarMovelHTML(){ return '<div class="ng-tabbar"><button onclick="DT.irTela(\'hub\')">🏠</button>'+NAV_GRUPOS.map(function(g){ return '<button onclick="DT.abrirGrupo(\''+g.id+'\')">'+g.ic+'</button>'; }).join('')+'</div>'; }
function wrap(corpo){ return '<div class="ng-shell">'+sidebarHTML()+'<div class="ng-main">'+topbarMovelHTML()+'<div class="ng-corpo">'+bannersHTML()+corpo+'</div></div></div>'+tabbarMovelHTML()+grupoPopupHTML(); }

/* porta de entrada de TODAS as telas -- os "gates" vêm antes do switch, igual ao Green Área */
function screenHTML(){
  if(!STATE) return '<div class="ng-solo">'+bannersHTML()+loginHTML()+'</div>';
  if(!STATE.personagem) return '<div class="ng-solo">'+bannersHTML()+criacaoPersonagemHTML()+'</div>';
  if(!STATE.crew.length) return '<div class="ng-solo">'+bannersHTML()+escolhaInicialHTML()+'</div>';
  if(STATE.battle) return wrap(lutaHTML());
  switch(SESSION.tela){
    case 'hub': return wrap(hubHTML());
    case 'contratos': return wrap(contratosOpsHTML());
    case 'chefes': return wrap(chefesHTML());
    case 'personagem': return wrap(personagemHTML());
    case 'crew': return wrap(crewHTML());
    case 'mochila': return wrap(mochilaHTML());
    case 'diario': return wrap(diarioHTML());
    case 'centro': return wrap(centroHTML());
    case 'mensagens': return wrap(mensagensHTML());
    case 'banco': return wrap(bancoHTML());
    case 'habilidades': return wrap(habHTML());
    case 'wiki': return wrap(wikiHTML());
    case 'admin': return wrap(adminHTML());
    default: return wrap(hubHTML());
  }
}
var PRESERVAR = ['ngChatLog'];
function render(){
  if(!appEl) appEl = el('app'); agendaBanner();
  var foco = document.activeElement && document.activeElement.id, selIni, scroll = {};
  PRESERVAR.forEach(function(id){ var e = el(id); if(e) scroll[id] = [e.scrollTop, e.scrollHeight - e.clientHeight - e.scrollTop]; });
  var valores = {}; ['ngChatTxt','ngDmTxt','ngAmigo'].forEach(function(i){ var e = el(i); if(e) valores[i] = e.value; });
  appEl.innerHTML = screenHTML();
  Object.keys(valores).forEach(function(i){ var e = el(i); if(e) e.value = valores[i]; });
  if(foco && el(foco) && /^ng(ChatTxt|DmTxt|Amigo)$/.test(foco)){ el(foco).focus(); }
  var log = el('ngChatLog'); if(log) log.scrollTop = log.scrollHeight;
}
function atualizaHUD(){ if(!STATE) return; var h = hudHTML(); document.querySelectorAll('.ng-hud').forEach(function(e){ e.outerHTML = h; }); }

/* ---------- arranque: sessão guardada (só id+PIN, NUNCA o progresso) ---------- */
window.DT = DT;
window.__ng = function(){ return { STATE:STATE, SESSION:SESSION }; };
setInterval(function(){ if(STATE && tick()){ salvar(); if(SESSION.tela==='hub') render(); else atualizaHUD(); } }, 30000);
setInterval(function(){ if(STATE) atualizaHUD(); }, 5000);   /* relógio do jogo: 1 min de jogo = 15 s reais */
(function(){
  var s = null; try{ s = JSON.parse(localStorage.getItem(SESSAO_KEY)); }catch(e){}
  if(s && s.id){ entrarComConta(s.id, s.pin).then(render).catch(function(){ try{ localStorage.removeItem(SESSAO_KEY); }catch(e){} render(); }); }
  else render();
})();
})();
