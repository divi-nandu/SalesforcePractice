
import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import {
    updateRecord,
    deleteRecord
} from 'lightning/uiRecordApi';

export default class CaseActions extends LightningElement {
    @api recordId;

    confirmingDelete = false;

    get deleteLabel() {
        return this.confirmingDelete
            ? 'Click again to confirm'
            : 'Delete spam case';
    }

    // Update the selected Case status to Closed
    markResolved() {
        if (!this.recordId) {
            this.showToast(
                'Error',
                'Please select a case first.',
                'error'
            );
            return;
        }

        updateRecord({
            fields: {
                Id: this.recordId,
                Status: 'Closed'
            }
        })
            .then(() => {
                this.showToast(
                    'Success',
                    'Case marked as resolved',
                    'success'
                );

                this.dispatchEvent(
                    new CustomEvent('casechange')
                );
            })
            .catch(error => {
                this.showToast(
                    'Error updating case',
                    error.body?.message || 'Unable to update the case.',
                    'error'
                );
            });
    }

    // Require a second click before deleting
    deleteCase() {
        if (!this.recordId) {
            this.showToast(
                'Error',
                'Please select a case first.',
                'error'
            );
            return;
        }

        if (!this.confirmingDelete) {
            this.confirmingDelete = true;
            return;
        }

        this.confirmingDelete = false;

        deleteRecord(this.recordId)
            .then(() => {
                this.showToast(
                    'Success',
                    'Case deleted',
                    'success'
                );

                this.dispatchEvent(
                    new CustomEvent('casedeleted')
                );
            })
            .catch(error => {
                this.showToast(
                    'Error deleting case',
                    error.body?.message || 'Unable to delete the case.',
                    'error'
                );
            });
    }

    // Display a Salesforce toast message
    showToast(title, message, variant) {
        this.dispatchEvent(
            new ShowToastEvent({
                title,
                message,
                variant
            })
        );
    }
}
