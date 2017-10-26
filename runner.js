#!/usr/bin/env node

const adventure = require('adventure')
const shop = adventure('react100')

shop.add('Hello World', require('./lessons/hello-world'))
shop.add('Setup', require('./lessons/webpack-babel-setup'))
shop.add('JSX', require('./lessons/jsx'))
shop.add('First Component', require('./lessons/first-component'))
shop.add('Add some style', require('./lessons/css-loaders'))
shop.add('Props', require('./lessons/props'))
shop.add('Clock', require('./lessons/clock'))
shop.add('Counter', require('./lessons/counter'))
shop.add('Wish List', require('./lessons/wish-list'))

shop.execute(process.argv.slice(2))
