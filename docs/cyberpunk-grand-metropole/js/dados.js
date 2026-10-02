/* CONTEÚDO do jogo (equivale aos *_DEX do Green Área: espécies, itens, zonas, mestres…). Troque à vontade; o motor (app.js) não conhece nomes.
   `window.NG_REGRAS` (regras.js) é o ponto de encaixe do combate: aqui só dados. */
window.NG = {
  nome: 'CYBERPUNK: GRAND METROPOLE',
  sub: 'Build interna — esqueleto cyberpunk',
  energiaMax: 1000, energiaPor10min: 10, energiaPorCartao: 100, cartoesMax: 200, cartoesIniciais: 20, cartoesPorDia: 5,
  creditosIniciais: 200,
  diaEmHoras: 6,
  /* os 3 "iniciais" que o jogador escolhe ao criar a conta (equivale aos 3 de Kanto) */
  iniciais: [
    { tipo:'drone',    nome:'Drone Cão',    ic:'🤖', desc:'Rápido e barato de manter.' },
    { tipo:'ciborgue', nome:'Ciborgue',     ic:'🦾', desc:'Resistente, ataque corpo a corpo.' },
    { tipo:'hacker',   nome:'Hacker Fantasma', ic:'🕶️', desc:'Frágil, domina a rede.' }
  ],
  /* atributos DO PERSONAGEM (sem valores por enquanto -- só os nomes aparecem na criação) */
  atributos: [
    { id:'for', nome:'Força',        ic:'💪', desc:'Dano corpo a corpo e carga.' },
    { id:'int', nome:'Inteligência', ic:'🧠', desc:'Hacking, ICE e habilidades de rede.' },
    { id:'res', nome:'Resistência',  ic:'🛡️', desc:'HP e redução de dano.' },
    { id:'vel', nome:'Velocidade',   ic:'⚡', desc:'Iniciativa, esquiva e fuga.' }
  ],
  /* partes do corpo do personagem que poderão receber implantes; `lado` = coluna onde o quadrado aparece, `y` = altura do quadrado, `alvo` = ponto da silhueta (viewBox 360x440) */
  corpo: [
    { id:'chip',    nome:'Chip cerebral', lado:'e', y:20,  alvo:[178,46] },
    { id:'cabeca',  nome:'Cabeça',        lado:'e', y:84,  alvo:[158,68] },
    { id:'coluna',  nome:'Coluna',        lado:'e', y:178, alvo:[180,200] },
    { id:'pernas',  nome:'Pernas',        lado:'e', y:308, alvo:[164,330] },
    { id:'olho',    nome:'Olho',          lado:'d', y:30,  alvo:[190,58] },
    { id:'peito',   nome:'Peito',         lado:'d', y:126, alvo:[198,150] },
    { id:'bracos',  nome:'Braços',        lado:'d', y:222, alvo:[240,200] }
  ],
  /* tipos de aliado (a "espécie") -- só rótulo + ícone */
  tipos: { drone:{ nome:'Drone', ic:'🤖' }, ciborgue:{ nome:'Ciborgue', ic:'🦾' }, hacker:{ nome:'Hacker', ic:'🕶️' }, mercenario:{ nome:'Mercenário', ic:'🔫' }, gangue:{ nome:'Gangue', ic:'🧢' } },
  itens: {
    stim:   { nome:'Stim', ic:'💉', preco:40, desc:'Consumível de cura (efeito definido nas regras).' },
    cabos:  { nome:'Kit de cabos', ic:'🔌', preco:30, desc:'Ferramenta de hacking.' },
    chip:   { nome:'Chip raro', ic:'💾', preco:120, desc:'Componente de melhoria.' },
    cartao: { nome:'Cartão de energia', ic:'🔋', preco:0, desc:'Troque por +'+100+' de Energia.' }
  },
  /* zonas de operação (equivale às Zonas de captura): custo de energia FIXO por zona */
  zonas: [
    { id:'becos',   nome:'Becos do Quarter',    custo:20, nivel:[1,5],  inimigos:['gangue','drone'], texto:'Gangues de rua e drones perdidos.' },
    { id:'docas',   nome:'Docas Industriais',   custo:40, nivel:[5,12], inimigos:['mercenario','drone'], texto:'Contrabando e segurança terceirizada.' },
    { id:'torre',   nome:'Subnível da Torre',   custo:70, nivel:[12,25], inimigos:['ciborgue','hacker'], texto:'Corporativos e ICE pesado.' }
  ],
  /* chefes (equivale aos Mestres): 1 desafio por dia do jogo; custo fixo */
  chefes: [
    { id:'kaito',  nome:'Kaito "Navalha"',  ic:'🗡️', zona:'becos', custo:150, premio:{ creditos:200, cartoes:2 }, nivel:8 },
    { id:'vega',   nome:'Dra. Vega',        ic:'💉', zona:'docas', custo:200, premio:{ creditos:350, cartoes:3 }, nivel:16 },
    { id:'oni',    nome:'ONI-9 (IA)',       ic:'🧠', zona:'torre', custo:300, premio:{ creditos:600, cartoes:5 }, nivel:28 }
  ],
  /* modelos de contrato diário (equivale às Missões Diárias) */
  contratos: [
    { id:'c1', nome:'Entregar um pacote', meta:{ tipo:'ir', alvo:'docas' },  recompensa:{ creditos:60 } },
    { id:'c2', nome:'Limpar o beco',      meta:{ tipo:'vencer', qtd:3 },      recompensa:{ creditos:90, cartoes:1 } },
    { id:'c3', nome:'Roubar um chip',     meta:{ tipo:'vencer', qtd:5 },      recompensa:{ creditos:150, itens:{ chip:1 } } },
    { id:'c4', nome:'Passar na clínica',  meta:{ tipo:'evento', alvo:'medico' }, recompensa:{ creditos:30 } },
    { id:'c5', nome:'Fazer contatos',     meta:{ tipo:'chat', qtd:2 },        recompensa:{ creditos:40 } }
  ],
  contratosPorDia: 5, contratosSlots: 5,
  wiki: [
    { t:'Energia', x:'Sobe sozinha +10 a cada 10 min reais até o máximo. Cartões de energia dão +100 na hora.' },
    { t:'Dia do jogo', x:'O "Dia" muda a cada 6 horas reais: renova cartões, contratos e desafios de chefe.' },
    { t:'Crew', x:'Seu grupo de aliados. O primeiro aliado é escolhido na criação da conta.' },
    { t:'Safehouse', x:'Hub social: chat público, amigos, mensagens e trocas.' }
  ],
  banco: [   /* "Pokédex": catálogo que vai sendo preenchido conforme o jogador encontra coisas */
    { id:'drone', nome:'Drone Cão', ic:'🤖' }, { id:'ciborgue', nome:'Ciborgue', ic:'🦾' }, { id:'hacker', nome:'Hacker Fantasma', ic:'🕶️' },
    { id:'mercenario', nome:'Mercenário', ic:'🔫' }, { id:'gangue', nome:'Gangue de rua', ic:'🧢' }
  ],
  habilidades: [  /* "Movimentos": só catálogo; efeitos reais ficam em regras.js */
    { id:'tiro', nome:'Tiro', ic:'🔫' }, { id:'corte', nome:'Corte', ic:'🗡️' }, { id:'invadir', nome:'Invadir', ic:'💻' }, { id:'escudo', nome:'Escudo', ic:'🛡️' }
  ],
  admins: ['admin', 'akamilson']   /* ids de conta (nome em minúsculas) que já nascem Admin */
};
