import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class Notifications extends LightningElement {

    toastHandler() {
        this.showToast(
            'Success!!',
            'Account Created Successfully!!',
            'success'
        );
    }

    toastHandlerTwo() {
        this.showToast(
            'Error!!',
            'Account Creation Failed!!',
            'error'
        );
    }

    toastHandlerThree() {
        this.showToast(
            'Warning!!',
            'Password should have 15 characters!!',
            'warning'
        );
    }

    toastHandlerFour() {
        this.showToast(
            'Info!!',
            'Summer 20 release is available!!',
            'info'
        );
    }

    showToast(title, message, variant) {
        const event = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant,
            mode: 'dismissible'
        });

        this.dispatchEvent(event);
    }
}