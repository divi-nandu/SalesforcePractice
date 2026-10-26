
import { LightningElement } from 'lwc';

export default class SortingDemo extends LightningElement {
    sortOrder = 'ascending';

    employees = [
        { id: '1', name: 'Nandu', department: 'Salesforce' },
        { id: '2', name: 'John', department: 'Development' },
        { id: '3', name: 'Smith', department: 'Testing' },
        { id: '4', name: 'Divi', department: 'Salesforce' }
    ];

    sortOptions = [
        { label: 'Name: A to Z', value: 'ascending' },
        { label: 'Name: Z to A', value: 'descending' }
    ];

    get sortedEmployees() {
        return [...this.employees].sort((a, b) => {
            const result = a.name.localeCompare(b.name);

            return this.sortOrder === 'ascending'
                ? result
                : -result;
        });
    }

    handleSortChange(event) {
        this.sortOrder = event.detail.value;
    }
}
