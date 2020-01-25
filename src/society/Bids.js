import React, { useEffect } from 'react';
import { Card, Grid } from 'semantic-ui-react';

import { useSubstrate } from '../substrate-lib';
import BidCard from './Cards/BidCard';
import PeriodCard from './Cards/PeriodCard';

function Main (props) {
  const { api } = useSubstrate();
  const { accountPair, bids, setBids, blockNumber } = props;

  const rotationPeriod = api.consts.society.rotationPeriod.toNumber();

  useEffect(() => {
    let unsubscribe = null;

    api.query.society
      .bids(setBids)
      .then(u => {
        unsubscribe = u;
      })
      .catch(console.error);

    return () => unsubscribe && unsubscribe();
  }, [api.query.society, setBids]);

  return (
    <Grid.Column>
      <h2>Bids</h2>
      <Card.Group>
        <PeriodCard
          enabled={bids.length > 0}
          period={rotationPeriod}
          blockNumber={blockNumber}
          name={'Bid rotation'}
        />
        <BidCard users={bids} userType={'Bid'} accountPair={accountPair} />
      </Card.Group>
    </Grid.Column>
  );
}

export default function Bids (props) {
  const { api } = useSubstrate();
  return api.query.society && api.query.society.bids ? (
    <Main {...props} />
  ) : null;
}
