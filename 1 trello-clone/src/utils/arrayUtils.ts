interface Item {
    id: string
}

export const findItemIndexById = <T extends Item>(items: T[], id: string) => {
    return items.findIndex((item: T) => item.id === id);
}

export function overrideItemAtIndex<T>(array: T[], newItem: T, targetIndex: number) {
    //ESTA ES LA MANERA QUE SE ME HA OCURRIDO A MI.
    // return [...array.slice(0, targetIndex), newItem, ...array.slice(targetIndex + 1)];

    // /ESTA ES LA MANERA EN LA QUE HACEN EN EL LIBRO
    return array.map((item, index) => {
        if (index !== targetIndex) {
            return item;
        }

        return newItem
    })
}

export function removeItemAtIndex<T>(array: T[], index: number) {
    return [...array.slice(0, index), ...array.slice(index + 1)];
}

export function insertItemAtIndex<T>(array: T[], item: T, index: number) {
    return [...array.slice(0, index), item, ...array.slice(index)]
}