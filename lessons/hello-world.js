const puppeteer = require('puppeteer')

const problem = `
# Hello World

React is a javascript library for building user interfaces.

Lets create your first react application.

Create a new folder and create a file called \`index.html\`

In this html file add the following code:

    <!doctype html>
    <html>
      <head>
        <title>Hello World</title>
      </head>
      <body>
        <div id="root" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/react/16.0.0/umd/react.development.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/16.0.0/umd/react-dom.development.js"></script>
        <script src="index.js"></script>
      </body>
    </html>

Create a file called \`index.js\` and type the following code:

    ReactDOM.render(
      React.createElement('h1', null, 'Hello World'),
      document.getElementById('root')
    )


Now that you have these two files, you can install a web-server to run
your react application.

    npm install serve -g

Then run your server

    serve .

This should start your web server on http://localhost:5000

To verify your application

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
    await page.goto('http://localhost:5000')
    const output = await page.evaluate(() => {
      return document.querySelector('div').innerText
    })
    if (output === 'Hello World') {
      cb(true)
    } else {
      cb(false)
    }

    await browser.close()
  })()
}
