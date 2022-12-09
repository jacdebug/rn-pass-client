/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useCallback, useEffect, useState} from 'react';
import {BackHandler, Text} from 'react-native';

import {ItemType} from './types';
import {DownloadRepo} from './DownloadRepo';
import {ListPass} from './ListPass';
import {ListSites} from './ListSites';
import {ListSiteSections} from './ListSiteSections';
// import OpenPGP from 'react-native-fast-openpgp';

type Nav = 'DOWNLOAD' | 'SITE' | 'SECTION' | 'PASS';

const App = () => {
  const [nav, setNav] = useState<Nav>('DOWNLOAD');
  const [selectedSite, setSelectedSite] = React.useState<ItemType>();
  const [selectedSiteSection, setSelectedSiteSection] =
    React.useState<ItemType>();

  const goBack = useCallback(() => {
    if (nav === 'PASS') {
      setNav('SECTION');
      return true;
    } else if (nav === 'SECTION') {
      setNav('SITE');
      return true;
    } else if (nav === 'SITE') {
      setNav('DOWNLOAD');
      return true;
    } else {
      return false;
    }
  }, [nav]);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', goBack);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', goBack);
    };
  });

  switch (nav) {
    case 'DOWNLOAD':
      return (
        <DownloadRepo
          onDownload={() => {
            setNav('SITE');
          }}
        />
      );
    case 'SITE':
      return (
        <ListSites
          onSelectSite={site => {
            setSelectedSite(site);
            setNav('SECTION');
          }}
        />
      );
    case 'SECTION':
      if (selectedSite) {
        return (
          <ListSiteSections
            site={selectedSite}
            onSelectSiteSection={section => {
              setSelectedSiteSection(section);
              setNav('PASS');
            }}
          />
        );
      }
      return <Text>Error route</Text>;
    case 'PASS':
      if (selectedSiteSection) {
        return <ListPass section={selectedSiteSection} />;
      }
      return <Text>Error route</Text>;
  }
};

export default App;
