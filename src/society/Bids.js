import React, { useEffect, useState } from 'react';
import { Card, Grid } from 'semantic-ui-react';

import { useSubstrate } from '../substrate-lib';
import BidCard from './Cards/BidCard';

function Main (props) {
  const { api } = useSubstrate();
  const [bids, setBids] = useState([]);
  const { accountPair } = props;

  useEffect(() => {
    let unsubscribe = null;

    api.query.society
      .bids(setBids)
      .then(u => {
        unsubscribe = u;
      })
      .catch(console.error);

    return () => unsubscribe && unsubscribe();
  }, [api.query.society]);

  return (
    <Grid.Column>
      <h2>Bids</h2>
      <Card.Group>
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
