# Passo a Passo: Deploy Instituto Cassiane no Servidor

## Contexto Atual
- **Servidor**: Ubuntu 24.04 LTS (192.168.0.12)
- **Serviço existente**: Portfolio na porta 3000
- **MinIO**: Rodando nas portas 9004-9005
- **Objetivo**: Adicionar Instituto Cassiane na porta 3001

---

## PASSO 1: Preparar o Projeto Localmente

### 1.1 Certifique-se que o projeto está pronto
```bash
# Na sua máquina local
cd c:\Users\Administrador\Documents\institutocassiane

# Verificar se todos os arquivos Docker estão criados
ls -la | grep -E "Dockerfile|docker-compose|.dockerignore"
```

✅ Deve ter:
- `Dockerfile`
- `docker-compose.yml`
- `.dockerignore`
- `package.json` (atualizado)

---

## PASSO 2: Publicar a Imagem Docker

### 2.1 Criar imagem Docker localmente (Opcional - para teste)
```bash
# Na pasta do projeto
docker build -t instituto-cassiane:latest .
docker run -d -p 3001:3001 --name instituto-test instituto-cassiane:latest

# Testar acesso
# Abra: http://localhost:3001
```

### 2.2 Publicar no GitHub Packages (Recomendado - como seu portfolio)

Crie um arquivo `.github/workflows/deploy.yml` no repositório:

```yaml
name: Build and Push Docker Image

on:
  push:
    branches:
      - main

env:
  REGISTRY: ghcr.io
  IMAGE_NAME: ${{ github.repository }}

jobs:
  build-and-push:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write
    steps:
      - uses: actions/checkout@v3
      
      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v2
      
      - name: Log in to Container Registry
        uses: docker/login-action@v2
        with:
          registry: ${{ env.REGISTRY }}
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}
      
      - name: Build and push
        uses: docker/build-and-push-action@v4
        with:
          context: .
          push: true
          tags: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}:latest
```

---

## PASSO 3: SSH no Servidor Ubuntu

```bash
# Conectar ao servidor
ssh root@192.168.0.12

# Ou se tiver chave SSH
ssh -i seu_arquivo.pem root@192.168.0.12
```

---

## PASSO 4: Preparar Diretório no Servidor

```bash
# No servidor, como root
cd /var/www

# Criar pasta para Instituto Cassiane
mkdir -p instituto-cassiane
cd instituto-cassiane

# Criar arquivo .env (se necessário)
cat > .env << EOF
VITE_APP_ENV=production
EOF
```

---

## PASSO 5: Deploy da Imagem

### Opção A: Pull do GitHub Packages
```bash
# No servidor, dentro de /var/www/instituto-cassiane

docker pull ghcr.io/seu-usuario/institutocassiane:latest

docker run -d \
  --name instituto-prod \
  --restart always \
  -p 3001:3001 \
  --env-file .env \
  ghcr.io/seu-usuario/institutocassiane:latest
```

### Opção B: Build Local no Servidor (Mais rápido para testes)
```bash
# Copiar projeto para o servidor primeiro
# (Na sua máquina local)
scp -r c:\Users\Administrador\Documents\institutocassiane root@192.168.0.12:/var/www/

# Depois no servidor
cd /var/www/institutocassiane

docker build -t instituto-cassiane:latest .

docker run -d \
  --name instituto-prod \
  --restart always \
  -p 3001:3001 \
  instituto-cassiane:latest
```

---

## PASSO 6: Verificar Deployment

```bash
# Verificar se o container está rodando
docker ps | grep instituto

# Ver logs
docker logs -f instituto-prod

# Testar acesso (no servidor)
curl http://localhost:3001

# De qualquer máquina na rede
curl http://192.168.0.12:3001
```

---

## PASSO 7: Configurar Acesso pela Web (Nginx Proxy)

Se quiser acessar sem especificar porta (ex: `instituto.local` em vez de `:3001`)

### 7.1 Instalar Nginx (se não tiver)
```bash
apt update && apt install -y nginx
```

### 7.2 Criar vhost para Instituto Cassiane
```bash
cat > /etc/nginx/sites-available/instituto.conf << 'EOF'
server {
    listen 80;
    server_name instituto.local instituto.portfolio-docker-gen8.local 192.168.0.12;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
EOF
```

### 7.3 Habilitar site
```bash
ln -s /etc/nginx/sites-available/instituto.conf /etc/nginx/sites-enabled/

# Testar configuração
nginx -t

# Recarregar Nginx
systemctl reload nginx
```

---

## PASSO 8: Criar Script de Deploy Automático

```bash
# Criar script similar ao portfolio
cat > /var/www/instituto-cassiane/deploy.sh << 'EOF'
#!/bin/bash

set -euo pipefail

REPO_PATH='/var/www/institutocassiane'
IMAGE_NAME="ghcr.io/seu-usuario/institutocassiane:latest"
CONTAINER_NAME="instituto-prod"

echo '🚀 Iniciando deploy Instituto Cassiane...'

# 1. Atualizar código
echo '📥 Atualizando código do repositório...'
cd $REPO_PATH
git config --global --add safe.directory $REPO_PATH
git fetch --all
git reset --hard origin/main

# 2. Pull da Imagem
echo '📦 Baixando imagem do GitHub Packages...'
docker pull $IMAGE_NAME

# 3. Substituir Container
echo '🔄 Reiniciando container...'
docker stop $CONTAINER_NAME || true
docker rm $CONTAINER_NAME || true

docker run -d \
  --name $CONTAINER_NAME \
  --restart always \
  -p 3001:3001 \
  --env-file "$REPO_PATH/.env" \
  $IMAGE_NAME

# 4. Limpeza
echo '🧹 Limpando imagens antigas...'
docker image prune -f

echo '✅ Deploy concluído com sucesso!'
EOF

chmod +x /var/www/instituto-cassiane/deploy.sh
```

---

## PASSO 9: Configurar Webhook do GitHub (Automático)

Se quiser fazer deploy automaticamente quando fizer push

```bash
# Instalar gitea-webhook ou usar Webhook Handler
# Opção simplificada: usar cron

# Editar crontab
crontab -e

# Adicionar:
*/15 * * * * /var/www/instituto-cassiane/deploy.sh >> /var/log/instituto-deploy.log 2>&1
```

---

## RESUMO DOS COMANDOS (Quick Deploy)

```bash
# 1. SSH no servidor
ssh root@192.168.0.12

# 2. Entrar no diretório
cd /var/www/institutocassiane

# 3. Fazer deploy (opção rápida)
docker pull ghcr.io/seu-usuario/institutocassiane:latest
docker stop instituto-prod || true
docker rm instituto-prod || true
docker run -d --name instituto-prod --restart always -p 3001:3001 ghcr.io/seu-usuario/institutocassiane:latest

# 4. Verificar
docker ps
curl http://localhost:3001
```

---

## TROUBLESHOOTING

**Container não inicia?**
```bash
docker logs instituto-prod
```

**Porta já em uso?**
```bash
# Verificar o que está usando a porta 3001
lsof -i :3001
netstat -tuln | grep 3001
```

**Sem acesso à internet no servidor?**
```bash
# Build localmente e copiar Dockerfile
cd /var/www/institutocassiane
docker build -t instituto-cassiane:latest .
```

---

## PRÓXIMOS PASSOS

1. ✅ Prepare o repositório com GitHub Actions
2. ✅ Deploy inicial no servidor
3. ✅ Configure Nginx para reverso proxy
4. ✅ Configure domínio (ex: `instituto.com`)
5. ✅ Adicione SSL/HTTPS com Certbot
