const puppeteer = require('puppeteer')
const problem = `
# Webpack Babel Setup

In the hello world example we wanted to demonstrate that react is just
a javascript library. But to really get react working for all browsers,
we need to setup our project to let our tooling handle tasks that we don't
want to deal with.

create a project

  yarn init -y

add react

  yarn add react react-dom

create a public and src directory

  mkdir public src

move index.html to the public directory

  mv index.html public

move index.js to the src directory

  mv index.js src

add webpack to the project

  yarn add webpack webpack-dev-server html-webpack-plugin --dev

add babel to the project

  yarn babel-loader babel-core babel-preset-env babel-preset-react --dev

create a webpack config

  touch webpack.config.js

add the following code to webpack config

    /*
        ./webpack.config.js
    */
    const path = require('path')

    const HtmlWebpackPlugin = require('html-webpack-plugin')
    const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
      inject: 'body'
    })

    module.exports = {
      entry: './src/index.js',
      output: {
        path: path.resolve('dist'),
        filename: 'index_bundle.js'
      },
      module: {
        loaders: [
          { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
          { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ }
        ]
      },
      plugins: [HtmlWebpackPluginConfig]
    }

create a .babelrc file

    touch .babelrc

add the following info

    {
      "presets": [
        "env",
        "react"
      ]
    }

Lets add a script to the package.json file

    "scripts": {
      "start": "webpack-dev-server"
    }

Lets modify the index.html file in the public directory.

    <!doctype html>
    <html>
      <head>
        <title>React Demo</title>
      </head>
      <body>
        <div id="root"></div>
      </body>
    </html>

Lets modify the index.js file in the src directory

    import React from 'react'
    import { render } from 'react-dom'

    render(<h1>Hello World</h1>, document.getElementById('root'))

Ok, now lets run our app:

    yarn start

It should run and start listening on port 8080 and show a Hello World in the browser.

When you get it working to go to verify remember to run

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
      return document.querySelector('h1').innerText
    })
    if (output === 'Hello World') {
      cb(true)
    } else {
      cb(false)
    }

    await browser.close()
  })()

  return `
# Followup

So you just went through several steps to get a react project working,
we needed to setup webpack and babel so that we could transpile you code
for the browser. Babel will not only handle the JSX, but it will also give us access to new
language features and we don't have to worry about them working in
different browsers, babel and webpack will handle that part for us.


  `
}
