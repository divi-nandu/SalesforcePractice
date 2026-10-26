
import { LightningElement, wire } from 'lwc';
import getContacts from '@salesforce/apex/CsvExportController.getContacts';

const COLUMNS = [
    { label: 'First Name', fieldName: 'FirstName' },
    { label: 'Last Name', fieldName: 'LastName' },
    { label: 'Email', fieldName: 'Email' },
    { label: 'Department', fieldName: 'Department' }
];

export default class CsvExportDemo extends LightningElement {
    contacts = [];
    columns = COLUMNS;
    errorMessage = '';

    @wire(getContacts)
    wiredContacts({ data, error }) {
        if (data) {
            this.contacts = data;
            this.errorMessage = '';
        } else if (error) {
            this.contacts = [];
            this.errorMessage =
                'Unable to load Contacts. Check Apex deployment and permissions.';
            console.error('Contact loading error:', error);
        }
    }

    get isDownloadDisabled() {
        return !this.contacts || this.contacts.length === 0;
    }

    escapeCsv(value) {
        const text = value == null ? '' : String(value);
        return '"' + text.replace(/"/g, '""') + '"';
    }

    handleDownload() {
        if (!this.contacts || this.contacts.length === 0) {
            this.errorMessage = 'No Contact records available to export.';
            return;
        }

        const headers = [
            'First Name',
            'Last Name',
            'Email',
            'Department'
        ];

        const rows = this.contacts.map(contact => [
            contact.FirstName,
            contact.LastName,
            contact.Email,
            contact.Department
        ]);

        const csvContent = [
            headers.map(value => this.escapeCsv(value)).join(','),
            ...rows.map(row =>
                row.map(value => this.escapeCsv(value)).join(',')
            )
        ].join('\r\n');

        const dataUrl =
            'data:text/csv;charset=utf-8,' +
            encodeURIComponent('\uFEFF' + csvContent);

        const container =
            this.template.querySelector('.download-container');

        if (!container) {
            this.errorMessage = 'Download area is unavailable.';
            return;
        }

        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = 'Contacts.csv';
        link.textContent = 'Click here if the download does not start';
        link.className = 'slds-m-left_small';

        container.appendChild(link);

        link.click();

        this.errorMessage = '';
    }
}
