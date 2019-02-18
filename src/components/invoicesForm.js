import * as React from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import { library } from "@fortawesome/fontawesome-svg-core";
library.add(faPlus);
export class InvoiceForm extends React.Component {
    constructor() {
        super(...arguments);
        this.handleSubmit = (e) => {
            e.preventDefault();
            const item = {
                name: e.target.elements['name'].value,
                count: e.target.elements['count'].value,
                price_without_tax: e.target.elements['priceWithoutTax'].value,
                price_with_tax: e.target.elements['priceWithTax'].value,
                tax_percent: e.target.elements['taxSelect'].value
            };
            const invoice = {
                client: this.props.client,
                items: [
                    item,
                ]
            };
            this.props.onSubmit(invoice);
            location.replace("http://localhost/react-invoice/www/listingInvoices.html");
        };
    }
    render() {
        return (React.createElement("div", null,
            React.createElement("h1", null, "P\u0159id\u00E1n\u00ED faktury"),
            React.createElement(Form, { className: 'form', onSubmit: this.handleSubmit },
                React.createElement(Form.Group, null,
                    React.createElement(Row, null,
                        React.createElement(Col, null,
                            React.createElement(Form.Label, null, "Klient:"),
                            React.createElement(Form.Control, { readOnly: true, defaultValue: this.props.client ? (this.props.client.first_name + ' ' + this.props.client.last_name) : '', name: "client" })),
                        React.createElement(Col, { className: 'btn-add-client' },
                            React.createElement("div", { className: 'text-align-r' },
                                React.createElement(Button, { variant: "primary", onClick: this.props.onSearchClient },
                                    React.createElement(FontAwesomeIcon, { icon: "plus" })))))),
                React.createElement("div", { id: 'items' },
                    React.createElement(Row, { className: 'margin-top', id: 'item' },
                        React.createElement(Col, null,
                            React.createElement(Form.Label, null, "N\u00E1zev:"),
                            React.createElement(Form.Control, { type: "text", name: "name" })),
                        React.createElement(Col, null,
                            React.createElement(Form.Label, null, "Po\u010Det:"),
                            React.createElement(Form.Control, { type: "number", name: "count" })),
                        React.createElement(Col, null,
                            React.createElement(Form.Label, null, "Cena bez DPH:"),
                            React.createElement(Form.Control, { type: "text", name: "priceWithoutTax" })),
                        React.createElement(Col, null,
                            React.createElement(Form.Label, null, "Cena s DPH:"),
                            React.createElement(Form.Control, { type: "text", name: "priceWithTax" })),
                        React.createElement(Col, null,
                            React.createElement(Form.Label, null, "Sazba dan\u011B:"),
                            React.createElement(Form.Control, { as: "select", name: "taxSelect" }, this.props.taxes.map((tax) => {
                                return (React.createElement("option", { value: tax.percent },
                                    tax.percent,
                                    " - ",
                                    tax.name));
                            }))),
                        React.createElement(Col, null,
                            React.createElement(Form.Label, null, "Cena celkem:"),
                            React.createElement(Form.Control, { readOnly: true, name: "priceTotal" })),
                        React.createElement(Col, { className: 'position-bottom' },
                            React.createElement(Button, null, "P\u0159idat polo\u017Eku"),
                            React.createElement(Button, { className: 'margin-left', variant: 'danger' }, "Odebrat polo\u017Eku")))),
                React.createElement("div", { className: 'text-align-r margin-top' },
                    React.createElement(Button, { type: "submit" }, "Ulo\u017Eit")))));
    }
    ;
}
