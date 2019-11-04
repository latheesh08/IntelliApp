/**
 * Call agent Screen
 */
import React from "react";
import { StyleSheet, Dimensions, View, ActivityIndicator } from "react-native";
import { Container, Text, } from "native-base";
import HeaderSearch from "../components/HeaderSearch";
import { WebView } from 'react-native-webview';
import { connect } from 'react-redux';
import I18n from 'react-native-i18n'

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol
} from 'react-native-responsive-screen';
import { strings } from '../i18n/TranslationsConfig';
const { width, height } = Dimensions.get("window");
class DemoScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 1,
      visible: true,
      empty: false
    };
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
  hideSpinner() {
    this.setState({
      visible: false
    });
  }
  checkuri() {
    var uri = this.props.data ? typeof this.props.data === "string" ? this.props.data : this.props.data[I18n.currentLocale().split("-")[0]] : this.props.data
    if (!uri) {
      uri = this.props.data ? typeof this.props.data === "string" ? this.props.data : this.props.data['en'] : this.props.data
    }
    return uri;
  }
  render() {
    return (
      <Container style={styles.container} contentContainerStyle={{ flex: 1 }}>
        <HeaderSearch navigation={this.props.navigation} title={strings.sideNav.demo[0]} />
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

const styles = StyleSheet.create({
  container: {},
  header: {
    backgroundColor: "transparent",
    elevation: 0
  },
  Icon: {
    color: "#D8D8D8"
  },
  bgImage: {
    width: width,
    height: height,
    position: "absolute"
  },
  tabs: {
    backgroundColor: "transparent"
  },
  selectedTab: {
    textDecorationLine: "underline"
  }
});

function mapStateToProps(state) {
  return {
    check: state.home.demo,
    style: state.theme.style,
    data: state.Iva.iva.demoUrl
  };
}

export default connect(mapStateToProps, null)(DemoScreen)
