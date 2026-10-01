/* PONTO DE ENCAIXE DAS REGRAS. Hoje é um STUB que só deixa o fluxo completo funcionar (começar luta -> agir -> terminar -> recompensa).
   Substitua cada função pelo sistema real (dano, hacking, iniciativa, XP, captura/recrutamento…). O motor só conhece este contrato:

   iniciar(contexto) -> b        contexto = { zona, chefe, aliados:[...], nivel } ; devolve o objeto `b` guardado em STATE.battle (precisa ser JSON puro)
   acoes(b) -> [{ id, nome, ic }]  botões mostrados ao jogador
   agir(b, acaoId, estado)       aplica a ação; deve preencher b.log (strings) e, quando acabar, b.fim = 'venceu' | 'perdeu' | 'fugiu'
   recompensa(b, estado) -> { creditos, xp, itens, cartoes }   chamada 1x quando b.fim === 'venceu'  */
window.NG_REGRAS = {
  iniciar: function(ctx){
    return { zona: ctx.zona ? ctx.zona.id : null, chefe: ctx.chefe ? ctx.chefe.id : null, nivel: ctx.nivel || 1,
             inimigo: ctx.chefe ? ctx.chefe.nome : 'Hostil ('+((ctx.zona&&ctx.zona.inimigos[0])||'?')+')', turno: 1, fim: null,
             log: ['⚠️ Contato hostil: '+(ctx.chefe ? ctx.chefe.nome : 'inimigo')+'.', '(Regras de combate ainda não implementadas — esqueleto.)'] };
  },
  acoes: function(b){ return [ { id:'atacar', nome:'Atacar', ic:'🔫' }, { id:'hackear', nome:'Hackear', ic:'💻' }, { id:'fugir', nome:'Fugir', ic:'🏃' } ]; },
  agir: function(b, acao){
    b.turno++;
    if(acao==='fugir'){ b.log.push('Você escapou pelas sombras.'); b.fim = 'fugiu'; return; }
    /* STUB: 70% de vitória só pra testar o fluxo de recompensa/derrota */
    b.log.push('Você usou '+acao+'…');
    if(b.turno>=3){ b.fim = Math.random()<0.7 ? 'venceu' : 'perdeu'; b.log.push(b.fim==='venceu' ? '✅ Alvo neutralizado.' : '❌ Você foi derrotado.'); }
  },
  recompensa: function(b){ return { creditos: 20 + b.nivel*5, xp: 10 + b.nivel*2, cartoes: 0, itens:{} }; }
};
