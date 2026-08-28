# Sincronização automática com o OneDrive

Este repositório tem um workflow (`.github/workflows/onedrive-sync.yml`) que
copia o conteúdo do repositório para uma pasta do seu OneDrive toda vez que
houver um push na branch `main` (ou quando você disparar manualmente pela
aba **Actions** do GitHub).

Isso acontece **sem precisar instalar o app desktop do OneDrive** em nenhuma
máquina — o próprio GitHub Actions faz o upload direto para a nuvem via
[rclone](https://rclone.org/).

A única parte que só você pode fazer é autorizar o acesso à sua conta
Microsoft. É um processo de uma vez só.

## Passo 1 — Instalar o rclone na sua máquina (temporário)

Você só precisa disso para gerar as credenciais uma vez. Depois pode até
desinstalar.

- **Linux/macOS:** `curl https://rclone.org/install.sh | sudo bash`
- **Windows:** baixe em https://rclone.org/downloads/

## Passo 2 — Criar o remote "onedrive"

```bash
rclone config
```

Siga o assistente:
1. `n` (new remote)
2. Nome: `onedrive` (**precisa ser exatamente esse nome**)
3. Tipo: escolha `onedrive` na lista
4. Client ID / Secret: deixe em branco (Enter) para usar os padrões do rclone
5. Ele vai abrir o navegador para você fazer login com sua conta Microsoft
   e autorizar o acesso
6. Quando perguntar o tipo de conta, escolha `OneDrive Personal` (ou
   `Business`/`SharePoint`, conforme o seu caso)
7. Confirme a seleção do "drive" e finalize (`y` para confirmar, `q` para
   sair do assistente)

Teste se funcionou:

```bash
rclone lsd onedrive:
```

Se listar as pastas do seu OneDrive, está pronto.

## Passo 3 — Cadastrar o secret no GitHub

1. Gere o conteúdo em base64:
   - Linux: `base64 -w0 ~/.config/rclone/rclone.conf`
   - macOS: `base64 -i ~/.config/rclone/rclone.conf`
   - Windows (PowerShell): `[Convert]::ToBase64String([IO.File]::ReadAllBytes("$env:APPDATA\rclone\rclone.conf"))`
2. Copie o texto gerado (uma linha longa).
3. No GitHub, vá em **Settings → Secrets and variables → Actions → New
   repository secret**.
4. Nome: `RCLONE_CONF_B64`
5. Valor: cole o base64 copiado.
6. Salve.

## Passo 4 (opcional) — Escolher a pasta de destino

Por padrão, tudo vai para uma pasta única `Projetos` na raiz do seu
OneDrive — nada fica solto na raiz. Cada pasta deste repositório vira uma
subpasta dentro dela automaticamente, por exemplo:

```
repo/
├── projeto-a/
└── projeto-b/
```

vira, no OneDrive:

```
OneDrive/
└── Projetos/
    ├── projeto-a/
    └── projeto-b/
```

Se quiser usar outro nome de pasta raiz, crie uma **Repository variable**
(mesma tela de Secrets, aba "Variables"):

- Nome: `ONEDRIVE_DEST_PATH`
- Valor: ex. `Meus Projetos`

## Pronto

A partir daqui, todo push na branch `main` sincroniza automaticamente.
Você também pode disparar manualmente em **Actions → Sync to OneDrive →
Run workflow**.

## Adicionando outros repositórios no futuro

Se preferir manter tudo dentro deste repositório `Projetos`, basta criar
uma pasta nova aqui para cada projeto — nada a configurar, o sync já
manda tudo pra dentro de `OneDrive/Projetos/`.

Se em vez disso você criar **outros repositórios** no GitHub, copie o
arquivo `.github/workflows/onedrive-sync.yml` para eles e repita os
Passos 3 e 4 — pode reaproveitar o mesmo `RCLONE_CONF_B64`, mas defina um
`ONEDRIVE_DEST_PATH` diferente para cada um, sempre começando com
`Projetos/`, para que todos caiam dentro da mesma pasta raiz em vez de se
sobrescreverem ou espalharem pela raiz do OneDrive. Exemplo:

- Repositório `projetos` → `ONEDRIVE_DEST_PATH` = `Projetos` (padrão)
- Repositório `site-cliente-x` → `ONEDRIVE_DEST_PATH` = `Projetos/site-cliente-x`
