
export const stringToDate = (
    value: string,
    formart: string,
    delimitter: string
): Date => {
    try {
        formart = formart.toLowerCase();
        const formatItens = formart.split(delimitter);
        const dateItens = value.split(delimitter);

        const monthIndex = formatItens.indexOf('mm');
        const dayIndex = formatItens.indexOf('dd');
        const yearIndex = formatItens.indexOf('yyyy');

        let month = parseInt(dateItens[monthIndex]);
        month -= 1;
        const year = parseInt(dateItens[yearIndex]);
        const day = parseInt(dateItens[dayIndex]);

        return new Date(year, month, day);
    } catch (error) {
        throw `An error occurred while trying to convert the date: ${error}`;
    }
}

export const stringToFloat = (value: string): number  => {
    value = value.replace('R$', '').trim();
    return parseFloat(value.replace(',', '.'));
}

const dateSafe = (date: Date): Date => {
    if (typeof(date) === 'string') {
        return new Date(date);
    }
    return date;
}

export const dateEquals = (date1: Date, date2: Date): boolean => {
    try {
        date1 = dateSafe(date1);
        date2 = dateSafe(date2);
        
        const date1Only = new Date(date1.getFullYear(), date1.getMonth());
        const date2Only = new Date(date2.getFullYear(), date2.getMonth());

        return date1Only.getTime() === date2Only.getTime();
    } catch (error) {
        console.log(typeof(date1));
        throw `An error occurred while trying to compare dates: ${error}`;
    }
}

export const roundTo = (value: number, decimalPlaces: number): number => {
    const str = value.toFixed(decimalPlaces);
    return parseFloat(str);
}