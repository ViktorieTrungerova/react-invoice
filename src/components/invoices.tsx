import * as React from "react";
import {IClient, IInvoice, invoiceClient, ITaX} from "../invoiceClient";
import {InvoiceForm} from "./invoicesForm";

interface IInvoicesState {

}

export class Invoices extends React.Component<{}, IInvoicesState> {

    invoiceClient: invoiceClient;

    constructor(props, context) {
        super(props, context);
        this.invoiceClient = new invoiceClient('http://localhost/react-invoice/www');

        this.invoiceClient.getTaxes().then((tax: Array<ITaX>) => {
           console.log('dane', tax);
        });

        this.invoiceClient.getInvoice(1).then( (invoice) => { // @todo tady je neco v pici nejde nastavit dataovy typ
            console.log('faktura' , invoice);
        });

        this.invoiceClient.getClients().then( (client: Array<IClient>) => {
            console.log('klienti' , client);
        });
        this.invoiceClient.getAllInvoices().then( (invoices: Array<IInvoice>) => {
                    console.log('faktury' , invoices);
                });

    }


    render(){
        if (typeof this.state === "undefined") return;

        return(

            <div>
                <InvoiceForm/>
            </div>
        );
    }

}

