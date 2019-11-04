import React from "react";
import {
    StyleSheet, Dimensions, ActivityIndicator,
} from "react-native";
import { Container } from 'native-base'
import HeaderSearch from "../components/HeaderSearch";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { SidebarTitle } from '../Actions/homeActions'
import { WebView } from 'react-native-webview'
import I18n from 'react-native-i18n'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as lor,
    removeOrientationListener as rol
} from 'react-native-responsive-screen';
class IVA extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: true,
            value: false
        }
    }
    componentWillMount() {
        rol()
    }
    componentDidMount() {
        const { navigation } = this.props;
        this.focusListener = navigation.addListener('didFocus', () => {
            this.props.SidebarTitle(this.props.navigation.state.params.sidebar)
        })
    }
    hideSpinner() {
        this.setState({ visible: false });
    }
    checkuri() {
        var uri = this.props.data ? typeof this.props.data === "string" ? this.props.data : this.props.data[I18n.currentLocale().split("-")[0]] : this.props.data
        if (!uri) {
          uri = this.props.data ? typeof this.props.data === "string" ? this.props.data : this.props.data['en'] : this.props.data
        }
        return uri;
      }
    render() {
        return (
            <Container style={styles.container}>
                <HeaderSearch navigation={this.props.navigation.state.params.navigation} home={true} />
                {this.props.check &&
                    <WebView
                    useWebKit={true}
                        bounces={false}
                        onLoad={() => this.hideSpinner()}
                        style={{ flex: 1 }}
                        source={{ uri: this.checkuri() }}
                    />}
                {this.state.visible && (
                    <ActivityIndicator
                        style={{ position: "absolute", top: hp("50%"), left: wp("45%") }}
                        size="large"
                    />
                )}
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
        ticket: state.ticketing.results
    };
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        SidebarTitle

    }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(IVA)