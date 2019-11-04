import React from "react";
import {
  View, Text, StyleSheet, ActivityIndicator, Keyboard, TextInput, TouchableOpacity, KeyboardAvoidingView
} from "react-native";
import { Item, Input, Icon, Button } from "native-base";
import Toast from 'react-native-simple-toast';
import { strings } from '../i18n/TranslationsConfig';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol
} from 'react-native-responsive-screen';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Loading } from '../Actions/homeActions'
import basicConfig from '../Actions/BasicConfigAction'
const demo = require("../Config/ConfigUrl").url.demo;

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mail: "",
      firstname: "",
      lastname: "",
      errorMsgDisplayMail: "",
      errorMsgDisplayFname: "",
      errorMsgDisplayLname: "",
      data: [],
      Loading: false,
      azure: false
    };
  }

  componentDidMount() {
    lor(this);
  }

  componentWillMount() {
    this.props.Loading(false)
    rol();
  }

  async onclickFunction() {
    Keyboard.dismiss()
    if (this.state.mail.trim() == "") {
      this.setState({ errorMsgDisplayMail: strings.login.required[0] });
    }
    else {
      var pattern = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z]{2,4})+$/;
      if (pattern.test(this.state.mail) && this.state.mail.toLowerCase().includes(".com" || ".in")) {
        this.props.Loading(true)
        await this.props.basicConfig(this.state.mail.split("@")[1])
        if (this.props.tenant != "") {
          this.setState({
            errorMsgDisplayMail: "",
            errorMsgDisplayFname: "",
            errorMsgDisplayLname: "",
            azure: true
          });
          this.props.getCredentials({
            mail,
            firstname,
            lastname,
            azure
          } = this.state);
        }
        else {
          this.props.Loading(false)
          this.setState({ errorMsgDisplayMail: strings.login.notregister[0] });
        }
      }
      else {
        this.props.Loading(false)
        this.setState({ errorMsgDisplayMail: strings.login.invalidEmail[0] });
      }
    }
  }
  async callDemobtn() {
    Keyboard.dismiss()
    if (this.state.mail.trim() == "" && this.state.firstname.trim() == "" && this.state.lastname.trim() == "") {
      this.setState({
        errorMsgDisplayMail: strings.login.required[0],
        errorMsgDisplayFname: strings.login.required[0],
        errorMsgDisplayLname: strings.login.required[0]
      });
    } else
      if (this.state.mail.trim() == "") {
        this.setState({ errorMsgDisplayMail: strings.login.required[0] });
      }
      else if (this.state.firstname.trim() == "") {
        this.setState({ errorMsgDisplayFname: strings.login.required[0] });
      } else if (this.state.lastname.trim() == "") {
        this.setState({ errorMsgDisplayLname: strings.login.required[0] });
      }
      else {
        var pattern = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z]{2,4})+$/;
        if (pattern.test(this.state.mail) && this.state.mail.toLowerCase().includes(".com" || ".in")) {
          this.props.Loading(true)
          await this.props.basicConfig(this.state.mail.split("@")[1])
          if (this.props.tenant == "demo") {
            this.setState({
              errorMsgDisplayMail: "",
              errorMsgDisplayFname: "",
              errorMsgDisplayLname: "",
            });

            this.props.getCredentials({
              email: this.state.mail,
              firstname: this.state.firstname,
              lastname: this.state.lastname,
              tenant: "demo"
            })
          }
        }
        else {
          this.setState({ errorMsgDisplayMail: strings.login.invalidEmail[0] });
          this.props.Loading(false)
        }
      }

  }
  render() {
    const styles = StyleSheet.create({
      container: {
        justifyContent: "center",
      },
      username: {
        flexDirection: "row"
      },
      textInput: {
        marginLeft: 10,
        marginRight: 20,
        color: "#fff",
        borderBottomColor: "#fff",
        borderBottomWidth: 0.6,
        width: wp("75%"),
        height: 50
      },
      button: {
        alignSelf: "center",
        backgroundColor: "#FF3366",
        paddingHorizontal: wp("20%"),
        paddingVertical: hp("1.8%"),
        borderRadius: 30,
        justifyContent: 'center',
        marginTop: 30
      },
      error: {
        fontSize: 10,
        color: "#3744a6"
      },
      errorView: {
        position: "absolute",
        bottom: -17,
        marginLeft: 10,
      }
    });
    return (
      <View style={styles.container}>
        <View>
          <Item style={{ borderColor: "transparent", marginLeft: 20 }}>
            <Icon
              active
              type="AntDesign"
              name="mail"
              style={{ color: "#fff" }}
            />
            <View style={{ flex: 1, flexDirection: "row" }}>
              <TextInput
                style={styles.textInput}
                keyboardType="email-address"
                placeholder={strings.login.email_address[0]}
                placeholderTextColor={"#fff"}
                value={this.state.mail}
                onChangeText={text => {
                  this.setState({ mail: text, errorMsgDisplayMail: "" });
                }}
                onSubmitEditing={() => { demo ? this.firstnameInput.focus() : this.onclickFunction() }}
              />
              <View style={styles.errorView}>
                <Text style={styles.error}>
                  {this.state.errorMsgDisplayMail}
                </Text>
              </View>
            </View>
          </Item>
        </View>
        {demo ?
          <View>
            <View style={{ marginTop: 10 }}>
              <Item style={{ borderColor: "transparent", marginLeft: 20 }}>
                <Icon
                  active
                  type="AntDesign"
                  name="user"
                  style={{ color: "#fff" }}
                />
                <View style={{ flex: 1, flexDirection: "row" }}>
                  <TextInput
                    style={styles.textInput}
                    placeholder={strings.scheduleCallBack.firstName[0]}
                    placeholderTextColor={"#fff"}
                    value={this.state.firstname}
                    ref={input => { this.firstnameInput = input; }}
                    onSubmitEditing={() => { this.lastnameInput.focus(); }}
                    onChangeText={text => {
                      this.setState({
                        firstname: text,
                        errorMsgDisplayFname: ""
                      });
                    }}
                  />
                  <View style={styles.errorView}>
                    <Text style={styles.error}>
                      {this.state.errorMsgDisplayFname}
                    </Text>
                  </View>
                </View>
              </Item>
            </View>
            <View style={{ marginTop: 10 }}>
              <Item style={{ borderColor: "transparent", marginLeft: 20 }}>
                <Icon
                  active
                  type="AntDesign"
                  name="user"
                  style={{ color: "#fff" }}
                />
                <View style={{ flex: 1, flexDirection: "row" }}>
                  <TextInput
                    style={styles.textInput}
                    placeholder={strings.scheduleCallBack.lastName[0]}
                    placeholderTextColor={"#fff"}
                    value={this.state.lastname}
                    onChangeText={text => {
                      this.setState({
                        lastname: text,
                        errorMsgDisplayLname: ""
                      });
                    }}
                    ref={input => { this.lastnameInput = input; }}
                    onSubmitEditing={() => this.callDemobtn()}
                  />
                  <View style={styles.errorView}>
                    <Text style={styles.error}>
                      {this.state.errorMsgDisplayLname}
                    </Text>
                  </View>
                </View>
              </Item>
            </View>
          </View> :
          <View></View>
        }
        <View style={{ marginTop: 20 }}>
          <Button
            style={styles.button}
            disabled={this.props.net_access || this.props.load}
            onPress={() => demo ? this.callDemobtn() : this.onclickFunction()}
          >
            {
              this.props.load == false ? <Text style={{ color: '#fff', }}>{strings.login.sign_in[0]}</Text> : <ActivityIndicator size="large" color="#FFF" />
            }
          </Button>
        </View>
      </View >
    );
  }
}


function mapStateToProps(state) {
  return {
    style: state.theme.style,
    status: state.theme.status,
    load: state.home.load,
    tenant: state.theme.tenant
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    Loading,
    basicConfig
  }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)