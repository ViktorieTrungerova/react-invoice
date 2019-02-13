import * as React from "react";
import { Button, Table } from "react-bootstrap";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import { library } from "@fortawesome/fontawesome-svg-core";
library.add(faPlus);
export class ClientList extends React.Component {
    render() {
        return (React.createElement(Table, null,
            React.createElement("tbody", null, this.props.allClients.map((client) => {
                return (React.createElement("tr", null,
                    React.createElement("td", null, client.first_name),
                    React.createElement("td", null, client.last_name),
                    React.createElement(Button, { onClick: (e) => this.props.onAddClientToInvoice(client) }, "Vybrat")));
            }))));
    }
    ;
}
