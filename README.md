# 🍔 Restaurant App

Sistema para gerenciamento de restaurante/lanchonete com interação de pedidos em tempo real.

---

## 🧱 Stack

* Laravel 13 (API)
* Vue 3 + Vite (Frontend)
* PostgreSQL
* Docker + Docker Compose
* Nginx

---

## 📦 Pré-requisitos

Antes de começar, você precisa ter instalado:

* Docker
* Docker Compose
* Node.js (>= 18)
* Git

---

## 🚀 Setup do projeto

### 1. Clonar repositório

```bash
cd restaurant-app
```

---

### 2. Subir containers

```bash
docker-compose up -d --build
```

---

### 3. Instalar dependências do Laravel

Entrar no container:

```bash
docker exec -it laravel_app bash
```

Rodar:

```bash
composer install
cp .env.example .env
php artisan key:generate
```

---

### 4. Configurar banco de dados

No arquivo `.env` do Laravel:

```env
DB_CONNECTION=pgsql
DB_HOST=db
DB_PORT=5432
DB_DATABASE=restaurant
DB_USERNAME=postgres
DB_PASSWORD=postgres
```

Rodar migrations:

```bash
php artisan migrate
```

---

### 5. Frontend (via Docker Compose)

O serviço `frontend` já sobe junto com o comando abaixo:

```bash
docker-compose up -d --build
```

O Vite ficará disponível em `http://localhost:5173`.

---

## 🌐 Acessos

* Backend (Laravel): http://localhost:8000
* Frontend (Vue): http://localhost:5173

---

## 🔌 API Teste

```bash
GET http://localhost:8000/api/test
```

---

## 🐳 Comandos úteis

### Parar containers

```bash
docker-compose down
```

---

### Rebuild containers

```bash
docker-compose up -d --build
```

---

### Acessar container Laravel

```bash
docker exec -it laravel_app bash
```

---

## ⚠️ Observações

* O banco roda em container (`db`)
* O host do banco **não é localhost**, é `db`
* Não versionar:

  * `.env`
  * `node_modules`
  * `vendor`

---

## 🛠️ Estrutura

```
restaurant-app/
├── backend/      # Laravel API
├── frontend/     # Vue 3 (Vite)
├── docker/       # Configurações Docker
├── docker-compose.yml
```

---

## 🎯 Fluxo de desenvolvimento

* Backend → Laravel API
* Frontend → Vue consumindo API
* Comunicação via HTTP (REST)

---

## 🚧 Próximos passos (roadmap)

* Autenticação (Laravel Sanctum)
* WebSockets (tempo real para pedidos)
* Integração com pagamentos
* Deploy em cloud

---

## 🤝 Contribuição

1. Criar branch a partir da `develop`
2. Nome padrão:

   * `feature/*`
   * `fix/*`
3. Abrir PR

---

## 📄 Licença

Projeto privado para fins de estudo/desenvolvimento.
