# Pokémon RPG — Diário de Treinador

- **Regras** (livro consolidado, v0.2): [`regras.md`](regras.md)
- **Código-fonte do site**: [`site/diario-de-treinador.html`](site/diario-de-treinador.html)
- **Site publicado**: veja a seção [Publicar no GitHub Pages](#publicar-no-github-pages-uma-vez) abaixo — depois de ativado, o link fica em `https://<seu-usuário>.github.io/<repositório>/`.

O site é uma página HTML única, hospedada de graça no **GitHub Pages**, com os dados (fichas de todo mundo) salvos em tempo real num banco **Firebase Firestore** (também grátis, sem cartão de crédito). Sem esse banco configurado, o site abre mas mostra uma tela avisando que falta ligar o banco de dados.

## Visual e sprites

O tema é mais "jogo" que "wiki": fundo em tom pergaminho, cantos arredondados, títulos numa fonte pixelada (Press Start 2P) e badges de Tipo em formato de pílula. Cada Pokémon na ficha mostra automaticamente o sprite pixelado oficial da espécie (via [PokeAPI/sprites](https://github.com/PokeAPI/sprites), puxado pelo número da Pokédex salvo quando a Espécie é preenchida) — sem espécie definida, mostra um "❔" no lugar.

## Regras e guias dentro do site

O botão **"📖 Regras"** (no topo, em qualquer tela) abre três sub-abas, cada uma buscando o `.md` correspondente direto deste repositório — não são cópias coladas no site:

- **📜 Regras** — [`regras.md`](regras.md), o livro de regras.
- **🎒 Guia do Treinador** — [`guia-treinador.md`](guia-treinador.md), passo a passo de uso pra quem joga: desde entrar/criar personagem até cada função da própria ficha (tema claro/escuro incluso).
- **🛠️ Guia do Mestre** — [`guia-mestre.md`](guia-mestre.md), o mesmo tipo de passo a passo, mas das funções exclusivas do Mestre.

Como nenhum desses é uma cópia colada no HTML: sempre que a gente atualizar qualquer um dos três arquivos e enviar o commit, a próxima vez que alguém abrir aquela aba no site já vê a versão nova, sem precisar tocar no código. **Toda função nova do site precisa ganhar uma explicação nesses guias** — ao contrário do livro de regras (que só existe pra descrever o sistema em si), os guias existem pra ensinar a usar o que já está em vigor no site, então não podem ficar desatualizados. Funciona antes mesmo de configurar o Firebase.

## Como usar o site

- **Mestre**: define um PIN na primeira vez que entrar em "Sou o Mestre"; depois disso, usa esse mesmo PIN pra sempre. Vê e edita a ficha de todos os Treinadores da mesa, incluindo Nível e Vínculo (que os jogadores só enxergam, não editam) e o contador de batalhas vencidas (visível só pro Mestre).
- **Treinador**: cria a própria ficha (nome + PIN) em "Sou Treinador → Criar personagem"; depois entra de novo com nome + PIN. Pode ativar "Compartilhar com a mesa" pra deixar outros Treinadores verem a própria ficha (somente leitura).

### Progressão de Nível

A cada 4 batalhas vencidas (contador que só o Mestre vê e mexe), o Treinador sobe 1 Nível automaticamente e o contador zera. Ver [`regras.md`](regras.md#24-progressão-de-nível) para detalhes.

## Configurar o banco de dados (Firebase) — uma vez só

1. Acesse [console.firebase.google.com](https://console.firebase.google.com/) e entre com uma conta Google.
2. **Criar projeto** → dê um nome qualquer (ex: `diario-de-treinador`) → pode desativar o Google Analytics → **Criar projeto**.
3. No menu lateral, vá em **Compilação → Firestore Database** → **Criar banco de dados** → escolha um local (qualquer um serve) → inicie em **modo de teste** (ajustamos as regras de acesso no passo 6).
4. Ainda no console, clique no ícone de engrenagem (⚙️) → **Configurações do projeto**. Na aba **Geral**, role até "Seus apps" → clique no ícone **`</>`** (Web) → dê um apelido ao app → **Registrar app**.
5. O Firebase vai mostrar um bloco `firebaseConfig` parecido com este:
   ```js
   const firebaseConfig = {
     apiKey: "AIzaSy...",
     authDomain: "diario-de-treinador.firebaseapp.com",
     projectId: "diario-de-treinador",
     storageBucket: "diario-de-treinador.appspot.com",
     messagingSenderId: "123456789",
     appId: "1:123456789:web:abcdef"
   };
   ```
   Copie esses 6 valores e cole-os no arquivo [`site/diario-de-treinador.html`](site/diario-de-treinador.html), substituindo o bloco `FIREBASE_CONFIG` no topo do `<script>` (procure por `COLE_AQUI`). Depois salve, faça commit e push.
6. **Regras de segurança do Firestore** — no console, vá em **Firestore Database → Regras** e cole exatamente isto (restringe leitura/escrita a só esse documento do jogo, e bloqueia qualquer outra coisa no banco):
   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /diario/estado {
         allow read, write: if true;
       }
       match /{document=**} {
         allow read, write: if false;
       }
     }
   }
   ```
   Clique em **Publicar**.

Pronto — depois disso, qualquer pessoa que abrir o site (em qualquer aparelho) lê e escreve no mesmo banco em tempo real: o que um jogador edita aparece pros outros sem precisar recarregar a página.

## Publicar no GitHub Pages (uma vez)

1. No GitHub, abra o repositório → **Settings → Pages**.
2. Em **Source**, escolha **Deploy from a branch**.
3. Em **Branch**, selecione `claude/pokemon-rpg-rules-5bdoj9` e a pasta **`/docs`** → **Save**.
4. Espere alguns minutos; o GitHub mostra o link do site no topo dessa mesma página (algo como `https://<seu-usuário>.github.io/<repositório>/`). O Diário de Treinador fica em `.../pokemon-rpg/site/diario-de-treinador.html` dentro desse link.

## Sincronização entre aparelhos

Sim: os dados do jogo (fichas, PINs, Vínculo, Nível, batalhas etc.) ficam salvos no Firebase, não no navegador — então editar no celular aparece no PC e vice-versa, em tempo real. Só duas coisas ficam presas a cada aparelho, por conveniência, e nunca afetam os dados do jogo: se você está logado (pra não pedir PIN toda hora) e quais fichas estão abertas/fechadas na tela.

## Segurança

Os PINs ficam guardados em texto simples no banco de dados. É uma trava social para o grupo, não um cofre: alguém com acesso técnico ao banco (ou ao link, se as regras de segurança não estiverem configuradas como acima) consegue ver os dados de todo mundo. Não reutilize senhas importantes como PIN aqui.

## Quem edita o quê

- **Mestre**: quem "coloca o Pokémon na ficha" — Espécie, Tipo 1/2, Atributos Naturais e os 4 Movimentos de qualquer Treinador da mesa, além de adicionar/remover Pokémon do time de alguém.
- **Treinador**: cuida do dia a dia da própria ficha — Apelido, PV atual, Condição/Confuso, Estágios de batalha, e **reorganizar os próprios Pokémon** entre Equipe e Banco (ver abaixo). Não escolhe qual Pokémon entra na ficha — isso é só do Mestre.

## Pokédex completa (Gen 1–9) e banco de Movimentos

O site já vem com **todos os 1025 Pokémon** (espécie base de cada um, sem formas regionais/Mega/Gigantamax) e **847 Movimentos oficiais** embutidos — tipos, categoria e Base Stats/Poder/Precisão/Prioridade reais, convertidos pelas tabelas das regras (Cap. 6.1 para Atributos, Cap. 9 para Poder de Movimento). Fonte dos dados: [PokeAPI](https://pokeapi.co/).

- **Espécie** (só o Mestre vê o campo): digite o nome em inglês, como no jogo — assim que bater com um da base, Tipo 1/2 e os seis Atributos Naturais são preenchidos sozinhos, sem precisar clicar em nada.
- **Movimentos, Mestre**: campo "nome" livre com autocomplete, sem restrição (pode digitar qualquer um dos 847) — preenche Tipo/Categoria/Poder/Precisão/Prioridade/Efeito sozinho e continua editável na mão. Movimentos de poder fixo/variável (Seismic Toss, Dragon Rage, Counter, etc.) ficam com Poder em branco — é regra em aberto (Cap. 25), o Mestre adjudica na hora.
- **Movimentos, Treinador**: escolhe os próprios 4 Movimentos, mas restrito ao que a espécie realmente pode aprender — uma barra "Learnset" horizontal por slot, acima da mini-tabela dele, com quatro opções (**Nível** = aprendizado natural, só até o teto liberado pelo Nível do Treinador (Cap. 8.2/8.4); **Evo** = ganho ao evoluir pra essa forma; **TM** = só o que a espécie aprende por Fita, sem depender de Nível; **Egg** = só o que a espécie aprende por Breeding). Os dados de aprendizado (learnset) também vêm do PokeAPI. Não existe opção de HM — a mecânica saiu dos jogos oficiais a partir da Geração 9.
- Z-Moves e Movimentos Dynamax/Gigantamax **não** estão na base — são mecânicas de spin-off sem regra equivalente neste sistema.

## Equipe e Banco (arrastar Pokémon)

Cada Treinador tem 6 posições de **Equipe** (os Pokémon ativos) e um **Banco** sem limite (menu deslizante — botão "🗃️ Banco (N)" abre/fecha). O próprio Treinador (ou o Mestre) reorganiza arrastando pela alcinha **⠿** no canto do card — só isso: quem decide qual Pokémon existe e o que ele é continua sendo o Mestre.

- Arraste um Pokémon do Banco pra um slot vazio da Equipe → ele entra no time.
- Arraste um Pokémon do Banco pra cima de um Pokémon já ativo → eles trocam de lugar (o ativo vai pro Banco).
- Arraste dentro da própria Equipe (ou dentro do próprio Banco) → troca as posições dos dois.
- Arraste um Pokémon ativo pra dentro do Banco (área vazia do menu) → ele sai da Equipe e vai pro Banco.

Funciona com mouse e com toque (celular).

## Arena (esboço v1 + motor de ataque)

Botão **"🏟️ Arena"** no topo — espaço à parte pra montar uma batalha, feito como primeiro rascunho pra iterar em cima. Modelo de dados novo em `STATE.arena` (`teams` + `entries` + `lastRoll` + `log` + `round`), migração automática pra fichas salvas antes disso existir.

- **Times**: sem limite, criados/renomeados/removidos só pelo Mestre — não precisa ser 1×1, dá pra ter quantos Times a mesa quiser.
- Cada Treinador arrasta (pelo ⠿, mesma engine de Pointer Events da Equipe/Banco) um Pokémon da própria Equipe ativa pra dentro de um Time. A entrada guarda só a referência (Treinador + Pokémon) — o Pokémon continua na ficha normalmente, nada é duplicado ou movido de lá.
- **Equipe ativa é pública, mas cada Pokémon começa em Pokébola**: `arenaSourceHTML()` renderiza o card "Equipe ativa" de **todos** os Treinadores (`STATE.trainers.map(arenaTrainerSourceHTML)`) pra qualquer viewer, jogador ou Mestre — os cards de todo mundo aparecem sempre. Mas cada Pokémon nele só mostra sprite/nome de verdade pra quem for `canControl` (dono ou `SESSION.role==='gm'`) OU já tiver `p.arenaRevelado===true`; pra qualquer outro viewer, vira um tile Pokébola (`arena-source-tile-hidden`) até o Pokémon ir pra um Time pela primeira vez. Controle (`drag-handle`, `arena-source-tile-swappable`) segue restrito a `canControl` do mesmo jeito.
- **Dentro de um Time não existe mais Pokébola**: `DT.arenaSetEntry` (arrastar) e `DT.arenaSwapIn` (Trocar) sempre criam a entrada com `revelado:true` e já marcam `p.arenaRevelado=true` na hora — um Pokémon aparece pra mesa inteira (sprite, `arenaEntryHTML`) assim que entra num Time, mesmo antes de agir. É esse instante que conta como "revelar": persistido no próprio Pokémon (`p.arenaRevelado`, não na entrada da Arena, que é descartável), então mesmo saindo do Time (Trocar) e nunca mais voltando, ele já aparece de verdade na Equipe ativa dali em diante. `migrateState()` faz a mesma correção em qualquer entrada salva com `revelado:false` de antes dessa troca de regra.
- **Iniciativa (Cap. 16)**: o Mestre clica "Iniciar Rodada" e o site calcula sozinho quem age primeiro (Velocidade Efetiva → Natural → 1d6 em empate, com o −10 de Paralisia do Cap. 20.4 já aplicado) entre quem está em campo, mostra a fila com quem está com a vez destacado (`STATE.arena.round`), e avança sozinha quando quem está com a vez ataca. A fila nunca bloqueia um ataque — a Prioridade (Cap. 17) continua sendo o Mestre quem adjudica ao vivo, com o valor de cada Movimento exposto no painel de ataque pra ele usar.
- **Ação de verdade — clicar no Pokémon, sem botões separados**: não existe mais "Usar" nem "Atacar"/"Agir" como botões próprios — clicar direto no card de um Pokémon num Time (já visível desde que entrou lá) e vivo (`DT.arenaSelectActor`) abre um menu com quatro opções: **Atacar**, **Usar Item**, **Trocar de Pokémon**, **Fugir** (`SESSION.arenaAction`). Se o Pokémon estiver Confuso, o teste da Confusão (ver abaixo) roda automaticamente antes desse menu abrir. Escolhendo Atacar, aí sim se escolhe o Movimento; o alvo (se precisar de um) vem depois. O motor resolve a Precisão (Cap. 10, com fallback automático pra sempre-acerta em Movimentos sem Precisão definida — inclusive corrigindo fichas salvas de antes dessa checagem existir, via `migratePokemonMoves`), Crítico (Cap. 11), Dano (Cap. 12) e Tipos (Cap. 13) com 1d6, e o Efeito Percentual (Cap. 14) com 1d10 quando o Movimento tiver um efeito de status conhecido — se aplicar, a Condição já entra sozinha na ficha do alvo, respeitando a regra de nunca empilhar duas Condições Principais (Confusão é a exceção, Cap. 20). PV chegando a 0 marca Desmaio (Cap. 19) automaticamente.
- **Alvo do Movimento (Cap. 8.5)**: cada Movimento respeita sua própria lógica de alvo, vinda do dado oficial (`MOVE_TARGETS`, gerado do `target_id` do PokeAPI) — um Movimento **em si mesmo** (Swords Dance, Rest) resolve na hora, sem pedir clique; um **só aliado** (Helping Hand) ou **só inimigo** (Counter) só deixa clicar em quem for elegível daquele time (`eligibleMoveTargets`); um **de área** (Earthquake, Discharge — categoria `all-other`) atinge sozinho todo mundo daquela categoria de uma vez, podendo incluir aliados do próprio atacante junto com os inimigos; um **de campo** (Stealth Rock) resolve sem calcular dano, só registra o uso (mecânica ainda em aberto, Cap. 25). Pra Movimentos de área, a Precisão/Crítico/Efeito Percentual são **uma rolagem só pro uso inteiro** (mesmo d6/1d10 compartilhado, `resolveMoveUse`), só o Dano é recalculado por alvo — mas se o efeito pega ou não em cada um ainda respeita o Cap. 20 individualmente (um alvo que já tinha Condição não recebe outra, mesmo com a rolagem batendo).
- **Confusão automática (Cap. 23)**: antes do menu de ação abrir num Pokémon Confuso, `arenaConfusionPreCheck` já rola sozinho o 1d6 pra tentar eliminar a Confusão (5–6 termina) e, se continuar, o 1d6 do efeito (1–2 perde a ação e sofre 1 PV; 3–6 age normalmente) — mostra um aviso com os dois resultados e registra no log. Se a ação for perdida, o turno já avança sozinho sem abrir o menu. Paralisia, Sono e Congelamento continuam fora do motor, por conta do Mestre.
- **Dano de status por turno, automático (Cap. 20)**: assim que o Pokémon que agiu termina a ação (ataque, item, troca ou fuga — `arenaAdvanceTurn`), se ele tiver Queimadura (−1 PV), Veneno (−2 PV) ou Veneno Grave (crescente 1→2→3...) o dano já é aplicado sozinho e entra no Registro, mesmo fora de uma Rodada de Iniciativa ativa.
- **Mochila (itens)**: cada Treinador tem uma lista de itens (nome + quantidade) na própria ficha, gerenciada só pelo Mestre (`DT.addItem`/`removeItem`/`setItemQty`); aparece na Arena — cada um vê a própria, o Mestre vê a de todo mundo. No menu de ação, **Usar Item** escolhe um item e depois o alvo (o próprio Pokémon ou um aliado); por enquanto só desconta 1 unidade e registra no log — o efeito mecânico de cada item em batalha ainda é uma mecânica em aberto (Cap. 25).
- **Trocar de Pokémon (Cap. 18), clicando direto na Equipe ativa**: escolher Trocar não pede pra arrastar nada — destaca (`arena-source-tile-swappable`) os Pokémon da Equipe ativa daquele Treinador que estão vivos e ainda não são uma entrada ativa em outro lugar; um clique chama `DT.arenaSwapIn(pokemonId)`, que aplica o dano de fim de turno pendente no que está saindo (é a última ação dele em campo), remove a entrada antiga da Arena por completo (volta a existir só na Equipe ativa) e cria uma entrada nova pro escolhido, já revelada, no mesmo Time — consome a ação inteira, o que entrou só age a partir do turno seguinte.
- **Fugir (Cap. 18.1), com trava do Mestre e 1d10**: só o Mestre liga/desliga a **🔒 Trava de Fuga** (`STATE.arena.fugaTravada`, `DT.arenaToggleFugaLock`) pra batalha inteira — representa algum Movimento/Habilidade/motivo que prenda os Pokémon em campo; travada, `DT.arenaFlee` bloqueia na hora, sem gastar a ação nem rolar dado. Sem trava, rola **1d10**: 1–3 a fuga falha (a ação é gasta, o Pokémon continua em campo, o turno passa) e 4–10 ela funciona (a entrada some da Arena de vez) — os dois casos ficam no Registro.
- **Overlay de dado**: todo mundo conectado vê um quadro no centro da tela com o resultado (`STATE.arena.lastRoll`), numa div própria fora da árvore da ficha pra não recriar sprite nenhum a cada quadro da animação. O **d6** gira e assenta primeiro; só então, se houver Efeito Percentual, o **1d10** gira e assenta (com uma 2ª tentativa em sequência se veio Crítico e a 1ª falhou) — um dado de cada vez, nunca simultâneos. Some sozinho depois de alguns segundos. Uma rolagem só dispara esse overlay se aconteceu há pouco (`DICE_FRESH_MS`, 8s) — corrige um bug do v1 em que reabrir/recarregar a página replicava o overlay pra um ataque antigo já salvo no banco.
- **Registro**: um card guarda as últimas 40 linhas de ataque/status/troca/item resolvidas (`STATE.arena.log`), rolável, com botão "Limpar" pro Mestre. A entrada mais nova só aparece ali depois que o dado dela termina de girar no overlay, pra não entregar o resultado antes da hora.
- O que fica de fora, por enquanto: a janela de negociação de Prioridade em si (Cap. 17.1-17.3), os testes de início de turno de Paralisia/Sono/Congelamento, e o efeito mecânico de verdade dos itens — isso continua com o Mestre.

## O que já está no sistema de regras

Todo o núcleo de combate (atributos, Vínculo, PV, Movimentos, dano, tipos, iniciativa, Prioridade, condições de status — incluindo dano de status por turno e Confusão pré-ação automáticos na Arena), a progressão de Nível por batalhas vencidas, a Pokédex completa (Gen 1–9) e o banco de Movimentos oficiais, a organização de Equipe/Banco por arrastar, e uma Mochila de itens por Treinador (gerenciada pelo Mestre). Ainda em aberto: Maturidade/Evolução definitiva, Captura, Cura/Recuperação, PP, efeito mecânico de Itens em batalha, e Habilidades.
