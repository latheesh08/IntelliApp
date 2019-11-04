import {
  createStackNavigator,
  createAppContainer,
  createDrawerNavigator
} from "react-navigation";
import LoginScreen from "./screens/LoginScreen";
import IntroductionScreen from "./screens/IntroductionScreen";
import StartScreen from "./screens/StartScreen";
import OutageScreen from "./screens/OutageScreen";
import SideBar from "./components/SideBar";
import CreateTicket from './screens/CreateTicket';
import OpenTickets from './screens/OpenTickets';
import Schedule from './screens/Schedule';
import Knowledge from './screens/Knowledge';
import Video from './screens/Video';
import Demo from './screens/Demo';
import Survey from './screens/Survey';
import CallAgent from './screens/CallAgent';
import Azure_login from './screens/Azure_login';
import Iva from './screens/Iva'

const MainNavigator = createDrawerNavigator(
  {
    Home: { screen: StartScreen },
    Outages: { screen: OutageScreen },
    CallAgent: { screen: CallAgent },
    ScheduleCallBack: { screen: Schedule },
    CreateTicket: { screen: CreateTicket },
    OpenTicket: { screen: OpenTickets },
    Knowledge: { screen: Knowledge },
    Survey: { screen: Survey },
    Video: { screen: Video },
    Demo: { screen: Demo },
    Iva: { screen: Iva },

  },
  {
    headerMode: "none",
    initialRouteName: "Home",
    contentComponent: SideBar,
    drawerWidth: 230,
  }
);

const StartNavigator = createStackNavigator(
  {

    Login: { screen: LoginScreen },
    Azure_login: { screen: Azure_login },
    Start: { screen: MainNavigator },
    Introduction: { screen: IntroductionScreen },
  },

  { headerMode: "none" }
);

const App = createAppContainer(StartNavigator);

export default App;
