import * as React from "react";
import {Button, Col, Form, Row} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPlus} from "@fortawesome/free-solid-svg-icons/faPlus";
import {library} from "@fortawesome/fontawesome-svg-core";
import {IClient, IInvoice, ITaX, IInvoiceItem} from "../invoiceClient";

library.add(faPlus);

interface IInvoiceFormProps {
    onSearchClient(): void,
    onSubmit(invoice: IInvoice): void,
    onChangeCount(count, item: IInvoiceItem): void,
    onChangePriceWithoutTax(priceWithoutTax, item: IInvoiceItem): void,
    onChangeTax(tax_percent, item: IInvoiceItem): void,
    onChangeName(name, item): void,
    onAddRowItem(item: IInvoiceItem): void,
    handleRemoveRowItem(item: IInvoiceItem): void
    items: Array<IInvoiceItem>,
    client?: IClient,
    taxes: Array<ITaX>,
}

export class InvoiceForm extends React.Component<IInvoiceFormProps, {}> {

    calculatePriceWithTax = (item: IInvoiceItem): number => {
        return ( 100 + item.tax_percent) * item.price_without_tax / 100;
    };

    calculateTotalPrice = (item: IInvoiceItem): number => {
        const totalPrice= (( 100 + item.tax_percent) * item.price_without_tax / 100) * item.count;
        return totalPrice;
    };


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

                    {this.props.items.map( (item: IInvoiceItem) => {
                        return(
                                <Row className={'margin-top'}>
                                    <Col>
                                        <Form.Label>Název:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="name"
                                            onChange={(e) => {this.handleChangeName(e, item)}}
                                        />
                                    </Col>
                                    <Col>
                                        <Form.Label>Počet:</Form.Label>
                                        <Form.Control
                                            type="number"
                                            name="count"
                                            min={1}
                                            onChange={(e) => {this.handleChangeCount(e, item)}}
                                        />
                                    </Col>
                                    <Col>
                                        <Form.Label>Cena bez DPH:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="priceWithoutTax"
                                            onChange={(e) => {this.handleChangePriceWithoutTax(e, item)}}
                                        />

                                    </Col>
                                    <Col>
                                        <Form.Label>Sazba daně:</Form.Label>

                                        <Form.Control
                                            as="select"
                                            name="taxSelect"
                                            onChange={(e) => {this.handleChangeTax(e, item)  }}
                                        >
                                            {this.props.taxes.map((tax: ITaX) => {
                                                return ( <option value={tax.percent}>{tax.percent} - {tax.name}</option>);
                                            })}
                                        </Form.Control>
                                    </Col>
                                    <Col>
                                        <Form.Label>Cena s DPH:</Form.Label>
                                        <Form.Control
                                            readOnly
                                            type="text"
                                            name="priceWithTax"
                                            value={(this.calculatePriceWithTax(item)).toString()}
                                        />
                                    </Col>
                                    <Col>
                                        <Form.Label>Cena celkem:</Form.Label>
                                        <Form.Control
                                            readOnly
                                            name="priceTotal"
                                            value={(this.calculateTotalPrice(item)).toString()}
                                        />
                                    </Col>
                                    <Col className={'position-bottom'}>
                                        <Button className={'margin-left'} variant={'danger'} onClick={(e) => this.props.handleRemoveRowItem(item)}>
                                            Odebrat položku
                                        </Button>
                                    </Col>
                                </Row>
                        );
                    })}
                    <div  className={'text-align-r margin-top'}>
                        <Button className={'margin-right'} onClick={this.handleAddRowItem}>
                            Přidat položku
                        </Button>
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

        const invoice = {
            client: this.props.client,
            items: this.props.items,
        };
       this.props.onSubmit(invoice);
       location.replace("http://localhost/react-invoice/www/listingInvoices.html")
    };

    handleChangeCount= (e, item) => {
        const count = Number(e.target.value);
        this.props.onChangeCount(count, item);
    };

    handleChangePriceWithoutTax= (e, item) => {
        const price_without_tax= e.target.value;
        this.props.onChangePriceWithoutTax(price_without_tax, item);
    };

    handleChangeTax= (e, item) => {
        const tax_percent= Number(e.target.value);
        this.props.onChangeTax(tax_percent, item);
    };

    handleChangeName= (e, item) => {
        const name= e.target.value;
        this.props.onChangeName(name, item);
    };

    handleAddRowItem= (e) => {
        const item= {
            name: '',
            count: 0,
            price_without_tax: 0,
            price_with_tax: 0,
            tax_percent: 0,
        };
        this.props.onAddRowItem(item);
    };

}
