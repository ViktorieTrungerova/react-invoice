import * as React from "react";
import {Button, Col, Container, Row} from "react-bootstrap";
import {IInvoice, invoiceClient} from "../invoiceClient";
import {ListingInvoicesTable} from "./listingInvoicesTable";
import PNotify from 'pnotify/dist/es/PNotify';


interface IListingInvoicesState {
    invoices: Array<IInvoice>,

}

export class ListingInvoices extends React.Component<{}, IListingInvoicesState> {
    invoiceClient: invoiceClient;

    constructor(props, context) {
        super(props, context);
        this.invoiceClient = new invoiceClient('http://localhost/react-invoice/www');

        this.invoiceClient.getAllInvoices().then( (invoices: Array<IInvoice> ) => {
                this.setState({
                    invoices: invoices,
                });
            }).catch(()=> {
            alert('Něco se pokazilo.');
        });

        this.state = {
            invoices: [],
        };
    }

    render(){
        return(
            <Container className={'margin-top'}>
                <Row>
                    <Col>
                        <h1>Výpis faktur</h1>
                    </Col>
                    <Col className={'text-align-r'}>
                        <Button href={'http://localhost/react-invoice/www/index.html'} variant="primary">Přidat fakturu</Button>
                    </Col>
                </Row>
                <ListingInvoicesTable invoices={this.state.invoices} handleRemoveInvoice={this.handleRemoveInvoice} handleDetailInvoice={this.handleDetailInvoice}/>
            </Container>

        );
    }

    handleRemoveInvoice= (invoice: IInvoice) => {
        this.state.invoices.map((stateInvoice: IInvoice, index,array) => {
            if (invoice === stateInvoice) {
                this.invoiceClient.removeInvoice(invoice);
                array.splice(index, 1);
            }
            this.setState(this.state);
        });

        PNotify.success({
            text: "Faktura byla odebrána",
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

    handleDetailInvoice= (invoice: IInvoice) => {
        this.state.invoices.map((stateInvoice: IInvoice) => {
            if (invoice === stateInvoice) {
               this.invoiceClient.getInvoice(invoice.id);
            }
            this.setState(this.state);
            location.replace("http://localhost/react-invoice/www/detailInvoice.html?id=" + invoice.id)
        });

    };
    }


