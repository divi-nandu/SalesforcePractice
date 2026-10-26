import { LightningElement, wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

import { getObjectInfos } from 'lightning/uiObjectInfoApi';
import { getNavItems } from 'lightning/uiAppsApi';

import CASE_OBJECT from '@salesforce/schema/Case';
import CONTACT_OBJECT from '@salesforce/schema/Contact';

export default class SupportDesk extends NavigationMixin(LightningElement) {
    selectedId;

    objectLabels = [];
    navItems = [];

    // Retrieve labels for Case and Contact
    objectApiNames = [CASE_OBJECT, CONTACT_OBJECT];

    @wire(getObjectInfos, {
        objectApiNames: '$objectApiNames'
    })
    objectInfosHandler({ data, error }) {
        if (data) {
            this.objectLabels = data.results
                .map(item => item.result.labelPlural)
                .join(', ');
        }

        if (error) {
            console.error('Error loading object labels:', error);
        }
    }

    // Retrieve app navigation items, keeping each page reference
    @wire(getNavItems, {
        pageSize: 6
    })
    navHandler({ data, error }) {
        if (data) {
            this.navItems = data.navItems.map((item, index) => ({
                key: 'nav-' + index,
                label: item.label,
                pageReference: JSON.parse(JSON.stringify(item.pageReference))
            }));
        }

        if (error) {
            console.error('Error loading navigation items:', error);
        }
    }

    // Open the page for the clicked navigation item
    handleNavClick(event) {
        event.preventDefault();

        const index = event.currentTarget.dataset.index;
        const item = this.navItems[index];

        if (item && item.pageReference) {
            this[NavigationMixin.Navigate](item.pageReference);
        }
    }

    // Check whether a Case has been selected
    get hasSelection() {
        return !!this.selectedId;
    }

    // Handle selection from the Case list
    handleSelect(event) {
        this.selectedId = event.detail.id;
    }

    // Handle a Case that was created, edited, or resolved
    handleChange(event) {
        if (event.detail && event.detail.resolved) {
            this.selectedId = undefined;
        } else if (event.detail && event.detail.id) {
            this.selectedId = event.detail.id;
        }

        this.refreshList();
    }

    // Handle deletion of the selected Case
    handleDeleted() {
        this.selectedId = undefined;
        this.refreshList();
    }

    // Refresh the child Case list
    refreshList() {
        const list = this.template.querySelector('c-case-list');

        if (list) {
            list.refresh();
        }
    }
}