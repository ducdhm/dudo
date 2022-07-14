export default function isValidJsonString (data: string): boolean {
    try {
        JSON.parse(data);
    } catch (e) {
        return false;
    }
    
    return true;
};
