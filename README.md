# Projeto Full Stack: Site para Gerenciamento de Finanças 💰 (front-end)

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)
![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-000000?style=for-the-badge)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/github%20actions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white)
![Azure](https://img.shields.io/badge/Microsoft%20Azure-0078D4?style=for-the-badge&logo=microsoftazure&logoColor=white)

## O que é o projeto? 🤔

Este projeto é uma aplicação full-stack de controle de finanças, que permite aos usuários gerenciar categorias de despesas, carteiras financeiras e transações, além de visualizar relatórios detalhados de suas finanças através de gráficos interativos. A aplicação foi desenvolvida utilizando React com TypeScript, e as interfaces são estilizadas com TailwindCSS. O uso do ShadcnUI proporciona uma experiência de usuário moderna e intuitiva.

## Funcionalidades

- Cadastro e Gerenciamento de Categorias: Permite criar, editar e excluir categorias de despesas, organizando as transações de forma eficiente.
- Cadastro e Gerenciamento de Carteiras: Os usuários podem adicionar, editar e excluir carteiras financeiras, facilitando a organização das contas e fontes de receita.
- Cadastro e Gerenciamento de Transações: A aplicação possibilita o registro de transações financeiras, associando-as a categorias e carteiras, com a opção de definir valores, datas e descrições.
- Dashboard de Relatórios: Uma tela interativa com gráficos dinâmicos para exibir:
- Relatório de categorias (visualização do total gasto por categoria)
- Relatório de carteiras (comparação entre diferentes carteiras financeiras)
- Relatório de saldo por mês (evolução de receitas e despesas ao longo do tempo)
- Autenticação e Registro com Keycloak: A aplicação utiliza o Keycloak para gerenciar autenticação e controle de acesso, garantindo que apenas usuários autorizados possam acessar e modificar os dados financeiros.
- Deploy e Automação: A aplicação foi containerizada utilizando Docker e Nginx, e o deploy é realizado automaticamente através de uma pipeline CI/CD no GitHub Actions, facilitando atualizações e melhorias contínuas. Traefik é utilizado para gerenciar o tráfego HTTP/HTTPS e gerar certificados SSL.

## Imagens da interface

![Image](https://github.com/user-attachments/assets/36c4224f-792f-4587-a2e2-80be1f792969)

![Image](https://github.com/user-attachments/assets/91ecd670-5b25-43fc-bbf7-4d0af6c54a81)

![Image](https://github.com/user-attachments/assets/ede32d42-078f-45d0-9900-4ee61b1e45c6)

![Image](https://github.com/user-attachments/assets/a596865f-5273-457d-8920-e015668b78a5)

![Image](https://github.com/user-attachments/assets/c7de4dc1-6d64-4364-8e36-61fe8eabd3b7)

![Image](https://github.com/user-attachments/assets/0df44213-7efe-498b-bc09-2e5162639298)

![Image](https://github.com/user-attachments/assets/7f9d7faf-2101-41e5-b2ae-428829999644)

## Como executar 🎉

1.Clonar repositório git:

```text
git clone https://github.com/FernandoCanabarroAhnert/finance-app-frontend.git
```

2.Instalar dependências.

```text
npm install
```

3.Executar

```text
npm run dev
```