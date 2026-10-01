# Cyberpunk: Grand Metropole — base (estrutura do Green Área, sem as regras de Pokémon)

> Lore, personagens e sistemas ainda por definir. Esta pasta é só o esqueleto técnico.

Abrir por servidor local: `cd docs/cyberpunk-grand-metropole` → `python -m http.server 8000` → http://localhost:8000
(Para ter conta Admin, crie um runner chamado **admin**.)

## Mapeamento: Green Área → Grand Metropole
| Green Área | Grand Metropole |
|---|---|
| `STATE` (progresso salvo) / `SESSION` (estado de tela) / `DT` (handlers do onclick) / `render()` | idem, em `js/app.js` |
| `screenHTML()` com gates (login → escolher inicial → luta → popups → tela) | idem: login → escolher 1º aliado → luta → switch de telas |
| Login Nome+PIN, 1 documento por conta, cache de sessão só com id+PIN | idem; `js/store.js` (local ou Firestore) |
| Energia 0–1000 (+10/10 min) e Pokétickets → Energia | Energia e Cartões de energia |
| Dia do jogo de 6 h (renova tickets, missões, Mestres) | idem |
| Missões Diárias (5 slots, 5 por dia) / aba Diário | Contratos |
| Mestres Especialistas (1x/dia) | Chefes |
| Caçada Solo (zonas, custo fixo de energia) | Operações — Zonas |
| Equipe / Caixa | Crew |
| Mochila, Pokédex, Movimentos, Wiki | Mochila, Banco de dados, Habilidades, Wiki |
| Centro Pokémon (chat público, amigos), Mensagens (DM) | Safehouse, Mensagens |
| Painel Admin (contas, dar admin, apagar, resetar) | idem |
| Mapa de Kanto em iframe + `postMessage` | `mapa/` (cidade cyberpunk) + `ng-pronto` / `ng-evento` / `ng-estado` |
| Sidebar em grupos + barra de baixo no celular | idem (`NAV_GRUPOS`) |
| Motor de combate | **stub** em `js/regras.js` (contrato: `iniciar / acoes / agir / recompensa`) |

## Onde mexer
- **Conteúdo**: `js/dados.js` (zonas, chefes, contratos, itens, tipos de aliado, wiki). **Regras**: `js/regras.js`. **Mapa**: `mapa/dados.js`.
- **Firestore (opcional)**: crie `config.js` com `window.NG_FIREBASE_CONFIG = {...}` e descomente a linha no `index.html` (coleções `ng_saves`, `ng_chat`, `ng_dm`; ainda NÃO testado — só o modo local foi).
- Raids, trocas, duelos e Caçada em Grupo do original **não** foram copiados (dependem de regras e de mais backend); a Store já tem o formato para acrescentar.
