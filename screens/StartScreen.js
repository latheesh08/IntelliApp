import React from "react";
import { StyleSheet, AsyncStorage, } from "react-native";
import { Container } from 'native-base'
import HeaderSearch from "../components/HeaderSearch";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import fetchOutages from '../Actions/OutagesAction';
import { HomeEnter, sideBarTitle ,Loading} from '../Actions/homeActions'
import { fetchViewTickets } from '../Actions/TicketingAction';
import contact from '../Actions/AgentInfoAction';
import I18n from 'react-native-i18n'
import Home from '../screens/Home'
import moment from 'moment'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol
} from 'react-native-responsive-screen';
var token

class StartScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
      chat: false,
    }
  }

  async componentDidMount() {
    this.props.Loading(false)
    lor(this);
    var navi = this.props.navigation;
    this.focusListener = navi.addListener('didFocus', () => {
      if (this.props.modules.openChatByDefault ) {
        this.props.navigation.navigate("Iva", { navigation: this.props.navigation, sidebar: "home" });
      }

    });
    token = await AsyncStorage.
      getItem('token');
    this.props.contact(this.props.url.contactUrl, token)
    var outage = this.props.url.outageUrl.replace("sDate", moment(new Date('01/01/2018')).format('DD-MM-YYYY')).replace("eDate", moment(new Date()).format('DD-MM-YYYY'))
    
    this.props.fetchOutages(outage, token);
    this.props.fetchViewTickets(this.props.user, this.props.url.openTicketUrl, token, this.props.ticket)
    setInterval(() => {
      this.props.fetchOutages(outage, token);
      this.props.fetchViewTickets(this.props.user, this.props.url.openTicketUrl, token, this.props.ticket)
    }, 180000);

    await this.props.HomeEnter();
    var text = this.props.data ? typeof this.props.data === "string" ? "" : this.props.data[I18n.currentLocale().split("-")[0]] : ""

    if (text == "") {
      this.setState({
        visible: false,
      });
    }

  }
  componentWillMount() {
    rol()
  }
  hideSpinner() {
    this.setState({ visible: false });
  }
  render() {

    return (
      <Container style={styles.container}>
        <HeaderSearch navigation={this.props.navigation} home={true} />
        <Home navigation={this.props.navigation} onclick={() => {
          this.props.navigation.navigate("Iva", { navigation: this.props.navigation, sidebar: "" });
        }} />

      </Container>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
function mapStateToProps(state) {
  return {
    check: state.home.home,
    user: state.credentials.user,
    style: state.theme.style,
    data: state.Iva.iva.ivaUrl,
    url: state.theme.url,
    ticket: state.ticketing.results,
    modules: state.Iva.iva.Modules
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    HomeEnter,
    fetchOutages,
    contact,
    Loading,
    fetchViewTickets,
    sideBarTitle
  }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(StartScreen)