import * as React from "react";
import {Button, Col, Form, Row, Table} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPlus} from "@fortawesome/free-solid-svg-icons/faPlus";
import {library} from "@fortawesome/fontawesome-svg-core";
import {IClient} from "../invoiceClient";

library.add(faPlus);

interface IClientListProps {
    allClients: Array<IClient>,
    onAddClientToInvoice(client: IClient): void,
}

export class ClientList extends React.Component<IClientListProps, {}> {

    render(){
        return(
            <Table>
                <tbody>
                {this.props.allClients.map( (client: IClient) => {
                    return (
                        <tr>
                            <td>{client.first_name}</td>
                            <td>{client.last_name}</td>
                            <Button onClick={(e) => this.props.onAddClientToInvoice(client)}>
                                Vybrat
                            </Button>
                        </tr>)
                })}
                </tbody>
            </Table>
        );
    };
}