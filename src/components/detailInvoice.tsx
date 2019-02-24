import * as React from "react";
import {Container, Table} from "react-bootstrap";
import {IInvoice, IInvoiceItem, invoiceClient} from "../invoiceClient";


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
                        <h1 className={'margin-bottom'}>Detail Faktury</h1>
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
                            Položky faktury
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
                                        <td>{item.count}</td>
                                        <td>{item.price_without_tax}</td>
                                        <td>{item.tax_percent}</td>
                                        <td>{(this.calculatePriceWithTax(item)).toString()}</td>
                                        <td>{(this.calculateTotalPrice(item)).toString()}</td>
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
