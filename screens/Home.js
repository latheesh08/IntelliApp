import React, { Component } from 'react';
import {
  StyleSheet,
  AsyncStorage,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  ImageBackground,
  SafeAreaView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol
} from 'react-native-responsive-screen';
import { connect } from 'react-redux';
import { Container,Text, Button,} from 'native-base';
import RefKnowledge from '../components/KnowledgeBaseRef'
import HomeContent from '../components/HomeScreen'
import { strings } from '../i18n/TranslationsConfig';
class HomeScreen extends Component {
  componentDidMount() {
    lor(this)
  }
  componentWillUnmount() {
    rol()
  }


  render() {
    const styles = StyleSheet.create({
      container: {
        flex: 1,
      },
      body: {
        flex: 1,
        margin: wp('2%'),

      },

      text1: {
        color: this.props.style.palette.primary.main,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: wp('2%'),

      },
      text2: {
        color: '#737373',
        textAlign: 'center',
        fontSize: 12,
        lineHeight: 20,
        paddingHorizontal: wp('5%')
      },
      text3: {
        color: '#737373',
        fontSize: 10,
        paddingTop: 3,
        paddingBottom: 5

      },
      common_button: {
        borderRadius: 0,
        margin: 2,
        minWidth: 70,
        height: 40,
        textAlignVertical: "center",
        justifyContent: 'center',
        alignItems: 'center',
      },
      outage_button: {
        borderRadius: 0,
        bottom: 0,
        right: 0,
        position: 'absolute',
        minWidth: 100,
        height: 40,
        textAlignVertical: "center",
        justifyContent: 'center',
        alignItems: 'center',
      },
      common_button_text: {
        fontSize:12,
        textAlign: 'center'
      },
      message: {
        padding: 20,
        color: '#fff',
        textAlign: 'center',
        flex: 1,
        textAlignVertical: "center",
        justifyContent: 'center',
        alignItems: 'center',
      },

    });
    return (
      <Container >
        <ScrollView bounces ={false} >
          <View style={{}}>
            <View style={{ backgroundColor: '#ececec', padding: 10 }}>
              <Text style={styles.text1}>{strings.dashboard.chat.headline[0]}</Text>
              <Text note style={styles.text2} >{strings.dashboard.chat.subhead[0]}</Text>
            </View>
            <View style={styles.message}>
              <Text >{strings.dashboard.chat.agentTxt[0]}</Text>
              <Text note style={styles.text3}>{strings.dashboard.chat.agentSubTxt[0]}</Text>
              <View style={{ bottom: 0, alignContent: 'center', justifyContent: 'center', paddingTop: 5 }}>
                <Button info style={{
                  borderRadius: 0, height: 40, width: 150, marginTop: 10, textAlignVertical: "center",
                  justifyContent: 'center',
                  alignItems: 'center', 
                  backgroundColor: this.props.style.palette.primary.main,
                }}
                  onPress={() => this.props.onclick()}>
                  <Text style={styles.common_button_text}>{strings.dashboard.chat.btnTxt[0]}</Text>
                </Button>
              </View>
            </View>
          </View>

          <View style={styles.body}>
            <HomeContent navigation={this.props.navigation} />
            <RefKnowledge {...this.props} />
          </View>
        </ScrollView>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    style: state.theme.style,
  };
}
export default connect(mapStateToProps, null)(HomeScreen)
