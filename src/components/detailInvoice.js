import * as React from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { invoiceClient } from "../invoiceClient";
import NumberFormat from 'react-number-format';
export class DetailInvoice extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.calculatePriceWithTax = (item) => {
            return (100 + item.tax_percent) * item.price_without_tax / 100;
        };
        this.calculateTotalPrice = (item) => {
            const totalPrice = ((100 + item.tax_percent) * item.price_without_tax / 100) * item.count;
            return totalPrice;
        };
        this.getQueryVariable = (variable) => {
            var query = window.location.search.substring(1);
            var vars = query.split("&");
            for (var i = 0; i < vars.length; i++) {
                var pair = vars[i].split("=");
                if (pair[0] == variable) {
                    return pair[1];
                }
            }
            return (false);
        };
        this.loadData = () => {
            const queryId = Number(this.getQueryVariable('id'));
            this.invoiceClient.getInvoice(queryId).then((invoice) => {
                this.setState({
                    invoice: invoice,
                });
            });
        };
        this.invoiceClient = new invoiceClient('http://localhost/react-invoice/www');
        this.loadData();
    }
    render() {
        if (this.state === null)
            return '';
        return (React.createElement(Container, { className: 'margin-top' }, this.state.invoice &&
            React.createElement("div", null,
                React.createElement(Row, null,
                    React.createElement(Col, null,
                        React.createElement("h1", { className: 'margin-bottom' }, "Detail Faktury")),
                    React.createElement(Col, { className: 'text-align-r' },
                        React.createElement(Button, { href: 'http://localhost/react-invoice/www/listingInvoices.html', variant: "primary" }, "V\u00FDpis faktur"))),
                React.createElement("h3", null, "Odb\u011Bratel:"),
                React.createElement(Table, { className: 'width-50' },
                    React.createElement("tbody", null,
                        React.createElement("tr", null,
                            React.createElement("th", null, "Jm\u00E9no:"),
                            React.createElement("td", null, this.state.invoice.client.first_name)),
                        React.createElement("tr", null,
                            React.createElement("th", null, "P\u0159\u00EDjmen\u00ED:"),
                            React.createElement("td", null, this.state.invoice.client.last_name)),
                        React.createElement("tr", null,
                            React.createElement("th", null, "Telefon:"),
                            React.createElement("td", null, this.state.invoice.client.phone)),
                        React.createElement("tr", null,
                            React.createElement("th", null, "Email:"),
                            React.createElement("td", null, this.state.invoice.client.email)))),
                React.createElement("h3", null, "Polo\u017Eky faktury:"),
                React.createElement(Table, null,
                    React.createElement("thead", null,
                        React.createElement("tr", null,
                            React.createElement("th", null, "N\u00E1zev:"),
                            React.createElement("th", null, "Po\u010Det:"),
                            React.createElement("th", null, "Cena bez DPH:"),
                            React.createElement("th", null, "Sazba dan\u011B:"),
                            React.createElement("th", null, "Cena s DPH:"),
                            React.createElement("th", null, "Cena celkem:"))),
                    React.createElement("tbody", null, this.state.invoice.items.map((item) => {
                        return (React.createElement("tr", null,
                            React.createElement("td", null, item.name),
                            React.createElement("td", null,
                                React.createElement(NumberFormat, { value: item.count, displayType: 'text', thousandSeparator: true, suffix: ' Ks' })),
                            React.createElement("td", null,
                                React.createElement(NumberFormat, { value: item.price_without_tax, displayType: 'text', thousandSeparator: ' ', suffix: ' Kč' })),
                            React.createElement("td", null,
                                React.createElement(NumberFormat, { value: item.tax_percent, displayType: 'text', thousandSeparator: true, suffix: ' %' })),
                            React.createElement("td", null,
                                React.createElement(NumberFormat, { value: (this.calculatePriceWithTax(item)).toFixed(2).toString(), displayType: 'text', thousandSeparator: ' ', suffix: ' Kč' })),
                            React.createElement("td", null,
                                React.createElement(NumberFormat, { value: (this.calculateTotalPrice(item)).toFixed(2).toString(), displayType: 'text', thousandSeparator: ' ', suffix: ' Kč' }))));
                    }))))));
    }
}
