import { LightningElement } from 'lwc';
import { deleteRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class DeleteRecordDemo extends LightningElement {
    recordId;

    // Runs when the user types in the input
    changeHandler(event) {
        this.recordId = event.target.value;
    }

    // Runs when the user clicks the Delete button
    deleteHandler() {
        deleteRecord(this.recordId)
            .then(() => {
                this.showToast('Success', 'Record deleted successfully', 'success');
            })
            .catch(error => {
                console.error(error);
                this.showToast('Error', 'Error occurred while deleting', 'error');
            });
    }

    // One reusable toast method
    showToast(title, message, variant) {
        this.dispatchEvent(
            new ShowToastEvent({ title, message, variant })
        );
    }
}