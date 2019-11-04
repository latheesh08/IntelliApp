const {
  // constants used to handle enter and exit events on each screen.
  HOME_ENTER, HOME_EXIT,
  DEMO_ENTER, DEMO_EXIT,
  SURVEY_ENTER, SURVEY_EXIT,
  VIDEO_ENTER, VIDEO_EXIT,
  SCHEDULE_ENTER, SCHEDULE_EXIT,
  // for siderbar 
  Sidebar_Details,
   LOADING
} = require('../ActionTypes');

function HomeEnter(data) {
  return { type: HOME_ENTER, data };
}
function HomeExit(data) {
  return { type: HOME_EXIT, data };
}
function DemoEnter(data) {
  return { type: DEMO_ENTER, data };
}
function DemoExit(data) {
  return { type: DEMO_EXIT, data };
}
function SurveyEnter(data) {
  return { type: SURVEY_ENTER, data };
}
function SurveyExit(data) {
  return { type: SURVEY_EXIT, data };
}
function VideoEnter(data) {
  return { type: VIDEO_ENTER, data };
}
function VideoExit(data) {
  return { type: VIDEO_EXIT, data };
}
function ScheduleEnter(data) {
  return { type: SCHEDULE_ENTER, data };
}
function ScheduleExit(data) {
  return { type: SCHEDULE_EXIT, data };
}

function SidebarTitle(data) {
  return { type: Sidebar_Details, data };
}
function Loading(data) {
  return { type: LOADING, data };
}

module.exports = {
  HomeEnter,
  HomeExit,
  DemoEnter,
  DemoExit,
  VideoEnter,
  VideoExit,
  SurveyEnter,
  SurveyExit,
  ScheduleEnter,
  ScheduleExit,
  SidebarTitle,
  Loading
}