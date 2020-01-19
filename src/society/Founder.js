import React, { useEffect } from 'react';
import { Grid } from 'semantic-ui-react';

import { useSubstrate } from '../substrate-lib';

import FounderCard from './Cards/FounderCard';

export default function Founder (props) {
  const { api } = useSubstrate();
  const { accountPair, founder, setFounder } = props;

  useEffect(() => {
    let unsubscribeAll = null;

    api.query.society.founder(founder => {
      setFounder(founder.toString());
    }).then(unsub => {
      unsubscribeAll = unsub;
    }).catch(console.error);

    return () => unsubscribeAll && unsubscribeAll();
  }, [api.query.society, setFounder]);

  return (
    <Grid.Column>
      <FounderCard
        founder={founder}
        accountPair={accountPair}
      />
    </Grid.Column>
  );
}
