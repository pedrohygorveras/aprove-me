# BankMe - Back-end

### 🗃️ Diagrama do Banco de Dados

![Modelo de Banco de Dados](./doc/diagram.drawio.png)

---

## 🌐 Links Úteis

- **Documentação da API**: [Swagger](https://api.pedrobankme.ip-ddns.com/api/docs)
  - Explore todos os endpoints da API de forma interativa.

- **Painel RabbitMQ**: [Acesse o RabbitMQ Dashboard](https://rabbitmq.pedrobankme.ip-ddns.com)
  - **Credenciais**:
    - **Usuário**: aproveme
    - **Senha**: aproveme

---

## 📝 Visão Geral

O back-end do **BankMe Receivables Management System** é construído com **NestJS** para garantir escalabilidade e segurança. Este guia vai ajudá-lo a instalar e rodar o projeto corretamente em seu ambiente local, utilizando ferramentas como **Docker** e **Prisma**.

### ⚙️ Tecnologias Utilizadas

- **NestJS**: Framework para desenvolvimento de APIs escaláveis.
- **Prisma ORM**: Gerenciamento do banco de dados SQLite.
- **Docker e Docker Compose**: Para virtualização do ambiente de desenvolvimento e produção.
- **JWT**: Para autenticação e segurança.
- **RabbitMQ**: Para processamento assíncrono em lotes.
- **TypeScript**: Linguagem utilizada no desenvolvimento para garantir tipagem e segurança.

---

## 🚀 Instruções de Instalação

### 1. Clonar o Repositório

Primeiro, faça o download ou clone o repositório do projeto no seu ambiente local. Você pode fazer isso copiando a URL do repositório e utilizando uma ferramenta como o Git ou diretamente no seu gerenciador de arquivos.

### 2. Configuração do Ambiente (.env)

Para configurar o ambiente, siga os seguintes passos:

1. Na pasta principal do projeto `back-end`, há um arquivo chamado `.env.example`. Crie um novo arquivo chamado `.env` e copie todo o conteúdo do `.env.example` para dentro dele.

2. Depois de copiar, edite o arquivo `.env` adicionando as informações necessárias. Aqui está um exemplo das variáveis de ambiente que você precisa configurar:

   ```env
   DATABASE_URL="file:./dev.db"

   JWT_SECRET="c0mP1exS3cr3tK3yTh@tS1gn$JWT"

   ACCESS_TOKEN_EXPIRATION="1m"
   REFRESH_TOKEN_EXPIRATION="7d"

   RABBITMQ_URI=amqp://user:password@localhost:5672

   EMAIL_HOST=smtp.seuservidor.com
   EMAIL_PORT=587
   EMAIL_SECURE=false
   EMAIL_USER=seuemail@dominio.com
   EMAIL_PASSWORD=sua_senha
   EMAIL_FROM="Suporte <seuemail@dominio.com>"

   APP_PORT=5000
   ```

   - **DATABASE_URL**: URL para o banco de dados SQLite.
   - **JWT_SECRET**: Chave secreta para assinatura dos tokens JWT.
   - **RABBITMQ_URI**: URL do RabbitMQ para o processamento de filas.
   - **EMAIL_*:** Configurações de SMTP para envio de emails durante o processo de notificação.

### 3. Instalar Dependências

Certifique-se de que você possui **Node.js** e **npm** instalados em sua máquina. Caso contrário, você pode baixá-los do site oficial [Node.js](https://nodejs.org/).

Depois de ter o Node.js instalado, abra um terminal na pasta `back-end` do projeto e instale as dependências necessárias:

- Execute o comando para instalar todas as dependências:

  ```bash
  npm install
  ```

### 4. Configurar o Banco de Dados

O projeto utiliza o **Prisma ORM** para gerenciar o banco de dados. Para configurar o banco de dados, siga os seguintes passos:

1. No terminal, dentro da pasta `back-end`, crie as tabelas necessárias no banco de dados usando as migrações do Prisma:

   ```bash
   npx prisma migrate dev
   ```

2. Popule o banco de dados com as informações iniciais, rode o script de seed:

   ```bash
   npx ts-node prisma/seed.ts
   ```

### 5. Executar a Aplicação com Docker

Para garantir que o ambiente seja consistente e sem problemas de dependências, você pode utilizar o **Docker**:

1. Certifique-se de que **Docker** e **Docker Compose** estejam instalados. Se ainda não estiverem, você pode instalá-los através do site oficial do [Docker](https://www.docker.com/).

2. Abra o terminal na pasta `back-end` e execute o comando abaixo para iniciar o contêiner:

   ```bash
   docker-compose up
   ```

   Isso irá levantar o ambiente, incluindo o servidor do back-end e as dependências, como o RabbitMQ.

### 6. Executar a Aplicação Localmente

Caso prefira rodar a aplicação diretamente em seu ambiente sem Docker, siga os seguintes passos:

1. Após ter instalado as dependências e configurado o banco de dados, rode o servidor com o comando:

   ```bash
   npm run start
   ```

2. A aplicação ficará disponível em `http://localhost:5000`.

---

## 🧪 Executando Testes

Os testes foram configurados utilizando **Jest**. Para garantir a robustez e qualidade do sistema, é recomendado executar os testes:

- **Testes Unitários**:

  ```bash
  npm run test
  ```

---

## 📂 Estrutura de Pastas

- **src**: Código-fonte principal.
  - **app.module.ts**: Arquivo que define o módulo principal do aplicativo e importa os módulos necessários.
  - **main.ts**: Ponto de entrada da aplicação, onde o servidor é inicializado.
  - **modules**: Contém todos os módulos principais que formam as funcionalidades do sistema:
    - **assignors**: Módulo para gerenciar cedentes, permitindo operações de CRUD.
    - **payables**: Módulo para gerenciar recebíveis, incluindo cadastro, edição, exclusão e consulta.
    - **auth**: Módulo responsável pela autenticação e geração de tokens JWT.
    - **users**: Módulo para gerenciar usuários e suas permissões.
    - **batchs e batch-items**: Módulos que lidam com o processamento de recebíveis em lote.
    - **dead-letter-queues**: Gerenciamento de filas mortas para itens não processados.

- **prisma**: Configurações do banco de dados.
  - **schema.prisma**: Arquivo que define o esquema do banco de dados, incluindo as tabelas e suas relações.
  - **migrations**: Scripts de migração do banco de dados, gerados para manter o esquema atualizado.
  - **seed.ts**: Script para popular o banco de dados com dados iniciais.

- **test**: Diretório de configuração dos testes.
  - **jest.config.js**: Arquivo de configuração do Jest para definir como os testes devem ser executados.

- **docker-compose.yml**: Arquivo para iniciar o projeto e suas dependências (RabbitMQ e banco de dados) com **Docker Compose**.
- **Dockerfile**: Script para construir a imagem Docker do back-end, permitindo o deploy da aplicação.
- **package.json**: Contém as dependências do projeto, incluindo **NestJS**, **Prisma**, **jsonwebtoken**, entre outras.
- **tsconfig.json**: Configuração do **TypeScript** para compilar o projeto corretamente.

---

## 🔄 RabbitMQ

- **RabbitMQ** é utilizado para processar grandes volumes de recebíveis em lote.
- Os dados são enviados para uma fila e processados de forma assíncrona, garantindo que a aplicação não seja sobrecarregada.
- Uma fila "morta" é usada para armazenar itens que não foram processados com sucesso após múltiplas tentativas, e o time de operações é notificado automaticamente para investigar problemas.

---

## 📄 Swagger


![Modelo de Banco de Dados](./doc/swagger.png)
