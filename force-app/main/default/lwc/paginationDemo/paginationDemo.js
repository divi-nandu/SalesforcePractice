
import { LightningElement } from 'lwc';

export default class PaginationDemo extends LightningElement {
    currentPage = 1;
    pageSize = 3;

    employees = [
        { id: '1', name: 'Nandu', department: 'Salesforce' },
        { id: '2', name: 'John', department: 'Development' },
        { id: '3', name: 'Smith', department: 'Testing' },
        { id: '4', name: 'Divi', department: 'Salesforce' },
        { id: '5', name: 'Ravi', department: 'Development' },
        { id: '6', name: 'Priya', department: 'Testing' },
        { id: '7', name: 'Kiran', department: 'Salesforce' },
        { id: '8', name: 'Anu', department: 'Development' },
        { id: '9', name: 'Rahul', department: 'Testing' },
        { id: '10', name: 'Sneha', department: 'Salesforce' }
    ];

    get totalPages() {
        return Math.ceil(this.employees.length / this.pageSize);
    }

    get paginatedEmployees() {
        const startIndex = (this.currentPage - 1) * this.pageSize;
        const endIndex = startIndex + this.pageSize;

        return this.employees.slice(startIndex, endIndex);
    }

    get isFirstPage() {
        return this.currentPage === 1;
    }

    get isLastPage() {
        return this.currentPage === this.totalPages;
    }

    handleNext() {
        if (this.currentPage < this.totalPages) {
            this.currentPage += 1;
        }
    }

    handlePrevious() {
        if (this.currentPage > 1) {
            this.currentPage -= 1;
        }
    }
}
