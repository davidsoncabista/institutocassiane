# Deploy Instituto Cassiane (Build Local no Servidor)

Este projeto usa o script [deploy-instituto.sh](deploy-instituto.sh) para deploy em produção no servidor Ubuntu.

## Cenário atual
- Portfolio já em produção na porta `3000`
- Instituto Cassiane em container separado na porta `3001`
- Servidor: `192.168.0.12`

## 1) Pré-requisitos no servidor

No host Ubuntu (como `root`):

```bash
apt update
apt install -y git docker.io
systemctl enable --now docker
```

## 2) Estrutura esperada no servidor

```bash
/var/www/instituto-cassiane
```

Dentro dessa pasta deve existir o repositório com o arquivo [deploy-instituto.sh](deploy-instituto.sh).

## 3) Subir o script para o servidor

No seu ambiente local, garanta que o script está versionado:

```bash
git add deploy-instituto.sh DEPLOYMENT.md
git commit -m "chore: adiciona deploy-instituto.sh e atualiza guia de deploy"
git push origin main
```

No servidor, atualize o repositório:

```bash
cd /var/www/instituto-cassiane
git fetch --all
git reset --hard origin/main
chmod +x deploy-instituto.sh
```

## 4) Executar deploy

```bash
cd /var/www/instituto-cassiane
./deploy-instituto.sh
```

O script faz:
1. sincroniza o Git (`fetch/reset`)
2. ajusta `Dockerfile` para `npm install`
3. garante `.env` com `VITE_APP_ENV=production`
4. build local da imagem `instituto-cassiane:local`
5. recria container `instituto-cassiane-prod`
6. publica em `3001:3001`
7. limpa imagens antigas

## 5) Validar serviço

```bash
docker ps | grep instituto-cassiane-prod
docker logs --tail 100 instituto-cassiane-prod
curl http://localhost:3001
```

Na rede local:

```bash
curl http://192.168.0.12:3001
```

## 6) Comandos úteis

Parar/iniciar manualmente:

```bash
docker stop instituto-cassiane-prod
docker start instituto-cassiane-prod
```

Rebuild manual (sem script):

```bash
cd /var/www/instituto-cassiane
docker build -t instituto-cassiane:local .
docker rm -f instituto-cassiane-prod || true
docker run -d --name instituto-cassiane-prod --restart always -p 3001:3001 --env-file /var/www/instituto-cassiane/.env instituto-cassiane:local
```

## 7) Troubleshooting

Porta ocupada:

```bash
ss -tulpn | grep 3001
```

Falha no build:

```bash
cd /var/www/instituto-cassiane
docker build --no-cache -t instituto-cassiane:local .
```

Logs em tempo real:

```bash
docker logs -f instituto-cassiane-prod
```
