const path = require('path')
const fs = require('fs')
const Handlebars = require('handlebars')
const DEFAULTS = {
  target: '',
  destination: '',
  mode: '',
  prefix: '',
  suffix: '',
  filter: (children) => children,
}

const updateIndex = ({target, destination, mode, prefix, suffix, filter} = DEFAULTS) => {
  let children = fs.readdirSync(target)
  if (typeof filter === 'function') {
    children = filter(children, mode)
  }
  let acceptList = {}

  for (const child of children) {
    const stat = fs.statSync(path.join(target, child))
    const info = path.parse(child)
    const isNotIndexJs = info.ext === '.js' && info.name !== 'index'

    if (
      (!mode && (isNotIndexJs || info.ext === '')) ||
      (mode === 'FILE' && stat.isFile() && isNotIndexJs) ||
      (mode === 'FOLDER' && stat.isDirectory())
    ) {
      const exportKey = (prefix || '') + info.name + (suffix || '')
      const exportPath = ('./' + path.relative(destination, target) + '/')
        .replace(/\\/g, '/')
        .replace(/\/\//g, '/')

      acceptList[exportKey] = exportPath + info.name
    }
  }


  let content = ''
  content += 'module.exports = {\n'
  for (let key in acceptList) {
    content += `    ${key}: require('${acceptList[key]}'),\n`
  }
  content += '}\n'

  fs.writeFileSync(path.join(destination, 'index.js'), content)
}

module.exports = updateIndex
