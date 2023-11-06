#!/usr/bin/env node

import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { globSync } from 'glob'
import * as fs from 'fs'
import * as path from 'path'


(() => {
  const argv = yargs(hideBin(process.argv)).argv
  const jsonFiles = globSync(argv.input || '**.json', { ignore: argv.ignore })
  const result = {}
  let adIdList = []

  for (let file of jsonFiles) {
    const filePath = path.join(process.cwd(), file)
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const fileJson = JSON.parse(fileContent)
    adIdList = [
      ...adIdList,
      ...fileJson.results.map(item => {
        return item.adGroupAd.ad.id
      }),
    ]
    result[file] = fileJson
  }

  const duplicatedIdList = adIdList.filter((item, index) => adIdList.indexOf(item) !== index)

  console.log('Duplicated ad: ', duplicatedIdList)

  fs.writeFileSync(
    path.join(process.cwd(), argv.output || 'merged.json'),
    JSON.stringify(result, null, 'prettify' in argv ? 2 : null),
    'utf-8',
  )

})()


