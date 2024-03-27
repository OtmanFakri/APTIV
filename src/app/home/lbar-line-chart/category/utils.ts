export function transparentizeColor(color: string, opacity: number): string {
    const colorRgb = hexToRgb(color);
    if (!colorRgb) {
        return color;
    }
    return `rgba(${colorRgb.r}, ${colorRgb.g}, ${colorRgb.b}, ${opacity})`;
}

export function hexToRgb(hex: string): { r: number, g: number, b: number } | null {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

export function generateMonths(options: any): string[] {
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return monthNames.slice(0, options.count);
}

export function generateNumbersList(options: any): number[] {
    const numbers = [];
    for (let i = 0; i < options.count; i++) {
        numbers.push(Math.floor(Math.random() * 100));
    }
    return numbers;
}
