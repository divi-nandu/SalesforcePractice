
import { LightningElement } from 'lwc';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class RecordEditCustom extends LightningElement {
    objectName = ACCOUNT_OBJECT;
    inputValue = '';

    handleChange(event) {
        this.inputValue = event.target.value;
    }

    handleSubmit(event) {
        // Prevent the default form submission
        event.preventDefault();

        // Get the input field and its value
        const inputCmp = this.template.querySelector('lightning-input');
        const value = inputCmp.value.trim();

        // Custom validation
        if (!value.includes('Australia')) {
            inputCmp.setCustomValidity(
                "The account name must include 'Australia'"
            );
            inputCmp.reportValidity();
            return;
        }

        // Clear the error when the value is valid
        inputCmp.setCustomValidity('');
        inputCmp.reportValidity();

        // Pass the Account Name to Salesforce
        const fields = {};
        fields.Name = value;

        console.log(
            'Submitting Account fields:',
            JSON.stringify(fields)
        );

        // Submit the form
        this.template
            .querySelector('lightning-record-edit-form')
            .submit(fields);
    }

    successHandler(event) {
        // Display success message
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Account created',
                message: 'Record ID: ' + event.detail.id,
                variant: 'success'
            })
        );
    }

    handleError(event) {
        // Log detailed error information
        console.error(
            'Account creation error:',
            JSON.stringify(event.detail)
        );

        // Display error message
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Error creating Account',
                message: event.detail.message ||
                    'Unable to create Account. Check the browser console.',
                variant: 'error'
            })
        );
    }
}
