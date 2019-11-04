import React from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity, ScrollView, SafeAreaView, AsyncStorage } from "react-native";
import { Item, Icon } from "native-base";
import { NavigationActions, StackActions } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { strings } from '../i18n/TranslationsConfig';
import { HomeExit, HomeEnter, DemoEnter, VideoEnter, ScheduleEnter, SurveyEnter, SidebarTitle, DemoExit,  SurveyExit,  ScheduleExit,  VideoExit} from '../Actions/homeActions'
import { GoogleSignin } from '@react-native-community/google-signin'

var data = require('../Config/indexSideBar').data.sideNav
class SideBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "home"
    }
  }
  componentDidMount() {
  }
  async removeAsync() {
    await AsyncStorage.removeItem('token')
    await AsyncStorage.removeItem('userd')
    await AsyncStorage.removeItem('config')
  }
  _signOut = async () => {
try{
  this.removeAsync()
await GoogleSignin.revokeAccess();
await GoogleSignin.signOut();
}catch (error) {
console.log('error in google sign out' + error)
}
  }
  render() {
    var image = this.props.style.props.Logo.dark.includes('https') ? this.props.style.props.Logo.dark : `${this.props.url.imgUrl + this.props.style.props.Logo.light}`
    const styles = StyleSheet.create({
      sidelabel: {
        flexDirection: "row",
        borderBottomColor: "#D8D8D8",
        paddingVertical: 13,
        justifyContent: "flex-start"
      },
      profile: {
        alignItems: 'center',

      },
    })
    return (
      <SafeAreaView style={{ backgroundColor: this.props.style.palette.sideNav.background, flex: 1, }}>
        <View style={styles.profile}>
          <Image
            source={{ uri: `${image}` }}
            style={{ resizeMode: 'contain', width: 200, height: 100 }}
          />
        </View>
        <ScrollView>
          <View>
            {
              data.map((item) => {
                if (this.props.style.display[item.title] == true || !(item.title in this.props.style.display)) {
                  var count = 0;
                  if (this.props.style.display[item.title] == true) {
                    count = 1;
                  }
                  return (
                    <View>
                      {item.data.map((value) => {
                        if (count > 0 || (value.title == "logout" || value.title == "home") || this.props.style.display[value.title] == true) {
                          var destination = value.title == "logout" ? "Login" : value.title.charAt(0).toUpperCase() + value.title.slice(1)
                          return (
                            <TouchableOpacity
                              style={[{ paddingHorizontal: 15 }, this.props.sideBarTitle == value.title ? { backgroundColor: "#00000014" } : null]}
                              onPress={() => {
                                this.props.SidebarTitle(value.title)
                                this.props.DemoExit()
                                this.props.SurveyExit()
                                this.props.ScheduleExit()
                                this.props.VideoExit()
                                this.props.HomeExit();
                                if (destination === 'Login') {
                                  //To clear stack when you logout app and reopen and click back again it shoudn't open dashboard again.
                                  this._signOut()
                                  this.props.SidebarTitle("home")
                                  this.props.navigation.dispatch(StackActions.reset({ index: 0, actions: [NavigationActions.navigate({ routeName: destination })] }))
                                }
                                else {
                                  if (destination === 'Home') {
                                    this.props.HomeEnter()
                                  }
                                  else {
                                    if (destination === 'Demo') {
                                      this.props.DemoEnter();
                                    } else if (destination === 'Survey') {
                                      this.props.SurveyEnter();
                                    } else if (destination === 'Video') {
                                      this.props.VideoEnter();
                                    } else if (destination === 'ScheduleCallBack') {
                                      this.props.ScheduleEnter();
                                    }
                                    this.props.HomeExit();
                                  }
                                  this.props.navigation.closeDrawer();
                                  this.props.navigation.navigate(destination);
                                }
                              }}
                            >
                              <View style={styles.sidelabel}>
                               <View style={{ width: 30, alignItems: "center" }}>
                                 <Icon type="FontAwesome" name={value.image}
                                   style={{ fontSize: 20, color: this.props.style.palette.sideNav.textColor, }} />
                               </View>
                               <View
                                 style={{
                                   flex: 1,
                                   flexDirection: "row",
                                   justifyContent: "space-between",
                                   alignSelf: "flex-start",
                                   flexWrap: "wrap",
                                   marginLeft: 10
                                 }}
                               >
                                 <Text style={{ color: this.props.style.palette.sideNav.textColor, fontSize: 14 }}>
                                   {strings.sideNav[value.title == "scheduleCallBack" ? "scheduleCall" : value.title][0]}
                                 </Text>
                                 <View style={{ alignItems: "flex-end" ,}}>
                                   <Text style={{ color: "red", }}>{this.props[value.title]}</Text>
                                 </View>
                               </View>
                             </View>
                            </TouchableOpacity>)
                        }
                      })
                      }
                    </View>
                  )
                }
              })
            }
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    HomeEnter,
    DemoExit,
    SurveyExit,
    ScheduleExit,
    VideoExit,
    HomeExit,
    DemoEnter,
    VideoEnter,
    ScheduleEnter,
    SurveyEnter,
    SidebarTitle
  }, dispatch);
}
function mapStateToProps(state) {
  return {
    outages: state.Outages.results.length,
    openTicket: state.ticketing.results.length,
    style: state.theme.style,
    tenant: state.theme.tenant,
    sideBarTitle: state.home.sideBarTitle,
    url: state.theme.url,
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(SideBar)