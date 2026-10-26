import { LightningElement } from 'lwc';
import getAccounts from '@salesforce/apex/AccountImperativeController.getAccounts';

export default class ApexImperativeDemo extends LightningElement {
    accounts = [];
    errorMessage;
    isLoaded = false;

    handleLoad() {
        getAccounts()
            .then(result => {
                this.accounts = result;
                this.errorMessage = undefined;
                this.isLoaded = true;
            })
            .catch(error => {
                this.accounts = [];
                this.errorMessage =
                    error.body?.message || 'Something went wrong.';
                this.isLoaded = true;
            });
    }
}