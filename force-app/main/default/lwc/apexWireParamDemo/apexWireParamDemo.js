import { LightningElement, wire } from 'lwc';
import findAccounts from '@salesforce/apex/AccountSearchController.findAccounts';

export default class ApexWireParamDemo extends LightningElement {
    searchKey = '';

    @wire(findAccounts, { searchKey: '$searchKey' })
    accounts;

    handleChange(event) {
        this.searchKey = event.target.value;
    }
}