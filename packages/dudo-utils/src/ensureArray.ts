export default function ensureArray(value: any): Array<any> {
    if (!Array.isArray(value)) {
        return value ? [value] : [];
    }
    
    return value;
};
