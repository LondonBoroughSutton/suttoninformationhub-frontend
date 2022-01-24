import React, { Component, Suspense, lazy } from 'react';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider, observer } from 'mobx-react';

import Footer from './components/Footer/Footer';
import Header from './components/Header';

import './styles/grid.scss';

import WindowSizeStore from './stores/windowSizeStore';
import UIStore from './stores/uiStore';
import ResultsStore from './stores/resultsStore';
import ServiceStore from './stores/serviceStore';
import OrganisationStore from './stores/organisationStore';
import FavouritesStore from './stores/favouritesStore';
import CMSStore from './stores/CMSStore';
import ReferralStore from './stores/referralStore';
import Terms from './views/Terms';
import FeedbackModal from './components/FeedbackModal';
import HomeScreenPrompt from './components/HomeScreenPrompt';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import CookieBanner from './components/CookieBanner';
import Loading from './components/Loading';

// add all free font awesome icons to project
library.add(fas, fab);

// Views = lazyload
const windowSizeStore = new WindowSizeStore();
const uiStore = new UIStore();
const resultsStore = new ResultsStore();
const serviceStore = new ServiceStore();
const organisationStore = new OrganisationStore();
const favouritesStore = new FavouritesStore();
const cmsStore = new CMSStore();
const referralStore = new ReferralStore();

// Views
const Home = lazy(() => import('./views/Home/Home'));
const NotFound = lazy(() => import('./views/NotFound/NotFound'));
const Results = lazy(() => import('./views/Results'));
const Service = lazy(() => import('./views/Service'));
const Organisation = lazy(() => import('./views/Organisation'));
const Favourites = lazy(() => import('./views/Favourites'));
const Referral = lazy(() => import('./views/Referral'));
const About = lazy(() => import('./views/About'));
const Contact = lazy(() => import('./views/Contact'));
const GetInvolved = lazy(() => import('./views/GetInvolved'));
const Privacy = lazy(() => import('./views/Privacy'));
const DutyToRefer = lazy(() => import('./views/DutyToRefer'));

class App extends Component {
  componentDidMount() {
    windowSizeStore.setWindow();
  }

  render() {
    return (
      <Provider
        windowSizeStore={windowSizeStore}
        uiStore={uiStore}
        resultsStore={resultsStore}
        serviceStore={serviceStore}
        organisationStore={organisationStore}
        favouritesStore={favouritesStore}
        cmsStore={cmsStore}
        referralStore={referralStore}
      >
        <Router>
          <ScrollToTop>
            <Header />
            <Suspense fallback={<Loading />}>
              <Switch>
                <Route path="/" exact={true} component={Home} />
                <Route path="/results" component={Results} />
                <Route path="/services/:service" component={Service} />
                <Route path="/favourites" component={Favourites} />
                <Route path="/referral" component={Referral} />
                <Route path="/about" component={About} />
                <Route path="/contact" component={Contact} />
                <Route path="/get-involved" component={GetInvolved} />
                <Route path="/privacy-policy" component={Privacy} />
                <Route path="/terms-and-conditions" component={Terms} />
                <Route path="/duty-to-refer" component={DutyToRefer} />
                <Route path="/organisations/:organisation" component={Organisation} />
                <Route component={NotFound} />
              </Switch>
            </Suspense>
            <FeedbackModal />
            <HomeScreenPrompt />
            <Footer />
            <CookieBanner />
          </ScrollToTop>
        </Router>
      </Provider>
    );
  }
}

export default observer(App);
