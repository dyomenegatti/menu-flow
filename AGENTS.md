# Menu Flow

Cardápio digital e sistema de pedidos para restaurantes/lanchonetes, com painel administrativo.

Monorepo: **Laravel 13** (API REST, `backend/`), **Vue 3 + Vite + Vuetify** (`frontend/`), **PostgreSQL**, Docker (`docker/`, `docker-compose.yml`).

Código, textos da interface, commits e documentação em português (pt-BR). Responda sempre em português.

## Regras obrigatórias

- **Nunca execute nenhum comando git.** Isso inclui commit, add, push, pull, checkout, switch, stash, reset, merge e também status, diff e log.
- O versionamento é feito por mim. Você pode **sugerir** nome de branch (`feature/*` ou `fix/*`, a partir da `develop`) e mensagem de commit (`feat: ...`, `fix: ...`, `doc: ...`).
- **Nunca edite** `.env`, `.env.*`, `backend/.env`, o `.env` da raiz nem credenciais no `docker-compose.yml`. Ler é permitido.
- Se algo precisar mudar nesses arquivos, **mostre o trecho sugerido** e eu aplico.
- **Nunca execute SQL de escrita ou alteração** (INSERT, UPDATE, DELETE, ALTER, DROP, TRUNCATE, CREATE).
- **Nunca rode** `migrate` (nenhuma variação), `db:seed`, `db:wipe`, `tinker`, `docker compose down -v` ou qualquer comando que apague volumes ou dados.
- Você pode **criar e editar** arquivos de migration, seeder e model. Quem executa sou eu.
- Quando uma mudança exigir algo no banco, **escreva o comando ou SQL, explique o que faz e avise se é destrutivo**.

## Fluxo de trabalho

- Seu papel é ler o projeto e ajudar a programar quando solicitado
- Antes de mudanças grandes (vários arquivos, feature nova, refatoração), **explique o plano e espere aprovação**
- Explique o motivo das decisões, principalmente em qual camada do FSD no frontend cada coisa entra
- Siga os padrões que já existem. Na dúvida, procure um exemplo parecido no projeto antes de criar algo

## Comandos

Subir o ambiente e mexer no banco é comigo. Não execute: `docker compose up/down`, `migrate:fresh --seed`, `composer install`.

- Frontend: http://localhost:5173/menu
- API: http://localhost:8000/api

## Frontend — Feature-Sliced Design

```
frontend/src/
├── app/        # router (app/router/index.js), provider do Vuetify
├── pages/      # páginas das rotas (todas filhas de /menu, dentro de widgets/menu-layout/MenuLayout.vue)
├── widgets/    # blocos de layout (header, sidebar, bottom nav, grid de produtos, lista de pedidos)
├── features/   # interações do usuário (modal de detalhes do produto, busca, filtro de pedidos)
├── entities/   # domínios: entities/<nome>/{api,model,ui}
├── shared/     # axios (shared/api/index.js), componentes base (shared/ui/Base*), helpers
└── utils/      # formatadores (moeda, data, telefone, CEP, status do pedido)
```

Regras:
- **Imports só para baixo:** `app → pages → widgets → features → entities → shared`. Uma camada nunca importa de uma camada acima.
- **Slices da mesma camada não importam um do outro.** Se dois slices precisam da mesma coisa, ela provavelmente pertence a uma camada abaixo.
- Ao criar algo novo, **diga em qual camada/slice vai e por quê**. Se o que eu pedir quebrar alguma regra do FSD, me avise e sugira o lugar certo.
- **Chamadas de API:** uma função por endpoint em `entities/<nome>/api/`, usando a instância do axios do `shared`.
- **Estado:** composables `useX` em `model/`, com estado em refs no nível do módulo (funciona como store compartilhada). Pinia só existe no `restaurantStore`. Só sugira Pinia se houver motivo claro.
- **Testes:** o `.spec.js` fica ao lado do arquivo. Nos módulos de API, mocke `shared/api` com `vi.mock` e verifique as chamadas `api.get/post`.
- Erros para o usuário são exibidos com `vue3-toastify`.

## Backend

- Camadas: **Controller → Service → Model (Eloquent)**. Controllers são finos: recebem um FormRequest, chamam o Service e retornam JSON. Regras de negócio ficam nos Services.
- Rotas explícitas em `routes/api.php`. Não há autenticação.
- **Carrinho** é anônimo, identificado pelo header `X-Cart-Token`; os preços são recalculados a partir do banco.
- **Pedido** é criado a partir do snapshot enviado pelo front, mas o `OrderService` recalcula os totais no servidor e valida adicionais e opções do produto.