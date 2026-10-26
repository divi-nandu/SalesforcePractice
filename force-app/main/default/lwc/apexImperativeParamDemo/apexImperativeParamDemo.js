import { LightningElement } from 'lwc';
import findAccounts from '@salesforce/apex/AccountImperativeParamController.findAccounts';

export default class ApexImperativeParamDemo extends LightningElement {
    searchKey = '';
    accounts = [];
    errorMessage;
    hasSearched = false;

    handleChange(event) {
        this.searchKey = event.target.value;
    }

    handleSearch() {
        this.hasSearched = true;
        this.errorMessage = undefined;
        this.accounts = [];

        findAccounts({ searchKey: this.searchKey })
            .then(result => {
                this.accounts = result;
            })
            .catch(error => {
                this.errorMessage =
                    error.body?.message || 'Something went wrong.';
            });
    }
}