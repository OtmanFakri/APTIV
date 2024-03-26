import Chart from 'chart.js/auto';

export const CHART_COLORS = {
  red: 'rgb(255, 99, 132)',
  blue: 'rgb(54, 162, 235)'
};

export function transparentize(color: string, opacity: number): string {
  const alpha = opacity === undefined ? 0.5 : 1 - opacity;
  const rgb = color.substring(4, color.length - 1)
    .replace(/ /g, '')
    .split(',');

  return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${alpha})`;
}

export function months(config: { count: number }): string[] {
  const now = new Date();
  return Array.from({ length: config.count }, (_, i) => {
    const month = now.getMonth() + i;
    return new Date(now.setMonth(month)).toLocaleString('default', { month: 'short' });
  });
}

export function data(config: { count: number, min: number, max: number }): number[] {
  return Array.from({ length: config.count }, () => rand(config.min, config.max));
}

export function rand(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

