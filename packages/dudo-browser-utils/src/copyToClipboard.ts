const fallbackCopyTextToClipboard = (text: string, onSuccess: Function, onError?: Function) => {
  const textArea = document.createElement('textarea')
  textArea.value = text

  // Avoid scrolling to bottom
  textArea.style.top = '0'
  textArea.style.left = '0'
  textArea.style.position = 'fixed'

  document.body.appendChild(textArea)
  textArea.focus()
  textArea.select()

  try {
    document.execCommand('copy') ? onSuccess() : onError()
  } catch (error) {
    onError(error)
  }

  document.body.removeChild(textArea)
}

export default function copyToClipboard(text: string, onSuccess: Function, onError?: Function) {
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text, onSuccess, onError)
    return
  }

  navigator.clipboard.writeText(text).then(function () {
    onSuccess()
  }, function (error) {
    onError(error)
  })
};
