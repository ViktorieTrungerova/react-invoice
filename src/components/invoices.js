import * as React from "react";
import { invoiceClient } from "../invoiceClient";
import { InvoiceForm } from "./invoicesForm";
import { Container, Modal } from "react-bootstrap";
import { ClientList } from "./clientList";
export class Invoices extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.handleClose = () => {
            this.setState({ show: false });
        };
        this.handleShow = () => {
            this.setState({ show: true });
        };
        this.handleAddClientToInvoice = (client) => {
            this.setState({
                client: client,
                show: false
            });
        };
        this.handleSaveInvoice = (invoice) => {
            this.invoiceClient.saveInvoice(invoice);
        };
        this.handleSetCount = (count) => {
            this.setState({
                count: count
            });
        };
        this.handleSetPriceWithoutTax = (price_without_tax) => {
            this.setState({
                price_without_tax: price_without_tax,
            });
        };
        this.handleSetTax = (tax_percent) => {
            this.setState({
                tax_percent: tax_percent,
            });
        };
        this.handleSetTotalPrice = (total_price) => {
            this.setState({
                tax_percent: total_price,
            });
        };
        this.invoiceClient = new invoiceClient('http://localhost/react-invoice/www');
        this.invoiceClient.getTaxes().then((taxes) => {
            this.setState({
                taxes: taxes,
            });
        });
        this.invoiceClient.getClients().then((clients) => {
            this.setState({
                clients: clients,
            });
        });
        this.state = {
            show: false,
            clients: [],
            taxes: [],
            count: 0,
            price_without_tax: 0,
            tax_percent: 0,
            total_price: 0,
        };
    }
    render() {
        if (typeof this.state === "undefined")
            return;
        return (React.createElement("div", null,
            React.createElement(Container, { className: 'page-content' },
                React.createElement(InvoiceForm, { onSearchClient: this.handleShow, client: this.state.client, taxes: this.state.taxes, onSubmit: this.handleSaveInvoice, onChangeCount: this.handleSetCount, onChangePriceWithoutTax: this.handleSetPriceWithoutTax, count: this.state.count, price_without_tax: this.state.price_without_tax, tax_percent: this.state.tax_percent, onChangeTax: this.handleSetTax, onChangeTotalPrice: this.handleSetTotalPrice }),
                React.createElement(Modal, { show: this.state.show, onHide: this.handleClose },
                    React.createElement(Modal.Header, { closeButton: true },
                        React.createElement(Modal.Title, null, "V\u00FDpis klient\u016F")),
                    React.createElement(Modal.Body, null,
                        React.createElement(ClientList, { allClients: this.state.clients, onAddClientToInvoice: this.handleAddClientToInvoice }))))));
    }
}
