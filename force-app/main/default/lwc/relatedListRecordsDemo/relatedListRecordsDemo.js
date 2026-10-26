import { LightningElement, api, wire } from 'lwc';
import { getRelatedListRecords } from 'lightning/uiRelatedListApi';

export default class RelatedListRecordsDemo extends LightningElement {
    @api recordId;

    contacts = [];
    errorMessage = '';

    @wire(getRelatedListRecords, {
        parentRecordId: '$recordId',
        relatedListId: 'Contacts',
        fields: [
            'Contact.Id',
            'Contact.Name',
            'Contact.Email'
        ],
        pageSize: 10
    })
    wiredContacts({ data, error }) {
        if (data) {
            this.contacts = data.records.map(record => ({
                id: record.id,
                name: record.fields.Name.value,
                email: record.fields.Email.value
            }));

            this.errorMessage = '';
        } else if (error) {
            this.contacts = [];
            this.errorMessage =
                error.body?.message ||
                'Unable to load related Contacts.';

            console.error('Related Contacts Error:', error);
        }
    }
}
