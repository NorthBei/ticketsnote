# TicketsNote - 票知，幫你找到被釋出的高鐵票，讓你不再與任何一張票擦肩而過
![og_image](https://github.com/NorthBei/ticketsnote/assets/15665709/ed667e12-9712-42cc-b5c1-f87b5b18a007)


## Project Intro

### Introduction

票知，幫你找到被釋出的高鐵票，讓你不再與任何一張票擦肩而過。
常常沒搶到高鐵票，只好瘋狂不定時檢查有沒有票釋出嗎？

花了許多時間查票，但卻還是找不到票嗎？

現在，就讓票知來幫你解決這些問題吧！

### Person In charge
- Service Plan, Dev & Design by NorthBei from [Metartemis](https://metartemis.co)

### Relative Link
- [票知 - 幫你找到被釋出的高鐵票](https://ticketsnote.web.app)
- [TicketsNote Open Graph Image](https://i.imgur.com/9onNinN.jpg)

### Screenshots/Film

**Home Page**

| PC | Mobile |
|-|-|
|![image](https://github.com/NorthBei/ticketsnote/assets/15665709/0d10075d-4a51-46c0-b55d-1deb4144137c)|![ticketsnote web app_(Pixel 7)](https://github.com/NorthBei/ticketsnote/assets/15665709/e84402b8-c732-47e2-8692-f908249513cc)|



**Edit Page**

| PC | Mobile |
|-|-|
|![localhost_5173__ut=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9 eyJleHAiOjE3MzUzMjc5MjAuMTU3LCJkYXRhIjp7ImVtYWlsIjoic2Vla2luZ2ZvcjUyMEBnbWFpbC5jb20ifSwiaWF0IjoxNzAzNzA1NTIwfQ 5Q4DIQSyQC6xOzEVGOiwGBoRQCexE3zZUeWQuagrvJk (1)](https://github.com/NorthBei/ticketsnote/assets/15665709/8c724680-4b35-4d12-a956-10cfda217435)|![localhost_5173__ut=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9 eyJleHAiOjE3MzUzMjc5MjAuMTU3LCJkYXRhIjp7ImVtYWlsIjoic2Vla2luZ2ZvcjUyMEBnbWFpbC5jb20ifSwiaWF0IjoxNzAzNzA1NTIwfQ 5Q4DIQSyQC6xOzEVGOiwGBoRQCexE3zZUeWQuagrvJk(Pixel 7)](https://github.com/NorthBei/ticketsnote/assets/15665709/52e8262f-8e1e-4e6f-a41e-8891c248560e)|
|![localhost_5173__ut=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9 eyJleHAiOjE3MzUzMjc5MjAuMTU3LCJkYXRhIjp7ImVtYWlsIjoic2Vla2luZ2ZvcjUyMEBnbWFpbC5jb20ifSwiaWF0IjoxNzAzNzA1NTIwfQ 5Q4DIQSyQC6xOzEVGOiwGBoRQCexE3zZUeWQuagrvJk](https://github.com/NorthBei/ticketsnote/assets/15665709/0b705281-0dc8-4814-9eb2-5d24413e9b6c)|![localhost_5173__ut=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9 eyJleHAiOjE3MzUzMjc5MjAuMTU3LCJkYXRhIjp7ImVtYWlsIjoic2Vla2luZ2ZvcjUyMEBnbWFpbC5jb20ifSwiaWF0IjoxNzAzNzA1NTIwfQ 5Q4DIQSyQC6xOzEVGOiwGBoRQCexE3zZUeWQuagrvJk(Pixel 7) (1)](https://github.com/NorthBei/ticketsnote/assets/15665709/d51e7930-7440-4fe5-81fc-b092b9424c3f)|

**Error Page**

| PC | Mobile |
|-|-|
|![ticketsnote web app_edit](https://github.com/NorthBei/ticketsnote/assets/15665709/1b12b334-5210-43a8-8b4f-d5e1516e5aea)|![ticketsnote web app_edit(Pixel 7) (1)](https://github.com/NorthBei/ticketsnote/assets/15665709/ebed1799-6a01-4ec0-84b7-75f505cc5643)|


## Development Instruction - Website

### Environment

|Service|Version|
|-|-|
|Node.js|v18.16.2|
|npm| v9.5.1|

### Environment Variables

Rename the `/.env.local.example` to `.env.local`, and get the env var from Firebase project & other services

|Service|Env var|
|-|-|
|GTM|VITE_GTM_ID|
|GTM|VITE_GTM_AUTH|
|GTM|VITE_GTM_PREVIEW|
|GTM|VITE_GTM_COOKIES_WIN|
|Google Recaptcha|VITE_GOOGLE_RECAPTCHA_SITE_KEY|
|Firebase|VITE_FIREBASE_API_KEY|
|Firebase|VITE_FIREBASE_AUTH_DOMAIN|
|Firebase|VITE_FIREBASE_DATABASE_URL|
|Firebase|VITE_FIREBASE_PROJECT_ID|
|Firebase|VITE_FIREBASE_STORAGE_BUCKET|
|Firebase|VITE_FIREBASE_MESSAGING_SENDER_ID|
|Firebase|VITE_FIREBASE_APP_ID|

### Getting Started


Install packages & Run the development server:

```zsh
npm run install
npm run dev
```

### Project setup

Install all packages
```zsh
npm run install
```

### Start Development

Run development web server at http://localhost:5173 for development by vite

```zsh
npm run dev
```

### Lint all files

Run lint for all `.js`, `.vue`, `.json` files with eslint

```zsh
npm run lint
```

### Build Production

Build by vite

```zsh
npm run build
```

### Preview Built Result

Run local static file server for preview built result at http://localhost:4173

```zsh
npm run preview
```

### Deploy to hosting service

Run build & deploy to firebase hosting

```zsh
npm run deploy
```

## Development Instruction - Firebase Functions

### Environment

|Service|Version|
|-|-|
|Node.js|v18 (18.16.2)|
|npm| v9.5.1|

### Environment Variables

**Firebase Functions**

Rename the `/functions/.env.local.example` to `.env.local`, and get the env var from different services

|Service|Env var|
|-|-|
|Sendgrid|SENDGRID_API_KEY|
|Sendgrid|SENDGRID_TEMPLATE_ID|
|This Project|JWT_SECRET_KEY|
|This Project|TICKETSNOTE_BASE_URL|

### Getting Started

Install packages & Run the firebase emulator:

```zsh
npm run install
npm run serve
```

### Project setup

Install all packages
```zsh
npm run install
```

### Start Development

Run firebase emulator with functions at http://localhost:5001

```zsh
npm run serve
```

Run firebase functions shell to make developer could interactive with function instance by cli

```zsh
npm run start
# or
npm run shell
```


### Lint all files

Run lint for all `.js`, `.json` files with eslint

```zsh
npm run lint
```

### Deploy all function to firebase cloud functions

```zsh
npm run deploy
```

### See firebase functions logs

```zsh
npm run logs
```


## Note
由於Vue Material 2不支援Typescript, 所以整個專案最後只能使用Javascript進行開發
另外，專案是使用Vite建立的，不過因為Vite不支援建立Vue2的專案，所以在選擇專案類型時是選擇Javascript Project，然後再自己額外安裝`vite-plugin-vue2`，支援vue2 - Javascript的開發，詳細的內容跟做法可以參考Reference

## Reference
- [Vue Material not support typescript - [core] Typescript support planned? #662](https://github.com/vuematerial/vue-material/issues/662)
- [使用 Vite 建立Javascript based Vue2 專案（Vue2 + vue-router + vuex)](https://xie.infoq.cn/article/3f941f3a2f47635d560e2659c)
- [Vue Material form validation with vuelidate officail example](https://www.creative-tim.com/vuematerial/components/form)
- [[Vue] Event Bus 是什麼? 怎麼用?](https://medium.com/itsems-frontend/vue-event-bus-15b76f27aeb9)
- [Vuelidate for vue2 document](https://vuelidate.js.org/#getting-started)

