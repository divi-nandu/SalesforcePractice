import { LightningElement } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import CONTACT_OBJECT from '@salesforce/schema/Contact';

export default class CreateRecordDemo extends LightningElement {
    formFields = {};

    changeHandler(event) {
        const { name, value } = event.target;
        this.formFields = { ...this.formFields, [name]: value };
    }

    createContact() {
        const recordInput = {
            apiName: CONTACT_OBJECT.objectApiName,
            fields: this.formFields
        };

        createRecord(recordInput)
            .then(result => {
                this.showToast('Success', `Contact created with ID ${result.id}`);
                this.resetForm();
            })
            .catch(error => {
                this.showToast('Error creating record', error.body.message, 'error');
            });
    }

    resetForm() {
        this.template.querySelector('form.createForm').reset();
        this.formFields = {};
    }

    showToast(title, message, variant = 'success') {
        this.dispatchEvent(new ShowToastEvent({ title, message, variant }));
    }
} 