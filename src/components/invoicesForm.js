import * as React from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import { library } from "@fortawesome/fontawesome-svg-core";
import { ValidationForm, TextInput, SelectGroup } from "react-bootstrap4-form-validation";
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
        this.handleSubmit = (e, formData, inputs) => {
            e.preventDefault();
            console.log(e, formData, inputs);
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
            React.createElement(ValidationForm, { className: 'form', onSubmit: this.handleSubmit },
                React.createElement(Form.Group, null,
                    React.createElement(Row, null,
                        React.createElement(Col, null,
                            React.createElement(Form.Label, { htmlFor: "client" }, "Klient:"),
                            React.createElement(TextInput, { readOnly: true, defaultValue: this.props.client ? (this.props.client.first_name + ' ' + this.props.client.last_name) : '', name: "client", id: "client" })),
                        React.createElement(Col, { className: 'btn-add-client' },
                            React.createElement("div", { className: 'text-align-r' },
                                React.createElement(Button, { variant: "primary", onClick: this.props.onSearchClient },
                                    React.createElement(FontAwesomeIcon, { icon: "plus" })))))),
                this.props.items.map((item) => {
                    return (React.createElement(Row, { className: 'margin-top' },
                        React.createElement(Col, null,
                            React.createElement(Form.Group, null,
                                React.createElement(Form.Label, { htmlFor: "name" }, "N\u00E1zev:"),
                                React.createElement(TextInput, { type: "text", name: "name", id: "name", required: true, errorMessage: "Vypl\u0148te n\u00E1zev.", onChange: (e) => { this.handleChangeName(e, item); } }))),
                        React.createElement(Col, null,
                            React.createElement(Form.Group, null,
                                React.createElement(Form.Label, { htmlFor: "count" }, "Po\u010Det:"),
                                React.createElement(TextInput, { type: "number", name: "count", id: "count", min: 1, required: true, errorMessage: "Vypl\u0148te po\u010Det.", onChange: (e) => { this.handleChangeCount(e, item); } }))),
                        React.createElement(Col, null,
                            React.createElement(Form.Group, null,
                                React.createElement(Form.Label, { htmlFor: "priceWithoutTax" }, "Cena bez DPH:"),
                                React.createElement(TextInput, { type: "text", name: "priceWithoutTax", id: "priceWithoutTax", required: true, errorMessage: "Vypl\u0148te cenu bez DPH.", onChange: (e) => { this.handleChangePriceWithoutTax(e, item); } }))),
                        React.createElement(Col, null,
                            React.createElement(Form.Group, null,
                                React.createElement(Form.Label, { htmlFor: "taxSelect" }, "Sazba dan\u011B:"),
                                React.createElement(SelectGroup, { as: "select", name: "taxSelect", id: "taxSelect", onChange: (e) => { this.handleChangeTax(e, item); }, required: true, errorMessage: "Vyberte sazbu dan\u011B." },
                                    React.createElement("option", { value: "" }, "---Vybrat---"),
                                    this.props.taxes.map((tax) => {
                                        return (React.createElement("option", { value: tax.percent },
                                            tax.percent,
                                            " - ",
                                            tax.name));
                                    })))),
                        React.createElement(Col, null,
                            React.createElement(Form.Label, { htmlFor: "priceWithTax" }, "Cena s DPH:"),
                            React.createElement(Form.Control, { readOnly: true, type: "text", name: "priceWithTax", id: "priceWithTax", value: (this.calculatePriceWithTax(item)).toString() })),
                        React.createElement(Col, null,
                            React.createElement(Form.Label, { htmlFor: "priceWithTax" }, "Cena celkem:"),
                            React.createElement(Form.Control, { readOnly: true, name: "priceTotal", id: "priceTotal", value: (this.calculateTotalPrice(item)).toString() })),
                        React.createElement(Col, { className: 'position-bottom' },
                            React.createElement(Button, { className: 'margin-left', variant: 'danger', onClick: (e) => this.props.handleRemoveRowItem(item) }, "Odebrat polo\u017Eku"))));
                }),
                React.createElement("div", { className: 'text-align-r margin-top' },
                    React.createElement(Button, { className: 'margin-right', onClick: this.handleAddRowItem }, "P\u0159idat polo\u017Eku"),
                    React.createElement(Button, { type: "submit" }, "Ulo\u017Eit")))));
    }
    ;
}
