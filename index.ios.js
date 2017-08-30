import React from 'react'
import {
 StyleSheet,
 Text,
 View,
 AppRegistry,
} from 'react-native'

import { NativeRouter, Route, Link } from 'react-router-native'

import App from './app.js'


const FreshKeep = () => (
  <NativeRouter>
    <App />
  </NativeRouter>
)

AppRegistry.registerComponent('loginv3', () => FreshKeep);
