const fs = require('fs')
const path = require('path')

const getPackageListText = (folderName) => {
  const packageFolderPath = path.join(__dirname, '../' + folderName)
  const packageFolderList = fs.readdirSync(packageFolderPath)
  let result = ''
  for (let folder of packageFolderList) {
    const packagePath = path.join(packageFolderPath, folder, 'package.json')
    const packageData = require(packagePath)
    const isTypeScript = packageData.devDependencies && !!packageData.devDependencies.typescript

    result += `* [${packageData.name}](./${folderName}/${folder}): ${packageData.description}${isTypeScript ? ' (TypeScript)' : ''}\n`
  }

  return result
}

const packageListText = getPackageListText('packages')
const deprecatedListText = getPackageListText('deprecated')

fs.writeFileSync(
  path.join(__dirname, '../README.md'),
  [
    '# DudoJS',
    'Stack of awesome!',
    '',
    '',
    '## Packages',
    packageListText,
    '',
    '## DEPRECATED',
    deprecatedListText,
    '',
    '## License',
    'Please read at [here](./LICENSE.md)',
    '',
  ].join('\n'),
  'utf8',
)
