const puppeteer = require('puppeteer')
const problem = `
#JSX

JSX is a different way to invoke a function that always returns a
react component. This syntax sugar makes your component render code
look very similar to html. This provides a nice declarative way to
create presentation code without having to introduce a template language.

    render(
      <div style={{padding: '120px'}}>
        <h1>Hello World</h1>
      </div>,
      document.getElementById('root')
    )

> WARNING: If you are a seasoned developer you will have a very icky feeling
about the above code at first. I know I did, it took me years to get over
this feeling. It just does not seem right mixing a declarative markup inside
your javascript code. But once you start using it and working with it, you
will find it to be very productive. Also, if you really don't like it and
don't think you need the tooling support of a webpack and prefer to write
your js in es5, you can still use react. But the purpose of this tutorial
is to show you the common way to leverage the react ecosystem.

JSX basically gives you a way to invoke React components in a declarative
markup.

Challenge:

In your index.js file, in the render function call add a list of
three colors.

    <ul>
      <li>Red</li>
      <li>Green</li>
      <li>Blue</li>
    </ul>

Be sure to wrap them in a div element.

When you think you got your list of colors working, run your
server if it is not already running

    yarn start

Then go to localhost:8080 to visually confirm. and this verify

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
      return document.querySelector('ul').children.length
    })
    if (output === 3) {
      cb(true)
    } else {
      cb(false)
    }

    await browser.close()
  })()
}
