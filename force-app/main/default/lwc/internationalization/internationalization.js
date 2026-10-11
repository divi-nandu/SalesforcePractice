import { LightningElement } from 'lwc';
import locale from '@salesforce/i18n/locale';
import currency from '@salesforce/i18n/currency';
import dir from '@salesforce/i18n/dir';
import timeZone from '@salesforce/i18n/timeZone';
import firstDayOfWeek from '@salesforce/i18n/firstDayOfWeek';

export default class Internationalization extends LightningElement {
    formattedNumber = new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
        currencyDisplay: 'symbol'
    }).format(1234567.89);

    formattedDate = new Intl.DateTimeFormat(locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(new Date());

    textDirection = dir;

    // New i18n properties
    currentUserTimeZone = timeZone;
    startOfWeek = firstDayOfWeek; // 0 = Sunday, 1 = Monday, etc.
}