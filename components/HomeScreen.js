import React, { Component } from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol
} from 'react-native-responsive-screen';
import { SidebarTitle, } from '../Actions/homeActions'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Card, CardItem, Text, Button, Body, } from 'native-base';
import { strings } from '../i18n/TranslationsConfig';
class HomeComponent extends Component {
  componentDidMount() {
    lor(this)
  }
  componentWillUnmount() {
    rol()
  }
  // card  view components (outage and ticket management) for home screen 
  render() {
    const styles = StyleSheet.create({
      body: {
      },
      innercardwrap: {
        margin: wp('2%')
      },
      common_button: {
        borderRadius: 0,
        margin: 2,
        width: wp("25%"),
        minHeight: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: this.props.style.palette.primary.main,
      },
      outage_button: {
        borderRadius: 0,
        bottom: 0,
        right: 0,
        minWidth: 100,
        minHeight: 40,
        textAlignVertical: "center",
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: this.props.style.palette.outageButton.backgroundColor,
      },
      common_button_text: {
        fontSize: 10,
        textAlign: 'center',
        color: "#FFF",
        fontWeight : '400',
        paddingHorizontal : wp('1%')
      },
      secondary_text: {
        fontSize: 12
      },
      textHead: {
        marginBottom: hp('1%'),
        fontWeight: 'bold',
      }
    });
    return (
      <View >
        <View style={styles.body}>
          {this.props.modules["outages"] == true ? <Card>
            <CardItem cardBody style={styles.innercardwrap}>
              <View style={{ marginRight: 20 }}>
                <Image source={{ uri: `${this.props.url.imgUrl.slice(0, -1) + this.props.images.outages_mobile}` }} style={{ resizeMode: "cover", width: wp("30%"), flex:1 }} />
              </View>
              <Body>
                <Text style={styles.textHead}>{strings.dashboard.outage.knownOutages[0]}</Text>
                <Text style={styles.secondary_text}>
                  {strings.dashboard.outage.subhead[0]}
                </Text>
                <View style={{alignSelf:"flex-end",marginTop:20}}>
                  <Button danger style={styles.outage_button}
                    onPress={() => {

                      this.props.SidebarTitle("outages")
                      this.props.navigation.navigate('Outages')
                    }}>
                    <Text style={styles.common_button_text}>  {strings.dashboard.outage.viewBtn[0]}</Text>
                  </Button>
                </View>
              </Body>
            </CardItem>
          </Card> : <View></View>}
          {this.props.modules["ticketManagement"] == true ?
            <Card >
              <CardItem cardBody style={styles.innercardwrap}>
                <View style={{ marginRight: 20 }}>
                  <Image source={{ uri: `${this.props.url.imgUrl.slice(0, -1) + this.props.images.tm_mobile}` }} style={{ resizeMode: "cover", width: wp("30%"),flex:1  }} />
                </View>
                <Body style={{}}>
                  <Text style={styles.textHead}> {strings.dashboard.tickets.headline[0]}</Text>
                  <Text style={styles.secondary_text}>
                    {strings.dashboard.tickets.subhead2[0]}
                  </Text>
                  <View style={{alignSelf:"flex-end", flexDirection: 'row' ,marginTop:20}}>
                    <TouchableOpacity info style={styles.common_button}
                      onPress={() => {
                        this.props.SidebarTitle("createTicket")
                        this.props.navigation.navigate('CreateTicket')
                      }}>
                      <Text style={styles.common_button_text}>{strings.dashboard.tickets.create[0].toUpperCase()}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity info style={styles.common_button}
                      onPress={() => {
                        this.props.SidebarTitle("openTicket")
                        this.props.navigation.navigate('OpenTicket')
                      }}>
                      <Text style={styles.common_button_text}>{strings.dashboard.tickets.headline2[0].toUpperCase()}</Text>
                    </TouchableOpacity>
                  </View>
                </Body>
              </CardItem>
            </Card> : <View></View>}
        </View>
      </View >
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    SidebarTitle
  }, dispatch);
}
function mapStateToProps(state) {
  return {
    style: state.theme.style,
    url: state.theme.url,
    modules: state.Iva.iva.Modules,
    images: state.Iva.iva.images
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(HomeComponent)