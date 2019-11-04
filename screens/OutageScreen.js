import React from "react";
import { StyleSheet, View, ScrollView, FlatList , ActivityIndicator} from "react-native";
import { Container, Text, Icon ,Button} from "native-base";
import HeaderSearch from "../components/HeaderSearch";
import { connect } from 'react-redux';
import { strings } from '../i18n/TranslationsConfig';
import moment from "moment";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol
} from 'react-native-responsive-screen';
import { Collapse, CollapseBody, CollapseHeader } from 'accordion-collapse-react-native';
class OutagesScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: null,
    }
  }
  componentWillReceiveProps() {
    this.setState({
      selectedIndex: null,
    });
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
  componentDidMount() {
    lor(this);
  }
  componentWillUnmount() {
    rol();
  }
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
        <View style={[accordion.tableHeaderContent, { width: wp('80%')}]}>
          <Text style={[accordion.itemTextStyle, { color: "#7C7C7C" }]}>As of {moment(section.begin).format('MM/DD/YY')}</Text>
          <Text style={accordion.itemTextStyle}>{section.short_description}</Text>
        </View>
        <View style={accordion.arrowIcon}>
          <Icon type='AntDesign' name={index ? 'minuscircle' : 'pluscircle'} style={{ color: this.props.style.palette.primary.main, fontSize: 20 }} />
        </View>
      </View>
    )
  }
  _renderContent(section, index, isActive, sections) {
    accordion = StyleSheet.create({
      tableContent: {
        width: wp('80%'),
        marginLeft: wp('5%'),
        borderBottomWidth: hp("0.2%"),
        borderColor: "#ececec",
        paddingVertical: hp("3%"),

      },
    })
    return (
      <View style={accordion.tableContent}>
        <Text style={{ color: "#808080", fontSize: 13 }} >{section.short_description}</Text>
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
  renderArray() {
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
    })
    if(this.props.load){
      return (
        <View style={{
          flex: 1,
          justifyContent: 'center'
        }} >
          <ActivityIndicator size="large" color="#5db2e4" />
        </View>
      )
    }
    else{
      if ( this.props.data.length <= 0) {
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
              <Text style={{ color: "grey", fontSize: 16 }}>{strings.dashboard.outage.empty[0]}</Text>
            </View>
          </View>
        )
      }
   else if (this.props.data.length > 0) {
      return (
        <View style = {{flex : 1}}>
          <View style={accordion.totalTicketView}>
            <View style={accordion.totalTicket}>
              <Text style={{ color: "#7C7C7C" }}><Text style={{ color: this.props.style.palette.outageButton.backgroundColor }}>{this.props.data.length}</Text> {strings.dashboard.outage.headline[0]}</Text>
            </View>
          </View>
          
      <FlatList
      style = {{flex : 1}}
        data={this.props.data}
        renderItem={({ item , index }) => (this._renderItem({ item, index })
        )}
      />
        </View>
      )
    }
  }
  }
  render() {
    accordion = StyleSheet.create({
      container: {},
    })
    let check = this.props.data.initialLoad;
    return (
      <Container style={accordion.container} contentContainerStyle={{ flex: 1 }}>
        <HeaderSearch navigation={this.props.navigation} title={strings.dashboard.outage.headline[0]}
        />
          {
            this.renderArray()
          }
         
      </Container>
    );
  }
}





function mapStateToProps(state) {
  return {
    load: state.Outages.loading,
    data: state.Outages.results,
    error: state.Outages.responseStatus,
    style: state.theme.style,
  };
}

export default connect(mapStateToProps)(OutagesScreen)