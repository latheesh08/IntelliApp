import React from "react";
import {
  Header,
  Left,
  Button,
  Icon,
  Body,
  Right,
  Item,
  Input,
  Text
} from "native-base";
import { StyleSheet, Keyboard, View, TouchableOpacity, Image, BackHandler, StatusBar } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol
} from 'react-native-responsive-screen';
import { HomeEnter, DemoExit, SurveyExit, ScheduleExit, VideoExit,SidebarTitle } from '../Actions/homeActions'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class HeaderSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSearch: false
    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }
  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillUnmount() {
    rol();
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  componentDidMount() {
    lor(this);
  }
  handleBackButtonClick() {
    if (this.props.sideBarTitle == "home") {
      BackHandler.exitApp()
      return true;
    }
    this.props.HomeEnter();
    this.props.DemoExit();
    this.props.SurveyExit();
    this.props.ScheduleExit();
    this.props.VideoExit();
    Keyboard.dismiss();
    this.props.navigation.goBack(null);
    this.props.SidebarTitle("home")
    return true;
  }
  render() {
    const styles = StyleSheet.create({
      container: {},
      headerHome: {

        backgroundColor: this.props.style.palette.primary.main,
        elevation: 0,
        borderBottomWidth: 0,
        // borderBottomColor: "transparent",
        paddingLeft: 10,
        paddingRight: 10,
        justifyContent: 'space-evenly'
      },
      header: {
        backgroundColor: this.props.style.palette.primary.main,
        elevation: 0,
        borderBottomWidth: 0,
        borderBottomColor: "transparent",
        paddingLeft: 10,
        paddingRight: 10,
        justifyContent: 'space-evenly'
      },
      Icon: {
        color: "#FFF",
        fontSize: 30
      },
      menu: {
        alignContent : 'center',
        justifyContent:'center',
        // marginLeft:5,

        // padding: 15

      }
    });
    var image = this.props.style.props.Logo.light.includes('https') ? this.props.style.props.Logo.light : `${this.props.url.imgUrl + this.props.style.props.Logo.light}`
    // let right = null;
    let head = null;
    let navbutton = null;
    navbutton = <TouchableOpacity
      active={true}
      onPress={() => {
        Keyboard.dismiss();
        this.props.navigation.openDrawer();
      }}
      transparent
      style={styles.menu}
    >
      <Icon
        style={this.props.home == true ? [styles.Icon, { color: '#fff' }] : styles.Icon}
        name="menu" />
    </TouchableOpacity>
    if (this.props.home) {
      head = <Image source={{ uri: image }} style={{ resizeMode: 'contain', height: hp("5%"), width: wp('50%') }} />
    }
    else {
      head = <Text style={{ color: this.props.style.palette.secondary.main, fontWeight: 'bold', fontSize: 20 }} >{this.props.title} </Text>
    }
    return (
      <View>
        <Header style={styles.header}>
          <Left>{navbutton}</Left>
          <View style ={{textAlignVertical: 'center', justifyContent:'center'  , alignItems : 'center'}} >
            {head}
            </View>
            <Right />
        </Header>
      </View>
    );
  }
}


function mapStateToProps(state) {
  return {
    style: state.theme.style,
    sideBarTitle: state.home.sideBarTitle,
    url: state.theme.url,
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    HomeEnter,
    DemoExit,
    SurveyExit,
    ScheduleExit,
    VideoExit,
    SidebarTitle

  }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(HeaderSearch)