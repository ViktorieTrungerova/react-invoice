import * as React from "react";
import {Button, Col, Row, Table} from "react-bootstrap";
import {IInvoice} from "../invoiceClient";


export interface IInvoiceTableProps {
    invoices: Array<IInvoice>,
    handleRemoveInvoice(invoice: IInvoice): void,
    handleDetailInvoice(invoice: IInvoice): void,
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
                                        <Button onClick={(e) => this.props.handleDetailInvoice(invoice)}>
                                        Detail
                                        </Button>
                                        <Button className={'margin-left'} variant={'danger'} onClick={(e) => this.props.handleRemoveInvoice(invoice)}>
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
