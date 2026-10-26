import { LightningElement, wire } from 'lwc';
import { getObjectInfo, getPicklistValues } from 'lightning/uiObjectInfoApi';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';
import TYPE_FIELD from '@salesforce/schema/Account.Type';

export default class GetPicklistValuesDemo extends LightningElement {
    selectedIndustry = '';
    selectedType = '';
    industryOptions = [];
    typeOptions = [];

    @wire(getObjectInfo, { objectApiName: ACCOUNT_OBJECT })
    objectInfo;

    @wire(getPicklistValues, {
        recordTypeId: '$objectInfo.data.defaultRecordTypeId',
        fieldApiName: INDUSTRY_FIELD
    })
    industryPicklist({ data, error }) {
        if (data) {
            this.industryOptions = this.generatePicklist(data);
        }
        if (error) {
            console.error(error);
        }
    }

    @wire(getPicklistValues, {
        recordTypeId: '$objectInfo.data.defaultRecordTypeId',
        fieldApiName: TYPE_FIELD
    })
    typePicklist({ data, error }) {
        if (data) {
            this.typeOptions = this.generatePicklist(data);
        }
        if (error) {
            console.error(error);
        }
    }

    generatePicklist(data) {
        return data.values.map(item => ({
            label: item.label,
            value: item.value
        }));
    }

    handleIndustryChange(event) {
        this.selectedIndustry = event.detail.value;
    }

    handleTypeChange(event) {
        this.selectedType = event.detail.value;
    }
}