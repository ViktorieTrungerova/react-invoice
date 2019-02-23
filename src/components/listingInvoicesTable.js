import * as React from "react";
import { Button, Col, Row, Table } from "react-bootstrap";
export class ListingInvoicesTable extends React.Component {
    render() {
        return (React.createElement("div", null,
            React.createElement(Row, null,
                React.createElement(Col, null,
                    React.createElement(Table, { striped: true, bordered: true, hover: true },
                        React.createElement("thead", null,
                            React.createElement("tr", null,
                                React.createElement("th", null, "Jm\u00E9no"),
                                React.createElement("th", null, "P\u0159\u00EDjmen\u00ED"),
                                React.createElement("th", null, "Telefon"),
                                React.createElement("th", null, "Email"),
                                React.createElement("th", null))),
                        React.createElement("tbody", null, this.props.invoices.map((invoice) => {
                            return (React.createElement("tr", null,
                                React.createElement("td", null, invoice.client.first_name),
                                React.createElement("td", null,
                                    " ",
                                    invoice.client.last_name),
                                React.createElement("td", null,
                                    " ",
                                    invoice.client.phone),
                                React.createElement("td", null,
                                    " ",
                                    invoice.client.email),
                                React.createElement("td", { className: 'text-align-center' },
                                    React.createElement(Button, null, "Detail"),
                                    React.createElement(Button, { className: 'margin-left', variant: 'danger', onClick: (e) => this.props.handleRemoveInvoice(invoice) }, "Smazat"))));
                        })))))));
    }
    ;
}
