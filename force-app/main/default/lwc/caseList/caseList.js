
import { LightningElement, wire, api } from 'lwc';
import { getListUi } from 'lightning/uiListApi';
import { refreshApex } from '@salesforce/apex';
import CASE_OBJECT from '@salesforce/schema/Case';

export default class CaseList extends LightningElement {
    @api selectedId;

    cases = [];

    pageToken = null;
    nextPageToken = null;
    previousPageToken = null;
    listResult;

    // Retrieve five open Cases per page
    @wire(getListUi, {
        objectApiName: CASE_OBJECT,
        listViewApiName: 'AllOpenCases',
        pageSize: 5,
        pageToken: '$pageToken'
    })
    listHandler(result) {
        this.listResult = result;

        const { data, error } = result;

        if (data) {
            this.cases = data.records.records.map(record => ({
                id: record.id,
                number: record.fields.CaseNumber?.value,
                subject: record.fields.Subject?.value,
                status: record.fields.Status?.value,
                priority: record.fields.Priority?.value
            }));

            this.nextPageToken = data.records.nextPageToken;
            this.previousPageToken = data.records.previousPageToken;
        }

        if (error) {
            console.error('Error loading Cases:', error);
        }
    }

    // Highlight the selected Case
    get rows() {
        return this.cases.map(item => ({
            ...item,
            rowClass:
                item.id === this.selectedId
                    ? 'slds-is-selected'
                    : ''
        }));
    }

    // Check whether Cases are available
    get hasCases() {
        return this.cases.length > 0;
    }

    // Check pagination availability
    get hasPrevious() {
        return !!this.previousPageToken;
    }

    get hasNext() {
        return !!this.nextPageToken;
    }

    // Values used by the HTML disabled attributes
    get disablePrevious() {
        return !this.hasPrevious;
    }

    get disableNext() {
        return !this.hasNext;
    }

    // Navigate to the previous page
    handlePrevious() {
        if (this.hasPrevious) {
            this.pageToken = this.previousPageToken;
        }
    }

    // Navigate to the next page
    handleNext() {
        if (this.hasNext) {
            this.pageToken = this.nextPageToken;
        }
    }

    // Notify the parent when a Case row is selected
    handleRowClick(event) {
        const id = event.currentTarget.dataset.id;

        this.dispatchEvent(
            new CustomEvent('caseselect', {
                detail: { id }
            })
        );
    }

    // Allow the parent to refresh the list
    @api
    refresh() {
        return refreshApex(this.listResult);
    }
}
