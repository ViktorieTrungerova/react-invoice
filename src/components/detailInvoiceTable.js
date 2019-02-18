import * as React from "react";
import { Table } from "react-bootstrap";
export class DetailInvoiceTable extends React.Component {
    render() {
        return (
        // @todo client podle ID?
        React.createElement(Table, null,
            React.createElement("thead", null,
                React.createElement("tr", null,
                    React.createElement("th", null, "Jm\u00E9no"),
                    React.createElement("th", null, "P\u0159\u00EDjmen\u00ED"),
                    React.createElement("th", null, "Telefon"),
                    React.createElement("th", null, "Email"))),
            React.createElement("tbody", null,
                React.createElement("tr", null))));
    }
}
