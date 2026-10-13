import { LightningElement, api, wire } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import FIRST_NAME from '@salesforce/schema/Contact.FirstName';
import LAST_NAME from '@salesforce/schema/Contact.LastName';

export default class Navigationlwctarget extends LightningElement {
    @api recordId;

    @wire(getRecord, { recordId: '$recordId', fields: [FIRST_NAME, LAST_NAME] })
    contact;

    get firstName() {
        return getFieldValue(this.contact.data, FIRST_NAME);
    }

    get lastName() {
        return getFieldValue(this.contact.data, LAST_NAME);
    }
}