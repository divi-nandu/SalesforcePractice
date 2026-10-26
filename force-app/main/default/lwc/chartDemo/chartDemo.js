import { LightningElement, api } from 'lwc';
import { loadScript } from 'lightning/platformResourceLoader';
import ChartJS from '@salesforce/resourceUrl/ChartJS';

export default class ChartDemo extends LightningElement {
    chart;
    chartLoaded = false;

    _chartData = [
    { label: 'January', value: 12000 },
    { label: 'February', value: 18500 },
    { label: 'March', value: 15000 },
    { label: 'April', value: 22000 },
    { label: 'May', value: 27500 },
    { label: 'June', value: 24000 }
];

    @api
    get chartData() {
        return this._chartData;
    }

    set chartData(data) {
        this._chartData = [...data];
    }

    renderedCallback() {
        if (this.chartLoaded) {
            return;
        }

        this.chartLoaded = true;

        loadScript(this, ChartJS)
            .then(() => {
                this.createChart();
            })
            .catch(error => {
                this.chartLoaded = false;
                console.error('Chart.js failed to load:', error);
            });
    }

    createChart() {
        const canvas = this.template.querySelector('canvas');

        if (!canvas || !window.Chart) {
            console.error('Canvas or Chart.js is unavailable.');
            return;
        }

        if (this.chart) {
            this.chart.destroy();
        }

        this.chart = new window.Chart(canvas, {
            type: 'bar',
            data: {
                labels: this.chartData.map(item => item.label),
                datasets: [
                    {
                        label: 'Monthly Sales (₹)',
                        data: this.chartData.map(item => item.value)
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
    beginAtZero: true,
    title: {
        display: true,
        text: 'Sales Amount (₹)'
    }
}
                }
            }
        });
    }

    disconnectedCallback() {
        if (this.chart) {
            this.chart.destroy();
            this.chart = undefined;
        }
    }
}