import * as React from "react";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPlus} from "@fortawesome/free-solid-svg-icons/faPlus";
import {library} from "@fortawesome/fontawesome-svg-core";
import {IClient, IInvoice, ITaX} from "../invoiceClient";

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
            <Form className={'form'} onSubmit={this.handleSubmit}>
                <Form.Group>
                    <Form.Label>Klient:</Form.Label>
                    <Form.Control readOnly
                        defaultValue={this.props.client ? (this.props.client.first_name + ' ' + this.props.client.last_name) : ''}
                        name="client"
                    />
                    <div className={'text-align-r'}>
                        <Button variant="primary" onClick={this.props.onSearchClient}>
                            <FontAwesomeIcon icon="plus" />
                        </Button>
                    </div>
                </Form.Group>
                <Row className={'margin-top'}>
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
                        <Form.Control type="text" name="priceWithTax"/>
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
                </Row>
                <div  className={'text-align-r margin-top'}>
                <Button type="submit">
                    Uložit
                </Button>
                </div>
            </Form>
        );
    };

    handleSubmit= (e) => {
        e.preventDefault();

        const item= {
            name: e.target.elements['name'].value,
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
    }
}
