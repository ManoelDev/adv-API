# ADV API

### API RESTful com Fastify, Prisma, ZOD, DayJS, Vitest, TDD e Padrões de Commit

---

## Descrição do projeto:

Este projeto tem como objetivo desenvolver uma API RESTful utilizando Node.js, com o framework
Fastify e o ORM Prisma. Serão aplicados conceitos de TDD (Test-Driven Development) para
garantir um desenvolvimento orientado a testes. Além disso, o DayJS sera utilizado para
manipulação de datas, o Zod será utilizado para validação de dados de entrada, o Vitest como
runner de testes, o conceito Either para lidar com erros de forma mais expressiva e o princípio
de inversão de dependência para melhorar a modularidade e reutilização de código. Também serão
aplicados padrões de commit linting para manter a qualidade e consistência dos commits.

## Arquitetura do Projeto:

O projeto seguirá uma arquitetura modular, com a aplicação do princípio de inversão de dependência.
Isso permitirá uma fácil substituição e testabilidade dos componentes. A estrutura do projeto será
organizada em camadas, como a de rotas, controladores, casos de uso, errors, onde cada uma terá
responsabilidades bem definidas. O Prisma será utilizado como ORM para acesso aos dados e o Fastify
para lidar com as requisições HTTP.

## Tecnologias Utilizadas no Projeto:

    [x] Fastify
    [x] Prisma Orm
    [x] Zod
    [x] Cors
    [x] DotEnv
    [x] NodeMailer (para envio de e-mail)
    [x] HandleBars (para criação de templates dinâmicos)
    [x] Vitest + Supertest (parar testes unitários e E2E)
    [x] Git Actions
    [x] Husky (commit lint, pre commit, pre push)
    [x] DayJs (para manipular datas)

## Recursos do Projeto:

    [x] Tratamento de errors com conceito de Either(left, right)
    [x] Validação de variáveis de ambiente com ZOD
    [x] Validação de dados de entrada com o ZOD
    [x] Adicionar serviço de envio e-mails (Ethereal somente para testes locais)
    [x] Validação de rotas publicas e privadas
    [x] Autenticação de usuário
    [x] Recuperar senha (com envio de token por e-mail)
    [x] Refresh token (parcial sem validação)

## Funcionalidades do Projeto:

    [x] É possível criar um novo usuário
    [x] É possível atualizar dados do usuário logado
    [x] É possível trocar senha (com validação de token enviado por e-mail)
    [x] É possível ver dados do usuário logado
    [x] É possível validar um token (rota alternativa para um step de validação)

## Próximos passos:

    [ ] Refresh token (validação de dados e armazenamento de token no banco de dados)
    [ ] Serviço para uploading de imagem (S3, LOCAL para adicionar avatar)

## Instalação e configuração do projeto:

1.  Certifique-se de ter instalado:

        Node.js 18
        PostgresSQL

2.  Clone este repositório:

    ```bash
    git clone https://github.com/Progamo/adv-API.git
    ```

3.  Navegue até o diretório do projeto:

    ```bash
    cd adv-API
    ```

4.  Instale as dependências:
    ```bash
    npm install
    ```
5.  Você pode configurar o projeto.

- Duplique o arquivo .env.example renomeio para .env
- Altere a url de conexão com o banco de dados

  ```bash
  DATABASE_URL: URL de conexão com o banco de dados.
  ```

## Como utilizar o projeto:

1. Execute o seguinte comando para iniciar o servidor:

   ```bash
   npm run dev
   ```

2. O servidor estará em execução em http://localhost:3333/v1/

## Quer contribuição com o projeto:

1. Faça um fork deste repositório.
2. Crie uma nova branch:

   ```bash
   git checkout -b minha-branch
   ```

3. Faça as alterações desejadas e commit:

   ```bash
   # Respeitando os padrões do commit lint community
   # feat, fix, chore entre outros

   git commit -m "Minhas alterações"
   ```

4. Faça um push para a branch:

   ```bash
   git push origin minha-branch
   ```

5. Crie um pull request no GitHub.
