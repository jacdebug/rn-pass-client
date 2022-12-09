import React, {useEffect} from 'react';
import {ListItemsComponent} from './ListItemsComponent';
import {ItemType} from './types';
import {getLogins} from './utils';

export const ListPass = ({section}: {section: ItemType}) => {
  const [listPass, setListPass] = React.useState<ItemType[]>([]);

  useEffect(() => {
    async function get() {
      const result = await getLogins(section.path);
      setListPass(result);
    }
    get();
  });

  const siteSectionsMore = Array(30)
    .fill(0)
    .flatMap(_ => listPass)
    .map((e, i) => ({
      ...e,
      name: e.name + ' ' + i,
      key: i,
    }));

  return <ListItemsComponent list={siteSectionsMore} onSelect={() => {}} />;
};
