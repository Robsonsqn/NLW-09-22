# Back-end

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/). 
Além disto é bom ter um editor para trabalhar com o código como 
[VSCode](https://code.visualstudio.com/)

```bash
# Clone este repositório
$ git clone <https://github.com/Robsonsqn/NLW-09-22>

# Acesse a pasta do projeto no terminal/cmd
$ cd NLW-09-22

# Vá para a pasta server
$ cd server

# Instale as dependências
$ npm install
$ npx prisma migrate dev
$ npm run dev

# Execute a aplicação em modo de desenvolvimento
$ npm run dev:server

# Abra o banco de dados (PRISMA)
$ npx prisma studio

# O servidor inciará na porta:3333 - acesse <http://localhost:3333>
```

## Entidades

### Game

    id
    title
    bannerUrl

### Ad

    id
    gameId
    name
    yearPlaying
    discord
    weekDays
    hourStart
    hourEnd
    useVoiceChannel
    CreatedAt

## Casos de uso

    - Listagem de jogos com contagem de anúncios.
    - Criação de anúncios.
    - Listagem de anúncios por jogo.
    - Busca de discord por ID anúncio
