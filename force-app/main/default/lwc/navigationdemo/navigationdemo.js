import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { encodeDefaultFieldValues } from 'lightning/pageReferenceUtils';

export default class NavigationDemo extends NavigationMixin(LightningElement) {

    // Replace these with real record IDs from your dev org
    contactRecordId = '003ak00002GXaqTAAT';
    accountRecordId = '001XXXXXXXXXXXXXXX';

    navigateToHome() {
        this[NavigationMixin.Navigate]({
            type: 'standard__namedPage',
            attributes: { pageName: 'home' }
        });
    }

    navigateToChatter() {
        this[NavigationMixin.Navigate]({
            type: 'standard__namedPage',
            attributes: { pageName: 'chatter' }
        });
    }

    navigateToNewRecord() {
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: { objectApiName: 'Contact', actionName: 'new' }
        });
    }

    navigateToNewRecordWithDefault() {
        const defaultValues = encodeDefaultFieldValues({
            FirstName: 'Zero',
            LastName: 'Zero',
            LeadSource: 'Other'
        });
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: { objectApiName: 'Contact', actionName: 'new' },
            state: { defaultFieldValues: defaultValues }
        });
    }

    navigateToListView() {
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: { objectApiName: 'Contact', actionName: 'list' },
            state: { filterName: 'Recent' }
        });
    }

    navigateToFiles() {
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: { objectApiName: 'ContentDocument', actionName: 'home' }
        });
    }

    navigateToRecordViewMode() {
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: this.contactRecordId,
                objectApiName: 'Contact',
                actionName: 'view'
            }
        });
    }

    navigateToRecordEditMode() {
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: this.contactRecordId,
                objectApiName: 'Contact',
                actionName: 'edit'
            }
        });
    }

    navigateToTab() {
        this[NavigationMixin.Navigate]({
            type: 'standard__navItemPage',
            attributes: { apiName: 'lightning_in_WC' }
        });
    }

    navigateToRelatedList() {
        this[NavigationMixin.Navigate]({
            type: 'standard__recordRelationshipPage',
            attributes: {
                recordId: this.accountRecordId,
                objectApiName: 'Account',
                relationshipApiName: 'Contacts',
                actionName: 'view'
            }
        });
    }

    navigateToWebPage() {
        this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            attributes: { url: 'https://www.salesforce.com' }
        });
    }

    // Sends the real Contact ID to the target component
    navigateToLWC() {
        const definition = {
            componentDef: 'c:navigationlwctarget',
            attributes: { recordId: this.contactRecordId }
        };
        this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            attributes: {
                url: '/one/one.app#' + btoa(JSON.stringify(definition))
            }
        });
    }

    navigateToAura() {
    this[NavigationMixin.Navigate]({
        type: 'standard__component',
        attributes: {
            componentName: 'c__auraNavigation'
        },
        state: {
            c__id: this.contactRecordId
        }
    });
}

navigateToVisualforce() {
    this[NavigationMixin.GenerateUrl]({
        type: 'standard__webPage',
        attributes: {
            url: '/apex/navigate_Page'
        }
    }).then(generatedUrl => {
        console.log('Generated URL:', generatedUrl);
        window.open(generatedUrl, '_blank');
    });
}
}