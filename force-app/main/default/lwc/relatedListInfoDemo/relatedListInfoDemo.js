
import { LightningElement, wire } from 'lwc';
import { getRelatedListInfo } from 'lightning/uiRelatedListApi';

export default class RelatedListInfoDemo extends LightningElement {
    listName = '';
    objectName = '';
    columns = [];
    errorMessage = '';

    @wire(getRelatedListInfo, {
        parentObjectApiName: 'Account',
        relatedListId: 'Contacts'
    })
    wiredRelatedList({ data, error }) {
        if (data) {
            this.listName = data.label;
            this.objectName = data.objectApiName;
            this.columns = data.displayColumns.map(column => ({
                key: column.fieldApiName,
                label: column.label
            }));
            this.errorMessage = '';
        } else if (error) {
            this.errorMessage = 'Unable to load related list information.';
            console.error(error);
        }
    }
}