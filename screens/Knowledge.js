import React from "react";
import {
  ScrollView, Text, TouchableOpacity, TextInput, StyleSheet,
 View, Dimensions, ActivityIndicator, Keyboard
} from "react-native";
import Toast from 'react-native-simple-toast';
import { Container, Button, Icon } from "native-base";
import HeaderSearch from "../components/HeaderSearch";
import { bindActionCreators } from 'redux';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol
} from 'react-native-responsive-screen';

import { Collapse, CollapseBody, CollapseHeader } from 'accordion-collapse-react-native';
import { fetchKnowledgeBases, fetchKnowledgeBaseRequesting } from '../Actions/KnowledgeBaseAction'
import { connect } from 'react-redux';
import HTMLView from 'react-native-htmlview';
import { strings } from '../i18n/TranslationsConfig';
import HomeScreen from "../components/HomeScreen";
class Knowledge extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      disabled: true,
      selectedIndex: null,
      result: []
    };
  }
  componentDidMount() {
    lor(this);
    const { navigation } = this.props;
    this.focusListener = navigation.addListener('didFocus', () => {
      this.props.fetchKnowledgeBaseRequesting()
      this.setState({
        search: "",
        disabled: true,
        selectedIndex: null,
        result: [],
      })
    });
  }
  componentWillUnmount() {
    rol();
    this.focusListener.remove();
  }
  async go() {
    Keyboard.dismiss();
    var url = this.props.url.knowledgeBaseUrl.replace("search", this.state.search)
    await this.props.fetchKnowledgeBases(this.props.user, url)
    if (this.props.data.length <= 0) {
      Toast.show(`${this.props.error}`)
    }

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
  _renderHeader(section, index, ) {
    accordion = StyleSheet.create({
      tableHeaderContainer: {
        flexDirection: 'row',
        paddingVertical: 18,
        backgroundColor: "#F4F4F4",
        borderBottomWidth: hp("0.2%"),
        borderColor: "#ececec",
        alignItems: "center",
        justifyContent: 'center',
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
          <Text style={accordion.itemTextStyle}>{section.short_description}</Text>
        </View>
        <View style={accordion.arrowIcon}>
          <Icon type='AntDesign' name={index ? 'minuscircle' : 'pluscircle'} style={{ color: '#5db2e4', fontSize: 20 }} />
        </View>
      </View>
    )
  }
  _renderContent(section, index, isActive, sections) {
    accordion = StyleSheet.create({
      tableContent: {
        paddingLeft: wp('7.7%'),
        borderBottomWidth: hp("0.2%"),
        borderColor: "#ececec",
        paddingVertical: hp("3%"),

      }
    })
    return (
      <View style={accordion.tableContent}>
        <HTMLView value={section.text} />
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
  renderResult() {
    if (this.props.load) {
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
      if (this.props.data.length > 0) {
        return (
          <View style={{ flex: 1, backgroundColor: "#fff" }} >
            {
              this.props.data.map((item, index) => this._renderItem({ item, index }))
            }
          </View>
        )
      }
      else {
        return (
          <View>
            <HomeScreen navigation={this.props.navigation} />
          </View>
        )
      }
    }
  }
  render() {
    form = StyleSheet.create({

      container: {},
      textbody: {
        fontSize: hp("0.7%") * wp("0.7%")
      },
      search: {
        flexDirection: "row",
        marginVertical: wp("3%"),
      },
      inputConatainer: {
        borderWidth: 1,
        borderColor: this.props.style.palette.primary.main,
        borderTopLeftRadius: wp("1.5%"),
        borderBottomLeftRadius: wp("1.5%"),
        alignItems: "center",
        width: wp("83s%"),
        height: 40
      },
      btn: {
        alignItems: "center",
        justifyContent: "center",
        // paddingVertical: hp("3%"),
        // paddingHorizontal: wp("5%"),
        borderTopRightRadius: wp("1.5%"),
        borderBottomRightRadius: wp("1.5%"),
        marginLeft: -wp("0.2%"),
        width: wp("14%"),
        backgroundColor: this.props.style.palette.primary.main,
        height: 40
      },
    })
    return (
      <Container style={form.container} contentContainerStyle={{ flex: 1 }}>
        <HeaderSearch navigation={this.props.navigation} title={strings.dashboard.knowledge.headline[0]} />
        <View style={{ flex: 1, backgroundColor: "#fff", margin: wp("0.5%")*hp("0.5%") }} >
          <View style={form.search}>
            <TextInput
              style={[form.inputConatainer]}
              value={this.state.search}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
              onChangeText={value =>
                this.setState({
                  search: value,
                  disabled: value.length > 0 ? false : true
                })}
            />
            <TouchableOpacity
              style={[form.btn,]}
              disabled={this.state.disabled}
              onPress={() => { this.go() }}>
              <Text style={[form.textbody, { color: "#ffffff" }]}>{strings.dashboard.knowledge.go[0]}</Text>
            </TouchableOpacity>
          </View>
          <ScrollView bounces ={false} >
            <View>
              {this.renderResult()}
            </View>
          </ScrollView>
        </View>
      </Container>
    );
  }
}
function mapStateToProps(state) {
  return {
    data: state.KnowledgeBase.results,
    auth: state.Authentication,
    load: state.KnowledgeBase.loading,
    nodata: state.KnowledgeBase.nodata,
    error: state.KnowledgeBase.responseStatus,
    style: state.theme.style,
    url: state.theme.url,
    user: state.credentials.user,
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchKnowledgeBases,
    fetchKnowledgeBaseRequesting
  }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Knowledge);
