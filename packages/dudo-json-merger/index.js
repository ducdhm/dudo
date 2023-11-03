#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const yargs = require('yargs')
const { hideBin } = require('yargs/helpers')
const { globSync } = require('glob')
const jsonMerger = require('json-merger')

;(() => {
  const argv = yargs(hideBin(process.argv)).argv
  const jsonFiles = globSync(argv.input, { ignore: argv.ignore })
  const result = jsonMerger.mergeFiles(jsonFiles)

  fs.writeFileSync(
    path.join(process.cwd(), argv.output || 'merged.json'),
    JSON.stringify(result, null, 'pretify' in argv ? 2 : null),
    'utf-8',
  )

})()


