/**
 * Azure Login Sdk View Screen
 */

import React, { Component } from "react";
import { StyleSheet, View, AsyncStorage } from 'react-native'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Loading } from '../Actions/homeActions'
import { logindetails } from '../Actions/CredentialActions'
import { ReactNativeAD, ADLoginView } from 'react-native-azure-ad'
import { StackActions, NavigationActions } from "react-navigation";
import fetchIvaRequest from '../Actions/IvaConfigAction';
import jwt from 'jwt-decode'
var config = {

}
class Azure extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      value: false,
      logout: Boolean
    }
  }
  async setCredentials(user) {
    this.props.logindetails(user);
    this.props.Loading(false)
    await this.props.fetchIvaRequest(user, this.props.url.ivaurl);
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: "Start" })]
    });
    this.props.navigation.dispatch(resetAction);

  }

  async setAsyncStorageToken(token, config, user) {
    await AsyncStorage.setItem('token', token)
    await AsyncStorage.setItem('user', JSON.stringify(user))
    await AsyncStorage.setItem('config', JSON.stringify(config))
  }
  componentDidMount() {
    config = this.props.navigation.state.params.config
    this.setState({
      value: true
    })
    new ReactNativeAD(config)

  }
  onError(error) {
    console.log(error)
  }
  render() {
    if (this.state.value) {
      return (
        <View style={styles.container}>
          <ADLoginView context={ReactNativeAD.getContext(config.client_id)}
            needLogout={this.state.logout}
            hideAfterLogin={true}
            onSuccess={this.onLoginSuccess.bind(this)}
          />
        </View>
      )
    }
    else {
      return (
        <View style={styles.container}>
        </View>
      )
    }
  }

  logout(e) {
    this.setState({
      logout: true
    })
  }

  onLoginSuccess(cred) {
    this.props.Loading(true)
    var access_token = cred['https://graph.microsoft.com'].access_token
    var decoded = jwt(access_token);
    var user = { idToken: access_token, mail: this.props.navigation.state.params.mail, email: decoded.email, firstname: decoded.name.split(" ")[0], lastname: decoded.name.split(" ")[1], exp: cred['https://graph.microsoft.com'].expires_on }
    this.setAsyncStorageToken(access_token, config, user)
    this.setCredentials(user)
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },

});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    logindetails,
    Loading,
    fetchIvaRequest,
  }, dispatch);
}
function mapStateToProps(state) {
  return {
    status: state.theme.status,
    sso: state.theme.sso,
    url: state.theme.url,
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Azure)