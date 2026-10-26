public with sharing class AccountRefreshController {

    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts() {
        return [SELECT Id, Name, Industry FROM Account ORDER BY Name LIMIT 5];
    }

    @AuraEnabled
    public static void updateIndustry(Id accountId, String industry) {
        Account acc = new Account(Id = accountId, Industry = industry);
        update acc;
    }
}