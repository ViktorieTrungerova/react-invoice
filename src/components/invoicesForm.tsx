import * as React from "react";
import {Button, Col, Form, Row} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPlus} from "@fortawesome/free-solid-svg-icons/faPlus";
import {library} from "@fortawesome/fontawesome-svg-core";
import {IClient, IInvoice, ITaX, IInvoiceItem} from "../invoiceClient";

library.add(faPlus);

interface IInvoiceFormProps {
    onSearchClient():void,
    onSubmit(invoice: IInvoice):void,
    client?: IClient,
    taxes: Array<ITaX>,
}

export class InvoiceForm extends React.Component<IInvoiceFormProps, {}> {

    render(){
        return(
            <div>
                <h1>Přidání faktury</h1>
                <Form className={'form'} onSubmit={this.handleSubmit}>
                    <Form.Group>
                        <Row>
                            <Col>
                                <Form.Label>Klient:</Form.Label>
                                <Form.Control readOnly
                                              defaultValue={this.props.client ? (this.props.client.first_name + ' ' + this.props.client.last_name) : ''}
                                              name="client"
                                />
                            </Col>
                            <Col className={'btn-add-client'}>
                                <div className={'text-align-r'}>
                                    <Button variant="primary" onClick={this.props.onSearchClient}>
                                        <FontAwesomeIcon icon="plus" />
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                    </Form.Group>
                    <div id={'items'}>
                        <Row className={'margin-top'} id={'item'}>
                            <Col>
                                <Form.Label>Název:</Form.Label>
                                <Form.Control type="text" name="name"/>
                            </Col>
                            <Col>
                                <Form.Label>Počet:</Form.Label>
                                <Form.Control type="number" name="count"/>
                            </Col>
                            <Col>
                                <Form.Label>Cena bez DPH:</Form.Label>
                                <Form.Control type="text" name="priceWithoutTax"/>
                            </Col>
                            <Col>
                                <Form.Label>Cena s DPH:</Form.Label>
                                <Form.Control readOnly type="text" name="priceWithTax">

                                </Form.Control>
                            </Col>
                            <Col>
                                <Form.Label>Sazba daně:</Form.Label>

                                <Form.Control as="select" name="taxSelect">
                                    {this.props.taxes.map((tax: ITaX) => {
                                        return ( <option value={tax.percent}>{tax.percent} - {tax.name}</option>);
                                    })}
                                </Form.Control>
                            </Col>
                            <Col>
                                <Form.Label>Cena celkem:</Form.Label>
                                <Form.Control  readOnly name="priceTotal" />
                            </Col>
                            <Col className={'position-bottom'}>
                                <Button>
                                    Přidat položku
                                </Button>
                                <Button className={'margin-left'} variant={'danger'}>
                                    Odebrat položku
                                </Button>
                            </Col>
                        </Row>
                    </div>
                    <div  className={'text-align-r margin-top'}>
                        <Button type="submit">
                            Uložit
                        </Button>
                    </div>
                </Form>
            </div>

        );
    };

    handleSubmit= (e) => {
        e.preventDefault();

        const item= {
            name: e.target.elements['name'].value,
            count: e.target.elements['count'].value,
            price_without_tax: e.target.elements['priceWithoutTax'].value,
            price_with_tax: e.target.elements['priceWithTax'].value,
            tax_percent: e.target.elements['taxSelect'].value
        };

        const invoice = {
            client: this.props.client,
            items:[
                item,
            ]
        };
       this.props.onSubmit(invoice);
       location.replace("http://localhost/react-invoice/www/listingInvoices.html")
    };
}
