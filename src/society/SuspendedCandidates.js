import React, { useEffect, useState } from 'react';
import { Grid, Card } from 'semantic-ui-react';

import { useSubstrate } from '../substrate-lib';
import SuspendedCandidateCard from './Cards/SuspendedCandidateCard';

function Main (props) {
  const { api, keyring } = useSubstrate();
  const [status, setStatus] = useState(null);
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
  }, [api.query.society, status, keyring]);

  return (
    <Grid.Column>
      <h2>Suspended Candidates</h2>
      <Card.Group>
        <SuspendedCandidateCard
          users={suspendedCandidates}
          userType={'Suspended'}
          accountPair={accountPair}
          setStatus={setStatus}
        />
      </Card.Group>
      {status}
    </Grid.Column>
  );
}

export default function Suspended (props) {
  const { api } = useSubstrate();
  return api.query.society && api.query.society.suspendedCandidates ? (
    <Main {...props} />
  ) : null;
}
