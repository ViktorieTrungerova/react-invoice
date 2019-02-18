import * as React from "react";
import {DetailInvoiceTable} from "./detailInvoiceTable";
import {Container} from "react-bootstrap";
import {IClient} from "../invoiceClient";

interface IDetailInvoiceState {
    // client: IClient
}

export class DetailInvoice extends React.Component<{}, IDetailInvoiceState> {
    render(){
        return(
            <Container className={'margin-top'}>
                <h1>Detail Faktury</h1>
                {/*<DetailInvoiceTable client={this.state.client}/>*/}
            </Container>
        )}
}
