import { useEffect } from 'react';

import { useSubstrate } from './substrate-lib';

export default function BlockNumber (props) {
  const { api } = useSubstrate();
  const { users, show = false, indices, setIndices } = props;

  console.log(indices);

  useEffect(() => {
    const unsubscribeAll = null;
    for (const user of users) {
      if (!(user in indices)) {
        console.log('New User ', user);
        api.derive.accounts.idToIndex(user, index => {
          console.log('user Index ', index);
          setIndices({ ...indices, [user]: index });
        });
      }
    }
    return () => unsubscribeAll && unsubscribeAll();
  }, [api.derive.accounts, indices, setIndices, users]);

  return show ? JSON.stringify(indices) : null;
}
