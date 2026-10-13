import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import REVENUE_FIELD from '@salesforce/schema/Account.AnnualRevenue';
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';
import TYPE_FIELD from '@salesforce/schema/Account.Type';

export default class RecordFormDemo extends LightningElement {
    objectName = ACCOUNT_OBJECT;
    fieldList = [NAME_FIELD, REVENUE_FIELD, INDUSTRY_FIELD, TYPE_FIELD];

    // Filled automatically after you create an Account in card 1.
    // Or paste an existing Account ID here, like '001XXXXXXXXXXXXXXX'.
    accountId = '';

    handleSuccess(event) {
        this.accountId = event.detail.id;
        this.dispatchEvent(new ShowToastEvent({
            title: 'Account created',
            message: 'Record ID: ' + event.detail.id,
            variant: 'success'
        }));
    }
}