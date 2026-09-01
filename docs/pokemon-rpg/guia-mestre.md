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
- **Natureza**: menu com as 25 Naturezas oficiais. Escolhida uma, o Atributo Efetivo que ela favorece ganha +1 e o que ela atrapalha perde -1 automaticamente (PV nunca é afetado); as 5 Naturezas neutras (Hardy, Docile, Serious, Bashful, Quirky) não mudam nada. Só você edita.
- **Habilidade**: menu restrito às habilidades reais **daquela Espécie** (inclusive a Habilidade Oculta, quando ela existe) — muda sozinho se você trocar a Espécie e a Habilidade atual não existir mais nela. O seletor prioriza as marcadas com **⚙️** — essas têm gatilho automático de verdade no motor da Arena (ver seção "Habilidades com gatilho automático" abaixo); as sem ⚙️ mostram só o efeito oficial como legenda, de referência, sem disparar nada sozinhas — aí é você quem adjudica. Se a Espécie não tiver NENHUMA com ⚙️, o menu cai pra lista completa dela (sempre tem alguma opção pra escolher). Só você edita.
- **Condição** (queimadura, veneno, sono, paralisia, etc.) e **Confuso**: você aplica durante a batalha; aparecem em destaque na ficha do Treinador assim que ativos, pra ele acompanhar.

#### Habilidades com gatilho automático

Das 373 Habilidades oficiais, **93 já fazem efeito de verdade sozinhas na Arena** (marcadas com ⚙️ no seletor) — sem você precisar aplicar nada na mão. Escolhidas pra cobrir pelo menos uma em 85,6% dos 1025 Pokémon, sem depender de sistemas que o jogo ainda não tem (clima, terreno, item equipado). Tudo aparece no Registro quando dispara, então você vê acontecer em tempo real. Por categoria:

- **Contra-ataque no contato**: Static/Poison Point/Flame Body/Effect Spore (30% de status em quem bateu), Rough Skin/Iron Barbs (dano fixo em quem bateu), Gooey/Tangling Hair (queda de Velocidade em quem bateu). "Contato" é golpe Físico, menos uma lista curada de golpes à distância (Terremoto e afins) — se algum golpe específico não fizer sentido, ajuste na mesa mesmo, o motor não trava sua decisão.
- **Imune/absorve Tipo**: Levitate (Terra), Water Absorb/Volt Absorb (cura em vez de tomar dano), Sap Sipper/Storm Drain/Lightning Rod (ganha Estágio em vez de tomar dano), Flash Fire (Fogo), Wonder Guard (só toma golpe super efetivo), Soundproof (som). Scrappy/Tinted Lens furam imunidade/resistência do oponente. Mold Breaker/Teravolt/Turboblaze ignoram as do oponente.
- **Sobrevive/reduz dano**: Sturdy (fica com 1 PV em vez de desmaiar, só do PV cheio), Shell Armor/Battle Armor (nunca sofre Crítico), Fluffy, Heatproof, Thick Fat.
- **Bônus de dano de quem ataca**: Technician, Iron Fist/Strong Jaw, Sheer Force, Sniper, Adaptability, Overgrow/Blaze/Torrent/Swarm.
- **Bônus fixo de Atributo** (aparece direto na ficha, não só em combate): Guts, Hustle, Huge Power/Pure Power, Defeatist, Protosynthesis/Quark Drive.
- **Precisão/Crítico**: Compound Eyes, Hustle (o lado ruim dela), Wonder Skin, No Guard, Unaware, Serene Grace.
- **Entrada em campo**: Intimidate (−1 Ataque em quem já está no time oposto, com bloqueio/reversão automáticos conforme a Habilidade de quem recebe), Download.
- **Saída de campo** (troca, não fuga nem desmaio): Regenerator, Natural Cure.
- **Fim do próprio turno**: Speed Boost, Shed Skin, Ice Body/Rain Dish, Healer (cura um aliado), Magic Guard (bloqueia dano de status), Poison Heal (vira cura).
- **Ao desmaiar o oponente**: Moxie, Beast Boost. Aftermath (dano em quem desmaiou ela no contato).
- **Condição espelhada**: Synchronize, Poison Touch (do lado de quem ataca), Shield Dust (bloqueia só o efeito colateral, não o dano), e as imunidades de Condição (Immunity, Limber, Insomnia, Vital Spirit, Water Veil, Magma Armor, Sweet Veil, Own Tempo, Leaf Guard).
- **Custo de PP**: Pressure — quem usa um Movimento nela (mesmo ela mesma, num Movimento em si mesma) gasta 2 PP em vez de 1 (ver seção de PP acima).

As outras ~280 Habilidades continuam só como texto de referência (nome + efeito oficial), sem sumir do banco de dados — se um dia a gente quiser automatizar mais alguma, os dados já estão lá.

Você continua com um campo "nome" livre (com autocomplete, 847 movimentos oficiais) pra cada um dos 4 Movimentos, e as regras de sempre: digitar um nome reconhecido preenche Tipo, Categoria, Poder, **PP**, Prioridade, Precisão e Efeito sozinho; Movimentos de dano fixo ou variável (Seismic Toss, Dragon Rage, etc.) ficam com Poder em branco — regra em aberto (Cap. 25), você adjudica na mesa. **Esse campo continua sem restrição nenhuma** (pode digitar qualquer um dos 847, mesmo que a espécie normalmente não aprendesse), pra você poder fazer exceções e homebrew quando quiser.

#### PP (Cap. 8.6)

Cada Movimento tem um campo **PP** (dois números lado a lado: Atual / Máximo). O Máximo vem preenchido sozinho junto com o resto quando você digita um nome reconhecido — mas continua **editável na mão**, igual Poder e Precisão, se quiser fugir do oficial. O Atual também é editável direto, **só por você** — o Treinador não edita mais nenhum dos dois números (era editável antes; agora fica travado pro jogador, igual os Estágios logo abaixo). A forma normal do Treinador recuperar PP é usando um item de Recuperação de PP, ou pedindo pra você aplicar um descanso/Centro Pokémon.

Na Arena, usar o Movimento de verdade (Atacar → escolher ele → resolver) desconta **1 PP**, ou **2 PP** se o alvo (mesmo o próprio usuário, num Movimento que mira nele mesmo) tiver a Habilidade **Pressure**. Zerou o PP, o Movimento fica bloqueado até alguém colocar de novo — não existe Struggle automático, se um Pokémon ficar sem PP em nenhum dos 4 é você quem decide o que acontece. Um Movimento cujo nome não bateu com a base oficial (homebrew puro) nunca é bloqueado por PP — fica em 0/0 e simplesmente não é controlado.

**Itens de Recuperação de PP (Cap. 8.6.1)**: seis itens do catálogo (categoria "Recuperação de PP") aplicam PP automaticamente quando usados pela aba Cura ou pelo "Usar Item" da Arena — você não precisa calcular nada. Ether/Max Ether recuperam 10 PP (ou até o Máximo) num Movimento escolhido; Elixir/Max Elixir fazem o mesmo nos 4 de uma vez; PP Up aumenta o Máximo de um Movimento em 20% do valor original (mín. +1, até um teto de +60%, o Atual sobe junto na mesma medida); PP Max aplica de uma vez esse teto de +60% (equivale a 3 PP Up). O teto sempre usa o PP Máximo **original** do Movimento como referência (só muda se você editar o Máximo à mão) — não empilha além dos +60%.

#### Estágios (Cap. 15)

Os Estágios (±6 em Ataque, Defesa, Atq. Especial, Def. Especial, Velocidade, Precisão, Evasão) também não são mais de livre edição pro Treinador — **só você edita um Estágio direto na ficha**, pra ajuste manual ou correção. O resto acontece sozinho na Arena:

- **Pelo próprio Movimento (Cap. 15.1)**: qualquer Movimento que altere Estágio nos jogos oficiais (Swords Dance, Growl, Close Combat...) já aplica automaticamente ao ser resolvido, com seu próprio 1d10 de Chance, rolado à parte do teste de Condição de status. Movimento em si mesmo, ou dano com efeito colateral no próprio atacante (ex.: Close Combat), muda o Estágio de quem usou; dano com efeito colateral no defensor (ex.: Growl) muda o do alvo. Uma queda vinda de um oponente ainda respeita as reações automáticas de Habilidade de sempre (Clear Body bloqueia, Contrary reverte, Defiant/Competitive dão +2 em cima da própria queda) — igual já valia só pra Intimidate, agora vale pra qualquer Movimento que baixe Estágio de oponente. Shield Dust só bloqueia efeito colateral que ela mesma sofreu de um oponente, nunca um Movimento que ela usa em si mesma.
- **Reset ao sair de campo (Cap. 15.2)**: assim que um Pokémon desmaia, é trocado ou foge com sucesso, todos os Estágios dele voltam a **0** sozinhos — igual nos jogos oficiais. Voltando a campo depois, começa sempre do zero.

### O que o Treinador escolhe sozinho

Desde já é o próprio Treinador quem escolhe os 4 Movimentos do Pokémon dele — mas de um jeito restrito: pra cada slot, ele escolhe entre **Nível** (só o que a espécie aprende por Nível, e só até o Nível atual dele — Cap. 8.2/8.4 das Regras), **Evo** (ganho ao evoluir pra essa forma), **TM** ou **Egg** (só o que a espécie pode aprender por aquela via). Não existe opção de HM — saiu dos jogos oficiais a partir da Geração 9. Ele nunca digita nada solto — só escolhe de listas geradas a partir da espécie de verdade.

PV atual e Apelido o Treinador também edita — não precisa fazer por ele durante o jogo, a menos que queira. Estágios (Cap. 15) e PP dos Movimentos (Cap. 8.6), porém, agora só você edita direto — o Treinador só vê os números, o resto muda sozinho pelo sistema (ver as seções acima).

### Equipe e Banco

Mesmo mecanismo de arrastar (⠿) que o Treinador tem: mover entre os 6 slots da Equipe e o Banco (sem limite), trocar de lugar, reordenar. Você pode reorganizar a ficha de qualquer Treinador se precisar.

### Mochila (itens)

Logo acima da Equipe/Banco, cada ficha tem a seção **"🎒 Mochila"** — os itens organizados em **cinco abas** (cada uma como uma tabela Nome/Descrição/Quantidade): **💊 Poções e Berries**, **⚪ Pokébolas**, **🗝️ Itens de Missão**, **💿 TM** e **🎒 Inventário Geral** (qualquer item que não caiba nas quatro anteriores). **Só você adiciona, remove e muda a quantidade** de um item — o Treinador só vê a tabela (nome, descrição, quantidade), sem poder editar.

**Adicionar um item do catálogo (o caminho normal, ~415 itens de todo o jogo, incluindo as 229 TMs vigentes de Scarlet/Violet)**: embaixo da tabela, dentro da aba certa, tem um menu **"— escolher item —"** já filtrado pra só mostrar o que existe naquela aba (agrupado por categoria) — não precisa digitar nada nem adivinhar o nome oficial. Escolha o item e clique **"+ Adicionar"** — pronto: Descrição, Tipo, PV, Condição curada, Reviver, os campos de PP e a Categoria (que decide em qual aba ele mora) vêm todos prontos do catálogo, sem mais nada pra decidir. Sempre soma **1 unidade** por clique — pra mais, ajuste a **Quantidade** direto na linha da tabela depois de adicionado (ver abaixo). Se já existir um item com esse nome na Mochila daquele Treinador, a quantidade soma em vez de duplicar a linha.

**Item personalizado (fora do catálogo, ou pra fugir do oficial)**: o botão **"✏️ Item personalizado"**, logo abaixo do menu principal, abre um formulário à parte com os campos manuais — útil só quando o item não existe no catálogo (homebrew de mesa) ou quando você quer valores diferentes do oficial nesse Treinador específico:

- **Nome**: também tem autocomplete com o catálogo — digitar (ou colar) um nome que bate preenche Descrição/Tipo/PV/Condição/Reviver/PP sozinho nos campos abaixo (um aviso confirma o que foi preenchido), continuando editável à mão. Um nome fora do catálogo funciona normal, só cai sem categoria (aba Inventário Geral).
- **Descrição**: preenchida sozinha se o Nome bater com o catálogo; pra um item homebrew, escreva a sua.
- **Tipo**: 💊 Vida, ✨ Condição, 💫 Reviver, 🔄 Vida + Condição, 🔋 PP ou 📦 Outro (sem efeito mecânico ainda — Cap. 25).
- **PV (0=total)**: importa se o Tipo for Vida, Reviver ou Vida+Condição — quanto PV aquele item cura; deixe **0** pra cura total (tipo Full Restore/Max Revive).
- **Condição curada**: importa se o Tipo for Condição ou Vida+Condição — escolha "Qualquer Condição" (cura status + Confusão de uma vez, tipo Full Heal) ou uma específica (Veneno cura Veneno Grave também).
- **Reviver Pokémon desmaiado**: checkbox que só aparece pro tipo Reviver — marca se aquele item funciona em Pokémon desmaiado (é a regra do tipo Reviver por padrão) — os outros tipos (Vida, Condição, Vida+Condição, PP) **nunca** funcionam em desmaiado, só Reviver (ou o Centro Pokémon, narrativamente).
- **Alvo de PP / Enche até o máximo / Aumenta o Máximo**: só valem pro tipo PP (Cap. 8.6.1) — "Alvo" escolhe se o item afeta **um** Movimento (Ether, PP Up, PP Max) ou **todos** os 4 de uma vez (Elixir, Max Elixir); "Enche até o máximo" marca se enche o PP Atual de uma vez (Max Ether/Max Elixir) ou só soma uma quantidade fixa (Ether/Elixir, +10); "Aumenta o Máximo" marca se o item também aumenta o PP Máximo do Movimento, não só recupera o Atual (PP Up/PP Max).

Clique **"+ Adicionar personalizado"** pra confirmar. Igual no caminho normal, um nome repetido soma a quantidade em vez de duplicar a linha.

Depois de adicionado, o campo de quantidade de cada linha da tabela é editável direto (número de 0 a 999), e o **✕** remove o item inteiro — mas os outros dados (Tipo, PV, Condição etc.) de um item já adicionado não têm uma tela de edição própria; pra corrigir algo aí, remova e adicione de novo.

**Botão "▶️ Usar" em cada linha**: tanto você quanto o próprio Treinador (dono daquela ficha) veem esse botão em qualquer item com quantidade acima de 0 — ele pula direto pra dentro da **Cura** (seção abaixo) já com o item escolhido, sem precisar abrir a Cura, achar a aba certa e achar o item nela de novo. Ver "Cura (fora de batalha)" logo abaixo pra entender o que acontece dependendo do tipo do item.

Esses itens aparecem na Arena — cada Treinador vê a própria Mochila (com quantidade), e você, como Mestre, vê a de todo mundo (uma por Treinador, dentro da fonte de cada um).

Poções, Curas de Status, Revives, as Berries que curam PV/Condição e Recuperação de PP têm efeito mecânico de verdade hoje (Cap. 25/8.6.1); o resto (Pokébolas, Itens de Batalha, Itens de Evolução, Itens Segurados, Itens-Chave, TMs, e as Berries de batalha tipo Salac/Liechi) está catalogado — com descrição oficial — mas ainda sem regra própria: usar um desses (ver "Botão Usar" acima) pede em qual Pokémon, consome a unidade e fica registrado, sem efeito automático de verdade ainda.

### Cura (fora de batalha)

Cada ficha (incluindo pela sua visão de Mestre) também tem o botão **"🩹 Cura"**, logo abaixo da Mochila — abre as abas 💊 Vida / ✨ Condição / 💫 Reviver / 🔄 Vida + Condição / 🔋 PP / 📦 Outro pra usar um item num Pokémon daquele Treinador sem precisar estar na Arena. Dá pra abrir de duas formas: clicando **"🩹 Cura"** e escolhendo a aba+item na mão, ou clicando **"▶️ Usar"** direto na linha do item, lá na Mochila (Cura já abre com esse item escolhido, pulando pra "qual Pokémon"). Dali em diante o fluxo é o mesmo: escolhe o Pokémon (a lista já respeita a trava de desmaiado — Reviver só mostra quem está desmaiado, Vida/Condição/Vida+Condição só mostram quem não está, PP e Outro mostram qualquer um, mesmo desmaiado) e, só pros itens de PP que afetam um Movimento só (Ether/Max Ether/PP Up/PP Max), qual dos 4 Movimentos recebe. A cura acontece na hora (PV sobe, Condição/Confusão some, o Pokémon reanima e/ou o PP do Movimento aumenta), consumindo 1 unidade. **Itens tipo Outro** (Pokébolas, pedras de evolução, TMs, itens-chave etc.) também passam por esse fluxo — escolhe o Pokémon, consome a unidade e fica registrado que foi usado nele — mas ainda sem efeito mecânico automático de verdade (Cap. 25): nenhuma captura, evolução ou Movimento ensinado acontece sozinho, isso continua sendo você quem narra/decide.

## Arena (esboço — ainda em construção)

Botão **"🏟️ Arena"** no topo. Primeira versão do espaço de batalha — feita pra testarmos e ajustarmos junto.

- **Times**: só você cria (**"+ Novo Time"**), renomeia (campo de texto no topo do Time) e remove (✕, com confirmação). Sem limite — não precisa ser só 2, dá pra fazer quantos Times a mesa precisar.
- **▶️ Entrar na Arena** / **⏏️ Sair da Arena**: botão no topo do card "Equipe ativa" de cada Treinador (você também pode clicar pelo dono, em qualquer um). "Entrar" carrega a Equipe ativa inteira dele de uma vez num Time — se houver só 1 Time criado, entra direto; com 2+, pergunta em qual. "Sair" tira todos os Pokémon dele da Arena de uma vez, sem precisar remover um por um com o ✕.
- Cada Treinador também pode arrastar (pelo ⠿) um Pokémon por vez da própria Equipe ativa pra dentro de um Time, se preferir montar aos poucos em vez de usar "Entrar na Arena". Isso não tira o Pokémon da ficha dele — a Arena só reflete quem está na batalha.
- **A Equipe ativa de todo mundo é pública, mas começa em Pokébola**: qualquer um vê o card "Equipe ativa" de qualquer Treinador da mesa — não é mais só o Mestre e o dono. Só que cada Pokémon que ainda não foi mandado a nenhum Time aparece como **Pokébola** ali pra quem não é dono nem Mestre. Arrastar/trocar continua restrito ao dono daquela ficha (ou você).
- **Você vê tudo sempre, em qualquer lugar** — é o único papel com visão total da Arena. Os Treinadores só veem os próprios Pokémon de verdade e os que já foram mandados pra um Time alguma vez (mesmo que já tenham voltado pra Equipe ativa depois); o resto ainda aparece como Pokébola pra eles, tanto na Equipe ativa quanto (se por algum motivo acontecer) num Time. **Dentro de um Time, porém, não existe mais Pokébola**: o Pokémon aparece pra mesa inteira assim que entra lá, mesmo antes de agir — é esse instante que conta como "revelar" (e o que também abre a sprite dele na Equipe ativa, dali em diante, pra sempre). Um Pokémon num Time (e também na Equipe ativa, uma vez revelado) mostra uma **barra de PV** com três cores (verde/amarela/vermelha) e o número **atual/máximo** por cima dela, visível pra mesa inteira.
- Como Mestre, você pode clicar em cima do Pokémon de **qualquer** Treinador (não só dono dele) pra selecioná-lo e agir por ele — útil pra NPC/Pokémon selvagem que você mesmo colocar na Arena, ou pra ajudar um jogador. O **✕** continua ali pra remover um Pokémon da Arena.
- **🔒 Travar Fuga**: botão só seu, no card "Times". Liga/desliga o bloqueio de fuga pra batalha inteira — use quando algum Movimento, Habilidade ou motivo de história estiver prendendo os Pokémon em campo (Mean Look, uma arena fechada, etc.). Enquanto travada, ninguém foge (nem rola dado); a tela mostra "🔒 Fuga travada" pra todo mundo. Sem a trava, cada tentativa de fuga rola 1d10 na hora — ver "Fugir" logo abaixo.
- **👀 Modo Espectador**: no topo da Arena, um botão deixa qualquer Treinador entrar (e sair) como espectador — sem precisar trazer Pokémon nenhum, útil pra quem não vai lutar mas quer acompanhar. Aparece uma lista "👀 Assistindo" com quem está nesse modo, visível pra mesa toda (inclusive você).

### Iniciativa (fila de turnos)

O card **"🎯 Iniciativa"** é todo seu: só o Mestre clica em **"▶️ Iniciar Rodada"** (calcula a fila pelo Cap. 16 — Velocidade Efetiva, depois Natural, depois 1d6 em empate, já descontando os −10 de quem estiver Paralisado) ou **"🔁 Recalcular"** (mesma coisa, mas abre a Rodada seguinte — útil se alguém mudou de Estágio, curou a Paralisia, etc.). **"Encerrar"** fecha a rodada sem abrir outra.

A fila é só um guia visual pra mesa — **nenhum ataque é bloqueado** por não ser a vez de alguém (a negociação de Prioridade do Cap. 17 continua sendo você quem media ao vivo, olhando a Prioridade que aparece no painel de ataque de cada Movimento). Quando quem está com a vez ataca, a fila passa pro próximo sozinha; fora isso, **"⏭️ Próximo"** também pode ser clicado pelo dono do Pokémon da vez, não só por você — não precisa ficar de babá clicando a cada turno.

### Resolvendo uma ação de verdade

Não existe mais botão de "Usar" nem de "Atacar"/"Agir" separado — é tudo clicando **direto no card do Pokémon** em campo (contanto que ele não esteja Desmaiado). Como Mestre, você pode clicar em qualquer Pokémon da mesa (não só nos seus) — útil pra rodar a ação de um NPC/Pokémon selvagem que você mesmo colocar na Arena, ou pra ajudar um jogador.

1. **Clique no Pokémon** que vai agir — ele já está visível pra mesa inteira desde que entrou no Time, então clicar pra agir não muda nada nessa parte, só abre o menu.
   - Se ele estiver **Confuso**, o site testa a Confusão automaticamente nessa hora, antes de qualquer outra coisa (Cap. 23): 1d6 pra ver se ela termina (5–6 termina); se continuar, um segundo 1d6 pra ver se ele perde a ação (1–2 perde e sofre 1 PV; 3–6 age normalmente). Os dois resultados aparecem num aviso na tela e ficam registrados no Registro. Se ele perder a ação, o turno passa sozinho e o menu de ação nem chega a abrir.
2. Se a ação seguir, abre um menu com quatro opções: **Atacar**, **Usar Item**, **Trocar de Pokémon**, **Fugir**.
   - **Atacar** → escolha o Movimento no painel que aparece — cada botão já mostra o **Alvo** dele (Cap. 8.5: em você mesmo, só aliado, você ou aliado, só inimigo, aliado ou inimigo, ou uma categoria de área) e a Prioridade, se tiver. O que acontece depois depende da lógica do Movimento escolhido, sem exceção:
     - **Em você mesmo** ou **de área** → resolve na hora, sem pedir clique nenhum. Um Movimento de área (Earthquake, Discharge, etc.) atinge sozinho todo mundo daquela categoria — pode incluir aliados do próprio atacante junto com os inimigos, dependendo do Movimento, igual nas batalhas em dupla dos jogos oficiais.
     - **De campo** (Stealth Rock, clima) → também resolve na hora, mas sem calcular dano — é uma mecânica ainda em aberto (Cap. 25), só fica um registro de que foi usado.
     - Qualquer outra categoria → pede um clique no alvo, mas **só quem realmente é elegível fica destacado e clicável** na Arena (um clique fora da lista de elegíveis não faz nada, nem em você mesmo com um Movimento estritamente de inimigo). Se não sobrar ninguém elegível no momento (ex.: Helping Hand sem nenhum aliado vivo em campo), aparece um aviso e a ação é cancelada sozinha.
   - **Usar Item** → a Mochila aparece separada por tipo (💊 Vida, ✨ Condição, 💫 Reviver, 🔄 Vida + Condição, 🔋 PP, 📦 Outro) e depois pede em quem usar (o próprio Pokémon ou um aliado em campo) — a lista de alvos já respeita a trava de desmaiado (Reviver só em quem está desmaiado; os outros quatro tipos com efeito, só em quem não está). Pra um item de PP que afeta um Movimento só (Ether/Max Ether/PP Up/PP Max), ainda pede qual dos 4 Movimentos recebe. Itens de Vida, Condição, Reviver, Vida+Condição e PP já fazem efeito de verdade na hora — PV sobe ou vai pro máximo, Condição/Confusão some, o Pokémon reanima e/ou o PP do Movimento aumenta — e o Registro mostra o resultado. Itens tipo Outro continuam sem efeito mecânico (Cap. 25): só descontam 1 unidade e ficam registrados.
   - **Trocar de Pokémon** → nada de arrastar aqui: a **Equipe ativa** daquele Treinador, lá embaixo, destaca os Pokémon disponíveis — clique em qualquer um (vivo, e que não esteja em campo em outro lugar) pra colocar no lugar do atual. O que estava lutando sai da Arena de vez (some do Time, volta a aparecer só na Equipe ativa dele) e o escolhido entra revelado. Consome a ação inteira (Cap. 18) — o que entrou só age a partir do turno seguinte dele. Se o que saiu tiver Queimadura/Veneno, o dano de fim de turno ainda bate nele antes de sair (é a última ação dele em campo).
   - **Fugir** → tenta fugir da batalha. Se a **🔒 Trava de Fuga** estiver ligada, bloqueia na hora, sem dado nenhum — quem estava tentando pode escolher outra coisa. Sem trava, rola **1d10** na hora: 1–3 e não consegue (a ação é gasta, ele continua em campo); 4–10 e foge com sucesso, saindo da Arena de vez. Os dois casos ficam registrados no Registro.
   - Cancele a qualquer momento com **"Cancelar"** no menu.
3. Quando a ação envolve dado (só no caso de **Atacar**), o sistema mostra o resultado pra todo mundo conectado num quadro de dado no centro da tela — não só quem está com a Arena aberta. O **d6** do ataque gira e assenta primeiro; só depois disso, se o Movimento tiver Efeito Percentual, o **1d10** gira e assenta (e ganha uma segunda rolagem, também sozinha em sequência, se o ataque foi Crítico e a primeira falhou) — nunca os dois ao mesmo tempo, um de cada vez, dando aquele suspense antes do resultado final aparecer. Num Movimento de área, o resultado mostra cada alvo atingido separadamente. Só a divzinha do dado se mexe durante a animação — o resto da tela fica parado, sem piscar.

O motor de ação segue as Regras: rola 1d6 pra Precisão (Cap. 10, respeitando Movimentos 100% automáticos, que nunca erram — inclusive Pokémon salvos antes dessa checagem existir já são corrigidos sozinhos na hora de ler a ficha) e Crítico (Cap. 11, natural 6 em Movimento de dano), calcula o Dano Base (Cap. 12) e aplica STAB/Tipos (Cap. 13, com Fraqueza e resistência se cancelando por Tipo do defensor) — pra cada alvo, se for de área. Se o Movimento tiver um Efeito Percentual conhecido (ex.: Thunderbolt/Paralisia, Toxic/Veneno Grave), rola 1d10 na mesma resolução (Cap. 14) — Crítico dá uma segunda tentativa se a primeira falhar; num Movimento de área essa rolagem é **uma só pra todo o uso** (Cap. 8.5), aplicada a todo mundo atingido — e, se aplicar, a Condição de status já entra sozinha na ficha de cada alvo, respeitando a regra de nunca ter duas Condições Principais ao mesmo tempo (Confusão é a exceção, Cap. 20): se um deles já estiver com outra Condição, o resultado avisa que o efeito bateu mas não mudou nada nele, sem empilhar. Da mesma forma, se o Movimento também mudar Estágio (Cap. 15.1) — Swords Dance, Growl, Close Combat e todo o resto que faz isso oficialmente — o Estágio já muda sozinho no Pokémon certo (quem usou, num auto-buff, ou o alvo, numa queda), com Clear Body/Contrary/Defiant/Competitive e companhia reagindo automaticamente como sempre. PV chegando a 0 já marca Desmaio (Cap. 19) — e, junto com trocar ou fugir com sucesso, já zera os Estágios do Pokémon que saiu (Cap. 15.2).

**Dano de fim de turno já é automático.** Assim que o Pokémon que agiu termina a ação (ataca, usa item, troca ou foge), se ele estiver com Queimadura, Veneno ou Veneno Grave, o dano daquela Condição (Cap. 20: −1 PV Queimadura, −2 PV Veneno, crescente 1→2→3... no Veneno Grave) já é aplicado sozinho e entra no Registro — não precisa esperar a rodada inteira nem aplicar na mão. Isso vale mesmo fora de uma Rodada de Iniciativa ativa.

O que o motor **não** faz sozinho — continua sendo você quem conduz: a janela de negociação de Prioridade (Cap. 17), os testes de início de turno de Paralisia (travar a ação), Sono (acordar) e Congelamento (descongelar) — Confusão já é automática, como descrito acima —, e o efeito de verdade de Movimentos de campo ou de suporte sem status (Helping Hand, Aromatherapy, etc. — Cap. 25). Itens de Vida, Condição e PP já curam/recarregam de verdade (ver "Usar Item" acima); qualquer outro item continua sem efeito mecânico.

### Registro (histórico de rolagens)

O card **"📜 Rolagens da Arena"** guarda as últimas 40 linhas de ataque (Movimento, dados, resultado) — dá pra rolar a lista e ver o que já rolou na batalha, ou clicar **"Limpar"** (só o Mestre) pra zerar entre uma batalha e outra. A rolagem mais nova só aparece ali quando o dado dela termina de girar no quadro central — não estraga o suspense pra quem está olhando o Registro em vez do quadro.

## Tema claro/escuro

Botão **☀️/🌙** no topo. O site sempre abre claro por padrão; a escolha de tema é individual (fica salva só no seu aparelho) e não segue o sistema operacional.

## Regras e guias

Botão **"📖 Regras"** no topo — três abas: **Regras** (livro completo), **Guia do Treinador** e **Guia do Mestre** (este aqui). Vale a pena revisar o Guia do Treinador de vez em quando, pra saber exatamente o que cada jogador vê e pode fazer sozinho.

## Saindo

Botão **"Sair"** no topo. Da próxima vez, entra de novo com o PIN de Mestre.
