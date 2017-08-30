import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView
} from 'react-native';

import Label from '../components/Label';

export default class home extends React.Component {
    render(){
      return (
        <View style={styles.container}>
          <Text style={styles.headline}>Welcome To</Text>
          <Text style={styles.greenline}>Fresh Keep</Text>
        </View>
      );
    }
}


var styles = StyleSheet.create({

    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#b5b5b5',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headline: {
      color:'#FFFFFF',
      fontWeight: 'bold',
      fontSize: 20,
    },
    greenline: {
      color:'#89ff91',
      fontWeight: 'bold',
      fontSize: 25,
    },
});
