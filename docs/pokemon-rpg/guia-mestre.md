# Guia do Mestre

> Este guia acompanha o Diário de Treinador e é atualizado sempre que a gente muda ou adiciona alguma função no site. Se algo aqui não bater com o que você vê na tela, é sinal de que o guia ainda vai ser atualizado.

## Entrando como Mestre

Na tela inicial, clique em **"Sou o Mestre"**.

- **Primeira vez nesta mesa?** O site pede pra você **definir um PIN** — quem souber esse PIN entra como Mestre. Só existe um PIN de Mestre por mesa (não é por pessoa).
- **Já tem PIN definido?** Digite ele pra entrar.

## Painel do Mestre ("Mesa")

Assim que entra, você vê a lista de todos os Treinadores que já criaram ficha nesta mesa. Clique no nome de um Treinador pra abrir a ficha completa dele (clique de novo pra fechar).

No rodapé da ficha aberta tem o botão **"Remover Treinador da mesa"** — apaga a ficha inteira dele (pede confirmação antes).

## O que só você edita

Diferente do Treinador, você tem acesso total à ficha de qualquer um da mesa:

### Nível e progresso

- **Nível do Treinador**: campo numérico livre (1 a 16) — você pode digitar direto se precisar ajustar.
- **Batalhas vencidas**: contador que só você vê. Tem um botão **"+1 vitória"** (soma uma batalha) e também dá pra digitar o número direto. A cada 4 vitórias, o Nível sobe sozinho e o contador zera — aparece um aviso na tela quando isso acontece.

### Atributos: escolha, sorteio e Correção

O sistema de pontos por Nível (ímpar = Treinador escolhe, par = sorteio no dado) funciona igual pra você — você pode clicar nos botões de escolher/sortear no lugar do Treinador se precisar.

Além disso, só o Mestre tem a ferramenta **"Correção"**: aparece embaixo dos Atributos quando já existe pelo menos uma escolha de Nível ímpar feita. Abre uma lista "Nível 1: [trocar] · Nível 3: [trocar]..." — usa pra reatribuir um clique errado do Treinador pra outro Atributo. **Só alcança escolhas de Nível ímpar** — o sorteio de Nível par não é corrigível por aqui, o dado já decidiu.

### Definindo um Pokémon

Só você adiciona (**"+ Adicionar Pokémon"** — entra direto na Equipe se tiver vaga, senão vai pro Banco) e remove (botão **✕** no card, com confirmação) Pokémon da ficha de um Treinador.

Pra configurar um Pokémon:

- **Espécie**: digite o nome em inglês (como no jogo) — o campo autocompleta. Assim que o nome bater com um da base (todos os 1025 Pokémon, Gen 1 a 9), **Tipo 1/2 e os seis Atributos Naturais são preenchidos sozinhos**, já convertidos pela tabela de regras. Depois de preenchido, os campos continuam editáveis à mão, se quiser fugir do oficial.
- O sprite (imagem pixelada) do Pokémon aparece automaticamente no card assim que a Espécie é reconhecida.
- **Vínculo**: controlado por um slider (0–25) — libera pontos de Atributo do Treinador pro Pokémon usar, conforme a tabela das Regras.
- **Maturidade**: campo numérico livre — a regra definitiva de evolução ainda está em aberto.
- **Condição** (queimadura, veneno, sono, paralisia, etc.) e **Confuso**: você aplica durante a batalha; aparecem em destaque na ficha do Treinador assim que ativos, pra ele acompanhar.

Você continua com um campo "nome" livre (com autocomplete, 847 movimentos oficiais) pra cada um dos 4 Movimentos, e as regras de sempre: digitar um nome reconhecido preenche Tipo, Categoria, Poder, Prioridade, Precisão e Efeito sozinho; Movimentos de dano fixo ou variável (Seismic Toss, Dragon Rage, etc.) ficam com Poder em branco — regra em aberto (Cap. 25), você adjudica na mesa. **Esse campo continua sem restrição nenhuma** (pode digitar qualquer um dos 847, mesmo que a espécie normalmente não aprendesse), pra você poder fazer exceções e homebrew quando quiser.

### O que o Treinador escolhe sozinho

Desde já é o próprio Treinador quem escolhe os 4 Movimentos do Pokémon dele — mas de um jeito restrito: pra cada slot, ele escolhe entre **Nível** (só o que a espécie aprende por Nível, e só até o Nível atual dele — Cap. 8.2/8.4 das Regras), **Evo** (ganho ao evoluir pra essa forma), **TM** ou **Egg** (só o que a espécie pode aprender por aquela via). Não existe opção de HM — saiu dos jogos oficiais a partir da Geração 9. Ele nunca digita nada solto — só escolhe de listas geradas a partir da espécie de verdade.

PV atual, Apelido e Estágios de batalha o Treinador também edita — não precisa fazer por ele durante o jogo, a menos que queira.

### Equipe e Banco

Mesmo mecanismo de arrastar (⠿) que o Treinador tem: mover entre os 6 slots da Equipe e o Banco (sem limite), trocar de lugar, reordenar. Você pode reorganizar a ficha de qualquer Treinador se precisar.

## Arena (esboço — ainda em construção)

Botão **"🏟️ Arena"** no topo. Primeira versão do espaço de batalha — feita pra testarmos e ajustarmos junto.

- **Times**: só você cria (**"+ Novo Time"**), renomeia (campo de texto no topo do Time) e remove (✕, com confirmação). Sem limite — não precisa ser só 2, dá pra fazer quantos Times a mesa precisar.
- Cada Treinador arrasta (pelo ⠿) um Pokémon da própria Equipe ativa pra dentro de um Time. Isso não tira o Pokémon da ficha dele — a Arena só reflete quem está na batalha.
- **Você vê todo mundo sempre**, revelado ou não — é o único papel com visão total da Arena. Os Treinadores só veem os próprios Pokémon e os que já foram "Usados"; o resto aparece como Pokébola pra eles. Um Pokémon "Usado" mostra uma **barra de PV** com três cores (verde/amarela/vermelha, conforme o PV atual) visível pra mesa inteira.
- Você também pode clicar **"Usar"**/✕ nos Pokémon de qualquer Treinador, se precisar ajustar por eles.

### Iniciativa (fila de turnos)

O card **"🎯 Iniciativa"** é todo seu: só o Mestre clica em **"▶️ Iniciar Rodada"** (calcula a fila pelo Cap. 16 — Velocidade Efetiva, depois Natural, depois 1d6 em empate, já descontando os −10 de quem estiver Paralisado) ou **"🔁 Recalcular"** (mesma coisa, mas abre a Rodada seguinte — útil se alguém mudou de Estágio, curou a Paralisia, etc.). **"Encerrar"** fecha a rodada sem abrir outra.

A fila é só um guia visual pra mesa — **nenhum ataque é bloqueado** por não ser a vez de alguém (a negociação de Prioridade do Cap. 17 continua sendo você quem media ao vivo, olhando a Prioridade que aparece no painel de ataque de cada Movimento). Quando quem está com a vez ataca, a fila passa pro próximo sozinha; fora isso, **"⏭️ Próximo"** também pode ser clicado pelo dono do Pokémon da vez, não só por você — não precisa ficar de babá clicando a cada turno.

### Resolvendo um ataque de verdade

Qualquer Pokémon já "Usado" e vivo ganha um botão **"⚔️ Atacar"**. Como Mestre, você pode clicar esse botão em qualquer Pokémon da mesa (não só nos seus) — útil pra rodar o ataque de um NPC/Pokémon selvagem que você mesmo colocar na Arena, ou pra ajudar um jogador.

1. Clique **"⚔️ Atacar"** no Pokémon que vai agir.
2. Clique no alvo (outro Pokémon já "Usado" e vivo — aliado ou adversário, o sistema não distingue times pra isso).
3. Escolha o Movimento no painel que aparece (a Prioridade dele, se tiver, aparece ali junto).
4. O sistema resolve tudo sozinho e mostra o resultado num quadro de dado no centro da tela pra todo mundo conectado — não só quem está com a Arena aberta. O **d6** do ataque gira e assenta primeiro; só depois disso, se o Movimento tiver Efeito Percentual, o **1d10** gira e assenta (e ganha uma segunda rolagem, também sozinha em sequência, se o ataque foi Crítico e a primeira falhou) — nunca os dois ao mesmo tempo, um de cada vez, dando aquele suspense antes do resultado final aparecer. Só a divzinha do dado se mexe durante a animação — o resto da tela fica parado, sem piscar.

O motor de ataque segue as Regras: rola 1d6 pra Precisão (Cap. 10, respeitando Movimentos 100% automáticos) e Crítico (Cap. 11, natural 6 em Movimento de dano), calcula o Dano Base (Cap. 12) e aplica STAB/Tipos (Cap. 13, com Fraqueza e resistência se cancelando por Tipo do defensor). Se o Movimento tiver um Efeito Percentual conhecido (ex.: Thunderbolt/Paralisia, Toxic/Veneno Grave), rola 1d10 na mesma resolução (Cap. 14) — Crítico dá uma segunda tentativa se a primeira falhar — e, se aplicar, a Condição de status já entra sozinha na ficha do alvo (respeitando a regra de nunca ter duas Condições Principais ao mesmo tempo — Confusão é a exceção, Cap. 20) e aparece com o ícone de sempre. PV chegando a 0 já marca Desmaio (Cap. 19).

O que o motor **não** faz sozinho — continua sendo você quem conduz: a janela de negociação de Prioridade (Cap. 17), os testes de início de turno das Condições (Paralisia travar a ação, Sono acordar, Congelamento descongelar, Confusão, Cap. 20-23) e o dano de final de turno de Queimadura/Veneno/Veneno Grave. Cancele o ataque a qualquer momento com **"Cancelar"** no painel.

### Registro (histórico de rolagens)

O card **"📜 Rolagens da Arena"** guarda as últimas 40 linhas de ataque (Movimento, dados, resultado) — dá pra rolar a lista e ver o que já rolou na batalha, ou clicar **"Limpar"** (só o Mestre) pra zerar entre uma batalha e outra. A rolagem mais nova só aparece ali quando o dado dela termina de girar no quadro central — não estraga o suspense pra quem está olhando o Registro em vez do quadro.

## Tema claro/escuro

Botão **☀️/🌙** no topo. O site sempre abre claro por padrão; a escolha de tema é individual (fica salva só no seu aparelho) e não segue o sistema operacional.

## Regras e guias

Botão **"📖 Regras"** no topo — três abas: **Regras** (livro completo), **Guia do Treinador** e **Guia do Mestre** (este aqui). Vale a pena revisar o Guia do Treinador de vez em quando, pra saber exatamente o que cada jogador vê e pode fazer sozinho.

## Saindo

Botão **"Sair"** no topo. Da próxima vez, entra de novo com o PIN de Mestre.
