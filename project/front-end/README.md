# Bankme - Front-end

Este é o **front-end** do sistema **Bankme Receivables Management**, que interage com a API para gerenciar recebíveis e cedentes de forma eficiente e intuitiva.

## 🌐 Links do Projeto

- **Aplicação Front-end**: [Acesse o Front-end](https://pedrobankme.ip-ddns.com)
  - **Primeiro acesso**:
    - **Login**: aproveme
    - **Senha**: aproveme

---

## 🚀 Instruções de Instalação e Execução

### 1. **Clonar o Repositório**

Primeiro, clone o repositório do projeto no seu ambiente local:

```bash
git clone https://github.com/seu-usuario/bankme-frontend.git
cd bankme-frontend
```

### 2. **Instalar as Dependências**

Instale as dependências do projeto utilizando o **npm** ou **yarn**:

Com **npm**:

```bash
npm install
```

Com **yarn**:

```bash
yarn install
```

### 3. **Configuração do Arquivo `.env`**

Para configurar variáveis de ambiente, crie um arquivo `.env` na raiz do projeto. No front-end, algumas variáveis podem ser necessárias para configurar a comunicação com a API, como a URL da API e outras configurações específicas. O arquivo `.env` pode ficar assim:

```env
REACT_APP_API_URL=https://api.pedrobankme.ip-ddns.com
```

**Importante**: As variáveis de ambiente começam com `REACT_APP_` para serem acessíveis no código JavaScript/TypeScript.

### 4. **Rodar a Aplicação**

Após instalar as dependências e configurar o arquivo `.env`, execute a aplicação. Ela estará disponível localmente em `http://localhost:3000`.

Com **npm**:

```bash
npm start
```

Com **yarn**:

```bash
yarn start
```

Agora você pode acessar a aplicação no navegador em `http://localhost:3000`.

---

## 📋 Funcionalidades

A aplicação front-end permite que os usuários realizem as operações de CRUD (Criar, Ler, Atualizar, Excluir) de **Recebíveis** e **Cedentes** de maneira visual e intuitiva.

As principais funcionalidades incluem:

### 1. **Cadastro de Recebíveis**

- **Formulário de Recebíveis**: O usuário pode cadastrar novos recebíveis com informações como valor, data de emissão e cedente.
- **Validação**: Os campos são validados para garantir que os dados estão corretos antes do envio para a API.
- **Exibição de Recebíveis**: Após o cadastro, o usuário é redirecionado para uma tela onde pode visualizar os recebíveis cadastrados, com opção de editar ou excluir.

### 2. **Cadastro de Cedentes**

- **Formulário de Cedentes**: O usuário pode cadastrar novos cedentes (entidades que gerenciam os recebíveis), fornecendo informações como nome, CPF/CNPJ, e-mail e telefone.
- **Relacionamento com Recebíveis**: Durante o cadastro de um recebível, o usuário pode selecionar um cedente previamente cadastrado.

### 3. **Edição e Exclusão de Registros**

- **CRUD de Recebíveis e Cedentes**: Em todas as telas de listagem, é possível editar ou excluir registros com um clique. Para isso, a interface fornece botões de ação ao lado de cada item.

- **Tela de Detalhes**: Cada item de recebível ou cedente tem uma página de detalhes, onde é possível visualizar todas as informações e editar o item.

---

## 🖥️ Páginas e Fluxo do Projeto

O front-end foi dividido em várias páginas para organizar melhor a navegação e melhorar a experiência do usuário.

### 1. **Página de Login**

A página inicial da aplicação é onde o usuário entra com suas credenciais (login e senha). Após o login, o sistema gera um **token JWT** e armazena no `localStorage`, permitindo o acesso autenticado às outras páginas da aplicação.

### 2. **Página Inicial (Home)**

A página inicial exibe uma visão geral do sistema, com links para navegar entre as páginas de **Recebíveis** e **Cedentes**.

### 3. **Página de Recebíveis**

Nesta página, os usuários podem:

- Ver todos os recebíveis cadastrados.
- Cadastrar novos recebíveis.
- Editar ou excluir recebíveis existentes.

A página de recebíveis também exibe detalhes como **valor**, **data de emissão** e **cedente** associado.

### 4. **Página de Cedentes**

Os usuários podem ver todos os cedentes cadastrados, cadastrar novos cedentes, e editar ou excluir cedentes existentes.

### 5. **Página de Detalhes**

Para cada item de recebível ou cedente, existe uma página de detalhes, onde o usuário pode visualizar todas as informações do item e, caso necessário, fazer edições.

---

## 🛠️ Tecnologias Utilizadas

- **React**: Framework de JavaScript para a construção de interfaces de usuário reativas e eficientes.
- **Tailwind CSS**: Framework de CSS para uma estilização responsiva e customizável.
- **DaisyUI**: Biblioteca de componentes de interface prontos, construída sobre Tailwind CSS, que acelera o desenvolvimento e proporciona uma experiência de usuário consistente.
- **TypeScript**: Para garantir tipagem estática e maior segurança no código.
- **Axios**: Para fazer requisições HTTP à API backend de forma eficiente.
- **React Router**: Para gerenciar as rotas da aplicação e garantir uma navegação fluída entre as páginas.

---

## 💡 Processo de Cadastro

1. **Cadastro de Recebível**:

   - O usuário preenche um formulário com os dados do recebível (valor, data de emissão, cedente).
   - Após validação dos dados, o recebível é enviado para a API, que realiza a persistência no banco de dados.

2. **Cadastro de Cedente**:

   - O usuário preenche um formulário com os dados do cedente (nome, CPF/CNPJ, telefone, e-mail).
   - O cedente é cadastrado na API e fica disponível para seleção no cadastro de recebíveis.

3. **Autenticação**:
   - O login é realizado na página inicial. O sistema utiliza **JWT** para garantir a autenticação e controle de acesso, validando o token em cada requisição à API.

---

## 📷 Layout Responsivo

A aplicação é completamente **responsiva** e adaptável a diferentes tamanhos de tela. O design foi desenvolvido utilizando **Tailwind CSS** para garantir uma experiência fluída e intuitiva, tanto para desktop quanto dispositivos móveis.

- **Tela de Cadastro**: Formulários adaptáveis para diferentes dispositivos.
- **Listagens**: Tabelas que ajustam suas colunas e conteúdo conforme a resolução da tela.
