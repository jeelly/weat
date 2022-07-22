import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './shared/App';
import reportWebVitals from './reportWebVitals';

//redux
import { Provider } from 'react-redux';
import store from "./redux/store"
//portal
import {createPortal} from 'react-dom'
//ReactQuery
import {QueryClient, QueryClientProvider } from 'react-query';
import {ReactQueryDevtools} from "react-query/devtools" //리액트 쿼리 데브툴
//router-dom
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));

export const ReactPortal = ({children}) => {
	return createPortal(children, document.getElementById('portal'))
}

const queryClient = new QueryClient();

root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        {/* <ReactQueryDevtools initialIsOpen={true}/> */}
          <App />
        </QueryClientProvider>
    </Provider>
  </BrowserRouter>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
