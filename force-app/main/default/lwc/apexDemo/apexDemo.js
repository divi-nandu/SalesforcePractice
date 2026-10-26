
import { LightningElement, wire } from 'lwc';
import getAccountList from '@salesforce/apex/AccountController.getAccountList';

export default class ApexDemo extends LightningElement {
    accountList;

    // Wire to Property
    @wire(getAccountList)
    accounts;

    // Wire to Function
    @wire(getAccountList)
    accountsHandler({ data, error }) {
        if (data) {
            this.accountList = data.map(item => {
                let newType =
                    item.Type === 'Customer - Channel' ? 'Channel' :
                    item.Type === 'Customer - Direct' ? 'Direct' :
                    '-------';

                return { ...item, newType };
            });
        }

        if (error) {
            console.error(error);
        }
    }
}
