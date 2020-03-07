import React, { useEffect } from 'react';
import { Grid, Popup } from 'semantic-ui-react';

import { useSubstrate } from '../substrate-lib';

import FounderCard from './Cards/FounderCard';

export default function Founder(props) {
  const { api } = useSubstrate();
  const { accountPair, founder, setFounder, indices, proofs } = props;

  useEffect(() => {
    let unsubscribeAll = null;

    api.query.society.founder(founder => {
      setFounder(founder.toString());
    }).then(unsub => {
      unsubscribeAll = unsub;
    }).catch(console.error);

    return () => unsubscribeAll && unsubscribeAll();
  }, [api.query.society, setFounder]);

  const founderDisplay = indices[founder] ? indices[founder].toString() : founder.toString();

  return (
    <Grid.Column>
      <Popup
        hoverable
        trigger={
          <div>
            <div>FOUNDER</div>
            <div>{founderDisplay}</div>
          </div>
        }
      >
        <Popup.Content>
          <FounderCard
            founder={founder}
            accountPair={accountPair}
            indices={indices}
            proofs={proofs}
          />
        </Popup.Content>
      </Popup>
    </Grid.Column>
  );
}
