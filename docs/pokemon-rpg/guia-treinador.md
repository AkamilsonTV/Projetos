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
- **Estágios** (±6): os bônus/penalidades temporários de batalha (Ataque, Defesa, Atq. Especial, Def. Especial, Velocidade, Precisão, Evasão).

### Escolhendo os Movimentos

Você mesmo escolhe os 4 Movimentos do seu Pokémon — mas só entre o que a espécie realmente pode aprender (não dá pra digitar qualquer coisa). Pra cada um dos 4 slots, tem uma barra **"Learnset"** com quatro opções:

- **Nível**: os Movimentos que a espécie aprende naturalmente subindo de Nível. Só aparecem os que já estão liberados pelo seu Nível atual de Treinador (Cap. 8.2 das Regras) — o menu mostra "Nome (Nv. X)" pra cada opção.
- **Evo**: os Movimentos que a espécie ganha automaticamente ao evoluir pra essa forma — sem depender de Nível.
- **TM**: os Movimentos que a espécie pode aprender por Fita de Movimento, sem depender de Nível.
- **Egg**: os Movimentos que a espécie pode aprender por Breeding.

Clique no método (Nível/Evo/TM/Egg) e depois escolha o Movimento no menu que aparece — Tipo, Categoria, Poder, Prioridade, Precisão e a Descrição são preenchidos sozinhos. Se a lista aparecer vazia, é porque a espécie não tem nada disponível ali (ou você ainda não subiu Nível suficiente, no caso do Nível). Não existe mais opção de HM — os jogos oficiais tiraram essa mecânica a partir da Geração 9.

### O que só o Mestre edita (você só vê)

- Espécie, Tipo 1/2, Atributos Naturais e Efetivos.
- Vínculo e Maturidade.
- Condição (queimadura, veneno, sono, etc.) e Confuso — aparecem em destaque (um selo vermelho) no topo do card quando ativos, pra você não perder o que está rolando na batalha.

Cada Pokémon mostra automaticamente o sprite (a imagem pixelada) da espécie assim que o Mestre define ela. Sem espécie definida ainda, aparece um "❔" no lugar — e enquanto isso, o seletor de Movimentos fica bloqueado (precisa da Espécie pra saber o que ele pode aprender).

## Mochila (itens)

Na sua ficha, logo acima da Equipe/Banco, tem a seção **"🎒 Mochila"** — a lista de itens que você carrega (nome + quantidade). **Só o Mestre adiciona, remove ou muda a quantidade de um item** — você só vê o que tem. O efeito mecânico de cada item em batalha ainda está em aberto (Cap. 25); por enquanto usar um item na Arena só consome 1 unidade e fica registrado no Log.

## Arena (esboço — ainda em construção)

O botão **"🏟️ Arena"** no topo abre um espaço à parte pra montar uma batalha. É a primeira versão, feita pra testarmos e ajustarmos — pode mudar.

- Aparece **"Equipe ativa"** com os Pokémon da sua Equipe (só sprite pixelado + nome — arraste pelo **⠿**), e logo abaixo, se você tiver algum item, sua **🎒 Mochila** (ver seção própria abaixo).
- Arraste um deles pra dentro de um **Time** (o Mestre cria os Times). Ele continua normalmente na sua ficha — a Arena só mostra que ele está nessa batalha.
- Enquanto seu Pokémon ainda não entrou em ação, os outros Treinadores da mesa (menos o Mestre) veem só uma **Pokébola** no lugar dele — não sabem qual é. Só você (o dono) e o Mestre veem de verdade.
- Assim que você clica nele pra agir pela primeira vez (ver "Agindo" abaixo), ele **revela sozinho** — não existe mais um botão separado só pra revelar. A partir daí fica visível pra mesa inteira — sprite, uma **barra de PV** (verde acima de 50%, amarela entre 20% e 50%, vermelha em 20% ou menos, igual ao jogo oficial) e a Condição/Confuso como ícone (🔥 queimadura, ☠️ veneno, ⚡ paralisia, 💤 sono, ❄️ congelamento, 💫 confuso, 😵 desmaiado), sem nada escrito.
- Não tem limite de Treinadores nem de Times — pode ser 1×1, vários contra vários, o que a mesa precisar.

### Iniciativa (quem age primeiro)

Um card **"🎯 Iniciativa"** aparece no topo da Arena. O Mestre calcula a fila (Cap. 16: Velocidade Efetiva, depois Natural, depois 1d6 em caso de empate) clicando em "Iniciar Rodada" — ela mostra todo mundo que já está em campo, em ordem, com quem está com a vez destacado (**▶ Turno**, também aparece como uma etiqueta no card do Pokémon lá embaixo). Um Pokémon Paralisado entra na fila com −10 de Velocidade, igual à regra.

A fila é só um guia — **atacar nunca é bloqueado** por não ser sua vez (Prioridade e outras exceções continuam sendo o Mestre quem decide na mesa, Cap. 17). Mas quando o dono do Pokémon que está com a vez ataca, a fila passa pro próximo sozinha; fora isso, quem estiver com a vez (ou o Mestre) clica em **"⏭️ Próximo"** pra passar adiante manualmente.

### Agindo

Não existe mais botão de "Usar" nem de "Atacar" separado — é tudo clicando **direto no card do seu Pokémon** em campo (contanto que ele não esteja Desmaiado e não seja a vez de outra ação já em andamento). O fluxo é:

1. **Clique no seu Pokémon.** Se ele ainda não tinha sido revelado pra mesa, revela sozinho nesse clique (não precisa de nada separado pra isso).
   - Se ele estiver **Confuso**, o site já rola os dois 1d6 da Confusão (Cap. 23) nessa hora, antes de qualquer outra coisa: primeiro o 1d6 pra ver se a Confusão termina (5–6 termina); se continuar, um segundo 1d6 pra ver se ele perde a ação (1–2 perde e sofre 1 PV; 3–6 age normalmente). Um aviso na tela mostra os dois resultados. Se ele perder a ação, o turno já passa sozinho e o menu nem abre.
2. Se a ação seguir, abre um menu com quatro opções: **Atacar**, **Usar Item**, **Trocar de Pokémon**, **Fugir**.
   - **Atacar** → escolha um dos Movimentos do seu Pokémon — cada um já mostra **quem pode ser alvo** dele ("Alvo: em você mesmo", "só aliado", "aliado ou inimigo" etc.) e a Prioridade, se tiver. A lógica de cada Movimento é respeitada de verdade — o site não deixa escolher qualquer coisa:
     - Um Movimento **em você mesmo** (ex.: Swords Dance) resolve na hora, sem precisar clicar em ninguém.
     - Um Movimento **de área** (ex.: Earthquake) também resolve sozinho, acertando todo mundo daquela categoria de uma vez — pode incluir seus próprios aliados junto com os inimigos, dependendo do Movimento (igual nas batalhas em dupla dos jogos oficiais).
     - Um Movimento **de campo** (ex.: Stealth Rock) também resolve na hora, mas sem calcular dano nenhum — é uma mecânica ainda em aberto (Cap. 25), só fica registrado que foi usado.
     - Pra qualquer outro caso (**só aliado**, **você ou aliado**, **só inimigo**, ou **aliado ou inimigo**), o site pede um clique: só quem realmente pode ser alvo daquele Movimento fica destacado e clicável na Arena — clicar em alguém fora da lista não faz nada.
   - **Usar Item** → escolha um item da sua Mochila (só aparecem os que você ainda tem pelo menos 1) e depois em quem usar (você mesmo ou um aliado em campo). O efeito mecânico de cada item ainda está em aberto (Cap. 25) — por enquanto usar um item só consome 1 unidade dele e fica registrado no Log, sem curar PV nem mudar Condição ainda.
   - **Trocar de Pokémon** → escolha outro Pokémon seu que já esteja nesse Time da Arena, ainda não tenha sido revelado e não esteja Desmaiado, pra entrar no lugar do atual. Consome a ação inteira (Cap. 18) — o Pokémon que entrou só age a partir do turno seguinte dele.
   - **Fugir** → tira seu Pokémon da Arena; fica registrado no Log que ele fugiu.
   - Cancele a qualquer momento clicando em **"Cancelar"** no menu.
3. Quando a ação envolve dado (só no caso de **Atacar**), o sistema rola sozinho e mostra tudo num **quadro de dado no centro da tela**. Primeiro o **d6** do ataque gira e assenta; se o Movimento tiver um Efeito Percentual, **depois** disso o **1d10** gira e assenta também (um de cada vez, nunca os dois juntos) — e se o ataque foi Crítico e esse primeiro 1d10 falhou, ainda rola uma **segunda tentativa** de 1d10 (Cap. 14), também na sua vez. Só depois que os dois já rolaram é que aparece o resultado completo: se foi Crítico, quanto de dano saiu, e se alguma Condição de status foi aplicada — num Movimento de área, o quadro mostra o resultado de cada alvo atingido. O quadro some sozinho depois de alguns segundos, ou clique em **"Fechar"**/fora dele pra tirar na hora.

Tudo isso segue as Regras à risca — Precisão (Cap. 10, incluindo os Movimentos 100% automáticos, que nunca erram), Crítico (Cap. 11), Dano (Cap. 12), Tipos (Cap. 13), Efeito Percentual (Cap. 14) e Alvo do Movimento (Cap. 8.5) — sem precisar rolar dado físico nem fazer conta na mão. Se o efeito aplicar uma Condição de status, ela já entra na ficha do Pokémon atingido e aparece com o selo/ícone de sempre; se ele já estiver com outra Condição, o quadro avisa que o efeito bateu mas não mudou nada (regra de nunca ter duas Condições ao mesmo tempo, Cap. 20).

**Dano de fim de turno já é automático.** Assim que um Pokémon com Queimadura, Veneno ou Veneno Grave termina de agir (ataca, usa item, troca ou foge), o dano daquela Condição (Cap. 20: −1 PV Queimadura, −2 PV Veneno, crescente 1→2→3... no Veneno Grave) já é aplicado sozinho e aparece no Log — não precisa esperar o fim da rodada inteira nem o Mestre aplicar na mão. O que a Arena **não** faz sozinha: os testes de início de turno de Paralisia, Sono e Congelamento (Confusão já é automática, como descrito acima) — isso continua sendo o Mestre quem conduz na mesa, como sempre foi.

### Registro (histórico de rolagens)

Um card **"📜 Rolagens da Arena"** guarda uma linha por ataque já resolvido (as últimas 40), com o Movimento usado, os dados que saíram e o resultado — dá pra rolar a lista pra cima e ver o que já aconteceu na batalha. A rolagem mais nova só aparece ali depois que o dado dela termina de girar no quadro central (não estraga a surpresa).

## Tema claro/escuro

O botão **☀️/🌙** no topo troca entre os dois temas. O site sempre abre no tema **claro** por padrão — a escolha de usar o escuro é sua, fica salva só no seu aparelho, e não segue a configuração do celular/computador.

## Regras e guias

O botão **"📖 Regras"** no topo abre esta área, com três abas: **Regras** (o livro de regras completo), **Guia do Treinador** (este aqui) e **Guia do Mestre**. Um botão **"← Voltar"** leva de volta pra onde você estava.

## Saindo

O botão **"Sair"** no topo (ao lado do seu nome) desconecta você deste aparelho. Da próxima vez, entra de novo com nome + PIN.
