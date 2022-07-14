export default function normalizeSpace(value): string {
    return value.replace(/\s*([^\s]+\s?)\s*/g, '$1');
}
