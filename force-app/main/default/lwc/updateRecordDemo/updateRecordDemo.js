
import { LightningElement, wire } from 'lwc';
import { getListRecordsByName } from 'lightning/uiListsApi';
import { updateRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import CONTACT_OBJECT from '@salesforce/schema/Contact';

const COLUMNS = [
    {
        label: 'Name',
        fieldName: 'Name',
        type: 'text'
    },
    {
        label: 'Title',
        fieldName: 'Title',
        type: 'text'
    },
    {
        label: 'Phone',
        fieldName: 'Phone',
        type: 'phone',
        editable: true
    },
    {
        label: 'Email',
        fieldName: 'Email',
        type: 'email',
        editable: true
    }
];

export default class UpdateRecordDemo extends LightningElement {
    contacts = [];
    columns = COLUMNS;
    draftValues = [];
    errorMessage;

    @wire(getListRecordsByName, {
        objectApiName: CONTACT_OBJECT.objectApiName,
        listViewApiName: 'AllContacts',
        fields: [
            'Contact.Id',
            'Contact.Name',
            'Contact.Title',
            'Contact.Phone',
            'Contact.Email'
        ],
        pageSize: 50
    })
    wiredContacts({ data, error }) {
        if (data) {
            this.contacts = data.records.map((record) => {
                const fields = record.fields;

                return {
                    Id: record.id,
                    Name: fields.Name?.value || '',
                    Title: fields.Title?.value || '',
                    Phone: fields.Phone?.value || '',
                    Email: fields.Email?.value || ''
                };
            });

            this.errorMessage = undefined;
        } else if (error) {
            this.errorMessage =
                error.body?.message || 'Unable to load Contacts.';

            console.error('Error loading Contacts:', error);
        }
    }

    async handleSave(event) {
        const drafts = event.detail.draftValues;

        const recordInputs = drafts.map((draft) => ({
            fields: {
                Id: draft.Id,
                ...(draft.Phone !== undefined && {
                    Phone: draft.Phone
                }),
                ...(draft.Email !== undefined && {
                    Email: draft.Email
                })
            }
        }));

        try {
            await Promise.all(
                recordInputs.map((recordInput) =>
                    updateRecord(recordInput)
                )
            );

            this.draftValues = [];
            this.errorMessage = undefined;

            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Contact records updated successfully.',
                    variant: 'success'
                })
            );
        } catch (error) {
            this.errorMessage =
                error.body?.message || 'Error updating Contact records.';

            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Update Failed',
                    message: this.errorMessage,
                    variant: 'error'
                })
            );

            console.error('Error updating Contacts:', error);
        }
    }
}
