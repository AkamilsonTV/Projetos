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
- **PV atual** (o número de Pontos de Vida que ele tem agora) — tem um botão **"curar"** que enche de volta até o máximo.

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

Clique numa aba pra ver os itens daquela categoria. **Só o Mestre adiciona, remove ou muda a quantidade de um item** — você só vê o que tem, com a Descrição oficial de cada um (a mesma dos jogos, em inglês). Além da tabela, todo item tem um **tipo** que define o efeito dele, independente da aba onde aparece:

- **💊 Vida** — cura uma quantidade fixa de PV, ou cura total (o Mestre decide qual das duas). **Não funciona em Pokémon desmaiado.**
- **✨ Condição** — cura uma Condição específica (Queimadura, Veneno — que também cura Veneno Grave —, Paralisia, Sono, Congelamento ou Confusão) ou qualquer uma delas de uma vez (tipo um Full Heal). **Não funciona em Pokémon desmaiado.**
- **💫 Reviver** — o único tipo que funciona em Pokémon desmaiado (ou o Centro Pokémon, narrativamente). Devolve PV (uma quantidade fixa ou o total, dependendo do item) e reativa o Pokémon.
- **🔄 Vida + Condição** — cura PV e cura Condição/Confusão ao mesmo tempo (tipo um Full Restore). Mesma trava do tipo Vida: não funciona em desmaiado.
- **🔋 PP** — Ether, Max Ether, Elixir, Max Elixir, PP Up e PP Max (Cap. 8.6.1 das Regras): recuperam ou aumentam o PP de um Movimento (ou dos 4 de uma vez, no caso de Elixir/Max Elixir) de um Pokémon que não esteja desmaiado.
- **📦 Outro** — Pokébolas, pedras de evolução, Itens de Batalha, Segurados, TMs etc. Ainda sem efeito mecânico automático de verdade no sistema (Cap. 25) — usar um desses pede em qual Pokémon (qualquer um, mesmo desmaiado) e consome a unidade, mas não evolui/captura/ensina Movimento sozinho.

Pokémon desmaiado só sai desse estado com um item **💫 Reviver** ou levando ele ao Centro Pokémon (fora de jogo/narrativo) — nenhum outro tipo de item cura ele.

### Usando um item direto da Mochila

Toda linha da tabela com quantidade acima de 0 tem um botão **"▶️ Usar"**. Clicar nele já abre a **Cura** (seção abaixo) com esse item escolhido — pula direto pra "em qual Pokémon", sem precisar abrir a Cura, achar a aba certa e achar o item de novo lá dentro. O sistema entende sozinho o que fazer a partir do tipo do item: pede o Pokémon certo pra ele (só quem não está desmaiado, pra Vida/Condição/Vida+Condição; só quem está desmaiado, pra Reviver; qualquer um, pra PP e Outro) e, se for um item de PP que mexe num Movimento só, ainda pergunta qual dos 4.

## Cura

Botão **"🩹 Cura"** na sua ficha, logo abaixo da Mochila. Abre um painel com seis abas — **💊 Vida**, **✨ Condição**, **💫 Reviver**, **🔄 Vida + Condição**, **🔋 PP** e **📦 Outro** — listando só os itens daquele tipo que você ainda tem. Dá pra chegar aqui de duas formas: clicando **"🩹 Cura"** e escolhendo a aba+item na mão, ou clicando **"▶️ Usar"** direto na linha do item lá na Mochila (já pula os dois primeiros passos abaixo). O fluxo:

1. Escolha a aba certa pra sua necessidade.
2. Clique no item que quer usar.
3. Clique em qual dos seus Pokémon (Equipe ou Banco) vai receber. Nas abas Vida e Vida+Condição só aparecem Pokémon **não desmaiados**; na aba Reviver só aparecem os **desmaiados**; a aba Condição mostra todos, menos quem já está sem a Condição que o item cura; as abas PP e Outro mostram qualquer um, mesmo desmaiado.
4. **Só na aba PP**, e só pros itens que afetam um Movimento por vez (Ether, Max Ether, PP Up, PP Max) — Elixir e Max Elixir pulam esse passo, afetando os 4 de uma vez: escolha qual dos 4 Movimentos do Pokémon recebe o item.

A cura acontece na hora — de verdade, não é só um registro: PV sobe (ou vai pro máximo), a Condição/Confusão desaparece, o Pokémon reanima e/ou o PP do Movimento aumenta, dependendo do item. Consome 1 unidade dele. Um item **📦 Outro** também passa por esse fluxo — escolhe o Pokémon e consome a unidade — mas ainda sem efeito mecânico automático de verdade (Cap. 25). Funciona fora de batalha, direto na sua ficha, a qualquer momento.

## Arena (esboço — ainda em construção)

O botão **"🏟️ Arena"** no topo abre um espaço à parte pra montar uma batalha. É a primeira versão, feita pra testarmos e ajustarmos — pode mudar.

- Aparece um card **"Equipe ativa"** pra **cada Treinador da mesa**, não só o seu — mas o que os outros veem ali começa como uma fileira de **Pokébolas**: pra qualquer Pokémon que ainda não foi pra nenhum Time, só você (o dono) e o Mestre sabem quem é de verdade. Só na sua própria Equipe ativa você tem o **⠿** pra arrastar, e logo abaixo dela, se você tiver algum item, sua **🎒 Mochila** (ver seção própria acima).
- **▶️ Entrar na Arena** / **⏏️ Sair da Arena**: botão no topo da sua Equipe ativa. "Entrar" carrega todos os Pokémon da sua Equipe ativa de uma vez pra um Time (se o Mestre já criou mais de um, ele pergunta em qual você quer entrar) — não precisa arrastar um por um. "Sair" faz o caminho inverso: tira todos os seus Pokémon da Arena de uma vez, você fica sem nenhum em campo.
- Arraste um dos seus pra dentro de um **Time** (o Mestre cria os Times), se preferir fazer manualmente em vez de usar "Entrar na Arena". Ele continua normalmente na sua ficha — a Arena só mostra que ele está nessa batalha.
- **É isso que revela ele.** Assim que um Pokémon entra num Time — mesmo antes de agir — ele já aparece pra mesa inteira, ali no Time: sprite, uma **barra de PV** com o número **atual/máximo** por cima dela (verde acima de 50%, amarela entre 20% e 50%, vermelha em 20% ou menos, igual ao jogo oficial) e a Condição/Confuso como ícone (🔥 queimadura, ☠️ veneno, ⚡ paralisia, 💤 sono, ❄️ congelamento, 💫 confuso, 😵 desmaiado). **Essa revelação é definitiva e vale também pra Equipe ativa**: a partir desse momento, aquele Pokémon aparece de verdade (não mais como Pokébola, já com a mesma barra de PV numerada) na sua Equipe ativa pra todo mundo, mesmo que depois ele volte pra lá (por uma Troca) e nunca mais entre num Time.
- Não tem limite de Treinadores nem de Times — pode ser 1×1, vários contra vários, o que a mesa precisar.
- **👀 Modo Espectador**: não vai lutar nessa batalha? Um botão no topo da Arena deixa você entrar como espectador (e sair, quando quiser) — não precisa de Pokémon nenhum em campo pra isso. É só presença: aparece uma lista "👀 Assistindo" com quem está acompanhando, visível pra mesa toda.

### Iniciativa (quem age primeiro)

Um card **"🎯 Iniciativa"** aparece no topo da Arena. O Mestre calcula a fila (Cap. 16: Velocidade Efetiva, depois Natural, depois 1d6 em caso de empate) clicando em "Iniciar Rodada" — ela mostra todo mundo que já está em campo, em ordem, com quem está com a vez destacado (**▶ Turno**, também aparece como uma etiqueta no card do Pokémon lá embaixo). Um Pokémon Paralisado entra na fila com −10 de Velocidade, igual à regra.

A fila é só um guia — **atacar nunca é bloqueado** por não ser sua vez (Prioridade e outras exceções continuam sendo o Mestre quem decide na mesa, Cap. 17). Mas quando o dono do Pokémon que está com a vez ataca, a fila passa pro próximo sozinha; fora isso, quem estiver com a vez (ou o Mestre) clica em **"⏭️ Próximo"** pra passar adiante manualmente.

### Agindo

Não existe mais botão de "Usar" nem de "Atacar" separado — é tudo clicando **direto no card do seu Pokémon** em campo (contanto que ele não esteja Desmaiado e não seja a vez de outra ação já em andamento). O fluxo é:

1. **Clique no seu Pokémon.** Ele já está visível pra mesa inteira desde que entrou no Time — clicar pra agir não muda nada nessa parte, só abre o menu.
   - Se ele estiver **Confuso**, o site já rola os dois 1d6 da Confusão (Cap. 23) nessa hora, antes de qualquer outra coisa: primeiro o 1d6 pra ver se a Confusão termina (5–6 termina); se continuar, um segundo 1d6 pra ver se ele perde a ação (1–2 perde e sofre 1 PV; 3–6 age normalmente). Um aviso na tela mostra os dois resultados. Se ele perder a ação, o turno já passa sozinho e o menu nem abre.
2. Se a ação seguir, abre um menu com quatro opções: **Atacar**, **Usar Item**, **Trocar de Pokémon**, **Fugir**.
   - **Atacar** → escolha um dos Movimentos do seu Pokémon — cada um já mostra **quem pode ser alvo** dele ("Alvo: em você mesmo", "só aliado", "aliado ou inimigo" etc.) e a Prioridade, se tiver. Sem PP, o Movimento fica bloqueado (custa 1, ou 2 se o alvo tiver a Habilidade Pressure — Cap. 8.6) — some sozinho assim que o Movimento é usado de verdade. A lógica de cada Movimento é respeitada de verdade — o site não deixa escolher qualquer coisa:
     - Um Movimento **em você mesmo** (ex.: Swords Dance) resolve na hora, sem precisar clicar em ninguém.
     - Um Movimento **de área** (ex.: Earthquake) também resolve sozinho, acertando todo mundo daquela categoria de uma vez — pode incluir seus próprios aliados junto com os inimigos, dependendo do Movimento (igual nas batalhas em dupla dos jogos oficiais).
     - Um Movimento **de campo** (ex.: Stealth Rock) também resolve na hora, mas sem calcular dano nenhum — é uma mecânica ainda em aberto (Cap. 25), só fica registrado que foi usado.
     - Pra qualquer outro caso (**só aliado**, **você ou aliado**, **só inimigo**, ou **aliado ou inimigo**), o site pede um clique: só quem realmente pode ser alvo daquele Movimento fica destacado e clicável na Arena — clicar em alguém fora da lista não faz nada.
   - **Usar Item** → a mochila aparece separada por tipo (💊 Vida, ✨ Condição, 💫 Reviver, 🔄 Vida + Condição, 🔋 PP, 📦 Outro), igual na aba Cura da ficha. Escolha o item e depois em quem usar (você mesmo ou um aliado em campo) — a lista de alvos já respeita a trava de desmaiado (Vida/Vida+Condição/PP só em quem está de pé, Reviver só em quem está desmaiado). Pra um item de PP que afeta um Movimento só (Ether, Max Ether, PP Up, PP Max), o site ainda pede pra escolher qual dos 4 Movimentos recebe. Itens de Vida, Condição, Reviver, Vida+Condição e PP já fazem efeito de verdade na hora — PV sobe, Condição/Confusão some, o Pokémon reanima e/ou o PP do Movimento aumenta — e o Log mostra o resultado. Itens de Outro tipo ainda não têm efeito mecânico (Cap. 25): só consomem 1 unidade e ficam registrados.
   - **Trocar de Pokémon** → não precisa arrastar nada: a sua **Equipe ativa**, lá embaixo, fica com os Pokémon disponíveis destacados — clique em qualquer um deles (vivo, e que ainda não esteja em campo em outro lugar) pra colocar ele no lugar do atual. O Pokémon que estava lutando volta a aparecer só na Equipe ativa (some do Time), e o novo entra revelado direto. Consome a ação inteira (Cap. 18) — o que entrou só age a partir do turno seguinte dele.
   - **Fugir** → tenta fugir da batalha. Se o Mestre tiver travado a fuga nessa batalha (🔒), nem rola dado — a fuga é bloqueada na hora e você pode escolher outra coisa. Sem trava, o site rola **1d10**: 1–3 e a fuga falha (seu Pokémon continua em campo, mas a ação já foi gasta); 4–10 e ele foge com sucesso, saindo da Arena de vez. Os dois casos ficam registrados no Log.
   - Cancele a qualquer momento clicando em **"Cancelar"** no menu.
3. Quando a ação envolve dado (só no caso de **Atacar**), o sistema rola sozinho e mostra tudo num **quadro de dado no centro da tela**. Primeiro o **d6** do ataque gira e assenta; se o Movimento tiver um Efeito Percentual, **depois** disso o **1d10** gira e assenta também (um de cada vez, nunca os dois juntos) — e se o ataque foi Crítico e esse primeiro 1d10 falhou, ainda rola uma **segunda tentativa** de 1d10 (Cap. 14), também na sua vez. Só depois que os dois já rolaram é que aparece o resultado completo: se foi Crítico, quanto de dano saiu, e se alguma Condição de status foi aplicada — num Movimento de área, o quadro mostra o resultado de cada alvo atingido. O quadro some sozinho depois de alguns segundos, ou clique em **"Fechar"**/fora dele pra tirar na hora.

Tudo isso segue as Regras à risca — Precisão (Cap. 10, incluindo os Movimentos 100% automáticos, que nunca erram), Crítico (Cap. 11), Dano (Cap. 12), Tipos (Cap. 13), Efeito Percentual (Cap. 14) e Alvo do Movimento (Cap. 8.5) — sem precisar rolar dado físico nem fazer conta na mão. Se o efeito aplicar uma Condição de status, ela já entra na ficha do Pokémon atingido e aparece com o selo/ícone de sempre; se ele já estiver com outra Condição, o quadro avisa que o efeito bateu mas não mudou nada (regra de nunca ter duas Condições ao mesmo tempo, Cap. 20). Se o Movimento também mudar Estágio (Cap. 15.1) — Swords Dance, Growl, Close Combat e todo o resto que faz isso oficialmente — o site já aplica sozinho no card do Pokémon certo (o seu, num Movimento de auto-buff, ou o do alvo, numa queda), com as reações automáticas de Habilidade de sempre (Clear Body bloqueando, Contrary revertendo etc.); Estágio volta a 0 sozinho assim que o Pokémon sai de campo (desmaia, troca ou foge, Cap. 15.2).

**Dano de fim de turno já é automático.** Assim que um Pokémon com Queimadura, Veneno ou Veneno Grave termina de agir (ataca, usa item, troca ou foge), o dano daquela Condição (Cap. 20: −1 PV Queimadura, −2 PV Veneno, crescente 1→2→3... no Veneno Grave) já é aplicado sozinho e aparece no Log — não precisa esperar o fim da rodada inteira nem o Mestre aplicar na mão. O que a Arena **não** faz sozinha: os testes de início de turno de Paralisia, Sono e Congelamento (Confusão já é automática, como descrito acima) — isso continua sendo o Mestre quem conduz na mesa, como sempre foi.

### Registro (histórico de rolagens)

Um card **"📜 Rolagens da Arena"** guarda uma linha por ataque já resolvido (as últimas 40), com o Movimento usado, os dados que saíram e o resultado — dá pra rolar a lista pra cima e ver o que já aconteceu na batalha. A rolagem mais nova só aparece ali depois que o dado dela termina de girar no quadro central (não estraga a surpresa).

## Tema claro/escuro

O botão **☀️/🌙** no topo troca entre os dois temas. O site sempre abre no tema **claro** por padrão — a escolha de usar o escuro é sua, fica salva só no seu aparelho, e não segue a configuração do celular/computador.

## Regras e guias

O botão **"📖 Regras"** no topo abre esta área, com três abas: **Regras** (o livro de regras completo), **Guia do Treinador** (este aqui) e **Guia do Mestre**. Um botão **"← Voltar"** leva de volta pra onde você estava.

## Saindo

O botão **"Sair"** no topo (ao lado do seu nome) desconecta você deste aparelho. Da próxima vez, entra de novo com nome + PIN.
