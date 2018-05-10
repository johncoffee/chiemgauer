import Web3C from 'web3'
import { EncodedTransaction, Tx } from 'web3/types.js'

const Web3 = require('web3')

// const privateKey = '0x' + '' // of the owner of the token contract
const privateKey = '0x' + '66b4b72fdbf512ff825787602b761d2f9983c7e828ea905284f43ea9a19f7d4b' // rink

const methodName = 'mint'
const contractArtifact = require('./build/contracts/Chiemgauer.json')
const mintAbi = contractArtifact.abi.find((method:any) => method.name === methodName)
console.assert(!!mintAbi, `Should've found ${methodName} in `, contractArtifact.abi)

const networkId:number = 4
const API_KEY = 'xSa977dElK0pyDw8ipCV'
const rpcUrl = `https://rinkeby.infura.io/${API_KEY}`

const contractAddress:string = contractArtifact.networks[networkId].address

const web3:Web3C = new Web3( rpcUrl)
const owner = web3.eth.accounts.privateKeyToAccount(privateKey) as any // it cant find signTransaction
console.assert(!!owner.address, `should have address`)

export type TokenOrderItem = {
  amount: number,
  recipient: string,
  stripeChargeId:string,
}

async function makeMintTx (txFile:TokenOrderItem, from: string):Promise<Tx> {
  const gasPrice = web3.utils.toWei("2", "shannon") // https://etherconverter.online/

  const data:string = web3.eth.abi.encodeFunctionCall(mintAbi, [
    txFile.recipient,
    txFile.amount,
  ])

  const tx = <Tx>{
    to: contractAddress,
    gasPrice: gasPrice,
    gas:  100000,
    //   7081298 // max
    data: data,
    from,
    chainId: networkId
  }

  return tx
}


export async function processView (txFiles:TokenOrderItem[]) {
  console.log(`token contract address ${contractAddress}`)
  console.log(`from ${owner.address}`)
  let unsignedTxs:Tx[] = await Promise.all( txFiles.map((txInfo:TokenOrderItem) => makeMintTx(txInfo, owner.address)))

  let signedTxs:EncodedTransaction[]
  console.assert(typeof owner.signTransaction === "function", 'should have signTransaction')
  const toSignPromises = unsignedTxs.map(tx => owner.signTransaction(tx))
  signedTxs = await Promise.all(toSignPromises)

  const serializedSignedTxs = signedTxs.map((tx:any) => tx.rawTransaction) // wrong typing here

  const receipts = await sendSigned(serializedSignedTxs)
  console.log("Sent: " + receipts.length + " tx")

  return receipts
}

async function sendSigned(serializedSignedTxs:string[]) {
  const sendTxsPromises = serializedSignedTxs
    .map(tx => web3.eth.sendSignedTransaction(tx))
  const receipts = await Promise.all(sendTxsPromises)
  return receipts
}

if (!module.parent) {
  const recipient = process.argv[2]
  const amount = parseInt(process.argv[3], 10)
  console.log("To ", recipient)
  const txFiles = <TokenOrderItem[]>[
    { amount,
      recipient,
      stripeChargeId: `ch_${new Date().getTime()}`},
  ]
  processView(txFiles)
    .then((results) => console.log(results),
      (err:Error) => console.error(err.toString()))
}
