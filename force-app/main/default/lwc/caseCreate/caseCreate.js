
import { LightningElement, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import {
    getObjectInfo,
    getPicklistValues,
    getPicklistValuesByRecordType
} from 'lightning/uiObjectInfoApi';

import { createRecord } from 'lightning/uiRecordApi';

import CASE_OBJECT from '@salesforce/schema/Case';
import TYPE_FIELD from '@salesforce/schema/Case.Type';

export default class CaseCreate extends LightningElement {
    statusOptions = [];
    priorityOptions = [];
    originOptions = [];
    typeOptions = [];

    newCase = {};

    // Get Case object information and default record type
    @wire(getObjectInfo, {
        objectApiName: CASE_OBJECT
    })
    caseInfo;

    // Get Status, Priority and Origin picklist values
    @wire(getPicklistValuesByRecordType, {
        objectApiName: CASE_OBJECT,
        recordTypeId: '$caseInfo.data.defaultRecordTypeId'
    })
    picklistsHandler({ data, error }) {
        if (data) {
            this.statusOptions =
                this.toOptions(data.picklistFieldValues.Status);

            this.priorityOptions =
                this.toOptions(data.picklistFieldValues.Priority);

            this.originOptions =
                this.toOptions(data.picklistFieldValues.Origin);
        }

        if (error) {
            console.error(error);
        }
    }

    // Get Type picklist values
    @wire(getPicklistValues, {
        recordTypeId: '$caseInfo.data.defaultRecordTypeId',
        fieldApiName: TYPE_FIELD
    })
    typeHandler({ data, error }) {
        if (data) {
            this.typeOptions = this.toOptions(data);
        }

        if (error) {
            console.error(error);
        }
    }

    // Convert Salesforce picklist values into dropdown options
    toOptions(picklist) {
        return picklist.values.map(item => ({
            label: item.label,
            value: item.value
        }));
    }

    // Store the values entered by the user
    handleChange(event) {
        const { name, value } = event.target;

        this.newCase = {
            ...this.newCase,
            [name]: value
        };
    }

    // Create a Case record
    createCase() {
        const subject = this.newCase.Subject;

        if (!subject || subject.trim().length < 10) {
            this.showToast(
                'Check the form',
                'Subject needs at least 10 characters.',
                'error'
            );
            return;
        }

        createRecord({
            apiName: CASE_OBJECT.objectApiName,
            fields: this.newCase
        })
            .then(result => {
                this.showToast(
                    'Success',
                    'Case created',
                    'success'
                );

                this.clearForm();

                this.dispatchEvent(
                    new CustomEvent('casechange', {
                        detail: { id: result.id }
                    })
                );
            })
            .catch(error => {
                this.showToast(
                    'Error creating case',
                    error.body?.message || 'An unexpected error occurred.',
                    'error'
                );
            });
    }

    // Clear the form fields
    clearForm() {
        this.newCase = {};

        this.template.querySelectorAll('.newField').forEach(field => {
            field.value = '';
        });
    }

    // Display success or error messages
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
