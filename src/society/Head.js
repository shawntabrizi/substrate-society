import React, { useEffect } from 'react';
import { Grid } from 'semantic-ui-react';

import { useSubstrate } from '../substrate-lib';

import HeadCard from './Cards/HeadCard';

export default function Founder (props) {
  const { api } = useSubstrate();
  const { accountPair, head, setHead } = props;

  useEffect(() => {
    let unsubscribeAll = null;

    api.query.society.head(head => {
      setHead(head.toString());
    }).then(unsub => {
      unsubscribeAll = unsub;
    }).catch(console.error);

    return () => unsubscribeAll && unsubscribeAll();
  }, [api.query.society, head, setHead]);

  return (
    <Grid.Column>
      <HeadCard
        head={head}
        accountPair={accountPair}
      />
    </Grid.Column>
  );
}
