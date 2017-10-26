const puppeteer = require('puppeteer')

const problem = `
# Clock Exercise

In this exercise we are going to create a clock component, this
component will use state which will contain the current time, then
we will replace the state with a new time every second. We are going
to us a plain ole javascript pattern to build this component.

challenge:

create a new file in the src directory called clock.js

add the below code to the file.

    import React from 'react'

    function Clock(props, context) {
      const instance = new React.Component(props, context)
      instance.props = props
      instance.context = context

      instance.render = function() {
        return <h1>This will be a clock</h1>
      }

      return instance
    }

    export default Clock

The first think you will notice is the import and export statements at the
beginning and end of the file. We are importing React and exporting our Clock
component.

The next thing you may notice is the Clock function is receiving props and context
this is to pass to our new React Component, which we create using the new syntax.

We assign it to the instance constant and we add props and context to the instance
constant.

The last thing you may notice is the render function, which we add to the instance
object, which is a react component, then we return the component instance.

By defining a component in this way, we are able to easily setup two nodes on
the React Component instance. (state and componentDidMount)

    instance.state = { time: new Date() }

The state property contains an object with a time node, we will assign the current
time to this node.

The componentDidMount function is whats called a lifecycle function, it only gets
called when the component is mounted to the dom.

In this component we will setup our interval function to update state every second

    instance.componentDidMount = function() {
      setInterval(() => this.setState({ time: new Date() }), 1000)
    }

Next, we need to modify the render method to use the state.time node as the
value.

    instance.render = function() {
      return <h1>{this.state.time.toISOString()}</h1>
    }

So our full clock component code base should like this:

    import React from 'react'

    function Clock(props, context) {
      const instance = new React.Component(props, context)
      instance.props = props
      instance.context = context

      instance.componentDidMount = function() {
        setInterval(() => this.setState({ time: new Date() }), 1000)
      }

      instance.state = { time: new Date() }

      instance.render = function() {
        return <h1>{this.state.time.toISOString()}</h1>
      }

      return instance
    }

    export default Clock

The last step is to add it to our component in index.js

    import Clock from './clock'

    function MyComponent(props) {
      return (
        <div className="pa4 red">
          Clock
          <Clock />
        </div>
      )
    }

Let run our web server (if not already running)

    yarn start

And you should have a clock working in your browser updating
every second.

run verify to validate

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
      return document.querySelector('div > div').innerText
    })

    if (output.indexOf(new Date().toISOString().slice(0, 10)) > -1) {
      cb(true)
    } else {
      cb(false)
    }

    await browser.close()
  })()
}
