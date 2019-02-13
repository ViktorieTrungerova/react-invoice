import * as React from "react";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPlus} from "@fortawesome/free-solid-svg-icons/faPlus";
import {library} from "@fortawesome/fontawesome-svg-core";
import {IClient, ITaX} from "../invoiceClient";

library.add(faPlus);

interface IInvoiceFormProps {
    onSearchClient():void,
    onSubmit(invoice):void,
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
                        <Form.Control type="text"/>
                    </Col>
                    <Col>
                        <Form.Label>Počet:</Form.Label>
                        <Form.Control type="number"/>
                    </Col>
                    <Col>
                        <Form.Label>Cena:</Form.Label>
                        <Form.Control type="text"/>
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
                        <Form.Control  readOnly />
                    </Col>
                </Row>
                <div  className={'text-align-r margin-top'}>
                <Button>
                    Uložit
                </Button>
                </div>
            </Form>
        );
    };

    handleSubmit= (e) => {
        e.preventDefault();

    }
}
