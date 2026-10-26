import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class CaseTabs extends LightningElement {
    @api recordId;

    statusText = 'Ready (v3 loaded)';
    subjectError = '';
    descriptionError = '';

    // Runs when Save is clicked
    handleSave() {
        try {
            this.statusText = '1. Save clicked';

            // Read the current values from every input field
            const fields = {};
            this.template
                .querySelectorAll('lightning-input-field')
                .forEach(field => {
                    fields[field.fieldName] = field.value;
                });

            let isValid = true;

            // Subject must contain at least 10 characters
            if (!fields.Subject || String(fields.Subject).trim().length < 10) {
                this.subjectError =
                    'Please describe the problem in at least 10 characters.';
                isValid = false;
            } else {
                this.subjectError = '';
            }

            // High priority cases must have a description
            if (
                fields.Priority === 'High' &&
                (!fields.Description || !String(fields.Description).trim())
            ) {
                this.descriptionError =
                    'A High priority case needs a description.';
                isValid = false;
            } else {
                this.descriptionError = '';
            }

            if (!isValid) {
                this.statusText = '2. Validation failed, not saved';
                this.showToast(
                    'Check the form',
                    'Please fix the highlighted fields before saving.',
                    'error'
                );
                return;
            }

            this.statusText = '2. Validation passed, saving...';

            this.template
                .querySelector('lightning-record-edit-form')
                .submit(fields);
        } catch (e) {
            this.statusText = 'Error: ' + e.message;
        }
    }

    // Called when the Case saves successfully
    handleSuccess() {
        this.statusText = '3. Saved successfully';
        this.showToast('Success', 'Case saved', 'success');
        this.dispatchEvent(new CustomEvent('casechange'));
    }

    // Called when saving fails
    handleError(event) {
        const message =
            event.detail?.detail ||
            event.detail?.message ||
            'Unknown error';
        this.statusText = '3. Save failed: ' + message;
        this.showToast('Error saving case', message, 'error');
    }

    // Restore the original field values
    handleReset() {
        this.subjectError = '';
        this.descriptionError = '';
        this.statusText = 'Fields reset';
        this.template
            .querySelectorAll('lightning-input-field')
            .forEach(field => {
                field.reset();
            });
    }

    // Display a toast message
    showToast(title, message, variant) {
        this.dispatchEvent(
            new ShowToastEvent({ title, message, variant })
        );
    }
}