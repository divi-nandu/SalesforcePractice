
import { LightningElement } from 'lwc';
import savePdfToContact
    from '@salesforce/apex/PdfGenerationController.savePdfToContact';

export default class PdfGenerationDemo extends LightningElement {
    contactId = '';
    message = '';
    isLoading = false;

    handleContactIdChange(event) {
        this.contactId = event.target.value.trim();
    }

    async handleGeneratePDF() {
        if (!this.contactId) {
            this.message = 'Please enter a Contact ID.';
            return;
        }

        const pdfWindow = window.open('about:blank', '_blank');

        this.isLoading = true;
        this.message = 'Generating PDF. Please wait...';

        try {
            const attachmentId = await savePdfToContact({
                contactId: this.contactId
            });

            this.message = 'PDF generated and saved successfully!';

            if (pdfWindow) {
                pdfWindow.location.href =
                    '/servlet/servlet.FileDownload?file=' + attachmentId;
            } else {
                this.message +=
                    ' Allow pop-ups and try again to open the PDF.';
            }
        } catch (error) {
            if (pdfWindow) {
                pdfWindow.close();
            }

            this.message =
                error.body?.message ||
                error.message ||
                'Unable to generate the PDF.';
        } finally {
            this.isLoading = false;
        }
    }
}
