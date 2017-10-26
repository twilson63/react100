const puppeteer = require('puppeteer')

const problem = `
## Adding some style with css

The whole purpose of webpack is to take in html, js, and css and then
output production effcient html, js, and css. To leverage this benefit,
we can also import our css modules just like we import our javascript
modules. Using the import statement and providing it a css file.

For example, lets say we had a css file index.css that had this css in it:

    .red {
      color: red;
    }
    .pa4 {
      padding: 120px;
    }

Then we could do the following in our index.js file

    import './index.css'

and we can use these classes in our component

    function MyComponent (props) {
      return (
        <div className="pa4 red">{props.title}</div>
      )
    }

but, we have to get webpack to handle the css loading and do the right
thing.

Lets install the required loaders to get our css to load properly.

    yarn add style-loader css-loader postcss-loader postcss-flexbugs-fixes autoprefixer --dev

Modify the webpack.config.js file to look like this:

    /*
        ./webpack.config.js
    */
    const path = require('path')
    const autoprefixer = require('autoprefixer')
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
          { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
          {
            test: /\.css$/,
            use: [
              require.resolve('style-loader'),
              {
                loader: require.resolve('css-loader'),
                options: {
                  importLoaders: 1
                }
              },
              {
                loader: require.resolve('postcss-loader'),
                options: {
                  // Necessary for external CSS imports to work
                  // https://github.com/facebookincubator/create-react-app/issues/2677
                  ident: 'postcss',
                  plugins: () => [
                    require('postcss-flexbugs-fixes'),
                    autoprefixer({
                      browsers: [
                        '>1%',
                        'last 4 versions',
                        'Firefox ESR',
                        'not ie < 9' // React doesn't support IE8 anyway
                      ],
                      flexbox: 'no-2009'
                    })
                  ]
                }
              }
            ]
          }
        ]
      },
      plugins: [HtmlWebpackPluginConfig]
    }

You will notice the style-loader is quite complicated, we are specifying
the browsers we support.

Challenge:

Now that you have your css loader setup, try to import the index.css
file and modify your component to contain a red and pa4 class attributes.

> What is this className, I thought the attribute to set classes was just
class in html. An you are right, but class is also a keyword in js, so the
React peeps went with className which is the actual property in html that
gets set.

When you have your component showing red and contains padding, verify
your app.

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
      return document.querySelector('div > div').className
    })
    if (output === 'pa4 red') {
      cb(true)
    } else {
      cb(false)
    }

    await browser.close()
  })()
}
