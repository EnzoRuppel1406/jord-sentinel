# Jörð Sentinel

Plataforma de inteligência geoespacial desenvolvida para apoiar a análise ambiental de imóveis rurais relacionados a operações de crédito rural.

O Jörð Sentinel utiliza dados geoespaciais armazenados em um banco de dados PostgreSQL com PostGIS para identificar possíveis sobreposições entre imóveis rurais e áreas de interesse ambiental. A partir dessas informações, a plataforma aplica regras de negócio para consolidar ocorrências e apresentar uma classificação de risco ambiental.

O sistema tem como objetivo fornecer informações que auxiliem o processo de análise, contribuindo para a identificação de possíveis restrições ambientais relacionadas ao imóvel consultado.

---

## Funcionalidades

- **Consulta de imóveis rurais:** busca de imóveis por meio do código do Cadastro Ambiental Rural (CAR).
- **Análise geoespacial:** identificação de sobreposições entre o imóvel consultado e bases ambientais armazenadas no PostgreSQL com PostGIS.
- **Identificação de restrições ambientais:** consulta a bases como CAR, CNUC, FUNAI, IBAMA, Florestas Públicas, Territórios Quilombolas e PRODES.
- **Avaliação de risco ambiental:** consolidação das ocorrências identificadas e aplicação de regras de negócio para classificar o nível de risco do imóvel.
- **Visualização geográfica:** apresentação da geometria do imóvel e das restrições identificadas em mapa interativo.
- **Relatórios de análise:** organização dos resultados para consulta e acompanhamento.
- **Histórico de análises:** registro e consulta das análises realizadas pelos usuários.
- **Dashboard:** apresentação de informações consolidadas sobre as análises.
- **Gerenciamento de usuários:** controle de acesso e permissões conforme os perfis cadastrados.

---

## Tecnologias utilizadas

### Frontend

- React
- Vite
- JavaScript
- Tailwind CSS
- React Router
- Axios
- Leaflet

### Backend

- Node.js
- Express
- PostgreSQL
- PostGIS
- JSON Web Token (JWT)
- bcrypt

### Geoprocessamento

- PostGIS
- `shp2pgsql`
- Shapefile
- GeoJSON

### Infraestrutura e ferramentas

- Docker
- Docker Compose
- Git
- GitHub

---

## Arquitetura do projeto

O backend segue uma organização em camadas, separando as responsabilidades de cada parte da aplicação.

O fluxo principal de execução é:

```text
Routes
  |
  v
Controllers
  |
  v
Use Cases
  |
  v
Repositories
  |
  v
Database
```

### Responsabilidades

| Camada       | Responsabilidade                                                           |
| ------------ | -------------------------------------------------------------------------- |
| Routes       | Define os endpoints e direciona as requisições.                            |
| Controllers  | Recebe as requisições HTTP, organiza os parâmetros e encaminha a execução. |
| Use Cases    | Contém as regras de negócio e coordena as operações da aplicação.          |
| Repositories | Responsável pelo acesso e pela persistência dos dados.                     |
| Database     | Armazena os dados relacionais e geoespaciais utilizados pelo sistema.      |

Essa estrutura busca manter as regras de negócio independentes dos detalhes de comunicação HTTP e acesso ao banco de dados.

---

## Análise geoespacial

A análise geoespacial é uma das funcionalidades centrais do Jörð Sentinel.

A plataforma utiliza o PostgreSQL com a extensão PostGIS para armazenar e consultar informações geográficas. As geometrias dos imóveis e das bases ambientais são utilizadas nas operações espaciais.

Entre as operações utilizadas estão:

- `ST_Intersects`: identifica a interseção entre geometrias.
- `ST_DWithin`: verifica a proximidade entre geometrias considerando uma distância definida.
- `ST_Intersection`: calcula a geometria resultante da interseção entre objetos espaciais.
- `ST_Area`: calcula a área de uma geometria.
- `ST_AsGeoJSON`: converte geometrias para o formato GeoJSON.

As consultas são organizadas pelo repositório geoespacial, responsável por centralizar o acesso às bases ambientais.

### Consulta do imóvel pelo código CAR

A plataforma utiliza o código do Cadastro Ambiental Rural (CAR) informado pelo usuário para localizar o imóvel e recuperar seus dados cadastrais e sua geometria nas bases armazenadas no PostgreSQL/PostGIS.

Essas informações são utilizadas como referência para as consultas geoespaciais e para a avaliação das possíveis restrições ambientais.

---

## Bases ambientais

O sistema utiliza diferentes conjuntos de dados geoespaciais para identificar possíveis restrições e ocorrências ambientais relacionadas aos imóveis consultados.

As bases contempladas incluem:

| Base               | Descrição                                                     |
| ------------------ | ------------------------------------------------------------- |
| CAR                | Cadastro Ambiental Rural.                                     |
| CNUC               | Cadastro Nacional de Unidades de Conservação.                 |
| FUNAI              | Dados relacionados às Terras Indígenas.                       |
| IBAMA              | Dados de áreas e ocorrências relacionadas à atuação do IBAMA. |
| Florestas Públicas | Dados do Cadastro Nacional de Florestas Públicas.             |
| Quilombos          | Dados relacionados aos territórios quilombolas.               |
| PRODES             | Dados de monitoramento do desmatamento.                       |

A disponibilidade e a qualidade dos resultados dependem dos dados geoespaciais importados e armazenados no banco de dados.

**Observação:** o sistema não realiza automaticamente o download das bases ambientais. Os arquivos geoespaciais devem ser obtidos previamente e disponibilizados no formato e na estrutura esperados pelo processo de importação.

---

## Avaliação de risco ambiental

Após a identificação das ocorrências geoespaciais, o sistema utiliza o caso de uso `EvaluatePropertyRiskUseCase` para consolidar os resultados e aplicar as regras de negócio da avaliação ambiental.

O processamento considera a natureza das ocorrências identificadas e suas respectivas condições, atribuindo pontuações conforme os critérios implementados.

Ao final, as ocorrências são organizadas para apresentar uma classificação de risco ambiental.

Os níveis de risco utilizados são:

- **Low:** baixo risco.
- **Moderate:** risco moderado.
- **High:** alto risco.

A classificação é utilizada para apoiar a análise do imóvel e não representa, por si só, uma decisão oficial de concessão ou impedimento de crédito rural.

---

## Estrutura do projeto

O projeto está organizado em diretórios separados para o frontend, backend, banco de dados e scripts auxiliares.

```text
jord-sentinel/
│
├── backend/
│   └── src/
│       ├── analyses/
│       ├── companies/
│       ├── database/
│       ├── geospatial/
│       ├── roles/
│       ├── shared/
│       │    └── errors/
│       │    └── helpers/
│       │    └── middlewares/
│       ├── users/
│       └── ...
│
├── data/
│   └── shapefiles/       # Dados locais, não versionados
│       ├── car/
│       ├── cnuc/
│       ├── funai/
│       ├── ibama/
│       ├── prodes/
│       ├── public_forest/
│       └── quilombo/
│
├── frontend/
│   └── src/
│       ├── assets/
│       ├── components/
│       ├── context/
│       ├── hooks/
│       ├── pages/
│       ├── services/
│       └── ...
│
├── scripts/
│   └── import-shapefiles.sh
│
├── docker-compose.yml
├── package.json
├── .env.example
└── README.md
```

A estrutura interna pode variar conforme a evolução do projeto.

---

## Requisitos

Para executar o projeto localmente, são necessários:

- Node.js e npm.
- Docker.
- Docker Compose.
- Git.
- Arquivos shapefile das bases ambientais utilizadas pelo sistema.

Também é necessário disponibilizar as bases geoespaciais antes de executar o processo de importação.

---

## Configuração do ambiente

### 1. Clonar o repositório

```bash
git clone https://github.com/EnzoRuppel1406/jord-sentinel.git

cd jord-sentinel
```

### 2. Configurar as variáveis de ambiente

Utilize o arquivo `.env.example` como referência para criar o arquivo `.env`.

```bash
cp .env.example .env
```

Preencha as variáveis de acordo com o ambiente local, especialmente as configurações de conexão com o PostgreSQL e as chaves utilizadas pela aplicação.

**Importante:** não compartilhe o arquivo `.env` nem envie credenciais reais para o repositório.

### 3. Iniciar o banco de dados

Com o Docker e o Docker Compose instalados, inicie os serviços definidos no arquivo `docker-compose.yml`:

```bash
docker compose up -d
```

Verifique se os containers foram iniciados corretamente:

```bash
docker compose ps
```

---

## Instalação das dependências

Instale as dependências do projeto de acordo com a organização dos pacotes:

```bash
npm install
```

Caso o frontend e o backend possuam dependências próprias, execute a instalação também nos respectivos diretórios:

```bash
cd backend
npm install
```

```bash
cd ../frontend
npm install
```

---

## Importação das bases geoespaciais

O projeto possui um script para importar os arquivos shapefile para o PostgreSQL/PostGIS.

Antes de executar o script, é necessário:

1. Obter os arquivos geoespaciais das bases utilizadas.
2. Extrair os arquivos.
3. Organizar os diretórios conforme a estrutura esperada pelo script de importação.
4. Verificar as configurações de conexão com o banco de dados.

O script `scripts/import-shapefiles.sh` utiliza ferramentas de importação geoespacial, incluindo `shp2pgsql`, e trabalha com dados no sistema de referência espacial SRID 4674.

Para executar a importação:

```bash
npm run db:import-shapefiles
```

Para substituir as tabelas geoespaciais existentes durante a importação:

```bash
npm run db:import-shapefiles -- --replace
```

**Atenção:** a opção `--replace` deve ser utilizada com cuidado, pois substitui as tabelas geoespaciais contempladas pelo processo de importação. Verifique os dados e faça cópias de segurança quando necessário.

A execução do script não realiza o download dos shapefiles. Os arquivos precisam estar disponíveis localmente antes da importação.

---

## Banco de dados

O PostgreSQL é utilizado para armazenar os dados relacionais da aplicação, enquanto o PostGIS permite armazenar e consultar as geometrias utilizadas nas análises ambientais.

Entre as entidades relacionais utilizadas estão:

- Companies
- Roles
- Users
- Analyses
- Analyses Findings

As migrations SQL são utilizadas para estruturar e evoluir o banco de dados.

A aplicação também utiliza índices espaciais para otimizar consultas geográficas sobre as bases contempladas.

---

## Autenticação e controle de acesso

O sistema possui autenticação de usuários e controle de acesso.

Entre os mecanismos utilizados estão:

- Hash de senhas com bcrypt.
- Autenticação baseada em JWT.
- Utilização de cookies `httpOnly` para o armazenamento do token de autenticação.
- Middleware para proteção de rotas.
- Controle de acesso conforme os perfis de usuário.

As funcionalidades administrativas permitem gerenciar os usuários cadastrados e seus respectivos estados de acesso.

---

## Execução da aplicação

A execução depende dos scripts disponíveis nos arquivos `package.json` do projeto.

Em linhas gerais, o ambiente precisa ter:

1. Banco de dados iniciado.
2. Variáveis de ambiente configuradas.
3. Dependências instaladas.
4. Migrations executadas.
5. Bases geoespaciais importadas.
6. Backend e frontend iniciados.

Consulte os scripts definidos nos respectivos arquivos `package.json` para executar os comandos de inicialização e manutenção disponíveis na versão atual do projeto.

---

## Endpoints da API

A API disponibiliza endpoints para comunicação entre o frontend e o backend.

Entre as funcionalidades contempladas estão:

- Autenticação de usuários.
- Consulta geoespacial de imóveis rurais.
- Registro e consulta de análises.
- Consulta de histórico.
- Consulta de informações consolidadas para o dashboard.
- Gerenciamento administrativo de usuários.

Os endpoints são organizados por módulos e rotas específicas no backend.

---

## Limitações e considerações

- A qualidade das análises depende da disponibilidade, atualização e precisão das bases geoespaciais utilizadas.
- Os arquivos shapefile precisam ser obtidos e importados previamente.
- O processo de importação não realiza o download automático das bases.
- A identificação de uma sobreposição geográfica não representa necessariamente um impedimento legal ou administrativo. A interpretação depende da natureza da ocorrência e das regras aplicáveis.
- A classificação de risco é uma ferramenta de apoio à análise ambiental, não substituindo a avaliação técnica, jurídica ou a decisão da instituição financeira.
- O sistema depende da correta configuração do banco de dados e das variáveis de ambiente para funcionar adequadamente.

---

## Objetivo do projeto

O Jörð Sentinel foi desenvolvido com o propósito de aplicar tecnologias de desenvolvimento web e geoprocessamento à análise ambiental de imóveis rurais.

A plataforma busca centralizar consultas a diferentes bases ambientais, automatizar operações espaciais e organizar as ocorrências identificadas em informações que possam auxiliar a avaliação de imóveis relacionados ao crédito rural.

O projeto também permite explorar a integração entre desenvolvimento backend, bancos de dados geográficos e visualização de informações espaciais em uma aplicação web.
