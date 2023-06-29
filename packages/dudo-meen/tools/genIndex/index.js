const path = require('path')

const updateIndex = require('@dudojs/update-index')

updateIndex({
  target: path.join(__dirname, '../../src/modules'),
  destination: path.join(__dirname, '../../src/modules'),
})
