import * as React from "react";
import {Button, Col, Container, Row, Table} from "react-bootstrap";
import {IInvoice, IInvoiceItem, invoiceClient} from "../invoiceClient";
import NumberFormat from 'react-number-format';


interface IDetailInvoiceState {
    invoice: IInvoice,
    item: IInvoiceItem,
}

export class DetailInvoice extends React.Component<{}, IDetailInvoiceState> {
    invoiceClient: invoiceClient;

    calculatePriceWithTax = (item: IInvoiceItem): number => {
        return ( 100 + item.tax_percent) * item.price_without_tax / 100;
    };

    calculateTotalPrice = (item: IInvoiceItem): number => {
        const totalPrice= (( 100 + item.tax_percent) * item.price_without_tax / 100) * item.count;
        return totalPrice;
    };

    constructor(props, context) {
        super(props, context);
        this.invoiceClient = new invoiceClient('http://localhost/react-invoice/www');
        this.loadData();
    }


    render(){
        if (this.state === null) return '';
        return(
            <Container className={'margin-top'}>
                {this.state.invoice &&
                    <div>
                        <Row>
                            <Col>
                                <h1 className={'margin-bottom'}>Detail Faktury</h1>
                            </Col>
                            <Col className={'text-align-r'}>
                                <Button href={'http://localhost/react-invoice/www/listingInvoices.html'} variant="primary">Výpis faktur</Button>
                            </Col>
                        </Row>
                        <h3>
                            Odběratel:
                        </h3>
                        <Table className={'width-50'}>
                            <tbody>
                                <tr>
                                    <th>Jméno:</th>
                                    <td>{this.state.invoice.client.first_name}</td>
                                </tr>
                                <tr>
                                    <th>Příjmení:</th>
                                    <td>{this.state.invoice.client.last_name}</td>
                                </tr>
                                <tr>
                                    <th>Telefon:</th>
                                    <td>{this.state.invoice.client.phone}</td>
                                </tr>
                                <tr>
                                    <th>Email:</th>
                                    <td>{this.state.invoice.client.email}</td>
                                </tr>
                            </tbody>
                        </Table>

                        <h3>
                            Položky faktury:
                        </h3>
                        <Table>
                                <thead>
                                <tr>
                                    <th>Název:</th>
                                    <th>Počet:</th>
                                    <th>Cena bez DPH:</th>
                                    <th>Sazba daně:</th>
                                    <th>Cena s DPH:</th>
                                    <th>Cena celkem:</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.invoice.items.map((item: IInvoiceItem) => {
                                    return(
                                        <tr>
                                        <td>{item.name}</td>
                                        <td>
                                            <NumberFormat value={item.count} displayType={'text'} thousandSeparator={true} suffix={' Ks'}/>
                                        </td>
                                        <td>
                                            <NumberFormat value={item.price_without_tax} displayType={'text'} thousandSeparator={' '} suffix={' Kč'}/>
                                         </td>
                                        <td>
                                            <NumberFormat value={item.tax_percent} displayType={'text'} thousandSeparator={true} suffix={' %'}/>
                                        </td>
                                        <td>
                                            <NumberFormat value={(this.calculatePriceWithTax(item)).toFixed(2).toString()} displayType={'text'} thousandSeparator={' '} suffix={' Kč'}/>
                                        </td>
                                        <td>
                                            <NumberFormat value={(this.calculateTotalPrice(item)).toFixed(2).toString()} displayType={'text'} thousandSeparator={' '} suffix={' Kč'}/>
                                         </td>
                                    </tr>);

                                })}
                                </tbody>
                            </Table>
                    </div>
                }
            </Container>
        )}

   getQueryVariable = (variable) => {
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i=0;i<vars.length;i++) {
            var pair = vars[i].split("=");
            if(pair[0] == variable){return pair[1];}
        }
        return(false);
    };

    loadData= () => {
        const queryId = Number(this.getQueryVariable('id'));
             this.invoiceClient.getInvoice(queryId).then((invoice: IInvoice) => {
                 this.setState({
                     invoice: invoice,
                 });
             });
    }
}
