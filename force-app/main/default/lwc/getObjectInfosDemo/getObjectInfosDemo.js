import { LightningElement, wire } from 'lwc';
import { getObjectInfos } from 'lightning/uiObjectInfoApi';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import OPPORTUNITY_OBJECT from '@salesforce/schema/Opportunity';

export default class GetObjectInfosDemo extends LightningElement {
    objectApiNames = [ACCOUNT_OBJECT, OPPORTUNITY_OBJECT];
    objectInfos;

    @wire(getObjectInfos, { objectApiNames: '$objectApiNames' })
    objectInfosHandler({ data, error }) {
        if (data) {
            console.log(data);
            this.objectInfos = data.results;
        }
        if (error) {
            console.error(error);
        }
    }
}