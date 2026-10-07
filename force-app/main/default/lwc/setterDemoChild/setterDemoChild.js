import { LightningElement, api } from 'lwc';

export default class SetterDemoChild extends LightningElement {
    userDetail;

    @api
    set detail(data) {
        this.userDetail = {
            ...data,
            age: data.age * 2,
            location: 'Melbourne'
        };
    }

    get detail() {
        return this.userDetail;
    }
}