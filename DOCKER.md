# Instituto Cassiane - Docker Build Guide

## Building the Docker Image

```bash
docker build -t instituto-cassiane:latest .
```

## Running with Docker

### Single Container
```bash
docker run -p 3001:3001 \
  instituto-cassiane:latest
```

### With Docker Compose
```bash
docker-compose up -d
```

## Accessing the Application

Once running, access the application at: `http://localhost:3001`

## Stopping the Container

```bash
# Single container
docker stop <container_id>

# Docker Compose
docker-compose down
```

## Viewing Logs

```bash
# Single container
docker logs <container_id>

# Docker Compose
docker-compose logs -f
```

## Build Information

- **Base Image**: node:20-alpine (lightweight)
- **Multi-stage Build**: Optimized for production (builder + production stages)
- **Health Check**: Enabled for production monitoring
- **Port**: 3001
- **Node Version**: 20.x LTS
