import HttpClient from './httpClient';
export class invoiceClient {
    constructor(baseUrl) {
        this.URL_GET_TAXES = '/api/taxes';
        this.URL_GET_INVOICE = '/api/invoice/get';
        this.URL_GET_ALL_INVOICES = '/api/invoices';
        this.URL_GET_ALL_CLIENTS = '/api/clients';
        this.URL_SAVE_INVOCE = '/api/invoice/save';
        this.URL_REMOVE_INVOCE = '/api/invoice/remove';
        this.URL_UPDATE_INVOCE_ITEM = '/api/invoice/update-item';
        this.httpClient = new HttpClient(baseUrl);
    }
    saveInvoice(invoice) {
        return this.httpClient
            .sendGetRequest(this.URL_SAVE_INVOCE, { invoice: JSON.stringify(invoice) });
    }
    removeInvoice(invoice) {
        return this.httpClient
            .sendGetRequest(this.URL_REMOVE_INVOCE + '/' + invoice.id, {});
    }
    updateInvoiceItem(item) {
        return this.httpClient.sendGetRequest(this.URL_UPDATE_INVOCE_ITEM + '/' + item.id, {
            id: item.id,
            invoice_id: item.invoice_id,
            name: item.name,
            price_without_tax: item.price_without_tax,
            price_with_tax: item.price_with_tax,
            tax_percent: item.tax_percent,
        });
    }
    getInvoice(id) {
        return this.httpClient
            .sendGetRequest(this.URL_GET_INVOICE + '/' + id, {})
            .then(function (data) {
            data = data['invoice'];
            let invoiceItems = [];
            for (let index in data['items']) {
                let invoiceItemData = data['items'][index];
                invoiceItems.push({
                    id: invoiceItemData['id'],
                    invoice_id: invoiceItemData['invoice_id'],
                    items_name: invoiceItemData['name'],
                    priceWithoutTax: invoiceItemData['price_without_tax'],
                    priceWithTax: invoiceItemData['price_with_tax'],
                    taxPercent: invoiceItemData['tax_percent'],
                });
            }
            let invoice = {
                id: data['id'],
                client: {
                    id: data['client']['id'],
                    first_name: data['client']['first_name'],
                    last_name: data['client']['last_name'],
                    phone: data['client']['phone'],
                    email: data['client']['email'],
                },
                items: invoiceItems,
            };
            return invoice;
        });
    }
    // @todo DODELAT - nechce se mi zobrazovat items
    getAllInvoices() {
        return this.httpClient
            .sendGetRequest(this.URL_GET_ALL_INVOICES, {})
            .then(function (data) {
            let invoices = [];
            for (let index in data['invoices']) {
                let invoiceData = data['invoices'][index];
                let clientData = invoiceData['client'];
                let invoiceItems = [];
                for (let index in invoiceData['items']) {
                    let invoiceItemData = invoiceData['items'][index];
                    invoiceItems.push({
                        id: invoiceItemData['id'],
                        invoice_id: invoiceItemData['invoice_id'],
                        items_name: invoiceItemData['name'],
                        priceWithoutTax: invoiceItemData['price_without_tax'],
                        priceWithTax: invoiceItemData['price_with_tax'],
                        taxPercent: invoiceItemData['tax_percent'],
                    });
                }
                invoices.push({
                    id: invoiceData['id'],
                    client: {
                        id: clientData['id'],
                        first_name: clientData['first_name'],
                        last_name: clientData['last_name'],
                        phone: clientData['phone'],
                        email: clientData['email'],
                    },
                    items: invoiceItems,
                });
            }
            return invoices;
        });
    }
    getTaxes() {
        return this.httpClient
            .sendGetRequest(this.URL_GET_TAXES, {})
            .then(function (data) {
            let taxes = [];
            for (let index in data['taxes']) {
                let taxData = data['taxes'][index];
                taxes.push({
                    name: taxData['name'],
                    percent: taxData['tax_percent'],
                });
            }
            return taxes;
        });
    }
    // @todo KONTROLA? funguje spravne,
    getClients() {
        return this.httpClient
            .sendGetRequest(this.URL_GET_ALL_CLIENTS, {})
            .then(function (data) {
            let allClients = [];
            for (let index in data['clients']) {
                let allClientsData = data['clients'][index];
                allClients.push({
                    id: allClientsData['id'],
                    first_name: allClientsData['first_name'],
                    last_name: allClientsData['last_name'],
                    phone: allClientsData['phone'],
                    email: allClientsData['email'],
                });
            }
            return allClients;
        });
    }
}
