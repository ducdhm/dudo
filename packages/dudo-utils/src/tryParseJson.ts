export default function tryParseJson(value: any): object | null {
    try {
        return JSON.parse(value);
    } catch (e) {
        return null;
    }
};
