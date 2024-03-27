import { Component } from '@angular/core';
import Chart from "chart.js/auto";
import {transparentizeColor} from "./utils";

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [],
  templateUrl: './category.component.html',
})
export class CategoryComponent {
    ngOnInit(): void {
        const labels = ['DH', 'IH', 'IS', 'Total'];

        const data = {
            labels: labels,
            datasets: [
                {
                    label: 'Certificates Nbr',
                    data: [1, 10, 12, 32],
                    backgroundColor: this.transparentize('red', 0.5),
                    borderWidth: 2,
                    borderRadius: Number.MAX_VALUE,
                    borderSkipped: false,
                },
                {
                    label: 'Illness days nbr',
                    data: [10, 10, 12, 10],
                    backgroundColor: this.transparentize('blue', 0.5),
                    borderWidth: 2,
                    borderRadius: 5,
                    borderSkipped: false,
                },
                {
                    label: 'Certificate Rate',
                    data: [0, 20, 50, 50],
                    backgroundColor: this.transparentize('green', 0.5),
                    borderWidth: 2,
                    borderRadius: 5,
                    borderSkipped: false,
                }
            ]
        };

        const config = {
            type: 'bar',
            data: data,
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Chart.js Bar Chart for Health Data'
                    }
                },
                scales: {
                    x: {
                        stacked: true,
                    },
                    y: {
                        beginAtZero: true,
                        stacked: true,
                    }
                }
            },
        };

        // @ts-ignore
        const barChart = new Chart('barChart', config);
    }

    transparentize(color: string, opacity: number): string {
        return transparentizeColor(color, opacity);
    }
}
