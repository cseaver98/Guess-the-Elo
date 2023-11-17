export function getEnumValueByIndex(enumObj: any, index: number) {
    const keys = Object.keys(enumObj).filter(k => !isNaN(Number(k)));
    return enumObj[keys[index]];
}
