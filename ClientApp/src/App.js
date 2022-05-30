import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import AuthorizeRoute from './components/api-authorization/AuthorizeRoute';
import ApiAuthorizationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { ApplicationPaths } from './components/api-authorization/ApiAuthorizationConstants';
import { IndexHome } from './components/IndexHome';
import { Warehouse } from './components/Warehouse';
import { Movement } from './components/Movement';
import { Product } from './components/Product';
import { Category } from './components/Category';
import { Transaction } from './components/Transaction';


import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={IndexHome} />
        <Route path='/counter' component={Counter} />
        <Route path='/suppliers' component={Transaction} />
        <Route path="/warehouses" component={Warehouse}></Route>
        <Route path="/movements" component={Movement}></Route>
        <Route path="/products" component={Product}></Route>
        <Route path="/categorys" component={Category}></Route>
        <AuthorizeRoute path='/fetch-data' component={FetchData} />
        <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes} />
      </Layout>
    );
  }
}
