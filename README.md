# Chiemgauer demo


## Prerequisites

Truffle `npm i -g truffle`

Nodejs

Typescript `npm i -g typescript`

[Google cloud sdk](https://cloud.google.com/sdk/gcloud/) 

qrcode-terminal `npm i -g qrcode-terminal` (used to show a QR code in the terminal after deploying to IPFS)

Ganache `npm i -g ganache-cli`


## Install

`npm install` to install project dependencies


## Deploy gcloud functions

`cd` to the function folder.

`tsc -p tsconfig.json` because cloud functions run node 6.

`gcloud beta functions deploy charge --trigger-http`


## Deploy pwa to IPFS

`npm run ipfs`

  
## Deploy contracts to ethereum

`truffle migrate` 

or

`truffle migrate --network rinkeby`

  