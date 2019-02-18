import * as React from "react";
import {Button, Col, Row, Table} from "react-bootstrap";
import {IClient, IInvoice} from "../invoiceClient";


export interface IInvoiceTableProps {
    invoices: Array<IInvoice>,
}

export class ListingInvoicesTable extends React.Component<IInvoiceTableProps, {}> {

    render(){
        return(
            <div>
                        <Row>
                            <Col>
                                <Table striped bordered hover>
                                    <thead>
                                    <tr>
                                        <th>Jméno</th>
                                        <th>Příjmení</th>
                                        <th>Telefon</th>
                                        <th>Email</th>
                                        <th></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {this.props.invoices.map( (invoice: IInvoice) => {
                                        return(
                                    <tr>
                                        <td>{invoice.client.first_name}</td>
                                        <td> {invoice.client.last_name}</td>
                                        <td> {invoice.client.phone}</td>
                                        <td> {invoice.client.email}</td>
                                        <td className={'text-align-center'}>
                                        <Button>
                                        Detail
                                        </Button>
                                        <Button className={'margin-left'} variant={'danger'}>
                                            Smazat
                                        </Button>
                                        </td>

                                    </tr>
                                        );
                                    })}
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
            </div>
        );
    };
    }
