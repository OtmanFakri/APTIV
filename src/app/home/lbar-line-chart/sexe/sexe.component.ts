import {Component, OnInit} from '@angular/core';
import Chart from "chart.js/auto";


@Component({
  selector: 'app-sexe',
  standalone: true,
  imports: [],
  templateUrl: './sexe.component.html',
})
export class SexeComponent implements OnInit {
    ngOnInit(): void {
        const labels = ['Male', 'Female'];

        const data = {
            labels: labels,
            datasets: [
                {
                    label: 'Certificates Nbr',
                    data: [1, 10],
                    backgroundColor: this.transparentize('#FF5733', 0.5), // orange
                    borderWidth: 2,
                    borderRadius: 10,  // Bar chart border radius
                    borderSkipped: false,
                },
                {
                    label: 'Average Headcount',
                    data: [2, 3],
                    backgroundColor: this.transparentize('#3399FF', 0.5), // light blue
                    borderWidth: 2,
                    borderRadius: 10,  // Bar chart border radius
                    borderSkipped: false,
                },
                {
                    label: 'Certificate Rate',
                    data: [10, 20],
                    backgroundColor: this.transparentize('#33FF57', 0.5), // light green
                    borderWidth: 2,
                    borderRadius: 10,  // Bar chart border radius
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
                        beginAtZero: true,
                        stacked: true,
                    },
                    y: {
                        stacked: true,
                    }
                }
            },
        };

        // @ts-ignore
        const barChart = new Chart('barChart2', config);
    }
    transparentize(color: string, opacity: number): string {
        const alpha = opacity * 255;
        return `rgba(${this.hexToRgb(color)}, ${alpha})`;
    }

    hexToRgb(hex: string): string {
        const bigint = parseInt(hex.replace('#', ''), 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;
        return `${r}, ${g}, ${b}`;
    }
}
