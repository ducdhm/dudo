export default function toPascalCase(value: string): string {
    if (!value) {
        return '';
    }
    
    return value
        .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
            .map(x => x.charAt(0).toUpperCase() + x.substr(1).toLowerCase())
            .join('');
};
