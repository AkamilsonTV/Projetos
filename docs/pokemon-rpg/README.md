# Pokémon RPG — Diário de Treinador

- **Regras** (livro consolidado, v0.2): [`regras.md`](regras.md)
- **Código-fonte do site**: [`site/diario-de-treinador.html`](site/diario-de-treinador.html)
- **Site publicado**: veja a seção [Publicar no GitHub Pages](#publicar-no-github-pages-uma-vez) abaixo — depois de ativado, o link fica em `https://<seu-usuário>.github.io/<repositório>/`.

O site é uma página HTML única, hospedada de graça no **GitHub Pages**, com os dados (fichas de todo mundo) salvos em tempo real num banco **Firebase Firestore** (também grátis, sem cartão de crédito). Sem esse banco configurado, o site abre mas mostra uma tela avisando que falta ligar o banco de dados.

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

## Pokédex de Geração 1 (Kanto)

O site já vem com os 151 Pokémon de Kanto embutidos (tipos e Base Stats oficiais). Ao criar/editar um Pokémon na ficha, digite o nome da espécie (em inglês, como no jogo — o campo autocompleta) e clique em **"Dados oficiais"**: o Tipo 1/2 e os seis Atributos Naturais são preenchidos automaticamente, já convertidos pela Tabela 6.1 das regras (Base Stat → escala 1–20). Depois disso os campos continuam editáveis normalmente, então dá pra ajustar à mão se quiser fugir do oficial.

## O que já está no sistema de regras

Todo o núcleo de combate (atributos, Vínculo, PV, Movimentos, dano, tipos, iniciativa, Prioridade, condições de status), a progressão de Nível por batalhas vencidas e a Pokédex de Gen 1 (tipos + Atributos Naturais oficiais). Ainda em aberto: Maturidade/Evolução definitiva, Captura, Cura/Recuperação, PP, Itens e Habilidades — e a Pokédex ainda cobre só Kanto (Gen 2 em diante fica pra próxima etapa).
