import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Navigator
} from 'react-native';

import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserPool,
  CognitoUserAttribute
} from 'react-native-aws-cognito-js';

import {
  Config,
  CognitoIdentityCredentials
} from 'aws-sdk-react-native-core';

import {
  withRouter,
} from 'react-router-native'


import Container from '../components/Container';
import Button from '../components/Button';
import Label from '../components/Label';

import appConfig from '../appconfig.js'


import { StackNavigator } from 'react-navigation';

class login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      username: '',
      password: '',
    };
  }

  validateForm() {
    return this.state.username.length > 0
      && this.state.password.length > 0;
  }

  handleUserNameChange = (text) => {
    this.setState({
      username: text
    });
  }

  handlePasswordChange = (text) => {
    this.setState({
      password: text
    });
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    this.setState({ isLoading: true });

    try {
      console.log("userHasAuthenticated: " + this.props.userHasAuthenticated);

      const userToken = await this.login
      this.props.userHasAuthenticated(true);
      this.props.history.push("/");
    }
    catch(e) {
      alert("e: " + e);
      this.setState({ isLoading: false });

    }
  }

  login = () => {
    const { username, password } = this.state;

    const userPool = new CognitoUserPool({
      UserPoolId: appConfig.cognito.USER_POOL_ID,
      ClientId: appConfig.cognito.APP_CLIENT_ID
    });

    const authenticationData = {
      Username: username,
      Password: password,
    };

    const cognitoUser = new CognitoUser({
          Username: username,
          Pool: userPool
    });

    console.log("authenticationData:" + authenticationData.Username + "," + authenticationData.password);
    const authenticationDetails = new AuthenticationDetails(authenticationData);


    console.log("un: " + username+ ",pass: " + password);


    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (result) => {
        console.log('access token: ' + result.getAccessToken().getJwtToken());
        // Config.credentials = new CognitoIdentityCredentials({
        //   IdentityPoolId: appConfig.IdentityPoolId,
        //   Logins: {
        //     [`cognito-idp.${appConfig.region}.amazonaws.com/${appConfig.UserPoolId}`]: result.getIdToken().getJwtToken()
        //   }
        // });
        alert('Success');
        //console.log(Config.credentials);
      },
      onFailure: (err) => {
        alert("err: " + err);
      },
      // newPasswordRequired: function(userAttributes, requiredAttributes) {
      //   newPassword="P@ssw0rd1"
      //   alert("requiredAttributes: "+requiredAttributes)
      //   const attributesData = {};
      //   cognitoUser.completeNewPasswordChallenge(newPassword, attributesData, this)
      // },
    });
  }

  press (){}

  render(){
    return (
      <ScrollView style={styles.scroll}>
        {/* <Container>
          <Button
            label="Forgot Login/Pass"
            styles={{button: styles.alignRight, label:styles.label}}
            onPress={this.press.bind(this)} />
        </Container> */}

        <Container controlId="username">
          <Label text="User Name" />
          <TextInput  autoFocus
                      autoCapitalize = 'none'
                      style={styles.textInput}
                      onChangeText={this.handleUserNameChange}/>
        </Container>
        <Container>
          <Label text="Password" />
          <TextInput
                      style={styles.textInput}
                      onChangeText={this.handlePasswordChange}/>
        </Container>
        <Container>
            <Button styles={{button: styles.transparentButton}}
                    onPress={this.press.bind(this)}>
                <View style={styles.inline}>
                    {/* <Icon name="facebook-official" size={30} color="#3B5699" /> */}
                    <Text style={[styles.buttonBlueText, styles.buttonBigText]}>  Connect </Text>
                    <Text style={styles.buttonBlueText}>with Facebook</Text>
                </View>
            </Button>
        </Container>
        <View style={styles.footer}>
          <Container>
              <Button
                  label="Sign In"
                  styles={{button: styles.primaryButton, label: styles.buttonWhiteText}}
                  onPress={this.handleSubmit.bind(this)} />
          </Container>
          <Container>
              <Button
                  label="CANCEL"
                  styles={{label: styles.buttonBlackText}}
                  onPress={this.press.bind(this)} />
          </Container>
        </View>
      </ScrollView>

    )
  }

}

const styles = StyleSheet.create({
  scroll:{
    padding: 30,
    flexDirection: 'column'
  },
  label:{
    color:'#0d8898',
    fontSize: 20
  },
  alignRight:{
    alignSelf:'flex-end'
  },
  textInput:{
    height: 30,
    fontSize: 20,
    backgroundColor: '#FFFFFF',
    borderColor: '#3B5699',
    borderBottomWidth: 1,
  },
  transparentButton:{
    marginTop: 30,
    borderColor: '#3B5699',
    borderWidth: 2
  },
  buttonBlueText:{
    fontSize: 20,
    color: '#3B5699'
  },
  buttonBigText:{
    fontSize: 20,
    fontWeight: 'bold'
  },
  inline: {
    flexDirection: 'row'
  },
  buttonWhiteText: {
    fontSize: 20,
    color: '#FFF',
  },
  buttonBlackText: {
      fontSize: 20,
      color: '#595856'
  },
  primaryButton: {
      backgroundColor: '#34A853'
  },
  footer: {
     marginTop: 20
  }
});


export default withRouter(login);
