public with sharing class CsvExportController {

    @AuraEnabled(cacheable=true)
    public static List<Contact> getContacts() {
        return [
            SELECT Id, FirstName, LastName, Email, Department
            FROM Contact
            ORDER BY LastName
            LIMIT 100
        ];
    }
}
