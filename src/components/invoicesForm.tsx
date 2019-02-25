import * as React from "react";
import {Button, Col, Form, Row} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPlus} from "@fortawesome/free-solid-svg-icons/faPlus";
import {library} from "@fortawesome/fontawesome-svg-core";
import {IClient, IInvoice, ITaX, IInvoiceItem} from "../invoiceClient";
import { ValidationForm, TextInput, SelectGroup, Checkbox, Radio } from "react-bootstrap4-form-validation";

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
                <ValidationForm className={'form'} onSubmit={this.handleSubmit} >
                    <Form.Group>
                        <Row>
                            <Col>
                                <Form.Label htmlFor="client">Klient:</Form.Label>
                                <TextInput    readOnly
                                              defaultValue={this.props.client ? (this.props.client.first_name + ' ' + this.props.client.last_name) : ''}
                                              name="client"
                                              id="client"
                                />
                            </Col>
                            <Col className={'btn-add-client'}>
                                <div className={'text-align-r'}>
                                    <Button variant="primary" onClick={this.props.onSearchClient}>
                                        <FontAwesomeIcon icon="plus" />
                                    </Button>
                                </div>
                            </Col>
                            <Col className={'buttons'}>
                                <div  className={'text-align-r margin-top'}>
                                    <Button className={'margin-right'} onClick={this.handleAddRowItem}>
                                        Přidat položku
                                    </Button>
                                    <Button type="submit">
                                        Uložit fakturu
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                    </Form.Group>

                    {this.props.items.map( (item: IInvoiceItem) => {
                        return(
                                <Row className={'margin-top'}>
                                    <Col>
                                        <Form.Group>
                                            <Form.Label  htmlFor="name">Název:</Form.Label>
                                            <TextInput
                                                type="text"
                                                name="name"
                                                id="name"
                                                required
                                                errorMessage="Vyplňte název."
                                                onChange={(e) => {this.handleChangeName(e, item)}}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group>
                                        <Form.Label htmlFor="count">Počet v Ks:</Form.Label>
                                        <TextInput
                                            type="number"
                                            name="count"
                                            id="count"
                                            min={1}
                                            required
                                            errorMessage="Vyplňte počet."
                                            onChange={(e) => {this.handleChangeCount(e, item)}}
                                        />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group>
                                        <Form.Label htmlFor="priceWithoutTax">Cena bez DPH v Kč:</Form.Label>
                                        <TextInput
                                            type="text"
                                            name="priceWithoutTax"
                                            id="priceWithoutTax"
                                            required
                                            errorMessage="Vyplňte cenu bez DPH."
                                            onChange={(e) => {this.handleChangePriceWithoutTax(e, item)}}
                                        />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group>
                                        <Form.Label htmlFor="taxSelect">Sazba daně v %:</Form.Label>
                                        <SelectGroup
                                            as="select"
                                            name="taxSelect"
                                            id="taxSelect"
                                            onChange={(e) => {this.handleChangeTax(e, item)  }}
                                            required errorMessage="Vyberte sazbu daně."
                                        >
                                            <option value="">---Vybrat---</option>
                                            {this.props.taxes.map((tax: ITaX) => {
                                                return ( <option value={tax.percent}>{tax.percent} - {tax.name}</option>);
                                            })}
                                        </SelectGroup>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Label htmlFor="priceWithTax">Cena s DPH v Kč:</Form.Label>
                                        <Form.Control
                                            readOnly
                                            type="text"
                                            name="priceWithTax"
                                            id="priceWithTax"
                                            value={(this.calculatePriceWithTax(item)).toString()}
                                        />
                                    </Col>
                                    <Col>
                                        <Form.Label htmlFor="priceWithTax">Cena celkem v Kč:</Form.Label>
                                        <Form.Control
                                            readOnly
                                            name="priceTotal"
                                            id="priceTotal"
                                            value={(this.calculateTotalPrice(item)).toString()}
                                        />
                                    </Col>
                                    <Col className={'position-center'}>
                                        <Button className={'margin-left'} variant={'danger'} onClick={(e) => this.props.handleRemoveRowItem(item)}>
                                            Odebrat položku
                                        </Button>
                                    </Col>
                                </Row>
                        );
                    })}
                </ValidationForm>
            </div>

        );
    };

    handleSubmit= (e, formData, inputs) => {
        e.preventDefault();
        console.log(e, formData, inputs);

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
