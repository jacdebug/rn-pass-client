import React, {useEffect} from 'react';
import {ListItemsComponent} from './ListItemsComponent';
import {ItemType} from './types';
import {getRepo, ZIP_EXTRACT_DIR, getSites, addItemKey} from './utils';

export const ListSites = ({
  onSelectSite,
}: {
  onSelectSite: (site: ItemType) => void;
}) => {
  const [sites, setSites] = React.useState<ItemType[]>([]);

  useEffect(() => {
    async function get() {
      const repo = await getRepo(ZIP_EXTRACT_DIR);
      const result = await getSites(repo.path);
      setSites(result);
    }
    get();
  });

  return (
    <ListItemsComponent list={addItemKey(sites)} onSelect={onSelectSite} />
  );
};
