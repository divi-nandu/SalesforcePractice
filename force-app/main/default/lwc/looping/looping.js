import { LightningElement } from 'lwc';

export default class Looping extends LightningElement {
    cars = ['Ford', 'BMW', 'Maruti', 'Mercedes'];

    employees = [
        {
            id: 1,
            name: 'Nandu',
            department: 'Salesforce'
        },
        {
            id: 2,
            name: 'John',
            department: 'Development'
        },
        {
            id: 3,
            name: 'Smith',
            department: 'Testing'
        }
    ];
}