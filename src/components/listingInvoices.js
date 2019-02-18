import * as React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { invoiceClient } from "../invoiceClient";
import { ListingInvoicesTable } from "./listingInvoicesTable";
export class ListingInvoices extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.invoiceClient = new invoiceClient('http://localhost/react-invoice/www');
        this.invoiceClient.getAllInvoices().then((invoices) => {
            this.setState({
                invoices: invoices,
            });
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
            React.createElement(ListingInvoicesTable, { invoices: this.state.invoices })));
    }
}
