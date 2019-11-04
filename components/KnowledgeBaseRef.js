import React, { Component } from 'react';
import { View, ImageBackground, StyleSheet } from 'react-native';
import { Button, Text, Card, CardItem } from 'native-base'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { strings } from '../i18n/TranslationsConfig';
import { SidebarTitle, } from '../Actions/homeActions'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
class KnowledgeBaseRef extends Component {
  //knowledge base card view component  included in home screen
  
  render() {
    const styles = StyleSheet.create({
      textHead: {
        marginBottom: 2,
        fontWeight: 'bold',
      },
      button: {
        borderRadius: 0,
        marginTop: 20,
        marginBottom: 10,
        height: 40,
        minWidth: wp('30%'),
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: this.props.style.palette.primary.main,
      },
      button_text: {
        fontSize: 12,
      }
    });
    if (this.props.modules["knowledge"] == true) {
      return (
        <View>
          <Card>
            <CardItem cardBody>
              <ImageBackground source={{ uri:  `${this.props.url.imgUrl.slice(0, -1) + this.props.images.kb_mobile}` }} style={{ width: '100%', height: '100%' }}>
                <View style={{ margin: 2, marginLeft: 20 }}>
                  <Text style={[styles.textHead, { color: '#fff' }]}>{strings.dashboard.knowledge.headline[0]}</Text>
                  <Text style={{ color: '#fff', fontSize: 12 }}>{strings.dashboard.knowledge.subhead[0]}</Text>

                  <Button info style={styles.button}
                    onPress={() => {
                      this.props.SidebarTitle("knowledge")
                      this.props.navigation.navigate('Knowledge')
                    }}
                  >
                    <Text style={styles.button_text}>
                      {strings.dashboard.knowledge.search[0]}
                    </Text>
                  </Button>

                </View>
              </ImageBackground>
            </CardItem>
          </Card>
        </View>
      )
    }
    else {
      return (
        <View></View>
      )
    }
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
export default connect(mapStateToProps, mapDispatchToProps)(KnowledgeBaseRef)
