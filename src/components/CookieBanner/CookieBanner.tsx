import { Component } from 'react';
import './CookieBanner.scss';

class CookieBanner extends Component<any> {
  componentDidMount = () => this.loadScript();

  loadScript = () => {
    const interValMilisecons = 500;
    let loadCount = 5;
    const wpccConfig = {
      border: 'thin',
      corners: 'normal',
      colors: {
        popup: {
          background: '#ffe900',
          text: '#000000',
          border: '#e0bc57',
        },
        button: {
          background: '#000000',
          text: '#ffffff',
        },
      },
      position: 'top',
      pushdown: true,
      content: {
        href: '/privacy-policy',
        message:
          'Our website uses cookies. ',
        link: 'Read more about what cookies are, how we use them on this website and how to manage them.',
      },
      padding: 'small',
    };

    const intervalId = setInterval(() => {
      if (loadCount === 0) {
        clearInterval(intervalId);
      }
      if (!window.wpcc) {
        return loadCount--;
      }

      clearInterval(intervalId);

      window.wpcc.init(wpccConfig);
    }, interValMilisecons);
  };

  render = () => null;
}

export default CookieBanner;
