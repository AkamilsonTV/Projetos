# Green Área — Jornada Pokémon (protótipo)

- **Código-fonte**: [`index.html`](index.html) — página HTML única, sem build, sem servidor (mesmo espírito do [Diário de Treinador](../pokemon-rpg/README.md)).
- **Site publicado**: `https://<seu-usuário>.github.io/<repositório>/green-area/` (mesma configuração de GitHub Pages já ativada pro resto do repositório — nada novo pra configurar).

Pedido do usuário: um site **independente** do Diário de Treinador — um jogo de completar a Pokédex. O Treinador recebe um Pokémon **inicial aleatório** (de qualquer Geração 1–9), viaja capturando Pokémon selvagens em lutas **automáticas**, enfrenta 8 **Mestres Especialistas** por Insígnias, e tudo isso limitado por uma barra de **Energia** que recarrega com o tempo.

O tema visual pedido pro primeiro teste: **Green Área**, um "ambiente de testes" fictício de uma empresa de jogos — dá o tom pro visual (verde/preto, "build de testes" no canto, um painel `🛠️ Ferramentas de Teste` honesto sobre o que é atalho de debug e o que é jogo de verdade).

## "Usando as regras daqui" — o que foi reaproveitado do RPG

Nada foi digitado de novo: `SPECIES_DEX` (1025 espécies), `TYPE_CHART`, `MOVES_DEX` (847 Movimentos), `LEARNSETS` e `EVO_STAGE` são **extraídos de verdade** do próprio [`docs/pokemon-rpg/site/diario-de-treinador.html`](../pokemon-rpg/site/diario-de-treinador.html) por um script Node (não é uma cópia colada à mão, então nunca diverge dos dados oficiais do RPG por erro de digitação) — ver `EVO_PREV`/`EVO_STAGE` etc. já documentados no [README do RPG](../pokemon-rpg/README.md).

A **fórmula de dano é a mesma do motor de combate do RPG** (`resolveAttack`):

```
dano = max(1, AtaqueEfetivo + Poder do Movimento − DefesaEfetiva + STAB + mod. de Tipo + (Crítico ? 4 : 0))
```

— Tipo **soma/subtrai** (não multiplica: TYPE_CHART já vem em 200/100/50/0, convertido em ±2), e Acerto/Crítico usam o mesmo dado 1d10 do RPG (10 sempre crítico, 1 sempre falha se a Precisão não for 100%).

A única peça nova: o RPG nunca teve "Nível de Pokémon" separado do Nível do Treinador (o Atributo Efetivo vem do Vínculo + investimento manual). Aqui, cada Pokémon tem o próprio Nível — **1 a 16, o MESMO teto do Treinador no RPG de mesa** (`regras.md` Cap. 2.4: "Nível máximo 16") — e o Atributo Efetivo é `baseStatToRPG(Stat Base oficial) + Math.floor(Nível/3)`: cresce devagar (0 a +5 ao longo dos 16 Níveis), mesma filosofia de números pequenos do resto do RPG (não é o `×Nível/50` multiplicativo dos jogos oficiais).

**Sistema de level up = a mesma regra do Treinador** (`regras.md` Cap. 2.4): a cada **4 batalhas completas vencidas, sobe 1 Nível automaticamente** (não precisa dar o golpe final — só ter entrado em campo numa luta que a Equipe venceu), contador zera depois de subir. Aqui quem sobe é o próprio Pokémon (o RPG nunca teve essa separação pra copiar 1:1) — e ele aprende Movimento novo de verdade nesse momento (`pickMovesForLevel` roda de novo no Nível novo), não fica mais preso ao kit da captura pra sempre.

## Habilitar o salvamento online (1 passo manual, único)

O código já está pronto e usa o Firebase do Diário de Treinador — só falta autorizar a coleção nova (`green_area_saves`) nas regras de segurança do Firestore, porque as regras atuais só liberam o documento `diario/estado` do RPG e bloqueiam tudo o mais (`match /{document=**} { allow read, write: if false; }`).

1. Acesse [console.firebase.google.com](https://console.firebase.google.com/), abra o projeto **diario-de-treinador** (o mesmo do RPG).
2. Vá em **Compilação → Firestore Database → Regras**.
3. Substitua o conteúdo pelo bloco abaixo (adiciona a liberação de `green_area_saves`, mantendo a do RPG intacta):
   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /diario/estado {
         allow read, write: if true;
       }
       match /green_area_saves/{saveId} {
         allow read, write: if true;
       }
       match /{document=**} {
         allow read, write: if false;
       }
     }
   }
   ```
4. Clique em **Publicar**.

Pronto — depois disso o login funciona (Entrar/Criar novo na tela inicial). Sem esse passo, criar conta ou entrar mostra um erro de conexão com o banco (a regra atual recusaria a escrita/leitura na coleção nova).

## O que o protótipo já faz

- **Login/criação de conta (Nome+PIN)**: entra com Nome+PIN de um Treinador já criado, ou cria um novo — o inicial é sorteado na hora da criação (1 das 9 Gerações, depois 1 dos 3 daquela Geração — pra dar a mesma chance a cada Geração, não a cada Pokémon). O progresso fica salvo no Firebase (ver "Salvamento" abaixo), então dá pra entrar de novo em qualquer aparelho com o mesmo Nome+PIN.
- **Pokédex** (`📕`): grade com as 1025 espécies. Nunca visto = cinza escuro e sem contorno; visto em batalha = cinza claro (contorno neutro); **capturado = colorido** (mesma imagem, só o filtro CSS muda — a "foto" é a mesma fonte de sprite já usada e comprovada no Diário de Treinador, PokeAPI/sprites; Bulbapedia em si não tem um CDN estável pra hotlink direto, essa é a mesma substituição confiável que o resto do projeto já usa). Clique num quadro pra ver detalhes (Tipo(s) e Stats Base, se já capturado).
- **Área de Captura** (`🌿`) — **6 Zonas nomeadas por faixa de Nível**: Aprendiz (1–3), Iniciante (4–6), Moderado (7–9), Avançado (10–12), Experiente (13–15) e Lendário (16, o teto sozinho). Escolhe quem lidera, e cada Zona libera pra ESSE Pokémon quando ele chega no Nível mínimo dela — Zonas já liberadas continuam sempre disponíveis (dá pra voltar e farmar com folga, "área pra farmar bem com uma certa dificuldade mas justo", como pedido). O selvagem sorteado tem Nível dentro da faixa da Zona, e a espécie nunca vem mais evoluída do que a Zona permite (Estágio de evolução preso à Zona: 1–2 só formas básicas, 3–4 liberam a 1ª evolução, 5–6 liberam a linha evolutiva completa — "de 1 a 3 pode não ter evolução... ir evoluindo, mas desde que próximo aos que estão naquela classe"). Cada "Entrar na mata" tem **25% de chance de cair num Treinador aleatório** em vez de um selvagem (1-2 Pokémon da mesma faixa/Zona) — não dá pra capturar o Pokémon dele, mas paga mais Pokédólares. Só **depois de vencer** um selvagem é que oferece jogar Pokébola (pedido explícito do usuário — diferente dos jogos oficiais).
- **Mestres Especialistas** (`🎖️`): 8 Mestres temáticos por Tipo, elenco fixo curado (nunca lendário), Nível do Ace igualmente espalhado pelo teto do jogo (2, 4, 6, 8, 10, 12, 14, 16 — o 8º Mestre sempre bate no Nível máximo), progressão **sempre sequencial** (não dá pra pular). Vencer dá a Insígnia.
- **Loja** (`🏪`): compra Pokébola/Poção/Superpoção/Hiperpoção com **Pokédólares** — mesma ordem relativa de preço do jogo oficial (Bulbapedia: Poké Ball < Potion < Super Potion < Hyper Potion), só escalada pro tamanho de número pequeno que o resto do protótipo usa. Pokédólares são ganhos **depois de toda luta vencida** — selvagem paga o mínimo, Treinador aleatório de Zona paga mais, Mestre Especialista paga o máximo (no mesmo Nível de oponente, Treinador SEMPRE ganha mais que selvagem, nunca o contrário, como pedido).
- **Luta automática**: iniciativa por Velocidade Efetiva, dano pela fórmula acima, log resumido turno a turno. **Gatilho de cura**: com o Pokémon ativo do jogador em ≤20% de PV, a luta pausa e pergunta se quer usar Poção/Superpoção/Hiperpoção (só aparece o que o Treinador realmente tem). Desmaiou e sobra alguém na Equipe? Pausa pra escolher quem entra. **Nunca dá pra desistir** de uma luta já começada. PV é sempre restaurado 100% fora de batalha (não existe dano/condição persistente entre lutas).
- **Energia** (0–1000): selvagem custa `10 × Nível do selvagem`; Treinador de Zona custa `15 × Nível dele`; Mestre custa `20 × Nível do Ace dele`. Recupera `+10` a cada 10 minutos reais — calculado "de forma preguiçosa" (a cada interação, confere quanto tempo passou e credita os blocos de 10 min inteiros, sem depender de um timer vivo que morreria se a aba fechasse).
- **Equipe/Caixa**: até 6 na Equipe, excedente vai pra Caixa; soltar (com confirmação) e puxar da Caixa pra Equipe.
- **Salvamento**: Firebase Firestore — **o mesmo projeto que já hospeda o Diário de Treinador** (não é uma conta/projeto novo pra configurar), numa coleção própria (`green_area_saves`) com **1 documento por Treinador**, login por **Nome+PIN** (mesmo modelo do Diário de Treinador: PIN comparado em texto puro no cliente — é uma trava simples "de mesa", não criptografia de verdade). Progresso sincroniza em tempo real (`onSnapshot`) e funciona de qualquer aparelho com o mesmo Nome+PIN. Precisa de **1 passo manual único** no Firebase Console — ver "Habilitar o salvamento online" abaixo.
- **Painel Admin** (`🛡️`, só pra quem loga como "Marcus"): vê TODAS as contas cadastradas (Nome, maior Nível, Insígnias, Energia, Pokédólares), **bane/desbane** (bloqueia login sem apagar o progresso) e **exclui** (some de vez do Firestore, com confirmação em 2 cliques) qualquer conta. Reconhecido pelo ID do documento (o mesmo `saveDocId` do login normal) — mesmo aviso de sempre: é uma trava só no CLIENTE, não uma regra de segurança de verdade no Firestore (mesmo modelo de PIN em texto puro do resto do projeto).
- **`🛠️ Ferramentas de Teste`**: encher Energia, +1 Pokéticket (+100 Energia), +itens, +500 Pokédólares, resetar o save — tudo marcado como debug, nunca escondido como mecânica real.

## Simplificações deste protótipo (documentadas de propósito)

- **Sem Habilidade/Natureza/Estágio/status persistente** (Queimadura, Veneno, Sono...) nas lutas — só dano puro + Acerto/Crítico. O RPG completo tem tudo isso; aqui ficou de fora pra manter o motor automático simples e rápido de rodar.
- **Sem PP** — Movimento nunca "acaba" numa luta.
- **Kit de Movimentos por Nível**: escolhido de novo (os 4 mais altos do Learnset por Nível que ele já tem liberado) toda vez que o Pokémon sobe de Nível — não muda fora disso (não "aprende por TM/Evolução" neste protótipo).
- **Chance de captura aproximada**: não existe um "índice de captura" oficial neste dex — a chance usa o Estágio de evolução (`EVO_STAGE`) como aproximação de dificuldade (quanto mais evoluído, mais difícil).
- **PIN em texto puro** (mesma escolha de design do Diário de Treinador) — é uma trava simples "de mesa" contra digitar o Nome de outro Treinador por engano, não é autenticação de verdade; não use um PIN sensível. O Painel Admin usa o mesmo modelo (reconhecido pelo Nome da conta, sem regra de segurança real no Firestore).
- **Progressão de Insígnia sempre sequencial** (não dá pra escolher a ordem, diferente dos jogos oficiais que às vezes liberam ordem livre numa região).
- **Treinador aleatório de Zona é sempre genérico** (nome de uma lista curta, 1-2 Pokémon sorteados da mesma piscina do selvagem) — não tem elenco fixo curado como os 8 Mestres.

## Testado

Suíte própria (fora do repositório, no scratchpad da sessão que criou isto — ver o histórico do commit), com um stub de Firestore em memória (imita `get`/`set`/`update`/`delete`/`onSnapshot`/consulta da coleção inteira do SDK real, sem precisar de rede) pra testar a persistência sem depender do banco de verdade: criação de conta (inicial sempre um dos 27 de verdade, documento gravado no Firestore); nome duplicado recusado; PIN incorreto/Treinador inexistente/conta banida recusados; `mutate()` salva no Firestore depois do debounce; sair/entrar de novo recupera o progresso salvo; migração de um save local legado pra uma conta online; `DT.gaDebugReset` reseta o documento da conta existente; Energia nunca passa de 1000 mesmo com muito tempo simulado; `pickMovesForLevel` varrida em ~150 espécies × 5 Níveis, nunca devolve um kit sem nenhum Movimento de dano; motor de batalha selvagem resolvido até o fim nos dois desfechos (vitória E derrota, não é vitória garantida); custo de Energia descontado de verdade; trava contra 2 lutas simultâneas; bloqueio por Energia insuficiente sem descontar nada; progressão sequencial de Mestre recusando pular; fila completa dos 8 Mestres vencida do 1º ao último (incluindo troca por desmaio de verdade); todas as telas (incluindo Loja/Admin) + a tela de login + popup da Pokédex (não visto/visto/capturado) renderizando sem estourar em vários estados; **stress test de 400 ciclos de luta aleatórios** (selvagem/Treinador de Zona/Mestre, Níveis 1–16, decisões de item/troca aleatórias, já logado via Firestore stub) — 0 estouros, 0 lutas travadas.

**Leva de Nível/Zonas/Loja/Admin** (esta sessão): teto de Nível 16 confirmado em todo lugar que decide um Nível de Pokémon (`NIVEL_MAX`); sistema de level up (4 vitórias = +1 Nível, contador zera, trava exatamente em 16 sem estourar, aprende Movimento novo de verdade); as 6 Zonas nomeadas existem com a faixa certa, nunca sorteiam espécie acima do Estágio de evolução da Zona, e recusam entrar quando o líder não chegou no Nível mínimo (com o aviso certo); Ace dos 8 Mestres confirmado em 2/4/6/8/10/12/14/16; recompensa em Pokédólares confirmada MAIOR contra Treinador que contra selvagem no mesmo Nível; comprar na Loja debita/credita certo e recusa sem saldo. Painel Admin testado com **cliques reais** (mesmo harness `test_dom_globals.js` que carrega o `<script>` sem remover o invólucro): criar a conta "Marcus" de propósito libera a aba 🛡️ Admin, o painel lista as contas de verdade (via `get()` na coleção inteira do Firestore stub), Banir/Desbanir mudam o estado na tela, e Excluir pede confirmação em 2 cliques antes de apagar o documento de vez.

**Bug real achado pelo usuário** ("cliquei e não aconteceu nada, nem muda de aba"): `DT` (e, em 4 botões específicos, `SESSION`/`render` direto) só existiam DENTRO da closure do `<script>`, nunca em `window` — e todo `onclick="..."` inline roda em escopo GLOBAL do navegador, não enxerga variável nenhuma de dentro de uma função anônima. Resultado: **nenhum botão jamais funcionou de verdade num navegador**, desde o primeiro commit deste protótipo — os testes acima nunca pegaram isso porque removem esse "invólucro" antes de rodar (de propósito, pra inspecionar `STATE`/`DT` direto), o que mascara exatamente essa classe de bug. Corrigido com `window.DT = DT;` (mesmo padrão que o Diário de Treinador já usava) + os 4 botões reescritos como `DT.*` (nunca `SESSION`/`render()` cru num onclick). Ganhou um harness novo (`test_dom_globals.js`) que carrega o `<script>` **sem remover o invólucro** — do jeito que o navegador carrega de verdade — dentro de um contexto `vm` isolado, faz uma varredura estática de todo `onclick="..."` renderizado (confirmando que nenhum identificador livre escapa da lista de globais reais) e ainda executa de verdade um punhado dos cliques mais representativos (Criar novo → preencher → Começar a jornada; Cancelar do reset; banner de migração) nesse mesmo escopo global separado — reproduzindo o clique exatamente como um usuário faria.

## Em aberto (próximos passos possíveis)

- Habilidade/Natureza/status persistente nas lutas (trazer mais do motor completo do RPG).
- Modo "visitar" o progresso de outro Treinador só de leitura (a base de dados já dá pra isso — hoje só falta a tela).
- Log de batalha com playback (hoje é tudo calculado e mostrado de uma vez até a próxima pausa; dava pra revelar linha por linha com uma pequena animação).
- Elenco curado de Treinadores por Zona (hoje é genérico: nome de uma lista + Pokémon aleatórios da mesma piscina do selvagem).
- Mais itens na Loja (hoje só os 4 que a luta automática já usa — Bulbapedia tem o catálogo oficial inteiro pra puxar de lá quando fizer sentido, mesma fonte que orientou os preços relativos).
