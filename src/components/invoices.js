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
        this.handleSaveInvoice = () => {
        };
        this.invoiceClient = new invoiceClient('http://localhost/react-invoice/www');
        this.invoiceClient.getTaxes().then((taxes) => {
            console.log('dane', taxes);
            this.setState({
                taxes: taxes,
            });
        });
        this.invoiceClient.getInvoice(1).then((invoice) => {
            console.log('faktura', invoice);
        });
        this.invoiceClient.getClients().then((clients) => {
            console.log('klienti', clients);
            this.setState({
                clients: clients,
            });
        });
        this.invoiceClient.getAllInvoices().then((invoices) => {
            console.log('faktury', invoices);
        });
        this.state = {
            show: false,
            clients: [],
            taxes: [],
        };
    }
    render() {
        if (typeof this.state === "undefined")
            return;
        return (React.createElement("div", null,
            React.createElement(Container, { className: 'page-content' },
                React.createElement(InvoiceForm, { onSearchClient: this.handleShow, client: this.state.client, taxes: this.state.taxes, onSubmit: this.handleSaveInvoice }),
                React.createElement(Modal, { show: this.state.show, onHide: this.handleClose },
                    React.createElement(Modal.Header, { closeButton: true },
                        React.createElement(Modal.Title, null, "V\u00FDpis klient\u016F")),
                    React.createElement(Modal.Body, null,
                        React.createElement(ClientList, { allClients: this.state.clients, onAddClientToInvoice: this.handleAddClientToInvoice }))))));
    }
}
