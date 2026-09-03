# Guia do Treinador

> Este guia acompanha o Diário de Treinador e é atualizado sempre que a gente muda ou adiciona alguma função no site. Se algo aqui não bater com o que você vê na tela, é sinal de que o guia ainda vai ser atualizado — pergunta pro Mestre.

## Entrando no Diário

Na tela inicial, clique em **"Sou Treinador"**.

- **Primeira vez nesta mesa?** Clique em **"Criar personagem"**. Escolha um nome e um PIN (mínimo 4 caracteres) — é só você e o Mestre que precisam saber esse PIN. Sua ficha começa no Nível 1, com todos os Atributos zerados.
- **Já tem ficha?** Clique em **"Já tenho ficha"** e entre com nome + PIN.

O PIN fica guardado em texto simples no banco de dados — é uma trava social pro grupo, não um cofre. Não reaproveite uma senha importante aqui.

## Sua ficha

### Nível e Atributos

- **Nível**: só o Mestre muda. Ele sobe automaticamente a cada 4 batalhas vencidas, ou o Mestre pode conceder um Nível por motivo de história.
- **Atributos** (Vigor, Vontade, Resistência, Mental, Foco, Agilidade): a cada Nível, você ganha 1 ponto pra distribuir, na ordem:
  - **Nível ímpar (1, 3, 5...)**: aparece um botão pra cada Atributo — clique no que você quer aumentar. Some depois de usado.
  - **Nível par (2, 4, 6...)**: aparece um único botão **"🎲 Sortear atributo"** — ao clicar, o sistema rola o dado sozinho e já aplica o ponto (se cair num Atributo que já está no máximo, ele rola de novo automaticamente, sem você precisar fazer nada).
  - Se não tem nenhum ponto pendente, aparece um aviso dizendo em que Nível o próximo libera.
  - Errou o clique num Nível ímpar? Avisa o Mestre — ele tem uma ferramenta de Correção pra isso (só alcança escolhas de Nível ímpar; o sorteio de par não dá pra desfazer, o dado decidiu).

### Compartilhar com a mesa

O botão **"Compartilhar com a mesa"** deixa outros Treinadores verem sua ficha (só leitura — ninguém edita a ficha de outra pessoa). Fica salvo em **"Mesa → Fichas compartilhadas"**, visível pra todo mundo que também estiver logado.

## Equipe e Banco (seus Pokémon)

Você tem 6 posições de **Equipe** (os Pokémon ativos) e um **Banco** sem limite (menu deslizante — botão **"🗃️ Banco (N)"**).

**Quem escolhe qual Pokémon existe na sua ficha é o Mestre** — Espécie, Tipo, Atributos Naturais e Movimentos são configurados por ele. O que você controla é a **organização**: arrastando pela alcinha **⠿** no canto de cada card, dá pra:

- Mover um Pokémon do Banco pra um slot vazio da Equipe.
- Trocar de lugar com um Pokémon já ativo (solta em cima dele).
- Reordenar dentro da própria Equipe ou dentro do próprio Banco.
- Mandar um Pokémon ativo de volta pro Banco (arrasta pra dentro do menu do Banco).

Funciona com mouse ou toque (celular).

### O que você pode editar em cada Pokémon

- **Apelido**.
- **PV atual** (o número de Pontos de Vida que ele tem agora), digitando direto.

O botão **"curar"** que aparece no card (restaura PV cheio, limpa Condição/Confusão e enche o PP dos 4 Movimentos, tudo de uma vez) agora é **só do Mestre** — você só vê os números.

### Escolhendo os Movimentos

Você mesmo escolhe os 4 Movimentos do seu Pokémon — mas só entre o que a espécie realmente pode aprender (não dá pra digitar qualquer coisa). Pra cada um dos 4 slots, tem uma barra **"Learnset"** com quatro opções:

- **Nível**: os Movimentos que a espécie aprende naturalmente subindo de Nível. Só aparecem os que já estão liberados pelo seu Nível atual de Treinador (Cap. 8.2 das Regras) — o menu mostra "Nome (Nv. X)" pra cada opção.
- **Evo**: os Movimentos que a espécie ganha automaticamente ao evoluir pra essa forma — sem depender de Nível.
- **TM**: os Movimentos que a espécie pode aprender por Fita de Movimento, sem depender de Nível.
- **Egg**: os Movimentos que a espécie pode aprender por Breeding.

Clique no método (Nível/Evo/TM/Egg) e depois escolha o Movimento no menu que aparece — Tipo, Categoria, Poder, **PP**, Prioridade, Precisão e a Descrição são preenchidos sozinhos. Se a lista aparecer vazia, é porque a espécie não tem nada disponível ali (ou você ainda não subiu Nível suficiente, no caso do Nível). Não existe mais opção de HM — os jogos oficiais tiraram essa mecânica a partir da Geração 9.

O **PP** aparece como "atual / máximo" — some 1 (ou 2, se o alvo tiver a Habilidade Pressure) cada vez que você usa aquele Movimento de verdade, tanto na Arena quanto contando na mão. Zerou, o Movimento fica bloqueado até alguém colocar PP nele de novo. Diferente do PV Atual (que você continua editando direto), o **PP Atual e o PP Máximo agora só o Mestre edita** — pra recuperar PP, use um item de Recuperação de PP (ver Mochila/Cura abaixo) ou peça pro Mestre.

### O que só o Mestre edita (você só vê)

- Espécie, Tipo 1/2, Atributos Naturais e Efetivos.
- Vínculo e Maturidade.
- Natureza — um dos 25 temperamentos oficiais (ex.: Adamant, Timid, Bold...). Cada Natureza dá +1 num Atributo Efetivo e -1 em outro (PV nunca entra nessa conta); 5 delas são neutras e não mudam nada. É só referência mecânica: aparece no card, mas quem ajusta é o Mestre.
- Habilidade — restrita às habilidades reais daquela espécie (incluindo a Habilidade Oculta, quando existe). A maioria delas já tem efeito de verdade na Arena — aparece marcada com **⚙️** no seletor do Mestre (ex.: Static paralisa 30% das vezes quem te acerta de perto, Intimidate baixa o Ataque de quem entra contra você, Levitate te deixa imune a golpe de Terra). As que ainda não têm ⚙️ continuam só como referência de mesa, sem gatilho automático.
- Condição (queimadura, veneno, sono, etc.) e Confuso — aparecem em destaque (um selo vermelho) no topo do card quando ativos, pra você não perder o que está rolando na batalha.
- **Estágios** (±6): os bônus/penalidades temporários de batalha (Ataque, Defesa, Atq. Especial, Def. Especial, Velocidade, Precisão, Evasão) — agora mudam sozinhos, pelo próprio Movimento que causa (ex.: Swords Dance sobe o seu, Growl baixa o do alvo), e voltam a 0 automaticamente sempre que o Pokémon sai de campo (desmaia, é trocado ou foge). Só o Mestre ajusta um Estágio na mão, pra correção.
- **PP Atual e PP Máximo** de cada Movimento (ver "Escolhendo os Movimentos" acima) — a forma de recuperar é usando um item de Recuperação de PP (Mochila/Cura abaixo) ou pedindo pro Mestre.

Cada Pokémon mostra automaticamente o sprite (a imagem pixelada) da espécie assim que o Mestre define ela. Sem espécie definida ainda, aparece um "❔" no lugar — e enquanto isso, o seletor de Movimentos fica bloqueado (precisa da Espécie pra saber o que ele pode aprender).

## Mochila (itens)

Na sua ficha, logo acima da Equipe/Banco, tem a seção **"🎒 Mochila"** — os itens que você carrega, organizados em **cinco abas**, cada uma como uma tabela (Nome / Descrição / Quantidade):

- **💊 Poções e Berries** — itens que curam o Pokémon (Poções, Curas de Status, Revives, Berries).
- **⚪ Pokébolas**.
- **🗝️ Itens de Missão** — os Itens-Chave.
- **💿 TM** — as Fitas de Movimento (Cap. 8.4 das Regras); a TM em si só fica registrada aqui, ensinar o Movimento pra valer ainda é o Mestre quem faz na aba de Movimentos.
- **🎒 Inventário Geral** — qualquer outro item (Itens de Batalha, de Evolução, Segurados etc.).

Clique numa aba pra ver os itens daquela categoria. **Só o Mestre adiciona, remove ou muda a quantidade de um item** — você só vê o que tem, com a Descrição de cada um em português (pro tipo Vida, já com o valor de cura real do NOSSO sistema — ex.: Potion diz "Restaura 5 PV.", não os 20 HP oficiais). Além da tabela, todo item tem um **tipo** que define o efeito dele, independente da aba onde aparece:

- **💊 Vida** — cura uma quantidade fixa de PV, ou cura total (o Mestre decide qual das duas). **Não funciona em Pokémon desmaiado.**
- **✨ Condição** — cura uma Condição específica (Queimadura, Veneno — que também cura Veneno Grave —, Paralisia, Sono, Congelamento ou Confusão) ou qualquer uma delas de uma vez (tipo um Full Heal). **Não funciona em Pokémon desmaiado.**
- **💫 Reviver** — o único tipo que funciona em Pokémon desmaiado (ou o Centro Pokémon, narrativamente). Devolve PV (uma quantidade fixa ou o total, dependendo do item) e reativa o Pokémon.
- **🔄 Vida + Condição** — cura PV e cura Condição/Confusão ao mesmo tempo (tipo um Full Restore). Mesma trava do tipo Vida: não funciona em desmaiado.
- **🔋 PP** — Ether, Max Ether, Elixir, Max Elixir, PP Up e PP Max (Cap. 8.6.1 das Regras): recuperam ou aumentam o PP de um Movimento (ou dos 4 de uma vez, no caso de Elixir/Max Elixir) de um Pokémon que não esteja desmaiado.
- **📦 Outro** — pedras de evolução, Itens de Batalha, Segurados, TMs etc. Ainda sem efeito mecânico automático de verdade no sistema (Cap. 25) — usar um desses pede em qual Pokémon (qualquer um, mesmo desmaiado) e consome a unidade, mas não evolui/ensina Movimento sozinho. **Pokébola é a única exceção**: não tem botão de usar nela — Pokébola é pra capturar um Pokémon selvagem/alheio, não faz sentido "usar" numa Pokémon que já é seu, então essa função fica desligada até existir um sistema de captura de verdade (via Arena).

Pokémon desmaiado só sai desse estado com um item **💫 Reviver** ou levando ele ao Centro Pokémon (fora de jogo/narrativo) — nenhum outro tipo de item cura ele.

### Usando um item direto da Mochila

Toda linha da tabela com quantidade acima de 0 (exceto Pokébola, ver acima) tem um botão **"▶️ Usar"**. Clicar nele já pergunta **em qual Pokémon** usar — sem aba, sem lista, sem passo a mais: o sistema já sabe qual item é (você acabou de clicar nele) e entende sozinho o que fazer a partir do tipo dele:

- **Vida / Condição / Vida + Condição** → só deixa escolher quem **não** está desmaiado.
- **Reviver** → só deixa escolher quem **está** desmaiado.
- **PP / Outro** → deixa escolher qualquer um, mesmo desmaiado.
- Se for um item de PP que mexe num Movimento só (Ether, Max Ether, PP Up, PP Max), depois de escolher o Pokémon ainda pergunta qual dos 4 Movimentos recebe — Elixir e Max Elixir pulam essa parte, afetando os 4 de uma vez.

A cura/efeito acontece na hora — de verdade, não é só um registro: PV sobe (ou vai pro máximo), a Condição/Confusão desaparece, o Pokémon reanima e/ou o PP do Movimento aumenta, dependendo do item. Consome 1 unidade dele. Um item **📦 Outro** também passa por esse fluxo (escolhe o Pokémon, consome a unidade), mas ainda sem efeito mecânico automático de verdade (Cap. 25). Um botão **"Cancelar"** desiste sem gastar nada. Funciona fora de batalha, direto na sua ficha, a qualquer momento.

## Arena (esboço — ainda em construção)

O botão **"🏟️ Arena"** no topo abre um espaço à parte pra montar uma batalha. É a primeira versão, feita pra testarmos e ajustarmos — pode mudar.

- Aparece um card **"Equipe ativa"** pra **cada Treinador da mesa**, não só o seu — mas o que os outros veem ali começa como uma fileira de **Pokébolas**: pra qualquer Pokémon que ainda não foi pra nenhum Time, só você (o dono) e o Mestre sabem quem é de verdade. Só na sua própria Equipe ativa você tem o **⠿** pra arrastar, e logo abaixo dela, se você tiver algum item, sua **🎒 Mochila** (ver seção própria acima).
- **▶️ Entrar na Arena** / **⏏️ Sair da Arena**: botão no topo da sua Equipe ativa. "Entrar" só te registra num Time (se o Mestre já criou mais de um, ele pergunta em qual você quer entrar) — **ainda não traz nenhum Pokémon pro campo**, isso é o próximo passo, a Soltura. "Sair" faz o caminho inverso: tira você da Arena de vez, presença e qualquer Pokémon que você já tenha solto — **e também apaga a revelação de todo o seu time** (Equipe ativa e Banco): a próxima vez que você entrar numa Arena, todo mundo volta a ver Pokébola de novo até uma nova Soltura revelar, mesmo que algum deles já tenha lutado numa batalha anterior.
- **🎁 Soltura + Revelação simultânea**: quando o Mestre achar que já está todo mundo (ou for liberando aos poucos), ele libera a Soltura — a partir daí, você escolhe **um** Pokémon da sua Equipe ativa pra soltar, **em segredo**: só você e o Mestre sabem qual foi, os outros só veem uma Pokébola aparecer no seu Time. Dá pra mudar de ideia e escolher outro antes da revelação. Quando todo mundo que entrou já tiver escolhido o seu, o Mestre revela tudo de uma vez — é aí que a mesa inteira descobre quem cada um trouxe, ao mesmo tempo, com aquele efeito surpresa. Só depois disso o seu Pokémon fica clicável pra agir de verdade.
- Arraste um dos seus pra dentro de um **Time** (o Mestre cria os Times), se preferir fazer manualmente em vez de usar "Entrar na Arena" — esse caminho continua revelando na hora, sem segredo (é mais um ajuste manual do que o fluxo pensado pra início de batalha). Ele continua normalmente na sua ficha — a Arena só mostra que ele está nessa batalha.
- **É a revelação que abre ele de vez.** Assim que um Pokémon é revelado (pela Soltura, ou entrando por arrastar) — mesmo antes de agir — ele já aparece pra mesa inteira, ali no Time: sprite, uma **barra de PV** com o número **atual/máximo** por cima dela (verde acima de 50%, amarela entre 20% e 50%, vermelha em 20% ou menos, igual ao jogo oficial) e a Condição/Confuso como ícone (🔥 queimadura, ☠️ veneno, ⚡ paralisia, 💤 sono, ❄️ congelamento, 💫 confuso, 🌀 carregando um Movimento de 2 turnos, 😵 desmaiado). **Essa revelação é definitiva e vale também pra Equipe ativa, mas só durante essa mesma passagem pela Arena**: a partir desse momento, aquele Pokémon aparece de verdade (não mais como Pokébola, já com a mesma barra de PV numerada) na sua Equipe ativa pra todo mundo, mesmo que depois ele volte pra lá (por uma Troca) e nunca mais entre num Time — mas assim que você sair da Arena de vez (⏏️ acima), a revelação zera pra todo o seu time, pra próxima batalha começar com o mesmo segredo de sempre.
- **Estágio alterado (Cap. 15.1) vira um selo no próprio card**: assim que um Movimento, Item ou Habilidade muda o Ataque, Defesa, Ataque/Defesa Especial, Velocidade, Precisão ou Evasão de um Pokémon em campo, aparece uma etiqueta pequena tipo **"Atq +1"** (verde, buff) ou **"Vel -2"** (vermelha, debuff) embaixo do card dele — some sozinha assim que aquele Atributo volta a 0. É só olhar o Pokémon pra saber se ele já usou um Swords Dance, tomou um Intimidate etc., sem precisar abrir a ficha completa.
- **📊 Ver atributos**: todo card em campo (o seu ou o de qualquer outro Time, contanto que já esteja revelado) tem um botãozinho **"📊"** no canto — clicar nele abre um **painel flutuante** com o preview completo daquele Pokémon: Tipo, PV atual/máximo, Condição/Confuso, se está carregando algum Movimento de 2 turnos e qual, Habilidade (com o efeito dela), Natureza e uma tabela com o Estágio e o Atributo Efetivo de verdade (o mesmo número que o motor de ataque usa) de cada Atributo, além dos Movimentos com o PP restante. Dá pra abrir **mais de um ao mesmo tempo, de Pokémon diferentes** — cada clique no "📊" de um card novo soma mais um painel na tela, sem fechar os que já estavam abertos (clicar de novo no mesmo Pokémon não duplica). Cada painel é **arrastável** — segure na barrinha do topo dele e solte onde quiser na tela — e **fecha na hora com o ✕**, sem afetar os outros que continuarem abertos. Tudo isso é só seu: cada um na mesa abre, fecha e arrasta os próprios painéis sem afetar o que os outros estão vendo.
- **Palco de batalha**: assim que algum Pokémon estiver revelado num Time, aparece um "estádio" visual acima dos cards de sempre — cada Time enfileirado, sprite + nome + barrinha de PV, seu Time embaixo (maior) e o resto em cima (menor). Um Pokémon desmaiado aparece cinza e virado. É só um resumo visual — todos os cards e botões de sempre continuam ali embaixo, do mesmo jeito.
- Não tem limite de Treinadores nem de Times — pode ser 1×1, vários contra vários, o que a mesa precisar.
- **👀 Modo Espectador**: não vai lutar nessa batalha? Um botão no topo da Arena deixa você entrar como espectador (e sair, quando quiser) — não precisa de Pokémon nenhum em campo pra isso. É só presença: aparece uma lista "👀 Assistindo" com quem está acompanhando, visível pra mesa toda.
- **Avisos de combate também aparecem como popup**: se faltar algo pra agir — Movimento sem PP, sem alvo elegível, etc. — continua avisando no topo da tela de sempre, mas agora também chama atenção com um popup central, difícil de passar batido.

### Iniciativa (seleção simultânea + resolução manual)

Um card **"🎯 Iniciativa"** aparece no topo da Arena. O Mestre abre a Rodada clicando em "▶️ Iniciar Batalha" — a partir daí, **todo mundo escolhe a própria ação ao mesmo tempo**, sem fila nem "vez" nenhuma: você já pode clicar no seu Pokémon e escolher Atacar/Usar Item/Trocar/Fugir na hora que quiser, sem esperar os outros Treinadores. **Antes de "Iniciar Batalha" (ou no instante entre uma Rodada terminar e a próxima abrir), ninguém consegue agir, nem o Mestre** — sua única oportunidade de agir é durante a fase de seleção de uma Rodada já aberta.

Assim que todo mundo escolheu, a Rodada passa **sozinha** pra fase de resolver — mas resolver em si é **manual, no ritmo do Mestre**: ele vai clicando **"▶️ Avançar"**, um Pokémon por clique, nesta ordem — **não-Ataque (Trocar/Item/Fugir) sempre antes de qualquer Ataque, mesmo um Ataque de Prioridade**; entre Ataques, **Prioridade decide antes da Velocidade** (Cap. 16/17: Velocidade Efetiva, depois Natural, depois 1d6 em empate). Um Pokémon Paralisado entra no cálculo com −10 de Velocidade, igual à regra. **Não existe mais nenhuma pergunta de "quer usar sua Prioridade?"** — quem tinha um Movimento de Prioridade já decidiu usá-lo (ou não) na hora de escolher, junto com o resto da mesa, e a Prioridade simplesmente entra na frente sozinha. Assim que o Mestre resolve o último Pokémon pendente, a próxima Rodada já abre pra seleção sozinha, sem precisar de nenhum clique a mais pra isso — isso se repete a batalha inteira.

Se um Pokémon novo entrar na batalha **depois** que uma Rodada já começou a ser escolhida, ele não entra nela — só participa normalmente a partir da próxima fase de seleção.

### Agindo

Não existe mais botão de "Usar" nem de "Atacar" separado — é tudo clicando **direto no card do seu Pokémon** em campo (contanto que ele não esteja Desmaiado, a Rodada esteja na fase de seleção, e ele ainda não tenha escolhido nessa Rodada). Clicar já abre um **popup** — não é mais um card fixo lá embaixo da página, então não precisa rolar a tela pra ver quem está em campo nem pra escolher o alvo: de cara o popup já mostra todo mundo que está em campo, **lado a lado, um lado por Time** — e assim que você escolhe um Movimento (ou Item) que precise de um alvo manual, é só clicar em quem já está ali dentro (fica destacado sozinho, igual sempre foi na Arena). Pra ver os Atributos de qualquer um deles direto do popup, é o mesmo botão **"📊"** de sempre no canto do card. Trocar de Pokémon funciona parecido, mas com um bloco à parte pros candidatos da Equipe ativa (que não estão em campo). **Você só vê e clica o popup de ação do seu próprio Pokémon** — o de outro Treinador nem abre pra você. O fluxo é:

1. **Clique no seu Pokémon** (qualquer um seu que ainda não tenha escolhido nessa Rodada — não existe mais "vez"). Ele já está visível pra mesa inteira desde que foi revelado — clicar pra agir não muda nada nessa parte, só abre o popup.
2. Escolha entre **Atacar**, **Usar Item**, **Trocar de Pokémon** ou **Fugir** — isso só **registra** sua escolha, ainda sem rolar dado nenhum: o popup fecha na hora e seu Pokémon fica marcado **"✅ Escolheu"** no card, esperando o resto da mesa escolher também.
   - **Atacar** → escolha um dos Movimentos do seu Pokémon — cada um já mostra **quem pode ser alvo** dele ("Alvo: em você mesmo", "só aliado", "aliado ou inimigo" etc.) e a Prioridade, se tiver. Sem PP, o Movimento fica bloqueado (custa 1, ou 2 se o alvo tiver a Habilidade Pressure — Cap. 8.6). Pra um Movimento de alvo manual, é só clicar em quem já está ali no campo de batalha — nada disso resolve ainda, só fica guardado até a Rodada de fato resolver.
   - **Usar Item** → a mochila aparece separada por tipo (💊 Vida, ✨ Condição, 💫 Reviver, 🔄 Vida + Condição, 🔋 PP, 📦 Outro) — Pokébola não aparece aqui (sem sistema de captura ainda). Escolha o item e depois em quem usar — quem pode receber já fica destacado no campo, respeitando a trava de desmaiado (Vida/Vida+Condição/PP só em quem está de pé, Reviver só em quem está desmaiado). Pra um item de PP de um Movimento só (Ether, Max Ether, PP Up, PP Max), o popup ainda pede pra escolher qual dos 4 Movimentos recebe.
   - **Trocar de Pokémon** → não precisa arrastar nada: os Pokémon disponíveis da sua **Equipe ativa** aparecem direto dentro do popup — clique em qualquer um deles (vivo, e que ainda não esteja em campo em outro lugar).
   - **Fugir** → registra a tentativa de fuga.
   - Cancele a qualquer momento clicando em **"Cancelar"**, ou no ✕ no canto do popup, enquanto ainda não tiver confirmado.
3. **A Rodada resolve no ritmo do Mestre**: assim que todo mundo escolheu (ou o Mestre força "Resolver Rodada"), ele vai clicando **"▶️ Avançar"** — cada clique processa uma ação, na ordem certa (ver "Iniciativa" acima), sem nenhum avanço automático. É só nesse clique que cada coisa de fato acontece:
   - **Atacar em você mesmo ou de área** resolve sozinho. Um Movimento **de campo** (ex.: Stealth Rock) também resolve sozinho, sem calcular dano (Cap. 25, mecânica ainda em aberto).
   - Um Movimento **de carregar 2 turnos** (Solar Beam, Fly, Dig, Dive, Bounce, Phantom Force, Shadow Force, Sky Attack, Razor Wind, Skull Bash, Freeze Shock, Ice Burn, Solar Blade, Meteor Beam, Electro Shot, Geomancy) **não golpeia na Rodada em que é escolhido** — o Pokémon só se prepara (o Log mostra a frase de sabor, tipo "reúne luz..."), e o alvo escolhido (se o Movimento pedir um) já fica travado; um selo **🌀** aparece no card dele. Na Rodada seguinte, o golpe **já sai sozinho** — você nem precisa escolher de novo, ele já nasce pré-escolhido e participa da resolução em lote normalmente. Se o alvo travado sumir nesse meio-tempo, o golpe se perde sem efeito. O PP já é gasto no turno de carregar, não no de soltar. **Ainda não simulado** (Cap. 25): a semi-invulnerabilidade de Fly/Dig/Dive/Bounce/Phantom Force/Shadow Force durante a carga, e o Power Herb.
   - Se seu Pokémon estava **Paralisado/Dormindo/Congelado/Confuso**, é só agora — na hora de resolver o **Ataque** — que o site testa isso (Cap. 20.4/21/22/23): Paralisia 1d6 (1–2 perde a ação); Congelamento 1d6 (1–4 continua, 5–6 descongela e ataca no mesmo golpe); Sono obrigatório no 1º turno, 2º-3º testa 1d6 (5–6 acorda); Confusão testa 1d6 pra terminar e, se continuar, outro 1d6 pro efeito. **Esse teste só roda se você escolheu Atacar** — se você escolheu **Usar Item** pra curar a própria condição, seu Pokémon nunca passa por ele: Item sempre resolve antes de qualquer Ataque na mesma Rodada, então curar o Sono a tempo funciona — só que, como é 1 ação por Rodada, ele se cura nessa Rodada e ataca de verdade só na seguinte.
   - Golpes de **recuo** (Take Down, Double-Edge, Flare Blitz...) já tiram PV do seu próprio Pokémon na hora — a não ser que ele tenha Magic Guard. Golpes de **dreno** (Giga Drain, Absorb, Drain Punch...) já curam ele em cima do dano que causou. Movimentos de **cura** (Recover, Synthesis, Roost, Rest...) já restauram o PV de verdade.
   - **U-turn, Volt Switch e Parting Shot**: se o seu Pokémon não desmaiou nele mesmo e sobra algum outro vivo na sua Equipe ativa, o slot dele ganha um convite de troca de graça (mesmo banner clicável do Desmaio) — não trava mais a Rodada esperando você clicar: se você não trocar até a Rodada seguinte, ele continua em campo normal; o convite fica disponível até você de fato trocar.
   - Itens de Vida, Condição, Reviver, Vida+Condição e PP já fazem efeito de verdade — PV sobe, Condição/Confusão some, o Pokémon reanima e/ou o PP aumenta — e o Log mostra o resultado. Itens de Outro tipo ainda não têm efeito mecânico (Cap. 25): só consomem 1 unidade e ficam registrados.
   - **Trocar**: o Pokémon que estava lutando volta a aparecer só na Equipe ativa (some do Time), e o novo entra revelado direto. Consome o turno inteiro (Cap. 18) — o que entrou só age a partir da Rodada seguinte. Esse mesmo painel também é o que aparece quando um dos seus desmaia e ainda sobra alguém — ver "Desmaio e vitória" abaixo; a reposição por desmaio é imediata, não fica esperando a Rodada seguinte.
   - **Fugir**: se o Mestre tiver travado a fuga (🔒), nem rola dado. Sem trava, rola **1d10**: 1–3 falha (a ação é gasta, o Pokémon continua em campo); 4–10 foge com sucesso. Os dois casos ficam registrados no Log.
   - Quando a ação envolve dado, o sistema rola sozinho e mostra tudo num **quadro de dado no centro da tela**, pra mesa inteira. Primeiro o **d6** gira e assenta; se o Movimento tiver Efeito Percentual, **depois** disso o **1d10** gira e assenta (um de cada vez, nunca os dois juntos) — com uma **segunda tentativa** de 1d10 se foi Crítico e a primeira falhou (Cap. 14). O quadro mostra o resultado completo assim que os dois já rolaram — num Movimento de área, o resultado de cada alvo atingido. Some sozinho depois de alguns segundos, ou clique em **"Fechar"**/fora dele.
   - **A efetividade de Tipo já vem etiquetada** (quadro de dado E Registro, Cap. 13): "Super Efetivo (x2)" contra 1 Tipo fraco do defensor, "Super Efetivo (x4)" contra os 2; "Pouco Efetivo (x1/2)"/"(x1/4)" quando é o próprio Movimento que é resistido; "Imune" quando o Tipo bloqueia o golpe de vez. Num acerto neutro (ou fraqueza cancelando resistência), não aparece nada — igual sempre foi.

**Cadê a Negociação de Prioridade (Cap. 17.1-17.3)?** Foi aposentada. Como todo mundo já escolhe a própria ação com antecedência (passo 1-2 acima), não faz mais sentido perguntar "quer usar sua Prioridade?" no meio da resolução — a Prioridade continua tão útil quanto sempre (decide quem ataca primeiro, passo 3 acima), só que a decisão de usá-la já foi tomada na hora de escolher, sem pausar nem perguntar nada de novo.

Tudo isso segue as Regras à risca — Precisão (Cap. 10, incluindo os Movimentos 100% automáticos, que nunca erram), Crítico (Cap. 11), Dano (Cap. 12), Tipos (Cap. 13), Efeito Percentual (Cap. 14) e Alvo do Movimento (Cap. 8.5) — sem precisar rolar dado físico nem fazer conta na mão. Se o efeito aplicar uma Condição de status, ela já entra na ficha do Pokémon atingido e aparece com o selo/ícone de sempre; se ele já estiver com outra Condição, o quadro avisa que o efeito bateu mas não mudou nada (regra de nunca ter duas Condições ao mesmo tempo, Cap. 20). Se o Movimento também mudar Estágio (Cap. 15.1) — Swords Dance, Growl, Close Combat e todo o resto que faz isso oficialmente — o site já aplica sozinho no card do Pokémon certo (o seu, num Movimento de auto-buff, ou o do alvo, numa queda), com as reações automáticas de Habilidade de sempre (Clear Body bloqueando, Contrary revertendo etc.); Estágio volta a 0 sozinho assim que o Pokémon sai de campo (desmaia, troca ou foge, Cap. 15.2).

**Dano de fim de turno já é automático.** Assim que um Pokémon com Queimadura, Veneno ou Veneno Grave termina de agir (ataca, usa item, troca ou foge), o dano daquela Condição (Cap. 20: −1 PV Queimadura, −2 PV Veneno, crescente 1→2→3... no Veneno Grave) já é aplicado sozinho e aparece no Log — não precisa esperar o fim da rodada inteira nem o Mestre aplicar na mão. Um Pokémon com **Magic Guard** nunca sofre esses PV, nem o de recuo, Confusão, Liquid Ooze, Rough Skin/Iron Barbs ou Aftermath — só o dano de um golpe de verdade batendo nele.

### Desmaio e vitória

Assim que um dos seus Pokémon vai a 0 PV, o site já confere o que fazer, na hora:

- **Ainda sobra alguém vivo na sua Equipe ativa?** O próprio slot desmaiado (😵) vira um convite clicável — "😵 Escolher próximo" — que abre o mesmo seletor de troca de sempre, sem passar pelo menu de ação. Escolher aí bota o próximo em campo na hora.
- **Não sobra ninguém?** Você está eliminado da batalha. Se todo mundo do seu Time também já estiver assim, o outro Time vence sozinho, na hora — aparece um banner "🏆 [Time] venceu a batalha!" pra mesa toda, e ninguém consegue agir mais até o Mestre limpar.

### Registro (histórico de rolagens)

A janela **"📜 Rolagens da Arena"** guarda uma linha por ataque já resolvido (as últimas 40), com o Movimento usado, os dados que saíram e o resultado — dá pra rolar a lista pra cima e ver o que já aconteceu na batalha. A rolagem mais nova só aparece ali depois que o dado dela termina de girar no quadro central (não estraga a surpresa). É uma janela flutuante: arraste pela barra do topo pra colocar onde quiser na tela, e puxe o cantinho ⌟ no rodapé pra deixar maior ou menor — cada um vê e ajusta a própria, sem afetar o resto da mesa (a posição/tamanho não é salvo entre sessões, só dura enquanto a página estiver aberta).

## Área PVP (combates rápidos, sem Mestre)

O botão **"⚔️ PVP"** no topo abre um modo à parte da Arena — combates rápidos, direto com outro Treinador cadastrado, sem precisar do Mestre pra nada. As regras de tipo/dano/status/Habilidade são exatamente as mesmas da Arena normal (qualquer correção nelas vale pros dois lugares).

- **Fichas de PVP são separadas do seu Time do RPG.** Em "🎴 Fichas de PVP" você monta quantos Pokémon quiser (até 20), escolhendo só **Espécie**, **Movimentos**, **Natureza** e **Habilidade** — nível é sempre o máximo do RPG (Nível 16), seus Atributos já entram travados no topo, então não tem Vínculo nem ponto de Atributo pra mexer. Clique numa ficha pra expandir e editar; "+ Nova Ficha" cria outra. Os Movimentos são o mesmo seletor "Learnset" (Nível/Evo/TM/Egg) da ficha do RPG — só aparece o que aquela Espécie realmente aprende, nunca dá pra digitar um Movimento que ela não tem. O seletor de Habilidade mostra a descrição oficial de **todas** as opções logo abaixo, não só da que você já escolheu — dá pra comparar antes de decidir.
- **Lobby**: crie uma sala (nome opcional) ou entre numa que já esteja aberta. Cada sala é só você e mais um oponente.
- **Montar o time**: dentro da sala, escolha até 6 das suas fichas de PVP (com troca durante a batalha, igual a Equipe ativa da Arena) e clique **"✓ Pronto"**. Assim que os dois jogadores estiverem prontos, a batalha começa sozinha — ninguém precisa clicar em nada pra "iniciar".
- **Sua vez**: escolha um Movimento (ou troque de Pokémon) a cada Rodada. Assim que os dois jogadores escolherem, a Rodada inteira resolve sozinha na hora — sem esperar ninguém avançar passo a passo. O mesmo palco de batalha visual da Arena (sprites + PV por Time) aparece aqui também, acima dos cards Você/Adversário.
- **Desmaiou?** Escolha o próximo da sua lista, igual na Arena normal.
- **🏳️ Desistir**: a qualquer momento, encerra a batalha na hora e declara o outro jogador vencedor — sem precisar terminar de verdade.
- **Fim de batalha**: o Time vencedor é anunciado e **todos os Pokémon envolvidos (dos dois lados) são curados automaticamente** — PV, Condição, Confusão e PP de volta ao máximo — prontos pra outra batalha na hora.

## Tema claro/escuro

O botão **☀️/🌙** no topo troca entre os dois temas. O site sempre abre no tema **claro** por padrão — a escolha de usar o escuro é sua, fica salva só no seu aparelho, e não segue a configuração do celular/computador.

## Instalar como app

No Chrome ou Edge (PC, Mac, Linux ou Android), clique no ícone de instalação na barra de endereço (ou no menu **⋮ → Instalar app**) pra abrir o Diário numa janela própria, com ícone de Pokébola e sem a barra do navegador — igual um programa instalado de verdade. Continua sendo o site ao vivo: qualquer atualização (Movimento corrigido, regra nova) já aparece sozinha, sem precisar reinstalar nada, e os dados continuam sincronizando em tempo real do jeito de sempre.

## Regras e guias

O botão **"📖 Regras"** no topo abre esta área, com três abas: **Regras** (o livro de regras completo), **Guia do Treinador** (este aqui) e **Guia do Mestre**. Um botão **"← Voltar"** leva de volta pra onde você estava.

## Saindo

O botão **"Sair"** no topo (ao lado do seu nome) desconecta você deste aparelho. Da próxima vez, entra de novo com nome + PIN.
