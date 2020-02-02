import { useEffect } from 'react';

import { useSubstrate } from './substrate-lib';

export default function BlockNumber (props) {
  const { api } = useSubstrate();
  const { users, show = false, indices, setIndices } = props;

  useEffect(() => {
    const unsubscribeAll = null;
    for (const user of users) {
      if (!(user in indices)) {
        api.derive.accounts.idToIndex(user, index => {
          if (index) {
            setIndices({ ...indices, [user]: index });
          }
        });
      }
    }
    return () => unsubscribeAll && unsubscribeAll();
  }, [api.derive.accounts, indices, setIndices, users]);

  return show ? JSON.stringify(indices) : null;
}
