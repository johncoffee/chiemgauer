import * as Stripe from 'stripe'

export async function processPurchase (stripeToken:string, amount:number, currency:string,  recipient:string) {
  if (!(stripeToken && amount > 0 && recipient)) {
    console.error(`error input: ${stripeToken} ${amount} ${recipient}`)
  }

  const secretKey = 'sk_test_IHsoFJyusYHmGjOFX98X20Oz'
  const stripe = new Stripe(secretKey)

  const metadata = {
    recipient
  }

  try {
    const charge = await stripe.charges.create({
      source: stripeToken,
      amount,
      currency,
      metadata,
    })
    console.log(charge)
    return charge.id
  }
  catch (e) {
    console.log(e)
    throw new Error(e.toString())
  }
}

if (!module.parent) {
  const stripeToken = process.argv[2]
  const amount = parseInt(process.argv[3], 10)
  const recipient = process.argv[4]

  processPurchase(stripeToken,
    amount,
    "dkk",
    recipient).then(results => {
    console.log(`${recipient} ${amount}`)
  })
  .catch(console.error)
}
