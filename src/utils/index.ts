export function numberFormat(number:string) {
    if (number) {
        let val2 = number.toString().replace(/[^۰۱۲۳۴۵۶۷۸۹0-9]/g, "");
        let num = parseFloat(val2);

        if (isNaN(num)) return number;

        const suffixes = ["", "K", "M", "B", "T"];
        let suffixIndex = 0;

        while (num >= 1000 && suffixIndex < suffixes.length - 1) {
            num /= 1000;
            suffixIndex++;
        }

        let formattedNumber = num.toFixed(1);

        if (formattedNumber.endsWith('.0')) {
            formattedNumber = formattedNumber.slice(0, -2);
        }

        return formattedNumber + suffixes[suffixIndex];
    }
    return number;
}
