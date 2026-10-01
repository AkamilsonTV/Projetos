/* DADOS do jogo (tudo aqui é conteúdo; o motor não conhece nomes). Para criar uma área nova, adicione em `areas`. */
window.JOGO = {
  jogador: 'runner',
  inicio: { area:'rua', x:19, y:23, dir:3 },
  personagens: [
    { id:'runner',  pele:'#d9a98a', roupa:'#2a2250', neon:'#00f0ff', cabelo:'#ff2bd6' },
    { id:'medico',  pele:'#c98f6e', roupa:'#e8e6ff', neon:'#4cffb0', cabelo:'#2c2660' },
    { id:'barman',  pele:'#e0b090', roupa:'#5b1f4a', neon:'#ffd36b', cabelo:'#101010' },
    { id:'lojista', pele:'#b8805c', roupa:'#1f4a5b', neon:'#ff2bd6', cabelo:'#6bf3ff' },
    { id:'guarda',  pele:'#9a6b50', roupa:'#3a3a48', neon:'#ff3b3b', cabelo:'#1a1a1a' },
    { id:'civil',   pele:'#e2b99a', roupa:'#4a3a22', neon:'#ffd36b', cabelo:'#8a4a2a' }
  ],
  /* chave = caractere usado nos mapas desenhados à mão */
  tiles: [
    { id:'estrada', chave:'.', base:'#0f0d22', vars:2 },
    { id:'faixa',   chave:'-', base:'#0f0d22' },
    { id:'calcada', chave:',', base:'#1b1838', vars:2 },
    { id:'parede',  chave:'W', base:'#12102a', solido:true, vars:3 },
    { id:'parede',  chave:'P', base:'#12102a', solido:true, vars:3 },
    { id:'porta',   chave:'D', base:'#12102a', brilho:0x00f0ff },
    { id:'neon',    chave:'N', base:'#12102a', solido:true, cor:'#ff2bd6', brilho:0xff2bd6 },
    { id:'neon',    chave:'Nc', base:'#12102a', solido:true, cor:'#00f0ff', brilho:0x00f0ff },
    { id:'agua',    chave:'~', base:'#071a33', solido:true },
    { id:'ponte',   chave:'=', base:'#2a2540' },
    { id:'caixa',   chave:'T', base:'#171433', solido:true },
    { id:'maquina', chave:'V', base:'#171433', solido:true, brilho:0x00f0ff },
    { id:'mato',    chave:'m', base:'#0d0b22', vars:2 },
    { id:'piso',    chave:'_', base:'#1a1738' },
    { id:'balcao',  chave:'B', base:'#1a1738', solido:true },
    { id:'paredei', chave:'#', base:'#100e26', solido:true, vars:2 },
    { id:'saida',   chave:'S', base:'#1a1738' },
    { id:'cama',    chave:'C', base:'#1a1738', solido:true },
    { id:'vaso',    chave:'v', base:'#1a1738', solido:true }
  ],
  tilePorChave: function(c){ return this.tiles.filter(function(t){ return t.chave===c; })[0] || null; },
  /* eventos genéricos: aqui entram as suas regras (combate, hacking, comércio, missões...). `f(estado, cena)` roda ao escolher a opção. */
  eventos: {
    medico: { quem:'Ripperdoc Vega', linhas:['Sua carne está em frangalhos, runner.', 'Reparo completo: 40¥.'], opcoes:[
      { t:'Consertar (40¥)', f:function(e){ if(e.creditos>=40){ e.creditos -= 40; e.hp = 100; } } }, { t:'Agora não', f:null } ] },
    barman: { quem:'Barman Ko', linhas:['Noodles com sinapse extra. 15¥.', 'Ouvi dizer que a Arasaka tá recrutando nos becos.'], opcoes:[
      { t:'Comer (15¥)', f:function(e){ if(e.creditos>=15){ e.creditos -= 15; e.hp = Math.min(100, e.hp+20); } } }, { t:'Só ouvir', f:function(e){ e.rep += 1; } } ] },
    loja: { quem:'NetMart', linhas:['Chips, cabos, cafeína. O que vai ser?'], opcoes:[
      { t:'Kit de cabos (30¥)', f:function(e){ if(e.creditos>=30){ e.creditos -= 30; e.flags.cabos = true; } } }, { t:'Sair', f:null } ] },
    patrulha: { quem:'Drone de patrulha', linhas:['ESCANEANDO… identidade não registrada.', 'Evento aleatório: coloque aqui seu sistema de combate/hacking.'], opcoes:[
      { t:'Correr', f:null }, { t:'Subornar (20¥)', f:function(e){ if(e.creditos>=20){ e.creditos -= 20; e.rep += 1; } else e.hp -= 15; } } ] }
  },
  areas: {
    rua: { id:'rua', nome:'Neon Quarter', tipo:'fora', w:40, h:28, fundo:'.', chuva:true,
      faixas:[ { x:0, y:21, w:40, h:5, c:'.' }, { x:0, y:23, w:40, h:1, c:'-' }, { x:18, y:0, w:4, h:28, c:'.' } ],
      agua:[ { x:0, y:13, w:18, h:2 }, { x:22, y:13, w:18, h:2 } ], pontes:[ { x:18, y:13, w:4, h:2 } ],
      predios:[
        { x:3,  y:4, w:8, h:6, dest:'clinica',  px:5, py:7, nome:'Clínica', cor:'c' },
        { x:25, y:4, w:9, h:6, dest:'bar',      px:6, py:7, nome:'Bar',     cor:'' },
        { x:3,  y:16, w:8, h:4, dest:'loja',    px:4, py:7, nome:'Loja',    cor:'' },
        { x:26, y:16, w:8, h:4, dest:'casa',    px:4, py:6, nome:'Apartamento', cor:'c' }
      ],
      objetos:[ { c:'T', x:12, y:20 }, { c:'T', x:13, y:20 }, { c:'V', x:15, y:20, nome:'Máquina', fala:['Refrigerante sintético. Sem troco.'] }, { c:'T', x:36, y:20 } ],
      zonas:[ { x:12, y:5, w:4, h:7, evento:'patrulha', chance:.12, visivel:true }, { x:36, y:5, w:3, h:7, evento:'patrulha', chance:.12, visivel:true } ],
      npcs:[ { sprite:'guarda', nome:'Guarda corporativo', x:20, y:11, dir:0, fala:['Circulando. Sem parar na ponte.'] },
             { sprite:'civil', nome:'Civil', x:16, y:22, dir:0, anda:true, raio:3, fala:['A chuva ácida corroeu meu guarda-chuva de novo…'] },
             { sprite:'civil', nome:'Civil', x:30, y:22, dir:2, anda:true, raio:3, fala:['Dizem que o Quarter nunca dorme. Eu durmo. Pouco.'] } ] },
    clinica: { id:'clinica', nome:'Clínica do Vega', tipo:'dentro', w:12, h:9, fundo:'_',
      linhas:['############','############','#__________#','#__BBBBB___#','#__________#','#__________#','#__________#','#__________#','#####SS#####'],
      saidas:[ { x:5, y:8, dest:'rua', px:7, py:10, dir:0 }, { x:6, y:8, dest:'rua', px:7, py:10, dir:0 } ],
      inicio:{x:5,y:7}, npcs:[ { sprite:'medico', nome:'Ripperdoc Vega', x:5, y:2, dir:0, evento:'medico' } ] },
    bar: { id:'bar', nome:'Noodle Bar', tipo:'dentro', w:13, h:9, fundo:'_',
      linhas:['#############','#############','#___________#','#_BBBBBBB___#','#___________#','#___________#','#___________#','#___________#','######SS#####'],
      saidas:[ { x:6, y:8, dest:'rua', px:29, py:10, dir:0 }, { x:7, y:8, dest:'rua', px:29, py:10, dir:0 } ],
      inicio:{x:6,y:7}, npcs:[ { sprite:'barman', nome:'Barman Ko', x:4, y:2, dir:0, evento:'barman' }, { sprite:'civil', nome:'Cliente', x:9, y:5, dir:1, fala:['Não olhe pro meu prato.'] } ] },
    loja: { id:'loja', nome:'NetMart', tipo:'dentro', w:11, h:9, fundo:'_',
      linhas:['###########','###########','#_________#','#_BBBBB___#','#_________#','#_________#','#_________#','#_________#','####SS#####'],
      saidas:[ { x:4, y:8, dest:'rua', px:7, py:20, dir:0 }, { x:5, y:8, dest:'rua', px:7, py:20, dir:0 } ],
      inicio:{x:4,y:7}, npcs:[ { sprite:'lojista', nome:'Atendente', x:4, y:2, dir:0, evento:'loja' } ] },
    casa: { id:'casa', nome:'Seu apartamento', tipo:'dentro', w:9, h:8, fundo:'_',
      linhas:['#########','#########','#CC_____v#','#________#','#________#','#________#','#________#','####SS###'],
      saidas:[ { x:4, y:7, dest:'rua', px:30, py:20, dir:0 }, { x:5, y:7, dest:'rua', px:30, py:20, dir:0 } ],
      objetos:[ { c:'v', x:7, y:2, nome:'Planta', fala:['A única coisa viva aqui.'] } ],
      inicio:{x:4,y:6}, npcs:[] }
  }
};
