import React from 'react';
import { Helmet } from 'react-helmet';
import { inject, observer } from 'mobx-react';
import get from 'lodash/get';
import ReactMarkdown from 'react-markdown';
import ReactPlayer from 'react-player';

import CMSStore from '../stores/CMSStore';
import CMSPage from '../components/CMSPageLayout';

interface IProps {
  cmsStore: CMSStore;
}

const About: React.FunctionComponent<IProps> = ({ cmsStore }) => {
  if (!cmsStore) {
    return null;
  }

  return (
    <CMSPage title={get(cmsStore, 'about.title')} breadcrumb="About">
      <Helmet>
        <title>About | Help Yourself Sutton</title>
      </Helmet>
      <ReactMarkdown source={get(cmsStore, 'about.content')} />
      {get(cmsStore, 'about.video_url') && (
        <ReactPlayer
          url={get(cmsStore, 'about.video_url')}
          style={{ borderRadius: '19px', margin: 'auto', marginTop: '24px' }}
          width={'90%'}
          light={true}
        />
      )}
    </CMSPage>
  );
};

export default inject('cmsStore')(observer(About));
