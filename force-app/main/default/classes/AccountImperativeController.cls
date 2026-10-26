public with sharing class AccountImperativeController {

    @AuraEnabled
    public static List<Account> getAccounts() {
        return [
            SELECT Id, Name, Industry
            FROM Account
            LIMIT 5
        ];
    }
}