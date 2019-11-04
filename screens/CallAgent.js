/**
 * Call agent Screen
 */
import React from "react";
import { StyleSheet, Platform, Linking, TouchableOpacity, Image, Dimensions } from "react-native";
import { Container, Text, View, } from "native-base";
import HeaderSearch from "../components/HeaderSearch";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol
} from 'react-native-responsive-screen';
import { strings } from '../i18n/TranslationsConfig';
import fetchAgentInfo from '../Actions/AgentInfoAction'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ScrollView } from "react-native-gesture-handler";
class ContactScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 1,
      orientation: ''
    };
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
  componentDidMount() {
    lor(this);
    this.getOrientation();
    Dimensions.addEventListener('change', () => {
      this.getOrientation();
    });
  }
  componentWillUnmount() {
    rol();
  }
  CallComponent() {
    if (this.props.contact != undefined && this.props.contact.length > 0) {
      if (this.state.orientation == 'portrait') {
        return (
          this.props.contact.map((item) => (
            <CallComponent number={item} />
          ))
        )
      }
      else {
        return (
          this.props.contact.map((item) => (
            <CallComponentLandscape number={item} />
          ))
        )
      }
    }
    else {
      return (
        <View style={{ alignSelf: "center", justifyContent: "center" , width : wp('50%') }}>
          <Text style={{ color: this.props.style.palette.primary.main, textAlign : 'center'}}>{strings.callAgent.empty[0]}</Text>
        </View>
      )
    }
  }

  rendermain() {
    if (this.state.orientation == 'portrait') {
      return (
        <ScrollView ref="rootView">
          <View style={{ flexDirection: 'column' }}>
            <Image source={{ uri: this.props.url.imgUrl.slice(0, -1) + this.props.callimage }} style={{ height: hp('35%'), resizeMode: 'cover' }} />
            <Text style={{ flex: 1, backgroundColor: '#124b96', color: '#fff', paddingHorizontal: wp('10%'),paddingVertical : hp('2%') ,textAlign: 'center', fontSize: 14 }}>{strings.callAgent.body[0]}</Text>
          </View>
          <View style={{ flex: 1, height: hp("40%"), justifyContent: "center" }} >
            {this.CallComponent()}
          </View>
        </ScrollView>
      )
    } else {
      return (
        <View ref="rootView" style={{ flex: 1, flexDirection: "row" }}>
        <View style={{ flex: 1 }}>
          <Image source={{ uri: this.props.url.imgUrl.slice(0, -1) + this.props.callimage }} style={{ flex: 0.6, resizeMode: "cover" }} />
          <View style={{ flex: 0.4, backgroundColor: "#124b96" , justifyContent: "center",}}>
            <Text style={{ color: '#fff', textAlign: 'center', }}>{strings.callAgent.body[0]}</Text>
          </View>
        </View>
        <View style={{ justifyContent: 'center', alignItems: 'center' }} >
          {this.CallComponent()}
        </View>
        </View>

      )
    }
  }
  render() {
    callAgent = StyleSheet.create({
      wrapper: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: wp("2%")
      },
      container: {},
    })
    return (
      <Container style={callAgent.container} contentContainerStyle={{ flex: 1 }}>
        <HeaderSearch navigation={this.props.navigation} title={strings.callAgent.header[0]} />
        {this.rendermain()}

      </Container>
    );
  }
}

class CallComponent extends React.Component {
  render() {
    callAgent = StyleSheet.create({
      call: {
        backgroundColor: '#EDEDED',
        width: wp('65%'),
        height: hp('1.4%') * wp('1.4%'),
        borderTopLeftRadius: 50,
        borderBottomLeftRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

      },
      button: {
        backgroundColor: '#27B769',
        width: wp('25%'),
        height: hp('1.4%') * wp('1.4%'),
        alignContent: 'center',
        justifyContent: 'center',
        borderBottomRightRadius: 50,
        borderTopRightRadius: 50,
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

      },
      number: {
        color: '#545454',
        fontSize: 18,
        fontWeight: 'bold',
        position: 'relative',
        // marginLeft: wp('5%')
      },
      name: {
        color: '#a6a6a6',
        marginBottom: hp('1%'),
        marginLeft: wp('0.7%') * hp('0.7%'),
      },
    })
    return (
      <View style={{ margin: hp('2%') }} >
        <View style={{ flexDirection: 'row', }} >
          <View style={callAgent.call} >
            <Text style={callAgent.number} >{this.props.number}</Text>
          </View>
          <TouchableOpacity style={callAgent.button}
            onPress={() => {
              if (Platform.OS !== 'android') {
                phoneNumber = `telprompt:${this.props.number}`;
              }
              else {
                phoneNumber = `tel:${this.props.number}`;
              }
              Linking.canOpenURL(phoneNumber)
                .then(supported => {
                  if (!supported) {
                  } else {
                    return Linking.openURL(phoneNumber);
                  }
                })
                .catch(err => console.log(err));
            }}
          >
            <Text style={{ fontWeight: 'bold', alignSelf: 'center', color: '#fff', }} >{strings.callAgent.call[0]}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
};
class CallComponentLandscape extends React.Component {
  render() {
    callAgent = StyleSheet.create({
      call: {
        backgroundColor: '#EDEDED',
        width: wp('35%'),
        height: hp('1.4%') * wp('1.4%'),
        borderTopLeftRadius: 50,
        borderBottomLeftRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

      },
      button: {
        backgroundColor: '#27B769',
        width: wp('10%'),
        height: hp('1.4%') * wp('1.4%'),
        alignContent: 'center',
        justifyContent: 'center',
        borderBottomRightRadius: 50,
        borderTopRightRadius: 50,
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

      },
      number: {
        color: '#545454',
        fontSize: 18,
        fontWeight: 'bold',
        position: 'relative',
        // marginLeft: wp('5%')
      },
      name: {
        color: '#a6a6a6',
        marginBottom: hp('1%'),
        marginLeft: wp('0.7%') * hp('0.7%'),
      },
    })
    return (
      <View style={{ margin: hp('2%') }} >
        <View style={{ flexDirection: 'row', }} >
          <View style={callAgent.call} >
            <Text style={callAgent.number} >{this.props.number}</Text>
          </View>
          <TouchableOpacity style={callAgent.button}
            onPress={() => {
              if (Platform.OS !== 'android') {
                phoneNumber = `telprompt:${this.props.number}`;
              }
              else {
                phoneNumber = `tel:${this.props.number}`;
              }
              Linking.canOpenURL(phoneNumber)
                .then(supported => {
                  if (!supported) {
                  } else {
                    return Linking.openURL(phoneNumber);
                  }
                })
                .catch(err => console.log(err));
            }}
          >
            <Text style={{ fontWeight: 'bold', alignSelf: 'center', color: '#fff', }} >{strings.callAgent.call[0]}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
};
function mapStateToProps(state) {
  return {
    url: state.theme.url,
    contact: state.contact.result,
    style: state.theme.style,
    callimage: state.theme.style.images.caa_desktop
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchAgentInfo
  }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(ContactScreen)