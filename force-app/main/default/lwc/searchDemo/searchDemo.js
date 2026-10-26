
import { LightningElement } from 'lwc';

export default class SearchDemo extends LightningElement {
    searchText = '';

    employees = [
        { id: '1', name: 'Nandu', department: 'Salesforce' },
        { id: '2', name: 'John', department: 'Development' },
        { id: '3', name: 'Smith', department: 'Testing' },
        { id: '4', name: 'Divi', department: 'Salesforce' },
        { id: '5', name: 'Ravi', department: 'Development' },
        { id: '6', name: 'Priya', department: 'Testing' },
        { id: '7', name: 'Kiran', department: 'Salesforce' },
        { id: '8', name: 'Anu', department: 'Development' }
    ];

    handleSearch(event) {
        this.searchText = event.target.value;
    }

    get filteredEmployees() {
        const searchKey = this.searchText.trim().toLowerCase();

        if (!searchKey) {
            return this.employees;
        }

        return this.employees.filter(employee =>
            employee.name.toLowerCase().includes(searchKey) ||
            employee.department.toLowerCase().includes(searchKey)
        );
    }

    get noEmployeesFound() {
        return this.filteredEmployees.length === 0;
    }
}
