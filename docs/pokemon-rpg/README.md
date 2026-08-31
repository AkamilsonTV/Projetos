# Pokémon RPG — Diário de Treinador

- **Regras** (livro consolidado, v0.2): [`regras.md`](regras.md)
- **Código-fonte do site**: [`site/diario-de-treinador.html`](site/diario-de-treinador.html)
- **Site publicado**: veja a seção [Publicar no GitHub Pages](#publicar-no-github-pages-uma-vez) abaixo — depois de ativado, o link fica em `https://<seu-usuário>.github.io/<repositório>/`.

O site é uma página HTML única, hospedada de graça no **GitHub Pages**, com os dados (fichas de todo mundo) salvos em tempo real num banco **Firebase Firestore** (também grátis, sem cartão de crédito). Sem esse banco configurado, o site abre mas mostra uma tela avisando que falta ligar o banco de dados.

## Regras dentro do site

O botão **"📖 Regras"** (no topo, em qualquer tela) busca e mostra `regras.md` direto deste repositório — não é uma cópia colada no site. Ou seja: sempre que `regras.md` for atualizado e o commit for enviado, a próxima vez que alguém abrir "Regras" no site já vê a versão nova, sem precisar tocar no HTML. Funciona antes mesmo de configurar o Firebase.

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
- **Movimentos** (só o Mestre vê os campos): digite o nome oficial no campo "nome" de cada Movimento — Tipo, Categoria, Poder, Precisão, Prioridade e um resumo do Efeito são preenchidos automaticamente. Movimentos de poder fixo/variável (Seismic Toss, Dragon Rage, Counter, etc.) ficam com Poder em branco — é regra em aberto (Cap. 25), o Mestre adjudica na hora.
- Depois de preenchido, tudo continua editável na mão pelo Mestre — útil pra ajustar algo fora do padrão oficial.
- Z-Moves e Movimentos Dynamax/Gigantamax **não** estão na base — são mecânicas de spin-off sem regra equivalente neste sistema.

## Equipe e Banco (arrastar Pokémon)

Cada Treinador tem 6 posições de **Equipe** (os Pokémon ativos) e um **Banco** sem limite (menu deslizante — botão "🗃️ Banco (N)" abre/fecha). O próprio Treinador (ou o Mestre) reorganiza arrastando pela alcinha **⠿** no canto do card — só isso: quem decide qual Pokémon existe e o que ele é continua sendo o Mestre.

- Arraste um Pokémon do Banco pra um slot vazio da Equipe → ele entra no time.
- Arraste um Pokémon do Banco pra cima de um Pokémon já ativo → eles trocam de lugar (o ativo vai pro Banco).
- Arraste dentro da própria Equipe (ou dentro do próprio Banco) → troca as posições dos dois.
- Arraste um Pokémon ativo pra dentro do Banco (área vazia do menu) → ele sai da Equipe e vai pro Banco.

Funciona com mouse e com toque (celular).

## O que já está no sistema de regras

Todo o núcleo de combate (atributos, Vínculo, PV, Movimentos, dano, tipos, iniciativa, Prioridade, condições de status), a progressão de Nível por batalhas vencidas, a Pokédex completa (Gen 1–9) e o banco de Movimentos oficiais, e a organização de Equipe/Banco por arrastar. Ainda em aberto: Maturidade/Evolução definitiva, Captura, Cura/Recuperação, PP, Itens e Habilidades.
