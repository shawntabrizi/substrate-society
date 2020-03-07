import React, { useEffect } from 'react';
import { Grid } from 'semantic-ui-react';

import { useSubstrate } from '../substrate-lib';
import BidCard from './Cards/BidCard';

function Main(props) {
  const { api } = useSubstrate();
  const { accountPair, bids, setBids, blockNumber, indices, proofs } = props;

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
      {bids.length > 0 ?
        <h2>Bids:
        <BidCard
            users={bids}
            userType={'Bid'}
            accountPair={accountPair}
            indices={indices}
            proofs={proofs}
          />
        </h2>
        : ''}
    </Grid.Column>
  );
}

export default function Bids(props) {
  const { api } = useSubstrate();
  return api.query.society && api.query.society.bids ? (
    <Main {...props} />
  ) : null;
}
