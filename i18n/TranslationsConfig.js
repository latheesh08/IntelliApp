import LocalizedStrings from 'react-native-localization';
var english = require('../i18n/english.json')
var spanish = require('../i18n/spanish.json')
var italy = require('../i18n/italy.json')
var german = require('../i18n/german.json')
var japanese = require('../i18n/japanese')
var french = require("../i18n/french")
export let strings = new LocalizedStrings({
  "en-US": english,
  en: english,
  es: spanish,
  it: italy,
  de: german,
  ja: japanese,
  fr: french

})