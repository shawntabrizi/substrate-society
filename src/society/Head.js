import React, { useEffect, useState } from 'react';
import { Grid } from 'semantic-ui-react';

import { useSubstrate } from '../substrate-lib';

import HeadCard from './Cards/HeadCard';

export default function Founder (props) {
  const { api } = useSubstrate();
  const { accountPair } = props;
  const [head, setHead] = useState(0);

  useEffect(() => {
    let unsubscribeAll = null;

    api.query.society.head(head => {
      setHead(head.toString());
    }).then(unsub => {
      unsubscribeAll = unsub;
    }).catch(console.error);

    return () => unsubscribeAll && unsubscribeAll();
  }, [api.query.society, head]);

  return (
    <Grid.Column>
      <HeadCard
        head={head}
        accountPair={accountPair}
      />
    </Grid.Column>
  );
}
