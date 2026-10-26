import { LightningElement, api, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import OWNER_NAME_FIELD from '@salesforce/schema/Account.Owner.Name';
import ANNUAL_REVENUE_FIELD from '@salesforce/schema/Account.AnnualRevenue';

export default class GetRecordDemo extends LightningElement {
    @api recordId;

    name;
    owner;
    annualRevenue;

    @wire(getRecord, {
        recordId: '$recordId',
        fields: [NAME_FIELD, OWNER_NAME_FIELD, ANNUAL_REVENUE_FIELD]
    })
    wireHandler({ data, error }) {
        if (data) {
            console.log(data);
            this.name = this.getValue(data.fields.Name);
            this.annualRevenue = this.getValue(data.fields.AnnualRevenue);
            this.owner = this.getValue(data.fields.Owner);
        }
        if (error) {
            console.error(error);
        }
    }

    getValue(field) {
        return field.displayValue ? field.displayValue : field.value;
    }
}