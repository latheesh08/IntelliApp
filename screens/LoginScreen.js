import React from "react";
import {
  View, StyleSheet, ImageBackground, Image,
  Keyboard, Dimensions, AsyncStorage, Text,
  ToastAndroid, ActivityIndicator,NetInfo
} from "react-native";
import { Container, Content, Footer } from "native-base";
import LoginForm from "../components/LoginForm";
import { StackActions, NavigationActions } from "react-navigation";
import fetchStyle from '../Actions/ThemeActions'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Loading, SidebarTitle } from '../Actions/homeActions'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol
} from 'react-native-responsive-screen';
import jwt from 'jwt-decode'
import fetchIvaRequest from '../Actions/IvaConfigAction';
import { logindetails } from '../Actions/CredentialActions'
import { GoogleSignin, statusCodes, } from '@react-native-community/google-signin';
import Introduction from './IntroductionScreen'
import Toast from 'react-native-simple-toast';
const demo = require("../Config/ConfigUrl").url.demo;
const { width } = Dimensions.get('window');
import { strings } from '../i18n/TranslationsConfig';
var value = null
var time
var config = {}
class LoginScreen extends React.Component {
  constructor(props) {
    console.disableYellowBox = true;
    super(props);
    this.state = {
      isConnected: true,
      keyboardOpen: false,
      orientation: '',
      userInfo: '',
      terms: true,
      value: true,
    };
  }
  async componentWillMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        this.setState({
          keyboardOpen: true
        });
      }
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        this.setState({
          keyboardOpen: false
        });
      }
    );
  }
  componentWillUnmount() {
    rol();
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  handleConnectivityChange = isConnected => {
    this.setState({ isConnected });
};

  async componentDidMount() {
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
    var terms = await AsyncStorage.getItem('terms');
    if (terms == "true") {
      this.setState({ terms: false })
    }
    else {
      this.setState({ terms: true })
    }
    lor(this);
    value = await AsyncStorage.getItem('token');
    this.setState({ value: demo == false ? value != null ? true : false : false })
    this.getOrientation();
    if (demo == false) {
      var user = await AsyncStorage.getItem('user');
      var data = await AsyncStorage.getItem('data');
      user = JSON.parse(user)
      var data = JSON.parse(data)
      if (value != null) {
       time = setInterval(() => {
          if (new Date(user.exp * 1000) <= new Date()) {
            this.refreshToken()
          }
        }, 100);
        this.props.Loading(true)
        this.getCredentials(user, data)

      }
    }
  }

  getOrientation = () => {
    if (this.refs.rootView) {
      if (Dimensions.get('window').width < Dimensions.get('window').height) {
        this.setState({ orientation: 'portrait' });
      }
      else {
        this.setState({ orientation: 'landscape' });
      }
    }
  }
  async removeAsync() {
    await AsyncStorage.removeItem('token')
    await AsyncStorage.removeItem('email')
    await AsyncStorage.removeItem('config')
  }
  refreshToken() {
    clearInterval(time)
    this._signOut()
    this.removeAsync()
    this.props.SidebarTitle("home")
    this.props.navigation.dispatch(StackActions.reset({ index: 0, actions: [NavigationActions.navigate({ routeName: "Login" })] }))
  }
  _signOut = async () => {
    try {
      // await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      this.setState({ user: null });
    } catch (error) {
    }
  };

  async setCredentials(user) {
    this.props.logindetails(user);
    await this.props.fetchIvaRequest(user, this.props.url.ivaurl);
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: "Start" })]
    });
    this.props.navigation.dispatch(resetAction);
  }
  async getCredentials(user, data) {
    await this.props.fetchStyle(data);
    if (demo == true) {
      this.setCredentials(user);
    }
    else {
      if (value != null) {
        this.setCredentials(user);
      }
      else if (data.tenant == "demo") {
        GoogleSignin.configure({
          scopes: ["openid", "email", "profile"],
          appWebDomain: "accounts.google.com/o/oauth2/auth",
          response_type: `token id_token`,
          webClientId:
          '533809336953-fdtqupb0dji6corvtm4sn1bu469k2f2i.apps.googleusercontent.com' //customer
        });
        await AsyncStorage.setItem('data', JSON.stringify(this.props.data))
        this._signIn()
      }
      else {
        if (this.props.status == "success") {
          this.props.logindetails(user);
          await AsyncStorage.setItem('data', JSON.stringify(this.props.data))
          this.props.Loading(false)
          config = {
            client_id: this.props.sso.clientId,
            resources: [
              'https://graph.microsoft.com',
            ]
          };
          this.props.navigation.navigate('Azure_login', { config: config, mail: user.mail });
        }
        else {
          this.props.Loading(false)
          Toast.show(`${this.props.status}`);
        }
      }
    }
  }

  async setAsyncStorageToken(token, config, user) {
    await AsyncStorage.setItem('token', token)
    await AsyncStorage.setItem('user', JSON.stringify(user))
    await AsyncStorage.setItem('config', config)
  }
  _signIn = async () => {
try {
    const userInfo = await GoogleSignin.signIn();
    var decoded = jwt(userInfo.idToken);
    var user = { idToken: userInfo.idToken, mail, email: decoded.email, firstname: decoded.name.split(" ")[0], lastname: decoded.name.split(" ")[1], exp: decoded.exp }
    this.setAsyncStorageToken(userInfo.idToken, "", user)
    this.setCredentials(user)

    this.props.Loading(false)
}catch (error) {
  this.props.Loading(false)
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      console.log('SIGN_IN_CANCELLED');
      } else if (error.code === statusCodes.IN_PROGRESS) {
      console.log('IN_PROGRESS');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      console.log('PLAY_SERVICES_NOT_AVAILABLE');
      } else {
      console.log('dont');
      }
      }

  };


  render() {
    const styles = StyleSheet.create({
      container: {
      },
      image: {
        resizeMode: "cover",
        width: wp("100%"),
        height: hp("100%"),
        position: "absolute",
      },
    });
    if (this.state.terms == true) {
      return (
        <Introduction onpress={() => {
          this.setState({
            terms: false
          })
        }} />
      )
    }
    else {
      return (
        <View ref="rootView" style={{ flex: 1 }} >
          <ImageBackground

            source={require("../assets/uni.png")}
            style={styles.image}
            resizeMode='stretch'
          >
         <Content
                bounces={false}
                contentContainerStyle={{
                  justifyContent: "space-between",
                  flexGrow: 1,

                }}
              >
       { !this.state.isConnected ? <MiniOfflineSign /> : null}
                <View style={{ alignItems: 'center', marginTop: hp("6%"), }}>
                  <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
                    <Text style={{ color: "black", fontSize: 25, fontWeight: "bold" }}>
                      {strings.welcome.welcome[0]}
                    </Text>
                    <View style={{ flexDirection: "row", flexWrap: "nowrap", justifyContent: "center" }}>
                      <Text style={{ color: "black", fontSize: 25, fontWeight: "bold" }}> InteliApp</Text>
                      <Text style={{ color: "black", fontWeight: "bold", fontSize: 15, }}>
                        TM</Text>
                    </View>
                  </View>
                </View>
                {demo == false && this.state.value ? <View>
                  {/* <Text>{typeof value}</Text> */}
                  <View style={{
                    alignItems: "center",
                    justifyContent: "center"
                  }}>
                    <ActivityIndicator size="large" color="#FFF" />
                    <Text style={{ color: "#FFF" }}>{strings[this.props.status][0]}....</Text>
                  </View>
                </View> :
                  <View
                    style={styles.logoContainer}>
                    <LoginForm
                      navigation={this.props.navigation}
                      net_access = {!this.state.isConnected}
                      getCredentials={(user) => {
                        this.getCredentials(user, this.props.data);
                      }}
                      errorMsgDisplayMail={this.state.errorMsgDisplayMail}
                      errorMsgDisplayFname={this.state.errorMsgDisplayFname}
                      errorMsgDisplayLname={this.state.errorMsgDisplayLname}
                    />

                  </View>

                }
                <View style={{ alignSelf: 'center', flexDirection: 'column', bottom: hp('2%') }}>
                  <Image
                    style={{ resizeMode: "contain", width: 200, height: 40 }}
                    source={require("../assets/footerImage.png")}

                  />
                  <Text style={{ color: "#FFF", fontSize: 11 }}>Service desk at your finger tip</Text>
                </View>
                <Text style={{ right: 10, bottom: 10, position: "absolute", fontSize: 8, color: "#FFF" }}>V 0.2</Text>
              </Content>

          </ImageBackground>
        </View>

      );
    }
  }
}
const offline_styles = StyleSheet.create({
  offlineContainer: {
      zIndex : 999,
    backgroundColor: '#BA0C2F',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width,
    position: 'absolute',
  },
  offlineText: { color: '#fff' }
});
function MiniOfflineSign() {
  return (
    <View style={offline_styles.offlineContainer}>
      <Text style={offline_styles.offlineText}>{strings.net_failure[0]}</Text>
    </View>
  );
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    logindetails,
    fetchStyle,
    fetchIvaRequest,
    Loading,
    SidebarTitle
  }, dispatch);
}
function mapStateToProps(state) {
  return {
    status: state.theme.status,
    sso: state.theme.sso,
    data: state.theme,
    url: state.theme.url,
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)