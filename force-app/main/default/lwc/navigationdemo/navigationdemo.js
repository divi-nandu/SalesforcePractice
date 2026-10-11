
import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { encodeDefaultFieldValues } from 'lightning/pageReferenceUtils';

export default class NavigationDemo extends NavigationMixin(LightningElement) {

    // Replace this placeholder with an actual Contact record ID
    contactRecordId = '003XXXXXXXXXXXXXXX';

    // 1. Navigate to Home
    navigateToHome() {
        this[NavigationMixin.Navigate]({
            type: 'standard__namedPage',
            attributes: {
                pageName: 'home'
            }
        });
    }

    // 2. Navigate to Chatter
    navigateToChatter() {
        this[NavigationMixin.Navigate]({
            type: 'standard__namedPage',
            attributes: {
                pageName: 'chatter'
            }
        });
    }

    // 3. Navigate to a new Contact record
    navigateToNewRecord() {
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Contact',
                actionName: 'new'
            }
        });
    }

    // 4. Navigate to a new Contact with default values
    navigateToNewRecordWithDefault() {
        const defaultValues = encodeDefaultFieldValues({
            FirstName: 'Zero',
            LastName: 'Zero',
            LeadSource: 'Other'
        });

        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Contact',
                actionName: 'new'
            },
            state: {
                defaultFieldValues: defaultValues
            }
        });
    }

    // 5. Navigate to the Contact list view
    navigateToListView() {
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Contact',
                actionName: 'list'
            },
            state: {
                filterName: 'Recent'
            }
        });
    }

    // 6. Navigate to Files
    navigateToFiles() {
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'ContentDocument',
                actionName: 'home'
            }
        });
    }

    // 7. Navigate to Contact record in View Mode
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

    // 8. Navigate to Contact record in Edit Mode
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
    // 9. Navigate to a Salesforce Tab
navigateToTab() {
    this[NavigationMixin.Navigate]({
        type: 'standard__navItemPage',
        attributes: {
            apiName: 'lightning_in_WC'
        }
    });
}
// 10. Navigate to Related Contacts of an Account
accountRecordId = '001XXXXXXXXXXXXXXX';

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
// 11. Navigate to an External Web Page
navigateToWebPage() {
    this[NavigationMixin.Navigate]({
        type: 'standard__webPage',
        attributes: {
            url: 'https://www.salesforce.com'
        }
    });
}

}
