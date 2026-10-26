import { LightningElement, api, wire } from 'lwc';
import { getRelatedListCount } from 'lightning/uiRelatedListApi';

export default class RelatedListCountDemo extends LightningElement {
    @api recordId;

    contactCount;
    errorMessage = '';
    loading = true;

    @wire(getRelatedListCount, {
        parentRecordId: '$recordId',
        relatedListId: 'Contacts'
    })
    wiredContactCount({ data, error }) {
        if (data) {
            this.contactCount = data.count;
            this.errorMessage = '';
            this.loading = false;

            console.log('Contact count:', data.count);
        } else if (error) {
            this.contactCount = undefined;
            this.errorMessage =
                error.body?.message || 'Unable to load Contact count.';
            this.loading = false;

            console.error('Related List Count Error:', error);
        }
    }
}
