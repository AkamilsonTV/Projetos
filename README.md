# Projetos

Repositório central para organizar e versionar projetos, com backup
automático para o OneDrive.

## Backup no OneDrive

Todo push na branch `main` é sincronizado automaticamente com uma pasta no
OneDrive via GitHub Actions (usando [rclone](https://rclone.org/)) — sem
precisar do app desktop do OneDrive instalado em nenhuma máquina.

Veja o passo a passo de configuração (feito uma única vez) em
[`docs/ONEDRIVE_SYNC.md`](docs/ONEDRIVE_SYNC.md).
