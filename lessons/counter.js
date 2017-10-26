const puppeteer = require('puppeteer')

const problem = `
# Counter Example

In React you need to be able to handle user generated events like
clicks or inputs, this example we will create a counter component
that allows the user to increment and decrement a counter.

We will use the plain old object pattern here to define our component too.

Lets create a file called counter.js

    import React from 'react'

    function Counter(props, context) {
      const instance = new React.Component(props, context)

      instance.state = { count: 0 }

      instance.render = function() {
        return (
          <div>
            <h1>Counter Example</h1>
            <button id="dec" onClick={e => this.setState({ count: this.state.count - 1 })}>
              decrement
            </button>
            <p>{this.state.count}</p>
            <button id="inc" onClick={e => this.setState({ count: this.state.count + 1 })}>
              increment
            </button>
          </div>
        )
      }
      return instance
    }

    export default Counter

You will notice we are using the onClick prop to handle the click event
and we are modifying the state by using the setState function call.

Lets add this to our index.js file just below our clock example.

    import Counter from './counter'

    function MyComponent(props) {
      return (
        <div className="pa4 red">
          Clock
          <Clock />
          <hr />
          <Counter />
        </div>
      )
    }

make sure your webserver is running and then run verify when you feel you
have it working.

    react100 verify
`

module.exports = function() {
  return {
    problem,
    verify
  }
}

function verify(args, cb) {
  ;(async () => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto('http://localhost:8080')
    const output = await page.evaluate(() => {
      document.querySelector('button#inc').click()
      return document.querySelector('p').innerText
    })
    if (output === '1') {
      cb(true)
    } else {
      cb(false)
    }

    await browser.close()
  })()
}
