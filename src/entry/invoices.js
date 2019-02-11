import * as React from "react";
import * as ReactDOM from "react-dom";
import { Invoices } from "../components/invoices";
const rootEl = document.getElementById('app-root');
ReactDOM.render(React.createElement(Invoices, null), rootEl);
