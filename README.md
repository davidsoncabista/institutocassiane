# Instituto Cassiane

Plataforma de atendimento digital especializada em flexibilidade cognitiva e bem-estar.

## Rodando Localmente

**Pré-requisitos:**
- Node.js (v18+)
- Docker (opcional, para containerização)

### Com Node.js

1. Instale as dependências:
   ```bash
   npm install
   ```
2. Configure as variáveis de ambiente em `.env.local`
3. Execute a aplicação:
   ```bash
   npm run dev
   ```

A aplicação estará disponível em `http://localhost:3001`

### Com Docker

1. Construa a imagem Docker:
   ```bash
   docker build -t instituto-cassiane .
   ```
2. Execute o container:
   ```bash
   docker run -p 3001:3001 instituto-cassiane
   ```

## Build para Produção

```bash
npm run build
```
