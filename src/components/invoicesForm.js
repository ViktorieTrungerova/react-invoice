import * as React from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import { library } from "@fortawesome/fontawesome-svg-core";
library.add(faPlus);
export class InvoiceForm extends React.Component {
    constructor() {
        super(...arguments);
        this.calculatePriceWithTax = (item) => {
            return (100 + item.tax_percent) * item.price_without_tax / 100;
        };
        this.calculateTotalPrice = (item) => {
            const totalPrice = ((100 + item.tax_percent) * item.price_without_tax / 100) * item.count;
            return totalPrice;
        };
        this.handleSubmit = (e) => {
            e.preventDefault();
            const invoice = {
                client: this.props.client,
                items: this.props.items,
            };
            this.props.onSubmit(invoice);
            location.replace("http://localhost/react-invoice/www/listingInvoices.html");
        };
        this.handleChangeCount = (e, item) => {
            const count = Number(e.target.value);
            this.props.onChangeCount(count, item);
        };
        this.handleChangePriceWithoutTax = (e, item) => {
            const price_without_tax = e.target.value;
            this.props.onChangePriceWithoutTax(price_without_tax, item);
        };
        this.handleChangeTax = (e, item) => {
            const tax_percent = Number(e.target.value);
            this.props.onChangeTax(tax_percent, item);
        };
        this.handleChangeName = (e, item) => {
            const name = e.target.value;
            this.props.onChangeName(name, item);
        };
        this.handleAddRowItem = (e) => {
            const item = {
                name: '',
                count: 0,
                price_without_tax: 0,
                price_with_tax: 0,
                tax_percent: 0,
            };
            this.props.onAddRowItem(item);
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
                this.props.items.map((item) => {
                    return (React.createElement(Row, { className: 'margin-top' },
                        React.createElement(Col, null,
                            React.createElement(Form.Label, null, "N\u00E1zev:"),
                            React.createElement(Form.Control, { type: "text", name: "name", onChange: (e) => { this.handleChangeName(e, item); } })),
                        React.createElement(Col, null,
                            React.createElement(Form.Label, null, "Po\u010Det:"),
                            React.createElement(Form.Control, { type: "number", name: "count", min: 1, onChange: (e) => { this.handleChangeCount(e, item); } })),
                        React.createElement(Col, null,
                            React.createElement(Form.Label, null, "Cena bez DPH:"),
                            React.createElement(Form.Control, { type: "text", name: "priceWithoutTax", onChange: (e) => { this.handleChangePriceWithoutTax(e, item); } })),
                        React.createElement(Col, null,
                            React.createElement(Form.Label, null, "Sazba dan\u011B:"),
                            React.createElement(Form.Control, { as: "select", name: "taxSelect", onChange: (e) => { this.handleChangeTax(e, item); } }, this.props.taxes.map((tax) => {
                                return (React.createElement("option", { value: tax.percent },
                                    tax.percent,
                                    " - ",
                                    tax.name));
                            }))),
                        React.createElement(Col, null,
                            React.createElement(Form.Label, null, "Cena s DPH:"),
                            React.createElement(Form.Control, { readOnly: true, type: "text", name: "priceWithTax", value: (this.calculatePriceWithTax(item)).toString() })),
                        React.createElement(Col, null,
                            React.createElement(Form.Label, null, "Cena celkem:"),
                            React.createElement(Form.Control, { readOnly: true, name: "priceTotal", value: (this.calculateTotalPrice(item)).toString() })),
                        React.createElement(Col, { className: 'position-bottom' },
                            React.createElement(Button, { className: 'margin-left', variant: 'danger', onClick: (e) => this.props.handleRemoveRowItem(item) }, "Odebrat polo\u017Eku"))));
                }),
                React.createElement("div", { className: 'text-align-r margin-top' },
                    React.createElement(Button, { className: 'margin-right', onClick: this.handleAddRowItem }, "P\u0159idat polo\u017Eku"),
                    React.createElement(Button, { type: "submit" }, "Ulo\u017Eit")))));
    }
    ;
}
