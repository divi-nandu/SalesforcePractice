
import { LightningElement, api, wire } from 'lwc';

import {
    getRecord,
    getFieldValue,
    getFieldDisplayValue,
    getRecordUi
} from 'lightning/uiRecordApi';

import CASE_NUMBER_FIELD from '@salesforce/schema/Case.CaseNumber';
import SUBJECT_FIELD from '@salesforce/schema/Case.Subject';
import STATUS_FIELD from '@salesforce/schema/Case.Status';
import PRIORITY_FIELD from '@salesforce/schema/Case.Priority';
import CREATED_FIELD from '@salesforce/schema/Case.CreatedDate';

const FIELDS = [
    CASE_NUMBER_FIELD,
    SUBJECT_FIELD,
    STATUS_FIELD,
    PRIORITY_FIELD,
    CREATED_FIELD
];

export default class CaseHeader extends LightningElement {
    @api recordId;

    caseNumber;
    subject;
    status;
    priority;
    created;

    sections = [];

    // Retrieve the selected Case details
    @wire(getRecord, {
        recordId: '$recordId',
        fields: FIELDS
    })
    recordHandler({ data, error }) {
        if (data) {
            this.caseNumber = getFieldValue(
                data,
                CASE_NUMBER_FIELD
            );

            this.subject = getFieldValue(
                data,
                SUBJECT_FIELD
            );

            this.status = getFieldValue(
                data,
                STATUS_FIELD
            );

            this.priority = getFieldValue(
                data,
                PRIORITY_FIELD
            );

            this.created = getFieldDisplayValue(
                data,
                CREATED_FIELD
            );
        }

        if (error) {
            console.error(error);
        }
    }

    // Retrieve the Case page layout information
    @wire(getRecordUi, {
        recordIds: '$recordId',
        layoutTypes: 'Full',
        modes: 'View'
    })
    recordUiHandler({ data, error }) {
        if (data) {
            const record = data.records[this.recordId];

            const layout = record
                ? data.layouts?.[record.apiName]?.[
                      record.recordTypeId
                  ]?.Full?.View
                : undefined;

            this.sections = layout
                ? layout.sections.map((section, index) => ({
                      key: index,
                      heading: section.heading || 'Untitled section'
                  }))
                : [];
        }

        if (error) {
            console.error(error);
        }
    }

    // Convert the section headings into display text
    get sectionNames() {
        return this.sections
            .map(section => section.heading)
            .join(', ');
    }
}
