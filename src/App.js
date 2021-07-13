import 'react-tabs/style/react-tabs.css';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CreateAd from './pages/createAd/CreateAd';
import PreviewAd from './pages/previewAd/PreviewAd.jsx';
import { GlobalContext, GlobalContextProvider } from './context/global.context.jsx';
import InitialOperations from './components/initialOperations/InitialOperations';
import Intro from './pages/intro/Intro';

function App() {
  return (
    <div className="container p-0">
      <GlobalContextProvider>
      <Router>
          <InitialOperations />
          <GlobalContext.Consumer>
            {globalContext => (
              <Switch>
                {
                  globalContext.hideIntro && <>
                    <Route exact path="/">
                      <CreateAd />
                    </Route>
                    <Route path="/previewAd">
                      <PreviewAd />
                    </Route>
                    {/* <Route><CreateAd /></Route> */}
                  </>
                }
                {
                  globalContext.hideIntro === false && <Route exact path="/">
                    <Intro/>
                  </Route>
                }

              </Switch>
            )}
          </GlobalContext.Consumer>
        </Router>
      </GlobalContextProvider>
    </div>
  );
}

export default App;
