import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView
} from 'react-native';
import NavigationBar from 'react-native-navbar';
import {withRouter, Link } from 'react-router-native'

import Routes from './routes';
import { authUser, signOutUser } from "./libs/awsLib";


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
      isAuthenticating: true
    };
  }

  handleLogout = event => {
    signOutUser();

    this.userHasAuthenticated(false);

    this.props.history.push("/login");
  }

  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  }

  async componentDidMount() {
    try {
      if (await authUser()) {
        this.userHasAuthenticated(true);
      }
    }
    catch(e) {
      console.log("Error in authUser: " + e);
    }

    this.setState({ isAuthenticating: false });
  }

  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated
    };
    return (
      !this.state.isAuthenticating &&
      <View style={styles.container}>
        <NavigationBar style={styles.navigationBar}
          title={
            <Link to="/" underlayColor='#f0f4f7'>
              <Text style={styles.title}>Fresh Keep</Text>
            </Link>

          }
          //leftButton={{ title: 'Back', }}
          rightButton={
            <Link to="/Login" underlayColor='#f0f4f7'>
              {this.state.isAuthenticated ?
                <Text  style={styles.login}>Logout</Text>
                :
                <Text  style={styles.login}>Sign-in</Text>
              }
            </Link>
          } />
        <Routes childProps={childProps}/>
      </View>
    );
  }
}

var styles = StyleSheet.create({
    container:{
      flex: 1,
    },
    navigationBar: {
      backgroundColor:'#000000'
    },
    title: {
      color:'#FFFFFF',
      fontWeight:'bold',
      fontSize:18,
    },
    login: {
      color:'#FFFFFF',
      fontSize:18,
      marginTop:5,
      marginRight:10,
    },
});

export default withRouter(App)
