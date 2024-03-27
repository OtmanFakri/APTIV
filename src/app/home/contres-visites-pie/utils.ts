export const Utils = {
  numbers(cfg: any): number[] {
    const { count, min, max } = cfg;
    const numbers = [];
    for (let i = 0; i < count; ++i) {
      numbers.push(this.rand(min, max));
    }
    return numbers;
  },

  rand(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  months(cfg: any): string[] {
    const { count } = cfg;
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return months.slice(0, count);
  },

  transparentize(color: string, opacity: number): string {
    const alpha = opacity === undefined ? 0.5 : 1 - opacity;
    return color.replace(')', `, ${alpha})`).replace('rgb', 'rgba');
  },

  CHART_COLORS: {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)'
  },

  namedColor(index: number): string {
    const keys = Object.keys(this.CHART_COLORS);
    // @ts-ignore
    return this.CHART_COLORS[keys[index % keys.length]];
  }
};
