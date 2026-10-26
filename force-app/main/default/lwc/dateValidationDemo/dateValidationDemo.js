
import { LightningElement } from 'lwc';

export default class DateValidationDemo extends LightningElement {
    startDate = '';
    endDate = '';
    errorMessage = '';
    successMessage = '';

    handleStartDateChange(event) {
        this.startDate = event.target.value;
        this.clearMessages();
    }

    handleEndDateChange(event) {
        this.endDate = event.target.value;
        this.clearMessages();
    }

    clearMessages() {
        this.errorMessage = '';
        this.successMessage = '';
    }

    validateDate(dateValue) {
        if (!dateValue) {
            return false;
        }

        const selectedDate = new Date(
            dateValue + 'T00:00:00'
        );

        return !Number.isNaN(selectedDate.getTime());
    }

    handleValidate() {
        this.clearMessages();

        if (!this.validateDate(this.startDate) ||
            !this.validateDate(this.endDate)) {
            this.errorMessage = 'Please enter both dates.';
            return;
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const start = new Date(
            this.startDate + 'T00:00:00'
        );

        const end = new Date(
            this.endDate + 'T00:00:00'
        );

        if (start < today) {
            this.errorMessage =
                'Start date cannot be in the past.';
            return;
        }

        if (end <= start) {
            this.errorMessage =
                'End date must be after the start date.';
            return;
        }

        this.successMessage =
            'Success! Your event dates are valid.';
    }
}
