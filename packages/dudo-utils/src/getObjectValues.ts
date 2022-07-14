export default function getObjectValues(obj: object, propName?: string): Array<any> {
    let values = Object.values(obj);
    
    return propName ? values.map(value => value[propName]) : values;
};
