import { LightningElement, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import USER_ID from '@salesforce/user/Id';
import NAME_FIELD from '@salesforce/schema/User.Name';
import EMAIL_FIELD from '@salesforce/schema/User.Email';

const fields = [NAME_FIELD, EMAIL_FIELD];

export default class WireDemoUserDetail extends LightningElement {
    userId = USER_ID;
    userDetail;

    // Wire as a function
    @wire(getRecord, { recordId: '$userId', fields })
    userDetailHandler({ data, error }) {
        if (data) {
            this.userDetail = data.fields;
        }
        if (error) {
            console.error(error);
        }
    }

    // Wire as a property
    @wire(getRecord, { recordId: '$userId', fields })
    userDetailProperty;
}