import React from 'react';
import { Switch, Route } from 'react-router-native'

import Home from './containers/home';
import Login from './containers/login';
import AppliedRoute from './components/AppliedRoute';

export default ({childProps}) => (
  <Switch>
    <AppliedRoute path="/" exact component={Home} props={childProps}/>
    <AppliedRoute path="/login" exact component={Login} props={childProps}/>
  </Switch>
);
