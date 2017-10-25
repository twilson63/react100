const puppeteer = require('puppeteer')

const problem = `
# First Component

Congrats for making it this far, now we can start to have some fun!

Lets create our first component!

A react stateless component is just a function that takes props and
returns a component. The function name is capitalized, this is how
react knows it is a react component.

    function MyComponent (props) {
      return (
        <div>My Component</div>
      )
    }

And you render this component just like you would render an
h1, or p element.

  render(
    <MyComponent />,
    document.getElementById('root')
  )

---

Challenge:

Modify the index.js file and create a component like the example above
called MyComponent, then replace the current render code with the code
above.

run

    react100 verify

To check your work.
`

module.exports = function() {
  return {
    problem,
    verify
  }
}

function _if(cond, success, failure) {
  return cond ? success() : failure()
}

function verify() {
  ;(async () => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto('http://localhost:8080')
    const output = await page.evaluate(() => {
      return document.querySelector('div').innerText
    })

    _if(output === 'My Component', () => cb(true), () => cb(false))

    await browser.close()
  })()
}
