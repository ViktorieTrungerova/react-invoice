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
