#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const yargs = require('yargs')
const { hideBin } = require('yargs/helpers')
const { globSync } = require('glob')

;(() => {
  const argv = yargs(hideBin(process.argv)).argv
  const jsonFiles = globSync(argv.input || '**.json', { ignore: argv.ignore })
  const result = {}

  for (let file of jsonFiles) {
    const filePath = path.join(process.cwd(), file)
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    result[file] = JSON.parse(fileContent)
  }

  fs.writeFileSync(
    path.join(process.cwd(), argv.output || 'merged.json'),
    JSON.stringify(result, null, 'prettify' in argv ? 2 : null),
    'utf-8',
  )

})()


