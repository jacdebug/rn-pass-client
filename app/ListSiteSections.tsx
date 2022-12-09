import React, {useEffect} from 'react';
import {ListItemsComponent} from './ListItemsComponent';
import {ItemType} from './types';
import {addItemKey, getSiteSections} from './utils';

export const ListSiteSections = ({
  site,
  onSelectSiteSection,
}: {
  site: ItemType;
  onSelectSiteSection: (site: ItemType) => void;
}) => {
  const [siteSections, setSiteSections] = React.useState<ItemType[]>([]);

  useEffect(() => {
    async function get() {
      const result = await getSiteSections(site.path);
      setSiteSections(result);
    }
    get();
  });

  return (
    <ListItemsComponent
      list={addItemKey(siteSections)}
      onSelect={onSelectSiteSection}
    />
  );
};
