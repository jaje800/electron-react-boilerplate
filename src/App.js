import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';

//import LolaGlobalStyles from './contexts/styling/LolaGlobalStyles';
//import { MyThemeProvider } from './contexts/ThemeContext';

/*
import TheBlueRoom from './screens/BigBlueRoom/TheBlueRoom';
import NetworkScan from './screens/NetworkScan';
import { MainPage } from './components/GreenRoomComponents/MainPage';
import { WorkingSection } from './components/GreenRoomComponents/WorkingSection';
import GreenRoom from './screens/GreenRoom';
*/
import AudioSessionReducer from './reducers/AudioSessionReducer';
import { AudioSessionSagas } from './sagas/AudioSessionSaga';

import SessionContextProvider from './contexts/SessionContext';
import UserContextProvider from './contexts/UserContext';
import AudioDeviceController from './controllers/AudioDeviceController';

import PrivateRoute, {
  BLUE_ROOM_PATH,
  GREEN_ROOM_PATH,
  NETWORK_SCAN_PATH,
} from './routes';
// init and start our sagas
const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  AudioSessionReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);
sagaMiddleware.run(AudioSessionSagas);

const Hello = () => {
  return (
    <div>
      <div className="Hello" />
      <h1>electron-react-boilerplate</h1>
      <div className="Hello">
        <a
          href="https://electron-react-boilerplate.js.org/"
          target="_blank"
          rel="noreferrer"
        >
          <button type="button">
            <span role="img" aria-label="books">
              📚
            </span>
            Read our docs
          </button>
        </a>
        <a
          href="https://github.com/sponsors/electron-react-boilerplate"
          target="_blank"
          rel="noreferrer"
        >
          <button type="button">
            <span role="img" aria-label="books">
              🙏
            </span>
            Donate
          </button>
        </a>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <React.StrictMode>
        <SessionContextProvider>
          <UserContextProvider>
            <AudioDeviceController />
            {/* <MyThemeProvider>
              <LolaGlobalStyles /> */}
            <BrowserRouter>
              <PrivateRoute>
                <Hello />
                {/*
                  <MainPage>
                    <WorkingSection>
                      <Switch>
                        <Route
                          path={BLUE_ROOM_PATH}
                          exact
                          component={TheBlueRoom}
                        />
                        <Route
                          path={NETWORK_SCAN_PATH}
                          exact
                          component={NetworkScan}
                        />
                        <Route
                          path={GREEN_ROOM_PATH}
                          exact
                          component={GreenRoom}
                        />
                        <Route path="/" component={BlankScreen} />
                      </Switch>
                    </WorkingSection>
                  </MainPage>
*/}
              </PrivateRoute>
            </BrowserRouter>
            {/* </MyThemeProvider> */}
          </UserContextProvider>
        </SessionContextProvider>
      </React.StrictMode>
    </Provider>
  );
}
