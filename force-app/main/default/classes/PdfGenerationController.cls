public with sharing class PdfGenerationController {

    @AuraEnabled
    public static Id savePdfToContact(Id contactId) {

        if (contactId == null) {
            throw new AuraHandledException(
                'Please enter a Contact ID.'
            );
        }

        List<Contact> contacts = [
            SELECT Id, Name
            FROM Contact
            WHERE Id = :contactId
            LIMIT 1
        ];

        if (contacts.isEmpty()) {
            throw new AuraHandledException(
                'Contact not found. Check the Contact ID.'
            );
        }

        PageReference pdfPage = Page.PdfGenerationPage;
        Blob pdfBody = pdfPage.getContentAsPDF();

        Attachment pdfFile = new Attachment();
        pdfFile.Name = 'SalesforceDemo.pdf';
        pdfFile.ContentType = 'application/pdf';
        pdfFile.Body = pdfBody;
        pdfFile.ParentId = contacts[0].Id;

        insert pdfFile;

        return pdfFile.Id;
    }
}