public with sharing class AccountImperativeParamController {

    @AuraEnabled
    public static List<Account> findAccounts(String searchKey) {
        String key = '%' + searchKey + '%';

        return [
            SELECT Id, Name, Industry
            FROM Account
            WHERE Name LIKE :key
            LIMIT 10
        ];
    }
}