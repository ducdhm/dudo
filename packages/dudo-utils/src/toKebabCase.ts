export default function toKebabCase(value: string): string {
  if (!value) {
    return ''
  }

  return value
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map(x => x.toLowerCase())
    .join('-')
};
