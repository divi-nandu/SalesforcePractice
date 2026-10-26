import { LightningElement, wire } from 'lwc';
import { getNavItems } from 'lightning/uiAppsApi';

export default class GetNavItemsDemo extends LightningElement {
    result;

    @wire(getNavItems, {
        navItemNames: ['standard-Account'],
        pageSize: 30
    })
    navHandler({ data, error }) {
        if (data) {
            console.log(JSON.stringify(data));
            this.result = data.navItems[0];
        }
        if (error) {
            console.error(error);
        }
    }
}