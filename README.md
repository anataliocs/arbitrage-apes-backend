<div style="text-align: center;" align="center">

<a href="https://stellar.org/" target="blank"><img src="https://cdn.discordapp.com/discovery-splashes/897514728459468821/392c5ba8562a90a76fd4a57f5e8058e6.jpg?size=2048" alt="Stellar Logo" title="Stellar Logo" width="100" /></a>
</div>

<div style="text-align: center;" align="center">
Arbitrage Apes Backend</div>

<div style="text-align: center;" align="center">

<a href="https://github.com/anataliocs/stellar-discord-bot/actions"><img alt="Build Status" src="https://github.com/anataliocs/stellar-discord-bot/workflows/CI/badge.svg"></a>
<a href="https://github.com/anataliocs/stellar-discord-bot/blob/main/LICENSE"><img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg"></a>
</div>

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/anataliocs/stellar-discord-bot)

## Table of Contents

- [Description](#description)
- [Project Setup](#project-setup)
- [Compile and Run](#compile-and-run)
- [Run Tests](#run-tests)
- [Run Locally with Discord](#run-locally-with-discord)
- [Docker](#docker)
- [License](#license)

## Description

[Nest](https://github.com/nestjs/nest) Arbitrage Apes Contract Backend for
the [Stellar Development Foundation](https://stellar.org/).

Check out the Discord here [Stellar Discord](https://discord.com/invite/zVYdY3ktTn).

## Project Setup

### Prerequisites

- Node.js >= 20.x
- pnpm
- Docker (optional, for containerized deployment)

### Installation

```bash
$ pnpm install
```

## Compile and run

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

Open API docs: 
```http request
http://localhost:3000/api
```

You may have CORS issues on localhost.

You can try opening Chrome in a sandbox with web security disabled:
```bash
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome http://localhost:63342/stellar-arbitrage-apes-future-yacht-club/index.html?_ijt=q9fn6vaje10r5bcfgmcmafoo6p&_ij_reload=RELOAD_ON_SAVE --args --disable-web-security --user-data-dir="~/.chrome.dev.session/" --incognito --new-window
```

## Run tests

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Health check

http://localhost:3000/health


## Docker

Build image locally

```
docker build --platform linux/amd64 -t arbitrage-apes-backend .
```

Push to DockerHub

``` 
docker tag arbitrage-apes-backend:latest chrisstellar/arbitrage-apes-backend:latest
docker push chrisstellar/arbitrage-apes-backend:latest
```

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
