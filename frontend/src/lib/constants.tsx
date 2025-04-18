const VITE_DEV = import.meta.env.VITE_DEV;
const API_PROD_BASE_URL = import.meta.env.VITE_PROD_BASE_API_URL;
const API_DEVE_BASE_URL = import.meta.env.VITE_DEVE_BASE_API_URL;

var PROCEED_PAYMENT_URL: string = "";
var GET_PESAPAL_AUTH_TOKEN_URL: string = "";
var SUBMIT_PESAPAL_ORDER_REQ_URL: string = "";
var GET_PESAPAL_TRANSACTION_STATUS_URL: string = "";

var baseUrl: string = "";

if (VITE_DEV === "development") {
  GET_PESAPAL_AUTH_TOKEN_URL =
    "https://cybqa.pesapal.com/pesapalv3/api/Auth/RequestToken";
  GET_PESAPAL_TRANSACTION_STATUS_URL =
    "https://cybqa.pesapal.com/pesapalv3/api/Transactions/GetTransactionStatus";
  SUBMIT_PESAPAL_ORDER_REQ_URL =
    "https://cybqa.pesapal.com/pesapalv3/api/Transactions/SubmitOrderRequest";
  PROCEED_PAYMENT_URL =
    "https://cybqa.pesapal.com/pesapaliframe/PesapalIframe3/Index";

  baseUrl = API_DEVE_BASE_URL;
} else {
  PROCEED_PAYMENT_URL = "https://pay.pesapal.com/iframe/PesapalIframe3/Index";
  GET_PESAPAL_AUTH_TOKEN_URL =
    "https://pay.pesapal.com/v3/api/Auth/RequestToken";
  SUBMIT_PESAPAL_ORDER_REQ_URL =
    "https://pay.pesapal.com/v3/api/Transactions/SubmitOrderRequest";
  GET_PESAPAL_TRANSACTION_STATUS_URL =
    "https://pay.pesapal.com/v3/api/Transactions/GetTransactionStatus";

  baseUrl = API_PROD_BASE_URL;
}

export {
  PROCEED_PAYMENT_URL,
  GET_PESAPAL_AUTH_TOKEN_URL,
  SUBMIT_PESAPAL_ORDER_REQ_URL,
  GET_PESAPAL_TRANSACTION_STATUS_URL,
  baseUrl,
};
