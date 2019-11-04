const {
  HOME_ENTER, HOME_EXIT,
  DEMO_ENTER, DEMO_EXIT,
  SURVEY_ENTER, SURVEY_EXIT,
  VIDEO_ENTER, VIDEO_EXIT,
  SCHEDULE_ENTER, SCHEDULE_EXIT,
  Sidebar_Details,LOADING
} = require('../ActionTypes');

const initialState = {
  home: true,
  demo: true,
  video: true,
  survey: true,
  schedule: true,
  sideBarTitle:"home",
  load:false
};


function homeReducer(state = initialState, action) {
  switch (action.type) {
    case HOME_ENTER:
      return {
        ...state,
        home: true,

      };
    case HOME_EXIT:
      return {
        ...state,
        home: false,
      };
    case DEMO_ENTER:
      return {
        ...state,
        demo: true,

      };
    case DEMO_EXIT:
      return {
        ...state,
        demo: false,
      };
    case VIDEO_ENTER:
      return {
        ...state,
        video: true,

      };
    case VIDEO_EXIT:
      return {
        ...state,
        video: false,
      };
    case SURVEY_ENTER:
      return {
        ...state,
        survey: true,

      };
    case SURVEY_EXIT:
      return {
        ...state,
        survey: false,
      };
    case SCHEDULE_ENTER:
      return {
        ...state,
        schedule: true,

      };
    case SCHEDULE_EXIT:
      return {
        ...state,
        schedule: false,
      };
    case Sidebar_Details:
      return {
        ...state,
        sideBarTitle: action.data,
      }
      case LOADING:
      return {
        ...state,
        load: action.data,
      }
    default:
      return state;
  }
}

export default homeReducer;
