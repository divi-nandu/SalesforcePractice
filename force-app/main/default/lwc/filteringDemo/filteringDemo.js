
import { LightningElement } from 'lwc';

export default class FilteringDemo extends LightningElement {
    selectedDepartment = 'All';

    employees = [
        { id: '1', name: 'Nandu', department: 'Salesforce' },
        { id: '2', name: 'John', department: 'Development' },
        { id: '3', name: 'Smith', department: 'Testing' },
        { id: '4', name: 'Divi', department: 'Salesforce' }
    ];

    departmentOptions = [
        { label: 'All Departments', value: 'All' },
        { label: 'Salesforce', value: 'Salesforce' },
        { label: 'Development', value: 'Development' },
        { label: 'Testing', value: 'Testing' }
    ];

    get filteredEmployees() {
        if (this.selectedDepartment === 'All') {
            return this.employees;
        }

        return this.employees.filter(
            employee =>
                employee.department === this.selectedDepartment
        );
    }

    get noEmployeesFound() {
        return this.filteredEmployees.length === 0;
    }

    handleDepartmentChange(event) {
        this.selectedDepartment = event.detail.value;
    }
}
