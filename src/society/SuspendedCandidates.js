import React, { useEffect, useState } from 'react';
import { Grid, Card } from 'semantic-ui-react';

import { useSubstrate } from '../substrate-lib';
import { TxButton } from '../substrate-lib/components';
import SuspendedCandidateCard from './Cards/SuspendedCandidateCard';

function Main (props) {
  const { api, keyring } = useSubstrate();
  const [suspendedCandidates, setSuspendedCandidates] = useState([]);

  const { accountPair } = props;

  useEffect(() => {
    const addresses = keyring.getPairs().map(account => account.address);
    api.query.society.suspendedCandidates
      .multi(addresses, suspendedStatuses => {
        const suspended = [];
        for (const i in suspendedStatuses) {
          if (suspendedStatuses[i].isSome) {
            suspended.push(addresses[i]);
          }
        }
        setSuspendedCandidates(suspended);
      });
  }, [api.query.society, keyring]);

  return (
    <Grid.Column>
      <h2>Suspended Candidates</h2>
      <Card.Group>
        <SuspendedCandidateCard users={suspendedCandidates} userType={'Suspended'} accountPair={accountPair}/>
      </Card.Group>
    </Grid.Column>
  );
}

export default function Suspended (props) {
  const { api } = useSubstrate();
  return api.query.society && api.query.society.members ? (
    <Main {...props} />
  ) : null;
}
