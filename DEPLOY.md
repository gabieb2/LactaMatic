# Deploy Configuration

## Para desarrollo local
```bash
npm start
```

## Para build de producción
```bash
npm run build
```

## Variables de entorno (crear .env)
```
REACT_APP_NAME=Chechomatic
REACT_APP_VERSION=1.2.0
REACT_APP_ENVIRONMENT=production
```

## Deploy en diferentes plataformas

### Netlify
1. Conectar repositorio GitHub
2. Build command: `npm run build`
3. Publish directory: `build`

### Vercel
1. Conectar repositorio GitHub
2. Framework preset: Create React App
3. Auto-deploy activado

### GitHub Pages
1. Instalar gh-pages: `npm install --save-dev gh-pages`
2. Agregar scripts al package.json:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d build"
   }
   ```
3. Ejecutar: `npm run deploy`

### Docker (opcional)
```dockerfile
FROM node:16-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```
