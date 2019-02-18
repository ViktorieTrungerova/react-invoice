import * as React from "react";
import {Table} from "react-bootstrap";
import {IClient} from "../invoiceClient";

export interface IDetailInvoiceTableProps {
    // client: IClient
}

export class DetailInvoiceTable extends React.Component<IDetailInvoiceTableProps, {}> {

    render(){
        return(
            // @todo client podle ID?
            <Table>
                <thead>
                <tr>
                    <th>Jméno</th>
                    <th>Příjmení</th>
                    <th>Telefon</th>
                    <th>Email</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    {/*<td>{this.props.client.first_name}</td>*/}
                    {/*<td>{this.props.client.last_name}</td>*/}
                    {/*<td>{this.props.client.phone}</td>*/}
                    {/*<td>{this.props.client.email}</td>*/}
                </tr>
                </tbody>
            </Table>
        )}}
