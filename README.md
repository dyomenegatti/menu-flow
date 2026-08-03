# 🍔 Restaurant App

Sistema para gerenciamento de restaurante/lanchonete com interação de pedidos em tempo real.

---

# 🧱 Stack

* Laravel 13 (API)
* Vue 3 + Vite (Frontend)
* PostgreSQL
* Docker + Docker Compose
* Nginx

---

# 📦 Pré-requisitos

Antes de iniciar, tenha instalado:

* Docker
* Docker Compose
* Node.js >= 18
* Git

---

# 🚀 Setup inicial do projeto

## 1. Clonar o repositório

```bash
git clone <repository-url>

cd restaurant-app
```

---

# 🐳 2. Subir os containers

Criar e iniciar todos os serviços:

```bash
docker-compose up -d --build
```

Serviços iniciados:

* Laravel API
* PostgreSQL
* Nginx
* Vue + Vite

---

# 🔥 3. Configuração inicial do Laravel

Entrar no container do backend:

```bash
docker exec -it menu_app bash
```

Instalar dependências:

```bash
composer install
```

Criar arquivo de ambiente:

```bash
cp .env.example .env
```

Gerar chave da aplicação:

```bash
php artisan key:generate
```

---

# 🔐 3.1 Configurar permissões

Executar fora do container:

```bash
docker compose exec app chmod -R 775 storage bootstrap/cache

docker compose exec app chown -R www-data:www-data storage bootstrap/cache
```

Caso o Git detecte alterações de permissão:

```bash
git config core.fileMode false

git checkout -- backend/storage backend/bootstrap/cache
```

---

# 🗄️ 4. Configuração do banco de dados

No arquivo:

```
backend/.env
```

Configurar:

```env
DB_CONNECTION=pgsql
DB_HOST=db
DB_PORT=5432
DB_DATABASE=menu_db
DB_USERNAME=postgres
DB_PASSWORD=postgres
```

⚠️ Importante:

Dentro do Docker o host do banco **não é localhost**.

Use:

```
DB_HOST=db
```

---

# 🌱 5. Criar tabelas e dados iniciais

Após configurar o `.env`, executar:

```bash
php artisan migrate --seed
```

Esse comando irá:

1. Criar todas as tabelas através das migrations
2. Executar todos os seeders
3. Criar dados iniciais necessários para a aplicação funcionar

Exemplo:

* Categorias
* Restaurantes
* Endereços
* Telefones
* Horários de funcionamento
* Produtos (caso existam seeders)

---

# 🔄 Caso precise recriar o banco do zero

Quando apagar os containers ou quiser começar uma base limpa:

```bash
docker compose down
```

Subir novamente:

```bash
docker compose up -d --build
```

Entrar no Laravel:

```bash
docker exec -it menu_app bash
```

Executar:

```bash
composer install

php artisan migrate:fresh --seed
```

O comando:

```bash
php artisan migrate:fresh --seed
```

irá:

* Apagar todas as tabelas existentes
* Criar novamente todas as migrations
* Executar todos os seeders

---

# 🌐 6. Frontend

O frontend sobe automaticamente pelo Docker Compose.

Acessar:

```
http://localhost:5173
```

Caso precise instalar dependências manualmente:

```bash
docker exec -it <frontend-container> bash

npm install
```

---

# 🔌 Endpoints

Backend:

```
http://localhost:8000
```

Frontend:

```
http://localhost:5173
```

Teste da API:

```
GET http://localhost:8000/api/test
```

---

# 🐘 Acessar banco PostgreSQL

Configuração para TablePlus / DBeaver:

| Campo    | Valor     |
| -------- | --------- |
| Host     | localhost |
| Port     | 5432      |
| Database | menu_db   |
| User     | postgres  |
| Password | postgres  |
| SSL Mode | Preferred |

---

# 🐳 Comandos Docker úteis

## Parar containers

```bash
docker compose down
```

---

## Ver containers ativos

```bash
docker ps
```

---

## Ver logs do backend

```bash
docker logs menu_app
```

---

## Entrar no container Laravel

```bash
docker exec -it menu_app bash
```

---

## Rebuild completo

```bash
docker compose down

docker compose up -d --build
```

---

# 🛠️ Estrutura do projeto

```
restaurant-app/

├── backend/
│   └── Laravel API

├── frontend/
│   └── Vue 3 + Vite

├── docker/
│   └── Configurações Docker

└── docker-compose.yml
```

---

# 🔄 Fluxo de desenvolvimento

## Backend

Laravel:

```
Controller
    ↓
Service
    ↓
Model / Eloquent
    ↓
Database
```

API REST:

```
Vue Frontend
      ↓
Axios HTTP
      ↓
Laravel API
      ↓
PostgreSQL
```

---

# 🚧 Próximos passos

* Autenticação com Laravel Sanctum
* WebSockets para pedidos em tempo real
* Integração com pagamentos
* Deploy em cloud
* Painel administrativo

---

# 🤝 Contribuição

Criar branch a partir da `develop`.

Padrões:

```
feature/*
fix/*
```

Abrir Pull Request após finalizar.

---

# 📄 Licença

Projeto privado para estudo e desenvolvimento.
