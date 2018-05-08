import { processPurchase } from './process-purchase.js'
import { IncomingMessage } from 'http'
import { parse } from 'url'

export function charge (req:IncomingMessage, res:any) {
  res.set("Access-Control-Allow-Origin", "*")
  res.set("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS, POST")
  res.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  res.set("Access-Control-Max-Age", "1296000")

  console.log(`url:` + req.url)

  if (req.method === 'GET') {
    const parsed = parse(req.url,true).query
    const stripeToken:string = parsed.token
    const amount:number = parseInt(parsed.amount, 10)
    const recipient:string = parsed.recipient

    if (stripeToken && amount > 0 && recipient) {
      try {
        handleCharge(stripeToken,
          amount,
          recipient)
      }
      catch (e) {
        return res.status(500).send(e.toString())
      }
    }
    else {
      console.log("NOT enough params to handle charge:")
      console.log( JSON.stringify(parsed,null, 1))
    }
  }

  res.status(200).send("")
}

async function handleCharge(stripeToken:string, amount:number, recipient:string) {
  processPurchase(stripeToken, amount, "dkk", recipient)
}
