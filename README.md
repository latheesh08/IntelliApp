# inteliapp-Android

## Setup

- `npm install`
- `react-native-link`
- `npx jetify`

## Starting the App

- `react-native run-android`
- `npm start`

## Build For Production

.apk

`cd android && ./gradlew assembleRelease`


.abb

`cd android && ./gradlew bundleRelease`


## Redux & API

This app is a React Native app. We use [Redux] for state management and API interactions. The general pattern/terminology is that "actions" interact with external data and "reducers" serve up the most current, centralized state of the app to the UI.

- Actions: `/Actions`
- Reducers: `/Reducers`


## Translations

Translations are externalized and load based on the browser locale setting. To tell the app which translations are available, see the `constructor` in `i18n/TranslationsConfig.js`:

```
const languages = [
  { name: 'English', code: 'en' },
  { name: 'Español', code: 'es' },
  { name: 'italy', code: 'it' },
  { name: 'german', code: 'de' },
  { name: 'japanese', code: 'ja' },
  { name: 'french', code: 'fr' },
  
];

```
The order in which these languages are listed will dictate in which order the individual translations are found in string arrays in the translation file. The `code` listed should correspond with the language code that would be found in browser settings (in all lower case).

The translation file can be found at `i18n/english.json`. The translations are used throughout the app by using dot-notation to find the appropriate translation in a given place. For any given key, there will be an array of strings with an entry for each language in the order dictated in the `App` constructor. For example:

`"headline": ["Sign in", "Registrarse"]`  // `en` then `es` language codes.

