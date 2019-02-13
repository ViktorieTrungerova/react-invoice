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
        };
    }
    render() {
        return (React.createElement(Form, { className: 'form', onSubmit: this.handleSubmit },
            React.createElement(Form.Group, null,
                React.createElement(Form.Label, null, "Klient:"),
                React.createElement(Form.Control, { readOnly: true, defaultValue: this.props.client ? (this.props.client.first_name + ' ' + this.props.client.last_name) : '' }),
                React.createElement("div", { className: 'text-align-r' },
                    React.createElement(Button, { variant: "primary", onClick: this.props.onSearchClient },
                        React.createElement(FontAwesomeIcon, { icon: "plus" })))),
            React.createElement(Row, { className: 'margin-top' },
                React.createElement(Col, null,
                    React.createElement(Form.Label, null, "N\u00E1zev:"),
                    React.createElement(Form.Control, { type: "text" })),
                React.createElement(Col, null,
                    React.createElement(Form.Label, null, "Po\u010Det:"),
                    React.createElement(Form.Control, { type: "number" })),
                React.createElement(Col, null,
                    React.createElement(Form.Label, null, "Cena:"),
                    React.createElement(Form.Control, { type: "text" })),
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
                    React.createElement(Form.Control, { readOnly: true }))),
            React.createElement("div", { className: 'text-align-r margin-top' },
                React.createElement(Button, null, "Ulo\u017Eit"))));
    }
    ;
}
