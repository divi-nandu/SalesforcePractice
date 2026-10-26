
import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import CONTACT_OBJECT from '@salesforce/schema/Contact';
import ACCOUNT_FIELD from '@salesforce/schema/Contact.AccountId';
import FIRST_NAME_FIELD from '@salesforce/schema/Contact.FirstName';
import LAST_NAME_FIELD from '@salesforce/schema/Contact.LastName';
import TITLE_FIELD from '@salesforce/schema/Contact.Title';
import PHONE_FIELD from '@salesforce/schema/Contact.Phone';
import EMAIL_FIELD from '@salesforce/schema/Contact.Email';

export default class RecordEditFormDemo extends LightningElement {
    objectName = CONTACT_OBJECT;

    fields = {
        account: ACCOUNT_FIELD,
        firstName: FIRST_NAME_FIELD,
        lastName: LAST_NAME_FIELD,
        title: TITLE_FIELD,
        phone: PHONE_FIELD,
        email: EMAIL_FIELD
    };

    handleSuccess(event) {
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Success',
                message: 'Contact updated: ' + event.detail.id,
                variant: 'success'
            })
        );
    }

    handleError(event) {
        console.log('Save error:', JSON.stringify(event.detail));
    }

    handleReset() {
        const inputFields = this.template.querySelectorAll(
            'lightning-input-field'
        );

        inputFields.forEach(field => {
            field.reset();
        });
    }
}
