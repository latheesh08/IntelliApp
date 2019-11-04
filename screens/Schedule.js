import React, { Component } from 'react';
import { Container, } from 'native-base';
import { Text, Dimensions, StyleSheet, View, ActivityIndicator } from 'react-native'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol
} from 'react-native-responsive-screen';
import HeaderSearch from "../components/HeaderSearch";
import { WebView } from 'react-native-webview'
import { connect } from 'react-redux'
import I18n from 'react-native-i18n'
import { strings } from '../i18n/TranslationsConfig';
class ScheduleScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 1,
      phonenumber: null,
      firstname: null,
      lastname: null,
      description: null,
      visible: true
    };
  }

  hideSpinner() {
    this.setState({ visible: false });
  }
  checkuri() {
    var uri = this.props.data ? typeof this.props.data === "string" ? this.props.data : this.props.data[I18n.currentLocale().split("-")[0]] : this.props.data
    if (!uri) {
      uri = this.props.data ? typeof this.props.data === "string" ? this.props.data : this.props.data['en'] : this.props.data
    }
    return uri;
  }
  componentDidMount() {
    lor(this);
    var text = this.props.data ? typeof this.props.data === "string" ? "" : this.props.data[I18n.currentLocale().split("-")[0]] : ""
    var en = this.props.data ? typeof this.props.data === "string" ? "" : this.props.data['en'] : ""
    if (text == "" && en == "") {
      this.setState({ visible: false, empty: true });
    }
  }
  componentWillMount() {
    rol();
  }
  render() {
    Screen = StyleSheet.create({
      container: {},
    })
    return (
      <Container contentContainerStyle={{ flex: 1 }}>
        <HeaderSearch navigation={this.props.navigation} title={strings.sideNav.scheduleCall[0]} />
        {this.state.empty ? <View style={{ alignSelf: "center", justifyContent: "center", flex: 1 }}>
          <Text style={{ color: this.props.style.palette.primary.main, }}>{strings.callAgent.empty[0]}</Text>
        </View> : this.props.check &&
          <WebView
          useWebKit={true}
          bounces={false}
            onLoad={() => this.hideSpinner()}
            style={{ flex: 1 }}
            source={{ uri: this.checkuri() }}
          />}
        {this.state.visible && (
          <ActivityIndicator
            style={{ position: "absolute", top: hp("50%"), left: wp("45%") }}
            size="large"
          />
        )}
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    check: state.home.schedule,
    data: state.Iva.iva.scheduleContact,
    style: state.theme.style,
  }
}

export default connect(mapStateToProps, null)(ScheduleScreen)