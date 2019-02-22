import * as React from "react";
import {IClient, IInvoice, IInvoiceItem, invoiceClient, ITaX} from "../invoiceClient";
import {InvoiceForm} from "./invoicesForm";
import {Container, Modal} from "react-bootstrap";
import PNotify from 'pnotify/dist/es/PNotify';
import {ClientList} from "./clientList";

interface IInvoicesState {
    show: boolean;
    clients: Array<IClient>,
    client?: IClient,
    taxes: Array<ITaX>,
    count: number,
    name: string,
    price_without_tax: number,
    tax_percent: number,
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
            name: '',
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
                        onChangeName={this.handleSetName}
                        handleRemoveRowItem={this.handleRemoveRowItem}
                        onChangeTax={this.handleSetTax}
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
        console.log(invoice);
    };

    handleSetCount= (count, item: IInvoiceItem) => {

        this.state.items.map((stateItem: IInvoiceItem, index) => {
            if (item === stateItem) {
                this.state.items[index].count= count;
            }
        });
        this.setState(this.state);
    };

    handleSetPriceWithoutTax= (price_without_tax, item: IInvoiceItem) => {
        this.state.items.map((stateItem: IInvoiceItem, index) => {
            if (item === stateItem) {
                this.state.items[index].price_without_tax = price_without_tax;
            }

        });
        this.setState(this.state);
    };

    handleSetTax= (tax_percent, item: IInvoiceItem) => {
        this.state.items.map((stateItem: IInvoiceItem, index) => {
            if (item === stateItem) {
                this.state.items[index].tax_percent = tax_percent;
            }

        });
        this.setState(this.state);
    };

    handleSetName= (name, item: IInvoiceItem) => {
        this.state.items.map((stateItem: IInvoiceItem, index) => {
            if (item === stateItem) {
                this.state.items[index].name = name;
            }

        });
        this.setState(this.state);
    };

    handleAddRowItem= (item:IInvoiceItem) => {
        this.state.items.push(item);
        this.setState(this.state);
    };

    handleRemoveRowItem= (item: IInvoiceItem) => {
        alert('Opravdu chtece položku odstranit?');
        this.state.items.map((stateItem: IInvoiceItem, index, array) => {
            if (item === stateItem) {
                array.splice(index, 1);
            }
            this.setState(this.state);
        });

        PNotify.success({
            text: "Položka byla odebrána",
            type: 'notice',
            delay: 2000,
            stack: {
                "dir1": "up",
                "dir2": "left",
                "firstpos1": 50,
                "firstpos2": 25
            }
        });

    };
}

