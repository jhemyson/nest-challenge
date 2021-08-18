# Challenge WA

## Descrição

O projeto foi desenvolvido utilizando o framework NestJS. Tomei essa decisão pela agilidade + custo-benefício.

Todo o projeto foi pensado e estruturado para ser feito com todos testes unitários e de integração, devido ao curto prazo, acabei optando por criar apenas alguns exemplos de testes **unitários** ```src/laboratories/laboratories.service.spec.ts``` e de **integração** ```test/laboratories.e2e-spec.ts```,

## CLOUD
##### Aplicação rodando na AWS ```http://ec2-34-232-46-21.compute-1.amazonaws.com:3000/api/```

##### No end-point de ```GET /exams``` foi criado com paginação (como exemplo que os outros end-points ```/GET``` seguiriam)

## Estrutura de pastas

#### Pasta principal ```src/```
  - ``` /_config ```       configurações gerais como variáveis de ambiente
  - ``` /_utils ```        código que serão úteis para os demais módulos
  - ``` /exams ```         módulo de exames
  - ``` /laboratories ```  módulo de laboratórios 
  - ``` app.module.ts ```  carrega os demais módulos e configurações globais
  - ``` main.ts ```        bootstrap/inicialização de toda aplicação

#### Estrutura de um módulo
  - services
  - controller
  - /dto/
  - /entities/

## Acesso a documentação da API(Swagger)
- ``` http://localhost:3000/api ```

## Instalação
#### caso na hora de instalar os pacotes dê algum erro, preferível usar o Yarn como instalador de pacote

```bash
$ npm install
$ yarn install
```

## Rodar o projeto com Docker
```bash
$ docker-compose up
```

## Rodar o projeto localmente

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Testar localmente

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
