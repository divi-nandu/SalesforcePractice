import { LightningElement, wire } from 'lwc';
import { refreshApex } from '@salesforce/apex';
import getAccounts from '@salesforce/apex/AccountRefreshController.getAccounts';
import updateIndustry from '@salesforce/apex/AccountRefreshController.updateIndustry';

export default class RefreshApexDemo extends LightningElement {
    message;

    // keep the whole result (data and error) in one property
    @wire(getAccounts)
    accounts;

    // change the industry of one account, then refresh the list
    handleBanking(event) {
        const accountId = event.target.dataset.id;
        updateIndustry({ accountId, industry: 'Banking' })
            .then(() => {
                this.message = 'Industry updated';
                return refreshApex(this.accounts); // get fresh data
            })
            .catch(error => {
                this.message = error.body.message;
            });
    }

    // refresh only, with no change
    handleRefresh() {
        refreshApex(this.accounts);
    }
}