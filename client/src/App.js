import React,{Fragment,useEffect,useState} from 'react';
import {BrowserRouter as Router , Route,Switch} from 'react-router-dom'
import Landing from './components/layout/Landing'

import Dashboard from './components/home/dashboard'
import ImportStocks from './components/home/import_stocks'
import Stocks from './components/home/stocks'
import StocksHistory from './components/home/history'
import StocksOut from './components/home/export_stocks'
import Chart from './components/chart/chart'
import StocksChart from './components/chart/stocks'
import Login from './components/auth/Login'
import LoginCustomer from './components/login/customer'
import LoginStaff from './components/login/staff'
import ResetPassword from './components/login/reset_password'

import Zones from './components/home/zone'
import ListQrCode from './components/home/list_qrcode'
import Nav from './components/base/nav'
import GenPdf from './components/pdf/gen_pdf'
import Profile from './components/profile/user'
import CreateInbox from './components/inbox/create'
import ProfileEdit from './components/profile/edit_profile'
import ListInbox from './components/inbox/list'
import ListSendInbox from './components/inbox/list_send'
import DetailInbox from './components/inbox/inbox_detail'

import ChartHistory from './components/history'
import CurrentStocks from './components/warehouse/currentlist'
import StockDetail from './components/warehouse/stock_detail'
import ActionStocks from './components/warehouse/stocks_action'
import StocksOutStatus from './components/warehouse/stocks_out_status'
import StocksINOUTList from './components/warehouse/stocks_in_out_list'
import InvoiceDetail from './components/warehouse/invoice'
import CustomerReport from './components/report'
import AlertList from './components/profile/alert_list'
import NoteList from './components/profile/note_list'
//staff
import AdminListInbox from './components/admin/inbox/list'
import AdminListSendInbox from './components/admin/inbox/list_send'
import AdminCreateInbox from './components/admin/inbox/create'
import AdminCustomer from './components/admin/customer'
import AdminCustomerRegister from './components/admin/customer/register'
import AdminCurrentStocks from './components/admin/stocks/current_stocks'
import AdminImportStocks from './components/admin/stocks/import_stocks'
import AdminExportStocks from './components/admin/stocks/export_stocks'
import AdminReport from './components/admin/report'
import AdminManagerPage from './components/admin/staff/manager'
import AdminCreateStaff from './components/admin/staff/create'
import AdminEditStaff from './components/admin/staff/edit'
import AdminProfileUser from './components/admin/customer/detail'
import AdminRequests from './components/admin/inbox/requests'
import AdminStockDetail from './components/admin/stocks/stock'
import AdminWarehouse from './components/admin/stocks/warehouse'
import AdminInventory from './components/admin/stocks/inventory'
import AdminEditStock from './components/admin/stocks/edit_stock'
import AdminQRCODE from './components/warehouse/qr_code'
import AdminWarehouseManager from './components/admin/stocks/warehouse_manage'

import AdminEditNote from './components/admin/stocks/edit_note'
//redux
import {Provider} from 'react-redux';
import store from './store';
import PrivateRoute from './components/routing/privateRoute'
import {loadUser} from './actions/auth'
import './App.css'

import Modal from './components/custom/modal'
import Loading from './components/custom/loading'

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());

  },[]);

  return (

    <Provider store = {store} >
    <Router>
      <Loading />
      <Modal />
      <Nav >
      <Fragment >
        <Route exact path='/' component = {LoginCustomer} />

        <PrivateRoute exact path='/dashboard' component = {Dashboard} />
        <PrivateRoute exact path='/stocks' component = {Stocks} />
        <PrivateRoute exact path='/zones' component = {Zones} />
        <PrivateRoute exact path='/chart' component = {Chart} />
        <PrivateRoute exact path='/stocks_chart' component = {StocksChart} />
        <PrivateRoute exact path='/stocks_out' component = {StocksOut} />
        <PrivateRoute exact path='/gen_pdf' component = {GenPdf} />
        <PrivateRoute exact path='/qr_code/:id' component = {ListQrCode} />
        <PrivateRoute exact path='/create_inbox' component = {CreateInbox} />
        <PrivateRoute exact path='/list_inbox' component = {ListInbox} />
        <PrivateRoute exact path='/list_send_inbox' component = {ListSendInbox} />
        <PrivateRoute exact path='/detail_inbox' component = {DetailInbox} />
        <PrivateRoute exact path='/current_stocks' component = {CurrentStocks} />
        <PrivateRoute exact path='/action_stocks' component = {ActionStocks} />
        <PrivateRoute exact path='/stocks_out_status' component = {StocksOutStatus} />
        <PrivateRoute exact path='/stocks_in_out_list' component = {StocksINOUTList} />
        <PrivateRoute exact path='/customer_report' component = {CustomerReport} />
        <PrivateRoute exact path='/stock_detail/:stock_id' component = {StockDetail} />
        <PrivateRoute exact path='/invoice/:invoice_id' component = {InvoiceDetail} />
        
        <PrivateRoute exact path='/chart_history' component = {ChartHistory} />
        <PrivateRoute exact path='/profile' component = {Profile} />
        <PrivateRoute exact path='/profile_edit' component = {ProfileEdit} />
        <PrivateRoute exact path='/history' component = {StocksHistory} />
        <PrivateRoute exact path='/import_stocks' component = {ImportStocks} />
        <PrivateRoute exact path='/alert_list' component = {AlertList} />
        <PrivateRoute exact path='/note_list' component = {NoteList} />
        
        <PrivateRoute exact path='/admin_create_inbox' component = {AdminCreateInbox} />
        <PrivateRoute exact path='/admin_list_inbox' component = {AdminListInbox} />
        <PrivateRoute exact path='/admin_list_send_inbox' component = {AdminListSendInbox} />
        <PrivateRoute exact path='/admin_customer' component = {AdminCustomer} />
        <PrivateRoute exact path='/admin_customer_register' component = {AdminCustomerRegister} />
        <PrivateRoute exact path='/admin_current_stocks' component = {AdminCurrentStocks} />
        <PrivateRoute exact path='/admin_import_stocks' component = {AdminImportStocks} />
        <PrivateRoute exact path='/admin_export_stocks' component = {AdminExportStocks} />
        <PrivateRoute exact path='/admin_report' component = {AdminReport} />
        <PrivateRoute exact path='/admin_manage_staff' component = {AdminManagerPage} />
        <PrivateRoute exact path='/admin_create' component = {AdminCreateStaff} />
        <PrivateRoute exact path='/admin_edit' component = {AdminEditStaff} />
        <PrivateRoute exact path='/admin_requests' component = {AdminRequests} />
        <PrivateRoute exact path='/admin_stock' component = {AdminStockDetail} />
        <PrivateRoute exact path='/admin_warehouse' component = {AdminWarehouse} />
        <PrivateRoute exact path='/admin_warehouse_manager' component = {AdminWarehouseManager} />
        <PrivateRoute exact path='/admin_inventory' component = {AdminInventory} />
        <PrivateRoute exact path='/admin_edit_Stock/:stock_id' component = {AdminEditStock} />
        <PrivateRoute exact path='/admin_qr_code/:stock_id' component = {AdminQRCODE} />
        <PrivateRoute exact path='/admin_edit_note/:note_id' component = {AdminEditNote} />
        
        <PrivateRoute exact path='/admin_profile/:email' component = {AdminProfileUser} />
        {/* <Route exact path='/login' component = {Login} /> */}
        <Route exact path='/c_login' component = {LoginCustomer} />
        <Route exact path='/s_login' component = {LoginStaff} />
        <Route exact path='/reset_password/:token' component = {ResetPassword} />
      </Fragment>
      </Nav>
    </Router>
    </Provider>
  );
}

export default App;
