public with sharing class AccountSearchController {

    @AuraEnabled(cacheable=true)
    public static List<Account> findAccounts(String searchKey) {
        String key = '%' + searchKey + '%';
        return [SELECT Id, Name, Industry FROM Account WHERE Name LIKE :key LIMIT 10];
    }
}
