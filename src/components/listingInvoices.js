import * as React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { invoiceClient } from "../invoiceClient";
import { ListingInvoicesTable } from "./listingInvoicesTable";
import PNotify from 'pnotify/dist/es/PNotify';
export class ListingInvoices extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.handleRemoveInvoice = (invoice) => {
            this.state.invoices.map((stateInvoice, index, array) => {
                if (invoice === stateInvoice) {
                    this.invoiceClient.removeInvoice(invoice);
                    array.splice(index, 1);
                }
                this.setState(this.state);
            });
            PNotify.success({
                text: "Faktura byla odebrána",
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
        this.handleDetailInvoice = (invoice) => {
            this.state.invoices.map((stateInvoice) => {
                if (invoice === stateInvoice) {
                    this.invoiceClient.getInvoice(invoice.id);
                }
                this.setState(this.state);
                location.replace("http://localhost/react-invoice/www/detailInvoice.html?id=" + invoice.id);
            });
        };
        this.invoiceClient = new invoiceClient('http://localhost/react-invoice/www');
        this.invoiceClient.getAllInvoices().then((invoices) => {
            this.setState({
                invoices: invoices,
            });
        }).catch(() => {
            alert('Něco se pokazilo.');
        });
        this.state = {
            invoices: [],
        };
    }
    render() {
        return (React.createElement(Container, { className: 'margin-top' },
            React.createElement(Row, null,
                React.createElement(Col, null,
                    React.createElement("h1", null, "V\u00FDpis faktur")),
                React.createElement(Col, { className: 'text-align-r' },
                    React.createElement(Button, { href: 'http://localhost/react-invoice/www/index.html', variant: "primary" }, "P\u0159idat fakturu"))),
            React.createElement(ListingInvoicesTable, { invoices: this.state.invoices, handleRemoveInvoice: this.handleRemoveInvoice, handleDetailInvoice: this.handleDetailInvoice })));
    }
}
