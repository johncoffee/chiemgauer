import { getAmountCents } from './main.js'

function sendToken (token, amount, recipient) {
  const url = 'https://us-central1-chiemgauer-203318.cloudfunctions.net/charge'
    + `?token=${token}&amount=${amount}&recipient=${recipient}`

  const req = new Request(url, <RequestInit>{
    headers: <HeadersInit>{
      'Content-Type': 'application/json',
    },
    method: 'GET',
    mode: 'cors',
  })
  fetch(req)
    .then(() => alert('OK! Expect the tokens to arrive within a few minutes.'))
    .catch((err) => {
      console.error(err)
      alert('Error sending token request.')
    })
}

export function onStripeLoaded (StripeCheckout:any) {
  const handler = StripeCheckout.configure({
    key: 'pk_test_wbX0FkGoH0wY8QajKTihIjw8',
    image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
    locale: 'auto',
    token: function (token) {
      const amount = getAmountCents('.buy-amount-token')
      // post this to a cloud function
      const recipient = document.querySelector('.token-recipient').getAttribute('value')
      const debugString = `${token.id} ${amount} ${recipient}`
      console.debug(debugString)
      // document.querySelector('.debug').textContent = debugString
      sendToken(token.id, amount, recipient)
    }
  })

  console.debug(document.querySelector('.token-button'))
  document.querySelector('.token-button').addEventListener('click', (e) => {
    // Open Checkout with further options:
    const amount = getAmountCents('.buy-amount-dkk')
    handler.open({
      name: 'Buy tokens',
      description: 'some tokens',
      currency: 'dkk',
      allowRememberMe: false,
      amount,
    })
    e.preventDefault()
  })

  // Close Checkout on page navigation:
  window.addEventListener('popstate',  () => handler.close())
}

const STRIPE_LOAD = 'STRIPE_LOAD'

console.debug('1. subscribed to ' + STRIPE_LOAD)
window.addEventListener(STRIPE_LOAD, () => {
  const stripeCheckout = (window as any).StripeCheckout
  console.assert(!!stripeCheckout, 'StripeCheckout should be defined')
  onStripeLoaded(stripeCheckout)
}, {once: true})