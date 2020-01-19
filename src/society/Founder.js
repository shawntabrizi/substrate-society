import React, { useEffect, useState } from 'react';
import { Grid } from 'semantic-ui-react';

import { useSubstrate } from '../substrate-lib';

import FounderCard from './Cards/FounderCard';

export default function Founder (props) {
  const { api } = useSubstrate();
  const { accountPair } = props;
  const [founder, setFounder] = useState(0);

  useEffect(() => {
    let unsubscribeAll = null;

    api.query.society.founder(founder => {
      setFounder(founder.toString());
    }).then(unsub => {
      unsubscribeAll = unsub;
    }).catch(console.error);

    return () => unsubscribeAll && unsubscribeAll();
  }, [api.query.society]);

  return (
    <Grid.Column>
      <FounderCard
        founder={founder}
        accountPair={accountPair}
      />
    </Grid.Column>
  );
}
