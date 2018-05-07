import * as Stripe from 'stripe'
import IEvent = Stripe.events.IEvent
import ICharge = Stripe.charges.ICharge
import { IObject } from 'stripe'
import { processView, TokenOrderItem } from './mint-contract-lib.js'
import { IncomingMessage } from 'http'

type stripeEvent = 'charge.captured' | 'charge.succeeded'
interface handlerFunction { (body: IEvent): void }

export function mint (req:IncomingMessage, res:any) {
  const body = ((req as any).body || {}) as IEvent

  console.log(req.method +" "+ req.url)

  const handlers = new Map<stripeEvent, handlerFunction>()
  handlers.set("charge.succeeded", handleChargeSucceeded)

  if (body.type) {
    console.log(`'${body.type}' to be handled..`)
  }
  const handler = handlers.get(body.type as any)
  if (handler) {
    handler(body)
  }
  else {
    console.log(`'${body.type}' didn't match any of ${Array.from(handlers.keys()).join(', ')}`)
  }

  res
    .status(204)
    .send('')
}

function handleChargeSucceeded (event: IEvent) {
  const charge:ICharge = validateCharge(event)
  if (charge) {
    const recipient:string = charge.metadata.recipient
    const amount:number = charge.amount
    const txFiles = <TokenOrderItem[]>[
      { amount,
        recipient,
        stripeChargeId: charge.id},
    ]
    processView(txFiles)
      .then((results) => console.log(results))
      .catch((err:Error) => console.error(err.toString()))
  }
}

function validateCharge (event:IEvent):ICharge|undefined {
  const eventData = event.data.object as IObject
  if (eventData.object === "charge") {
    const charge:ICharge = eventData as any // is safe when data.object.object === "charge"
    // console.log('charge body:')
    // console.log(charge)
    const recipient:string|undefined = charge.metadata.recipient
    if (recipient) {
      console.log('valid charge! recipient '+ recipient)
      return charge
    }
    else {
      console.log("Problem: missing 'recipient' in meta data")
    }
  }
  else {
    console.log("Problem: data.object.object was not 'charge' - what to do?")
  }
}