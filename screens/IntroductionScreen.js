import React from 'react';
import { StyleSheet, ImageBackground, View, Text, AsyncStorage, BackHandler } from 'react-native';
import Dialog, { DialogContent, DialogFooter, DialogButton, DialogTitle, SlideAnimation } from 'react-native-popup-dialog';
import { ScrollView } from 'react-native-gesture-handler';
import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen';
import RNExitApp from 'react-native-exit-app';
import { strings } from '../i18n/TranslationsConfig';

export default class Eula extends React.Component {
  constructor(props) {
    console.disableYellowBox = true;
    super(props);
    this.state = {
      active: 1,
      visible: false,
      firstLaunch: null
    };
  }

  async componentDidMount() {

    const terms = await AsyncStorage.getItem('terms');
    if (terms == "true") {
      this.setState({
        visible: false
      })
      this.props.onpress();
    }
    else {
      this.setState({
        visible: true
      })
    }

  }
  async accept() {
    await AsyncStorage.setItem('terms', "true")
    this.setState({
      visible: false
    })
    this.props.onpress();
  }
  decline() {
    this.setState({
      visible: false
    })
    RNExitApp.exitApp();
  }
  render() {
    const styles = StyleSheet.create({
      image: {
        resizeMode: "cover",
        width: "100%",
        height: "100%",
        position: "absolute",
      },
    });
    return (
      <View style={{ flex: 1 }}>
        <ImageBackground
          source={require("../assets/uni.png")}
          style={styles.image}
        >
          <Dialog
            visible={this.state.visible}
            dialogTitle={<DialogTitle title={strings.welcome.terms[0]} />}
            footer={
              <DialogFooter>
                <DialogButton
                  text={strings.welcome.Decline[0]}
                  onPress={() => {
                    this.decline()
                  }}
                />
                <DialogButton
                  text={strings.welcome.accept[0]}
                  onPress={() => {
                    this.accept()
                  }}
                />
              </DialogFooter>
            }
            dialogAnimation={new SlideAnimation({
              slideFrom: 'bottom',
            })}
          >
            <DialogContent style={{ width: widthPercentageToDP('90%'), height: heightPercentageToDP('70%') }}>
              <ScrollView>
                {strings.welcome.text.map((item)=>(
                  <Text>{item}</Text>
                ))}
              </ScrollView>
            </DialogContent>
          </Dialog>
        </ImageBackground>
      </View>
    )
  }
}
