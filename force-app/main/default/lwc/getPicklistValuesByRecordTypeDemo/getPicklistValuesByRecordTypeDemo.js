import { LightningElement, wire } from 'lwc';
import { getObjectInfo, getPicklistValuesByRecordType } from 'lightning/uiObjectInfoApi';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';

export default class GetPicklistValuesByRecordTypeDemo extends LightningElement {
    ratingOptions = [];
    industryOptions = [];
    typeOptions = [];
    selectedRating = '';
    selectedIndustry = '';
    selectedType = '';

    @wire(getObjectInfo, { objectApiName: ACCOUNT_OBJECT })
    objectInfo;

    @wire(getPicklistValuesByRecordType, {
        objectApiName: ACCOUNT_OBJECT,
        recordTypeId: '$objectInfo.data.defaultRecordTypeId'
    })
    picklistHandler({ data, error }) {
        if (data) {
            console.log(data);
            this.ratingOptions = this.generatePicklist(data.picklistFieldValues.Rating);
            this.industryOptions = this.generatePicklist(data.picklistFieldValues.Industry);
            this.typeOptions = this.generatePicklist(data.picklistFieldValues.Type);
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

    handleChange(event) {
        const { name, value } = event.target;
        if (name === 'industry') {
            this.selectedIndustry = value;
        }
        if (name === 'rating') {
            this.selectedRating = value;
        }
        if (name === 'type') {
            this.selectedType = value;
        }
    }
}