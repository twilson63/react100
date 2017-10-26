const puppeteer = require('puppeteer')
const problem = `
# Wish List Example

In this example, we are going to provide an exercise for
a controlled component. A controlled component in react
means basically you capture an onChange event via registering
a function for that prop and you set the value prop whenever
a new state is updated.

Here is an example of a controlled input component.

    <input
      value={this.state.wish}
      onChange={e => this.setState({wish: e.target.value})}
    />

The value prop reads from the state and the onChange prop sets the
state. This will trigger a change event every time a new character is
typed in the input.

    import React from 'react'

    function WishList(props, context) {
      const instance = new React.Component(props, context)

      instance.state = {
        wish: '',
        list: []
      }

      instance.render = function() {
        const li = wish => <li key={wish}>{wish}</li>
        return (
          <div>
            <h1>Wish List</h1>
            <input
              placeholder="Make a Wish"
              value={this.state.wish}
              onChange={e => this.setState({ wish: e.target.value })}
            />
            <button
              id="add-wish"
              onClick={e =>
                this.setState({
                  list: this.state.list.concat([this.state.wish]),
                  wish: ''
                })}
            >
              Add Wish
            </button>
            <hr />
            <ul>{this.state.list.map(li)}</ul>
          </div>
        )
      }
      return instance
    }

    export default WishList


Now add this component to the index.js file

and run verify when ready

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
      document.querySelector('input').value = 'FooBar'
      document.querySelector('button#add-wish').click()

      return document.querySelector('ul').children
    })
    if (output === 1) {
      cb(true)
    } else {
      cb(false)
    }

    await browser.close()
  })()
}
