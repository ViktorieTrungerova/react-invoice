import * as React from "react";
import { invoiceClient } from "../invoiceClient";
import { InvoiceForm } from "./invoicesForm";
export class Invoices extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.invoiceClient = new invoiceClient('http://localhost/react-invoice/www');
        this.invoiceClient.getTaxes().then((tax) => {
            console.log('dane', tax);
        });
        this.invoiceClient.getInvoice(1).then((invoice) => {
            console.log('faktura', invoice);
        });
        this.invoiceClient.getClients().then((client) => {
            console.log('klienti', client);
        });
        this.invoiceClient.getAllInvoices().then((invoices) => {
            console.log('faktury', invoices);
        });
    }
    render() {
        if (typeof this.state === "undefined")
            return;
        return (React.createElement("div", null,
            React.createElement(InvoiceForm, null)));
    }
}
