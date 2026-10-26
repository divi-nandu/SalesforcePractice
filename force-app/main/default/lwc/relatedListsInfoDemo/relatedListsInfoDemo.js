import { LightningElement, wire } from 'lwc';
import { getRelatedListsInfo } from 'lightning/uiRelatedListApi';

export default class RelatedListsInfoDemo extends LightningElement {
    relatedLists = [];
    errorMessage = '';

    @wire(getRelatedListsInfo, {
        parentObjectApiName: 'Account'
    })
    wiredRelatedLists({ data, error }) {
        if (data) {
            this.relatedLists = data.relatedLists.map(item => ({
                id: item.relatedListId,
                label: item.label
            }));
            this.errorMessage = '';
        } else if (error) {
            this.errorMessage = 'Unable to load related lists.';
            console.error('Related Lists Error:', error);
        }
    }
}
