import * as React from "react";
import {IClient, IInvoice, invoiceClient, ITaX} from "../invoiceClient";
import {InvoiceForm} from "./invoicesForm";
import {Button, Container, Form, Modal} from "react-bootstrap";
import {ClientList} from "./clientList";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

interface IInvoicesState {
    show: boolean;
    clients: Array<IClient>,
    client?: IClient,
    taxes: Array<ITaX>,
}

export class Invoices extends React.Component<{}, IInvoicesState> {

    invoiceClient: invoiceClient;

    constructor(props, context) {
        super(props, context);
        this.invoiceClient = new invoiceClient('http://localhost/react-invoice/www');

        this.invoiceClient.getTaxes().then((taxes: Array<ITaX>) => {
           console.log('dane', taxes);
            this.setState({
                taxes: taxes,
            });
        });

        this.invoiceClient.getInvoice(1).then( (invoice) => { // @todo tady je neco v pi nejde nastavit dataovy typ
            console.log('faktura' , invoice);
        });

        this.invoiceClient.getClients().then( (clients: Array<IClient>) => {
            console.log('klienti' , clients);
            this.setState({
                clients: clients,
            });
        });
        this.invoiceClient.getAllInvoices().then( (invoices: Array<IInvoice>) => {
                    console.log('faktury' , invoices);
                });


        this.state = {
            show: false,
            clients: [],
            taxes:[],
        };
    }


    render(){
        if (typeof this.state === "undefined") return;

        return(

            <div>
                <Container className={'page-content'}>
                    <InvoiceForm onSearchClient={this.handleShow} client={this.state.client} taxes={this.state.taxes} onSubmit={this.handleSaveInvoice}/>
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

    handleSaveInvoice= () => {

    };
}

