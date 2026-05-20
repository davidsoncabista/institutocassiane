#!/bin/bash

# Configurações de segurança
set -euo pipefail

# Variáveis
REPO_PATH='/var/www/instituto-cassiane'
IMAGE_NAME="instituto-cassiane:local"
CONTAINER_NAME="instituto-cassiane-prod"
PORTA_HOST=3001

echo '🚀 [PROD] Iniciando deploy com Build Local (Instituto Cassiane)...'

# 1. Sincronia de Configuração com o Git
echo '🔐 Atualizando arquivos do repositório Git...'
chown -R root:root $REPO_PATH
cd $REPO_PATH
git config --global --add safe.directory $REPO_PATH
git fetch --all
git reset --hard origin/main

# Ajustando Dockerfile para usar npm install
echo '🛠️ Ajustando Dockerfile para usar npm install...'
sed -i 's/RUN npm ci/RUN npm install/g' Dockerfile

# Reestabelece o arquivo .env
if [ ! -f .env ]; then
  echo "VITE_APP_ENV=production" > .env
fi

# 2. Build da Imagem Docker Localmente
echo '📦 Iniciando a construção da imagem Docker...'
docker build -t $IMAGE_NAME .

# 3. Substituição do Container
echo '🔄 Reiniciando serviço...'
docker stop $CONTAINER_NAME || true
docker rm $CONTAINER_NAME || true

# Mapeando 3001 externo para 3001 interno do container
docker run -d \
  --name $CONTAINER_NAME \
  --restart always \
  -p $PORTA_HOST:3001 \
  --env-file "$REPO_PATH/.env" \
  $IMAGE_NAME

# 4. Limpeza de Imagens Antigas
echo '🧹 Limpando cache e imagens antigas...'
docker image prune -f

echo '✅ [PROD] Deploy com Build Local concluído com sucesso!'
