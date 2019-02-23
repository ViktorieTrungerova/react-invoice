import * as React from "react";
import { invoiceClient } from "../invoiceClient";
import { InvoiceForm } from "./invoicesForm";
import { Container, Modal } from "react-bootstrap";
import PNotify from 'pnotify/dist/es/PNotify';
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
        this.handleSetCount = (count, item) => {
            this.state.items.map((stateItem, index) => {
                if (item === stateItem) {
                    this.state.items[index].count = count;
                }
            });
            this.setState(this.state);
        };
        this.handleSetPriceWithoutTax = (price_without_tax, item) => {
            this.state.items.map((stateItem, index) => {
                if (item === stateItem) {
                    this.state.items[index].price_without_tax = price_without_tax;
                }
            });
            this.setState(this.state);
        };
        this.handleSetTax = (tax_percent, item) => {
            this.state.items.map((stateItem, index) => {
                if (item === stateItem) {
                    this.state.items[index].tax_percent = tax_percent;
                }
            });
            this.setState(this.state);
        };
        this.handleSetName = (name, item) => {
            this.state.items.map((stateItem, index) => {
                if (item === stateItem) {
                    this.state.items[index].name = name;
                }
            });
            this.setState(this.state);
        };
        this.handleAddRowItem = (item) => {
            this.state.items.push(item);
            this.setState(this.state);
        };
        this.handleRemoveRowItem = (item) => {
            alert('Opravdu chcete položku odstranit?');
            this.state.items.map((stateItem, index, array) => {
                if (item === stateItem) {
                    array.splice(index, 1);
                }
                this.setState(this.state);
            });
            PNotify.success({
                text: "Položka byla odebrána",
                type: 'notice',
                delay: 2000,
                stack: {
                    "dir1": "up",
                    "dir2": "left",
                    "firstpos1": 50,
                    "firstpos2": 25
                }
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
            items: [],
            count: 0,
            price_without_tax: 0,
            tax_percent: 0,
            name: '',
        };
    }
    render() {
        if (typeof this.state === "undefined")
            return;
        return (React.createElement("div", null,
            React.createElement(Container, { className: 'page-content' },
                React.createElement(InvoiceForm, { onSearchClient: this.handleShow, client: this.state.client, taxes: this.state.taxes, onSubmit: this.handleSaveInvoice, onChangeCount: this.handleSetCount, onChangePriceWithoutTax: this.handleSetPriceWithoutTax, onAddRowItem: this.handleAddRowItem, onChangeName: this.handleSetName, handleRemoveRowItem: this.handleRemoveRowItem, onChangeTax: this.handleSetTax, items: this.state.items }),
                React.createElement(Modal, { show: this.state.show, onHide: this.handleClose },
                    React.createElement(Modal.Header, { closeButton: true },
                        React.createElement(Modal.Title, null, "V\u00FDpis klient\u016F")),
                    React.createElement(Modal.Body, null,
                        React.createElement(ClientList, { allClients: this.state.clients, onAddClientToInvoice: this.handleAddClientToInvoice }))))));
    }
}
