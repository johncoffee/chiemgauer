export function getAmountCents (selector:string):number {
  return Math.round( (document.querySelector(selector) as HTMLInputElement).valueAsNumber * 100)
}

function linkCurrencies(selector1:string, selector2:string, exchangeRate:number) {
  const el1 = document.querySelector(selector1) as HTMLInputElement
  const el2 = document.querySelector(selector2) as HTMLInputElement
  console.assert(el1 && el2, `should've found..`,el1, el2)

  const evtHandler1 = () => {
    el2.valueAsNumber = toPrecision(el1.valueAsNumber * exchangeRate, 2)
  }
  const evtHandler2 = () => {
    el1.valueAsNumber = toPrecision(el2.valueAsNumber / exchangeRate, 2)
  }

  el1.addEventListener('keyup', evtHandler1)
  el1.addEventListener('change', evtHandler1)

  el2.addEventListener('keyup', evtHandler2)
  el2.addEventListener('change', evtHandler2)
}

async function withdraw() {
  const amount = getAmountCents(".sell-amount-cmg")
  const recipient = ""
  const url = 'https://us-central1-chiemgauer-203318.cloudfunctions.net/withdraw'
    + `?amount=${amount}&recipient=${recipient}`

  const req = new Request(url, <RequestInit>{
    headers: <HeadersInit>{
      'Content-Type': 'application/json',
    },
    method: 'GET',
    mode: 'cors',
  })
  const res = await fetch(req)
  alert('Withdrawal registered')
}

function toPrecision(value:number, numDecimals = 2):number {
  return Math.round( value * 10 ** numDecimals ) / 10 ** numDecimals
}

window.addEventListener('load', () => {
  linkCurrencies('.buy-amount-token','.buy-amount-dkk', 1)
  linkCurrencies('.sell-amount-token','.sell-amount-dkk', 0.95)
}, {once: true})
