import { LightningElement, track } from 'lwc';

export default class EmployeeCard extends LightningElement {
    fullName = 'Nandu';
    age = 25;
    isEmployee = true;

    @track details = {
        department: 'Salesforce',
        location: 'India'
    };

    changeLocation(event) {
    this.details.location = event.target.value;
}

    userList = ['User A', 'User B', 'User C'];

    title = 'Salesforce Developer';

    getName() {
        console.log('Getting employee name');
    }

    changeHandler(event) {
        this.title = event.target.value;
    }
}