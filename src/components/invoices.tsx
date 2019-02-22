import * as React from "react";
import {IClient, IInvoice, IInvoiceItem, invoiceClient, ITaX} from "../invoiceClient";
import {InvoiceForm} from "./invoicesForm";
import {Container, Modal} from "react-bootstrap";
import {ClientList} from "./clientList";

interface IInvoicesState {
    show: boolean;
    clients: Array<IClient>,
    client?: IClient,
    taxes: Array<ITaX>,
    count: number,
    price_without_tax: number,
    tax_percent: number,
    total_price:number,
    items: Array<IInvoiceItem>,
}

export class Invoices extends React.Component<{}, IInvoicesState> {

    invoiceClient: invoiceClient;

    constructor(props, context) {
        super(props, context);
        this.invoiceClient = new invoiceClient('http://localhost/react-invoice/www');

        this.invoiceClient.getTaxes().then((taxes: Array<ITaX>) => {
            this.setState({
                taxes: taxes,
            });
        });

        this.invoiceClient.getClients().then( (clients: Array<IClient>) => {
            this.setState({
                clients: clients,
            });
        });

        this.state = {
            show: false,
            clients: [],
            taxes:[],
            items:[],
            count: 0,
            price_without_tax: 0,
            tax_percent: 0,
            total_price: 0,
        };
    }


    render(){
        if (typeof this.state === "undefined") return;

        return(

            <div>
                <Container className={'page-content'}>
                    <InvoiceForm
                        onSearchClient={this.handleShow}
                        client={this.state.client}
                        taxes={this.state.taxes}
                        onSubmit={this.handleSaveInvoice}
                        onChangeCount={this.handleSetCount}
                        onChangePriceWithoutTax={this.handleSetPriceWithoutTax}
                        onAddRowItem={this.handleAddRowItem}
                        count={this.state.count}
                        price_without_tax={this.state.price_without_tax}
                        tax_percent={this.state.tax_percent}
                        onChangeTax={this.handleSetTax}
                        onChangeTotalPrice={this.handleSetTotalPrice}
                        items={this.state.items}

                    />
                    <Modal show={this.state.show} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Výpis klientů</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <ClientList allClients={this.state.clients} onAddClientToInvoice={this.handleAddClientToInvoice}/>
                        </Modal.Body>
                    </Modal>
                </Container>
            </div>
        );
    }

    handleClose= () => {
        this.setState({ show: false });
    };

    handleShow= () => {
        this.setState({ show: true });
    };

    handleAddClientToInvoice= (client: IClient) => {
        this.setState({
            client: client,
            show:false
        })
    };

    handleSaveInvoice= (invoice: IInvoice) => {
        this.invoiceClient.saveInvoice(invoice);
    };

    handleSetCount= (count) => {
        this.setState({
            count: count
        })
    };

    handleSetPriceWithoutTax= (price_without_tax) => {
        this.setState({
            price_without_tax: price_without_tax,
        })
    };

    handleSetTax= (tax_percent) => {
        this.setState({
            tax_percent: tax_percent,
        })
    };

    handleSetTotalPrice= (total_price) => {
        this.setState({
            tax_percent: total_price,
        })
    };

    handleAddRowItem= (item:IInvoiceItem) => {
        this.state.items.push(item);
        this.setState(this.state);
    }

}

