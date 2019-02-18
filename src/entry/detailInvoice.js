import * as React from "react";
import * as ReactDOM from "react-dom";
import { DetailInvoice } from "../components/detailInvoice";
const rootEl = document.getElementById('app-root');
ReactDOM.render(React.createElement(DetailInvoice, null), rootEl);
