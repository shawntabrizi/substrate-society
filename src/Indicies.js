import { useEffect } from 'react';

import { useSubstrate } from './substrate-lib';

export default function BlockNumber (props) {
  const { api } = useSubstrate();
  const { users, show = false, indicies, setIndicies } = props;

  useEffect(() => {
    const unsubscribeAll = null;
    for (const user of users) {
      if (!(user in indicies)) {
        api.derive.accounts.idToIndex(user, index => {
          setIndicies({ ...indicies, [user]: index });
        });
      }
    }
    return () => unsubscribeAll && unsubscribeAll();
  }, [api.derive.accounts, indicies, setIndicies, users]);

  return show ? JSON.stringify(indicies) : null;
}
