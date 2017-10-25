const puppeteer = require('puppeteer')

const problem = `
# Props

We can pass data to our components using the properties or attributes
of our JSX markup syntax.

In React, we just call these props.

For Example, in our MyComponent, lets pass a title, we can do this
by creating a property called title.

    <MyComponent title="Hello World" />

No that we are passing a prop, we can use a javascript expression
to display the value of the title prop in our component.

    function MyComponent (props) {
      return (
        <div>{props.title}</div>
      )
    }

This will create a div element with the innerText set to the value of the
title property.

    <div>Hello World</div>

Challenge:

In this challenge, modify your component to receive a prop called title
and then pass the value "Hello World" as a prop in your render call.

Then run

    react100 verify

To confirm

> Make sure your webserver is still running...

    yarn start



`

module.exports = function() {
  return {
    problem,
    verify
  }
}

function verify() {
  ;(async () => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto('http://localhost:8080')
    const output = await page.evaluate(() => {
      return document.querySelector('div > div').innerText
    })
    if (output === 'Hello World') {
      cb(true)
    } else {
      cb(false)
    }

    await browser.close()
  })()
}
