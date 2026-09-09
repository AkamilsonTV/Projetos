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

A única peça nova: o RPG nunca teve "Nível de Pokémon" separado do Nível do Treinador (o Atributo Efetivo vem do Vínculo + investimento manual). Aqui, cada Pokémon tem o próprio Nível (1–100), e o Atributo Efetivo é `baseStatToRPG(Stat Base oficial) + Math.floor(Nível/3)` — cresce devagar, mesma filosofia de números pequenos do resto do RPG (não é o `×Nível/50` multiplicativo dos jogos oficiais).

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
- **Área de Captura** (`🌿`): escolhe quem lidera, sorteia um selvagem (Estágio de evolução liberado cresce com o número de Insígnias — `EVO_STAGE`, mesma fonte do RPG), luta automática, e só **depois de vencer** oferece jogar Pokébola (pedido explícito do usuário — diferente dos jogos oficiais, aqui a captura não depende de "enfraquecer sem nocautear").
- **Mestres Especialistas** (`🎖️`): 8 Mestres temáticos por Tipo, elenco fixo curado (nunca lendário), Nível crescente, progressão **sempre sequencial** (não dá pra pular). Vencer dá a Insígnia.
- **Luta automática**: iniciativa por Velocidade Efetiva, dano pela fórmula acima, log resumido turno a turno. **Gatilho de cura**: com o Pokémon ativo do jogador em ≤20% de PV, a luta pausa e pergunta se quer usar Poção/Superpoção/Hiperpoção (só aparece o que o Treinador realmente tem). Desmaiou e sobra alguém na Equipe? Pausa pra escolher quem entra. **Nunca dá pra desistir** de uma luta já começada. PV é sempre restaurado 100% fora de batalha (não existe dano/condição persistente entre lutas).
- **Energia** (0–1000): selvagem custa `10 × Nível do selvagem`; Mestre custa `20 × Nível do Ace dele`. Recupera `+10` a cada 10 minutos reais — calculado "de forma preguiçosa" (a cada interação, confere quanto tempo passou e credita os blocos de 10 min inteiros, sem depender de um timer vivo que morreria se a aba fechasse).
- **Equipe/Caixa**: até 6 na Equipe, excedente vai pra Caixa; soltar (com confirmação) e puxar da Caixa pra Equipe.
- **Salvamento**: Firebase Firestore — **o mesmo projeto que já hospeda o Diário de Treinador** (não é uma conta/projeto novo pra configurar), numa coleção própria (`green_area_saves`) com **1 documento por Treinador**, login por **Nome+PIN** (mesmo modelo do Diário de Treinador: PIN comparado em texto puro no cliente — é uma trava simples "de mesa", não criptografia de verdade). Progresso sincroniza em tempo real (`onSnapshot`) e funciona de qualquer aparelho com o mesmo Nome+PIN. Precisa de **1 passo manual único** no Firebase Console — ver "Habilitar o salvamento online" abaixo.
- **`🛠️ Ferramentas de Teste`**: encher Energia, +1 Pokéticket (+100 Energia), +itens, resetar o save — tudo marcado como debug, nunca escondido como mecânica real.

## Simplificações deste protótipo (documentadas de propósito)

- **Sem Habilidade/Natureza/Estágio/status persistente** (Queimadura, Veneno, Sono...) nas lutas — só dano puro + Acerto/Crítico. O RPG completo tem tudo isso; aqui ficou de fora pra manter o motor automático simples e rápido de rodar.
- **Sem PP** — Movimento nunca "acaba" numa luta.
- **Kit de Movimentos fixo por captura**: escolhido 1x quando o Pokémon nasce/é capturado (os 4 mais altos do Learnset por Nível que ele já tem liberado) — não "aprende Movimento novo" ao subir de Nível neste protótipo (o Nível dele não muda depois de capturado, também não tem sistema de XP ainda).
- **Chance de captura aproximada**: não existe um "índice de captura" oficial neste dex — a chance usa o Estágio de evolução (`EVO_STAGE`) como aproximação de dificuldade (quanto mais evoluído, mais difícil).
- **PIN em texto puro** (mesma escolha de design do Diário de Treinador) — é uma trava simples "de mesa" contra digitar o Nome de outro Treinador por engano, não é autenticação de verdade; não use um PIN sensível.
- **Progressão de Insígnia sempre sequencial** (não dá pra escolher a ordem, diferente dos jogos oficiais que às vezes liberam ordem livre numa região).

## Testado

Suíte própria (fora do repositório, no scratchpad da sessão que criou isto — ver o histórico do commit), com um stub de Firestore em memória (imita `get`/`set`/`update`/`onSnapshot` do SDK real, sem precisar de rede) pra testar a persistência sem depender do banco de verdade: criação de conta (inicial sempre um dos 27 de verdade, documento gravado no Firestore); nome duplicado recusado; PIN incorreto/Treinador inexistente recusados; `mutate()` salva no Firestore depois do debounce; sair/entrar de novo recupera o progresso salvo; migração de um save local legado pra uma conta online; `DT.gaDebugReset` reseta o documento da conta existente; Energia nunca passa de 1000 mesmo com muito tempo simulado; `pickMovesForLevel` varrida em ~150 espécies × 5 Níveis, nunca devolve um kit sem nenhum Movimento de dano; motor de batalha selvagem resolvido até o fim nos dois desfechos (vitória E derrota, não é vitória garantida); custo de Energia descontado de verdade; trava contra 2 lutas simultâneas; bloqueio por Energia insuficiente sem descontar nada; progressão sequencial de Mestre recusando pular; fila completa dos 8 Mestres vencida do 1º ao último (incluindo troca por desmaio de verdade); todas as 6 telas + a tela de login + popup da Pokédex (não visto/visto/capturado) renderizando sem estourar em vários estados; **stress test de 400 ciclos de luta aleatórios** (selvagem e Mestre, Níveis 1–100, decisões de item/troca aleatórias, já logado via Firestore stub) — 0 estouros, 0 lutas travadas.

**Bug real achado pelo usuário** ("cliquei e não aconteceu nada, nem muda de aba"): `DT` (e, em 4 botões específicos, `SESSION`/`render` direto) só existiam DENTRO da closure do `<script>`, nunca em `window` — e todo `onclick="..."` inline roda em escopo GLOBAL do navegador, não enxerga variável nenhuma de dentro de uma função anônima. Resultado: **nenhum botão jamais funcionou de verdade num navegador**, desde o primeiro commit deste protótipo — os testes acima nunca pegaram isso porque removem esse "invólucro" antes de rodar (de propósito, pra inspecionar `STATE`/`DT` direto), o que mascara exatamente essa classe de bug. Corrigido com `window.DT = DT;` (mesmo padrão que o Diário de Treinador já usava) + os 4 botões reescritos como `DT.*` (nunca `SESSION`/`render()` cru num onclick). Ganhou um harness novo (`test_dom_globals.js`) que carrega o `<script>` **sem remover o invólucro** — do jeito que o navegador carrega de verdade — dentro de um contexto `vm` isolado, faz uma varredura estática de todo `onclick="..."` renderizado (confirmando que nenhum identificador livre escapa da lista de globais reais) e ainda executa de verdade um punhado dos cliques mais representativos (Criar novo → preencher → Começar a jornada; Cancelar do reset; banner de migração) nesse mesmo escopo global separado — reproduzindo o clique exatamente como um usuário faria.

## Em aberto (próximos passos possíveis)

- Sistema de XP/subida de Nível pós-captura (hoje o Nível só é definido na hora da captura/spawn).
- Habilidade/Natureza/status persistente nas lutas (trazer mais do motor completo do RPG).
- Modo "visitar" o progresso de outro Treinador só de leitura (a base de dados já dá pra isso — hoje só falta a tela).
- Zonas/mapas temáticos em vez de um pool único de selvagens por Estágio.
- Log de batalha com playback (hoje é tudo calculado e mostrado de uma vez até a próxima pausa; dava pra revelar linha por linha com uma pequena animação).
