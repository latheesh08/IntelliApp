import React from "react";
import {
 Text, StyleSheet, View,  ActivityIndicator, FlatList
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol
} from 'react-native-responsive-screen';
import {
  Container,
  Icon,
  Button
} from "native-base";
import { strings } from '../i18n/TranslationsConfig';
import HeaderSearch from "../components/HeaderSearch";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { SidebarTitle, } from '../Actions/homeActions'
import { Collapse, CollapseBody, CollapseHeader } from 'accordion-collapse-react-native';
class OpenTickets extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      selectedIndex: null,
    }
  }
  componentWillReceiveProps() {
    this.setState({
      selectedIndex: null,
    });
  }
  componentDidMount() {
    lor(this);
  }
  componentWillUnmount() {
    rol();
  }
  onToggle(index) {
    let selected = index;
    if (selected === this.state.selectedIndex) {
      selected = null;
    }
    this.setState({ selectedIndex: selected }, () => {
      if (this.props.onToggle) {
        this.props.onToggle(selected);
      }
    });
  }
  renderFooter = () => {
    if (this.state.loading) {
      return null;
    }
    else {
      return (
        <View
          style={{
            paddingVertical: 20,
            borderTopWidth: 1,
            borderColor: "#CED0CE"
          }}
        >
          <ActivityIndicator animating size="large" />
        </View>
      );
    }

  };
  _renderHeader(section, index) {
    accordion = StyleSheet.create({
      tableHeaderContainer: {
        flexDirection: 'row',
        paddingVertical: 18,
        backgroundColor: "#F4F4F4",
        borderBottomWidth: hp("0.2%"),
        borderColor: "#ececec",
      },
      tableHeaderContent: {
        marginLeft: wp('5%'),
        alignItems: "flex-start",
        justifyContent: "flex-start",
      },
      arrowIcon: {
        marginRight: 10,
        alignItems: "flex-start",
        justifyContent: "flex-start",
      },
      itemTextStyle: {
        color: '#000000',
        fontSize: 13
      },
    })
    return (
      <View style={accordion.tableHeaderContainer}>
        <View style={[accordion.tableHeaderContent, { width: wp('80%') }]}>
          <Text style={[accordion.itemTextStyle, { color: "#7C7C7C" }]}>{section.ticketNumber}</Text>
          <Text style={accordion.itemTextStyle}>{section.ticketSummary}</Text>
        </View>
        <View style={accordion.arrowIcon}>
          <Icon type='AntDesign' name={index ? 'minuscircle' : 'pluscircle'} style={{ color: this.props.style.palette.primary.main, fontSize: 20 }} />
        </View>
      </View>

    )
  }
  _renderContent(section) {
    accordion = StyleSheet.create({
      tableContent: {
        width: wp('80%'),
        marginLeft: wp('5%'),
        // paddingLeft: wp('7.7%'),
        borderBottomWidth: hp("0.2%"),
        borderColor: "#ececec",
        paddingVertical: hp("3%"),
      },
      itemTextStyle: {
        color: '#000000',
        fontSize: 13
      },
    })
    return (
      <View style={accordion.tableContent}>
        <Text style={accordion.itemTextStyle}>{section.ticketDescription}</Text>
      </View>
    )
  }

  _renderItem = ({ item, index }) => (
    <Collapse key={index} isCollapsed={this.state.selectedIndex === index} onToggle={(isCollapsed) => this.onToggle(index)}>
      <CollapseHeader>
        {this._renderHeader(item, this.state.selectedIndex === index)}
      </CollapseHeader>
      <CollapseBody>
        {this._renderContent(item)}
      </CollapseBody>
    </Collapse>
  );
  renderMain() {

    accordion = StyleSheet.create({
      totalTicket: {
        backgroundColor: '#F4F4F4',
        alignItems: "center",
        justifyContent: 'center',
        paddingVertical: hp("1%"),
        paddingHorizontal: wp("5%"),
        borderRadius: hp("20%"),
      },
      totalTicketView: {
        alignItems: "center",
        justifyContent: 'center',
        marginVertical: hp("2.5%")
      },
      common_button: {
        borderRadius: 0,
        margin: 2,
        minWidth: 150,
        height: 40,
        textAlignVertical: "center",
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: this.props.style.palette.primary.main,
      },
      common_button_text: {
        fontSize: 14,
        textAlign: 'center',
        color: "#FFF"
      },
    })
    if (this.props.load) {
      return (
        <View style={{
          flex: 1,
          justifyContent: 'center'
        }} >
          <ActivityIndicator size="large" color="#5db2e4" />
        </View>
      )

    } else {
      if (this.props.data.length > 0) {
        {
          return (
            <View style={{ flex: 1 }}>
              <View style={accordion.totalTicketView}>
                <View style={accordion.totalTicket}>
                  <Text style={{ color: "#7C7C7C" }}><Text style={{ color: "#FF231D" }}>{this.props.data.length}</Text> {strings.dashboard.tickets.headline2[0]}</Text>
                </View>
              </View>
              <FlatList

                style={{ flex: 1 }}
                data={this.props.data}
                renderItem={({ item, index }) => (this._renderItem({ item, index }))}
                ListFooterComponent={this.renderFooter}
                onEndReached={() => {
                  this.setState({ loading: true })
                }}
              />
            </View >
          )
        }
      }
      else {

        return (
          <View style={{ flex: 1, alignSelf: "center", justifyContent: "center" }}>
            <View style={{ alignSelf: "center", justifyContent: "center" }}>
              <Icon
                active
                type="MaterialCommunityIcons"
                name="delete"
                style={{ color: "grey", fontSize: 45 }}
              />
            </View>
            <View style={{ alignSelf: "center", justifyContent: "center", paddingVertical: 15 }}>
              <Text style={{ color: "grey", fontSize: 16 }}>{strings.dashboard.tickets.empty[0]}</Text>
            </View>
            <View style={{ alignSelf: "center", justifyContent: "center" }}>
              <Button info style={accordion.common_button}
                onPress={() => {
                  this.props.SidebarTitle("createTicket")
                  this.props.navigation.navigate('CreateTicket')
                }}>
                <Text style={accordion.common_button_text}>{strings.dashboard.tickets.create[0].toUpperCase()}</Text>
              </Button>
            </View>
          </View>
        )
      }
    }
  }

  render() {
    accordion = StyleSheet.create({
      container: {}
    })
    return (
      <Container style={accordion.container} contentContainerStyle={{ flex: 1 }}>
        <HeaderSearch navigation={this.props.navigation} title={strings.dashboard.tickets.headline2[0]} />
        {this.renderMain()}
      </Container >
    );
  }
}
function mapStateToProps(state) {
  return {
    data: state.ticketing.results,
    load: state.ticketing.initialLoad,
    error: state.ticketing.responseStatus,
    style: state.theme.style
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    SidebarTitle
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(OpenTickets)