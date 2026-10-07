import { LightningElement, api } from 'lwc';

export default class DataReceiver extends LightningElement {
    @api message;
    @api number;
@api isValid;
@api student;
@api names;
@api employeeList;
}