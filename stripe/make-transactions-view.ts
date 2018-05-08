import ICharge = Stripe.charges.ICharge
import * as Stripe from 'stripe'

interface Charge extends Partial<ICharge> {
  id: string,
  value: number
}

export type View = {
  [key: string]: Charge
}

export async function makeTransactionsList ():Promise<View> {
  const secretKey = 'sk_test_IHsoFJyusYHmGjOFX98X20Oz'
  const stripe = new Stripe(secretKey)

  const list = await stripe.charges.list({limit: 50}) // TODO pagination
  if (list.data.length >= 50) {
    throw new Error(`Pagination is needed!`)
  }

  const newList = list.data
    .filter(charge => charge.paid === true)
    .map(charge => {
    return <Charge>{
      id: charge.id,
      amount: charge.amount,
    }
  })

  const result:View = newList.reduce((prev, nextValue) => {
    prev[nextValue.id] = nextValue
    return prev
  }, <View>{})

  return result
}

if (!module.parent) {
  makeTransactionsList().then(results => {
    // list all values:
    Object.values(results)
      .map(item => JSON.stringify(item))
      .map(item => item + '\n')
      .forEach(item => process.stdout.write(item))
  })
  .catch(console.error)
}
