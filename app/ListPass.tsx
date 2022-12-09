import React, {useEffect} from 'react';
import {ListItemsComponent} from './ListItemsComponent';
import {ItemType} from './types';
import {getLogins, addItemKey} from './utils';

export const ListPass = ({section}: {section: ItemType}) => {
  const [listPass, setListPass] = React.useState<ItemType[]>([]);

  useEffect(() => {
    async function get() {
      const result = await getLogins(section.path);
      setListPass(result);
    }
    get();
  });

  return <ListItemsComponent list={addItemKey(listPass)} onSelect={() => {}} />;
};
