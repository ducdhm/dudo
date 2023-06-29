import removeTone from './removeTone'
import getUuid from './getUuid'

export default function getUploadFileName(fileName): string {
  let lastDotIndex = fileName.lastIndexOf('.')
  let name = fileName.substring(0, lastDotIndex)
  name = removeTone(name)
  name = name.replace(/[^a-zA-Z0-9_]/g, ' ')
  name = name.trim()
  name = name.replace(/[^a-zA-Z0-9_]/g, '_')
  name = name.replace(/_+/g, '_')
  let extension = fileName.substring(lastDotIndex + 1, fileName.length)

  return `${name}___${getUuid()}.${extension.toLowerCase()}`
}
