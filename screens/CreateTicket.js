
/**
 * Create ticket Screen
 */
import React from "react";
import {
  Container,Content
} from 'native-base';
import {
  ScrollView, Text, TouchableOpacity, TextInput, StyleSheet,
  Keyboard, AsyncStorage, ToastAndroid, View, ActivityIndicator
} from 'react-native'

import Toast from 'react-native-simple-toast';
import HeaderSearch from "../components/HeaderSearch";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol
} from 'react-native-responsive-screen';
import { strings } from '../i18n/TranslationsConfig';
import fetchCreateTicket from '../Actions/CreateTicketAction'
import { ticketUpdate } from '../Actions/TicketingAction';
import { SidebarTitle } from '../Actions/homeActions'

class OverviewScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      loading: "",
      character: 1024
    }
  }
  async componentDidMount() {
    lor(this);
    token = await AsyncStorage.getItem('token');
    const { navigation } = this.props;
    this.focusListener = navigation.addListener('didFocus', () => {
      this.setState({
        title: "",
        description: "",
        loading: "",
        character: 1024
      });
    });
  }
  componentWillUnmount() {
    rol();
    this.focusListener.remove();
  }
  // on create ticket function 
  async onPress() {
    Keyboard.dismiss();
    this.setState({
      loading: "btn"
    })
    if (this.state.title != "" && this.state.description != "") {
      await this.props.fetchCreateTicket(this.state, this.props.url.creaTicketUrl, token)
      this.setState({
        title: "",
        description: "",
        character: 20
      })
      if (this.props.createTicket.responseStatus.statusCode == "Success") {
        Toast.show(`${this.props.createTicket.responseStatus.statusMessage}`);
        this.setState({
          loading: ""
        })
        this.props.ticketUpdate(this.props.data, this.props.createTicket.ticketDetails)
        this.props.navigation.navigate("OpenTicket");
        this.props.SidebarTitle("openTicket")
      }
    }
    else {

      this.setState({
        loading: ""
      })
      Toast.show(`${strings.createTicket.required[0]}`);
    }
  }
  //create ticket button
  renderButton() {
    inputStyle = StyleSheet.create({
      container: {},
      btn: {
        backgroundColor: this.props.style.palette.primary.main,
        alignItems: "center",
        paddingVertical: hp("2%"),
        borderRadius: wp("0.9%"),
        paddingHorizontal: wp("22%")
      },
      buttonView: {
        alignSelf: "center",
        bottom: hp("10%"),
        position: 'absolute',
      },
    })
    if (this.state.loading == "btn") {
      return (
        <View style={{
          flex: 1,
          justifyContent: 'center'
        }} >
          <ActivityIndicator size="large" color="#5db2e4" />
        </View>
      )
    }
    else {
      return (
        <View style={inputStyle.buttonView}>
          <TouchableOpacity
            style={inputStyle.btn}
            onPress={() => { this.onPress() }}>
            <Text style={[inputStyle.textbody, { color: "#ffffff" }]}>{strings.createTicket.submit[0].toUpperCase()}</Text>
          </TouchableOpacity>
        </View>
      )
    }
  }

  render() {
    inputStyle = StyleSheet.create({
      container: {},
      form: {
        height: hp("86%"),
        marginHorizontal: wp("3%"),
        marginVertical: hp("0.2%"),
      },
      inputConatainer: {
        borderWidth: 1,
        borderColor: this.props.style.palette.primary.main,
        alignItems: "flex-start",
        justifyContent: "flex-start",
        marginBottom: hp("0.2%"),
        borderRadius: wp("1.5%"),
        height: hp("1.4%") * wp("1.4%"),
      },
      inputLabel: {
        marginTop: hp("3%"),
      },
      txt: {
        fontSize: hp("0.8%") * wp("0.8%"),
        fontWeight: "300",
        color: '#000519'
      },
    })
    return (
      <Container style={inputStyle.container}>
        <HeaderSearch navigation={this.props.navigation} title={strings.createTicket.headline[0]} />
        <Content style={{ flex: 1, backgroundColor: "#fff", flexDirection: 'column', height: hp('100%') }}>
          <ScrollView>
            <View style={inputStyle.form}>
              <View >
                <View style={inputStyle.inputLabel}>
                  <Text style={inputStyle.txt} >{strings.createTicket.title[0]} *</Text>
                </View>
                <View>
                  <TextInput
                    style={inputStyle.inputConatainer}
                    value={this.state.title}
                    underlineColorAndroid="transparent"
                    placeholder={strings.createTicket.placeholderTitle[0]}
                    autoCapitalize="none"
                    onChangeText={value => this.setState({ title: value })}
                    onSubmitEditing={() => { this.descriptionInput.focus(); }}
                  />
                </View>
              </View>
              <View >
                <View style={inputStyle.inputLabel}>
                  <Text style={inputStyle.txt} >{strings.createTicket.description[0]} *</Text>
                </View>
                <View >
                  <TextInput
                    style={[inputStyle.inputConatainer, {
                      height: hp("30%"),
                      textAlignVertical: 'top'
                    }]}
                    multiline={true}
                    value={this.state.description}
                    underlineColorAndroid="transparent"
                    placeholder={strings.createTicket.placeholderDescription[0]}
                    autoCapitalize="none"
                    ref={input => { this.descriptionInput = input; }}
                    onSubmitEditing={() => this.onPress()}
                    onChangeText={value => {
                      if (value.length <= 1024) {
                        this.setState({
                          description: value,
                          character: 1024 - value.length
                        })
                      }
                    }}
                  />
                  <Text style={{
                    color:"gray"
                  }}>{this.state.character} characters left</Text>
                </View>
              </View>
              {this.renderButton()}
            </View>
          </ScrollView>
        </Content>
      </Container>
    );
  }
}


function mapStateToProps(state) {
  return {
    style: state.theme.style,
    createTicket: state.createTicket.record,
    user: state.credentials.user,
    url: state.theme.url,
    data: state.ticketing.results,
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchCreateTicket,
    SidebarTitle,
    ticketUpdate,
  }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(OverviewScreen)