# Jörð Sentinel

Plataforma web para validação ambiental de imóveis rurais relacionados ao crédito rural.

## Requisitos

- Node.js 20+
- npm
- PostgreSQL
- Git

## 1. Clonar o projeto

```bash
git clone https://github.com/EnzoRuppel1406/jord-sentinel.git
cd jord-sentinel
```

## 2. Instalar as dependências

O projeto utiliza npm Workspaces para gerenciar o frontend e o backend.

```bash
npm install
```

## 3. Configurar o banco de dados

Crie um banco PostgreSQL para o projeto.

```sql
CREATE DATABASE jord_sentinel;
```

Configure as variáveis de ambiente do backend no arquivo `.env`:

```env
PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_NAME=jord_sentinel
DB_USER=postgres
DB_PASSWORD=sua_senha

ACCESS_TOKEN_KEY=sua_chave_secreta
```

## 4. Executar as migrations

Com o banco criado e configurado, execute:

```bash
npm run migrate
```

As migrations criam as tabelas necessárias para o funcionamento da aplicação.

### Estrutura do banco

```text
companies
    │
    └── users
          │
          └── roles

analyses
    │
    └── analyses_findings
```

### `companies`

Armazena as organizações cadastradas na plataforma.

| Campo | Tipo | Descrição |
|---|---|---|
| id | UUID | Identificador da empresa |
| name | VARCHAR(100) | Nome da empresa |
| active | BOOLEAN | Status da empresa |
| created_at | TIMESTAMPTZ | Data de criação |
| updated_at | TIMESTAMPTZ | Data de atualização |
| deleted_at | TIMESTAMPTZ | Data de exclusão lógica |

### `roles`

Armazena as funções dos usuários.

| Campo | Tipo | Descrição |
|---|---|---|
| id | UUID | Identificador da função |
| name | VARCHAR(50) | Nome da função |
| description | TEXT | Descrição da função |
| active | BOOLEAN | Status da função |
| created_at | TIMESTAMPTZ | Data de criação |
| updated_at | TIMESTAMPTZ | Data de atualização |
| deleted_at | TIMESTAMPTZ | Data de exclusão lógica |

### `users`

Armazena os usuários da plataforma.

| Campo | Tipo | Descrição |
|---|---|---|
| id | UUID | Identificador do usuário |
| company_id | UUID | Empresa à qual o usuário pertence |
| role_id | UUID | Função do usuário |
| name | VARCHAR(100) | Nome do usuário |
| email | VARCHAR(100) | E-mail |
| password | VARCHAR(255) | Senha em hash |
| active | BOOLEAN | Status do usuário |
| created_at | TIMESTAMPTZ | Data de criação |
| updated_at | TIMESTAMPTZ | Data de atualização |
| deleted_at | TIMESTAMPTZ | Data de exclusão lógica |

### `analyses`

Armazena as análises realizadas.

| Campo | Tipo | Descrição |
|---|---|---|
| id | UUID | Identificador da análise |
| company_id | UUID | Empresa responsável |
| user_id | UUID | Usuário responsável |
| analysis_status | ENUM | Resultado da análise |
| car_code | CHAR(43) | Código do CAR |
| created_at | TIMESTAMPTZ | Data da análise |

Valores possíveis para `analysis_status`:

```text
free
conditional
restricted
```

### `analyses_findings`

Armazena as restrições encontradas durante uma análise.

| Campo | Tipo | Descrição |
|---|---|---|
| id | UUID | Identificador da ocorrência |
| analysis_id | UUID | Análise relacionada |
| restriction_type | VARCHAR(80) | Tipo da restrição |
| overlay_area | NUMERIC(10,2) | Área de sobreposição |
| details | JSONB | Informações adicionais |
| created_at | TIMESTAMPTZ | Data de criação |

## 5. Executar a seed

Após executar as migrations:

```bash
npm run seed
```

A seed cria dados iniciais para testes e demonstração.

### Empresas

- Jörð Finance
- Agro Crédito

### Funções

- **Admin** — Responsável pelo gerenciamento da organização, usuários, funções e permissões de acesso da plataforma.
- **Analista** — Responsável pela análise de propriedades rurais perante a legislação ambiental do MCR.

### Usuários

| Nome | E-mail | Função | Empresa |
|---|---|---|---|
| John Doe | johndoe@jordfinance.com | Admin | Jörð Finance |
| Jane Doe | janedoe@jordfinance.com | Analista | Jörð Finance |
| Carlos Silva | carlos@agrocredito.com | Analista | Agro Crédito |

As senhas dos usuários de demonstração estão definidas diretamente no arquivo de seed.

## 6. Executar o projeto

Para iniciar frontend e backend simultaneamente:

```bash
npm start
```

Ou execute separadamente:

### Backend

```bash
npm run back
```

### Frontend

```bash
npm run front
```

Por padrão:

```text
Frontend: http://localhost:5173
Backend:  http://localhost:3000
```

## Setup completo

```bash
git clone https://github.com/EnzoRuppel1406/jord-sentinel.git
cd jord-sentinel

npm install

# Criar e configurar o arquivo .env

npm run db:up

npm run migrate
npm run seed

npm start
```
