# Chronos Pomodoro

## Sobre Chronos Pomodoro

O **Chronos Pomodoro** tem como objetivo te ajudar a gerenciar sua rotina de
estudo com a técnica pomodoro. O projeto foi criado com **React + Typescript +
Vite** e, para manter persistentes os dados, ele salva no **LocalStorage** do
seu navegador. O projeto foi desenvolvido durante aulas na **Udemy** com algumas
nuances do projeto original.

## Instruções para o deployment

Para fazer o deployment da aplicação recomendo o uso do Docker para diminuir a
complexidade do deployment em produção.

> [!NOTE] Use a última versão disponível do Docker, que está disponível em:
> https://docs.docker.com/engine/install/.

> [!NOTE] Caso queira fazer o deployment local, é necessário ter instalado o
> Node.js, disponível em: https://nodejs.org/en/download.

Já deduzindo que você tenha o Docker instalado, faça o clone do repositório e
entre na pasta.

```
  #comando

  cd chronos-pomodoro
```

Após entrar no diretório, execute:

```
  #comando

  docker network create apps
```

Em sequência, execute o comando para fazer o build e nomear a tag:

```
  #comando

  docker build -t chronos-pomodoro:1.0 .
```

Aguarde finalizar a criação da imagem para poder rodar em seguida o seguinte
comando:

```
  #comando

  docker compose up -d
```

Com isso o deployment estará completo. Para acessar, utilize a URL que ficará
disponível na sua máquina: http://localhost

> [!IMPORTANT] Como o Nginx utiliza a porta 80, que é o HTTP, não esqueça que
> ela precisa estar disponível.

> [!TIP] Altere a porta do docker-compose.yml caso seja necessário, assim
> disponibilizando outra porta para ser acessível em http://localhost:SUA_PORTA
