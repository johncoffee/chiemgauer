import { getAmountCents, sendToken } from './main.js'

function onStripeLoaded (StripeCheckout:any) {
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

document.querySelector('[src="https://checkout.stripe.com/checkout.js"]').addEventListener('load', () => window.dispatchEvent(new CustomEvent(STRIPE_LOAD)), {once: true})

const STRIPE_LOAD = 'STRIPE_LOAD'

window.addEventListener(STRIPE_LOAD, () => {
  const stripeCheckout = (window as any).StripeCheckout
  console.assert(!!stripeCheckout, 'StripeCheckout should be defined')
  onStripeLoaded(stripeCheckout)
}, {once: true})