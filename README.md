________________pt-BR________________

# 🧩 BlocZ — Marketplace Acessível

<p align="center">
  <img src="https://img.shields.io/badge/Java-17-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white" alt="Java 17">
  <img src="https://img.shields.io/badge/Spring_Boot-4.0-6DB33F?style=for-the-badge&logo=springboot&logoColor=white" alt="Spring Boot">
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL">
  <img src="https://img.shields.io/badge/Acessibilidade-Web-7C3AED?style=for-the-badge" alt="Acessibilidade Web">
</p>

## 📌 Sobre o projeto

O **BlocZ** é um marketplace de blocos e colecionáveis desenvolvido com foco em **desenvolvimento web e acessibilidade digital**.

O projeto combina uma aplicação Java com Spring Boot, persistência em PostgreSQL e uma interface web construída com Thymeleaf, HTML, CSS e JavaScript.

Além do fluxo tradicional de um e-commerce, o sistema aplica recursos de acessibilidade para tornar a navegação mais inclusiva.

---

## ♿ Acessibilidade

Entre os recursos implementados estão:

- integração com **VLibras**;
- link para **pular diretamente ao conteúdo principal**;
- uso de `aria-label`, `aria-live`, `aria-hidden` e outros atributos ARIA;
- textos alternativos em imagens;
- suporte a navegação sem depender apenas de elementos visuais;
- tema **claro e escuro**, respeitando também a preferência do sistema;
- suporte a `prefers-reduced-motion` para usuários que preferem menos animações;
- indicadores e mensagens dinâmicas preparados para tecnologias assistivas.

---

## 🚀 Funcionalidades

O sistema possui funcionalidades como:

- catálogo e detalhes de produtos;
- cadastro e login de clientes;
- carrinho de compras;
- checkout;
- cadastro de endereços;
- cadastro de cartões;
- pedidos;
- categorias e favoritos;
- área de diversão;
- personalização de avatar.

### Monte seu Avatar

O projeto possui uma experiência interativa para criação de personagens utilizando diferentes:

- cabeças;
- torsos;
- pernas.

As escolhas podem ser armazenadas no navegador para manter o avatar personalizado.

---

## 🏗️ Arquitetura

O backend está organizado em camadas:

```text
Controller
    ↓
Service
    ↓
Repository
    ↓
JPA / Hibernate
    ↓
PostgreSQL
```

Entre as principais estruturas estão:

```text
controller/
dto/
entity/
repository/
service/
```

O frontend é organizado em:

```text
resources/
├── templates/
├── static/
│   ├── css/
│   ├── js/
│   ├── img/
│   └── lego/
```

---

## 🗃️ Domínio

O backend possui estruturas relacionadas a:

- Clientes;
- Produtos;
- Categorias;
- Favoritos;
- Pedidos;
- Itens;
- Endereços;
- Cartões;
- Produtos dos pedidos.

A aplicação disponibiliza endpoints REST para acesso e manipulação desses dados.

---

## 🛠️ Tecnologias

- Java 17
- Spring Boot
- Spring MVC
- Spring Data JPA
- Hibernate
- Thymeleaf
- PostgreSQL
- Maven
- HTML5
- CSS3
- JavaScript
- VLibras
- OpenAPI / Springdoc

---

## ⚙️ Como executar

### Pré-requisitos

- Java 17;
- PostgreSQL;
- Git.

### Configuração

Clone o repositório:

```bash
git clone https://github.com/RafaelPassosQueiroz/Trabalho_Acessibilidade.git
cd Trabalho_Acessibilidade
```

Utilize o arquivo:

```text
src/main/resources/application-example.properties
```

como referência para configurar sua conexão com o PostgreSQL.

Depois, execute no Windows:

```bash
mvnw.cmd spring-boot:run
```

ou em Linux/macOS:

```bash
./mvnw spring-boot:run
```

A aplicação estará disponível em:

```text
http://localhost:8080
```

---

## 📂 Estrutura resumida

```text
Trabalho_Acessibilidade/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/FunkoPop/MarketPlace/
│   │   └── resources/
│   │       ├── static/
│   │       └── templates/
│   └── test/
├── pom.xml
├── mvnw
├── mvnw.cmd
└── .gitignore
```

---

## 🔐 Observação

O projeto possui finalidade acadêmica e demonstrativa.

O fluxo atual de autenticação não deve ser considerado uma implementação de segurança pronta para produção. Em uma aplicação real, autenticação, armazenamento de senhas e gerenciamento de sessão devem utilizar mecanismos apropriados de segurança no backend.

---

## 🎯 Objetivo

O projeto demonstra a aplicação prática de conceitos de:

- desenvolvimento web full stack;
- APIs REST;
- persistência de dados;
- organização de aplicações Spring;
- experiência do usuário;
- acessibilidade digital.

<hr>

________________en-US________________

# 🧩 BlocZ — Accessible Marketplace

<p align="center">
  <img src="https://img.shields.io/badge/Java-17-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white" alt="Java 17">
  <img src="https://img.shields.io/badge/Spring_Boot-4.0-6DB33F?style=for-the-badge&logo=springboot&logoColor=white" alt="Spring Boot">
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL">
  <img src="https://img.shields.io/badge/Accessibility-Web-7C3AED?style=for-the-badge" alt="Web Accessibility">
</p>

## 📌 About the Project

**BlocZ** is a marketplace for building blocks and collectibles developed with a focus on **web development and digital accessibility**.

The project combines a Java application built with Spring Boot, PostgreSQL persistence, and a web interface developed with Thymeleaf, HTML, CSS, and JavaScript.

In addition to traditional e-commerce flows, the application implements accessibility features designed to provide a more inclusive browsing experience.

---

## ♿ Accessibility

Implemented accessibility features include:

- **VLibras** integration;
- skip link to the main content;
- use of `aria-label`, `aria-live`, `aria-hidden`, and other ARIA attributes;
- alternative text for images;
- navigation that does not rely exclusively on visual elements;
- **light and dark themes**, including system preference support;
- `prefers-reduced-motion` support;
- dynamic messages prepared for assistive technologies.

---

## 🚀 Features

The application includes:

- product catalog and product details;
- customer registration and login;
- shopping cart;
- checkout;
- address management;
- payment card management;
- orders;
- categories and favorites;
- entertainment area;
- avatar customization.

### Avatar Builder

The project includes an interactive character builder with customizable:

- heads;
- torsos;
- legs.

The selected avatar can be stored locally in the browser.

---

## 🏗️ Architecture

The backend follows a layered structure:

```text
Controller
    ↓
Service
    ↓
Repository
    ↓
JPA / Hibernate
    ↓
PostgreSQL
```

Main backend packages include:

```text
controller/
dto/
entity/
repository/
service/
```

The frontend is organized under:

```text
resources/
├── templates/
├── static/
│   ├── css/
│   ├── js/
│   ├── img/
│   └── lego/
```

---

## 🗃️ Domain

The backend includes structures related to:

- Customers;
- Products;
- Categories;
- Favorites;
- Orders;
- Items;
- Addresses;
- Payment cards;
- Order products.

REST endpoints are provided for accessing and managing these resources.

---

## 🛠️ Technologies

- Java 17
- Spring Boot
- Spring MVC
- Spring Data JPA
- Hibernate
- Thymeleaf
- PostgreSQL
- Maven
- HTML5
- CSS3
- JavaScript
- VLibras
- OpenAPI / Springdoc

---

## ⚙️ Running the Project

### Requirements

- Java 17;
- PostgreSQL;
- Git.

### Setup

Clone the repository:

```bash
git clone https://github.com/RafaelPassosQueiroz/Trabalho_Acessibilidade.git
cd Trabalho_Acessibilidade
```

Use:

```text
src/main/resources/application-example.properties
```

as a reference to configure your PostgreSQL connection.

Then run on Windows:

```bash
mvnw.cmd spring-boot:run
```

or on Linux/macOS:

```bash
./mvnw spring-boot:run
```

The application will be available at:

```text
http://localhost:8080
```

---

## 📂 Repository Structure

```text
Trabalho_Acessibilidade/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/FunkoPop/MarketPlace/
│   │   └── resources/
│   │       ├── static/
│   │       └── templates/
│   └── test/
├── pom.xml
├── mvnw
├── mvnw.cmd
└── .gitignore
```

---

## 🔐 Note

This project was developed for academic and demonstration purposes.

The current authentication flow should not be considered production-ready security. A real-world application should implement proper backend authentication, secure password storage, and session management.

---

## 🎯 Objective

The project demonstrates practical concepts related to:

- full-stack web development;
- REST APIs;
- data persistence;
- Spring application architecture;
- user experience;
- digital accessibility.
