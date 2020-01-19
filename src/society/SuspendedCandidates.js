import React, { useEffect, useState } from 'react';
import { Grid, Card } from 'semantic-ui-react';

import { useSubstrate } from '../substrate-lib';
import SuspendedCandidateCard from './Cards/SuspendedCandidateCard';

function Main (props) {
  const { api, keyring } = useSubstrate();
  const [status, setStatus] = useState(null);
  const [suspendedCandidates, setSuspendedCandidates] = useState([]);

  const { accountPair, members, candidates } = props;

  useEffect(() => {
    const addresses = keyring.getPairs().map(account => account.address);

    var promises = [];

    addresses.forEach(address =>
      promises.push(api.query.society.suspendedCandidates(address))
    );

    Promise.all(promises).then(results => {
      var suspended = [];
      results.forEach((suspendedStatus, i) => {
        if (suspendedStatus.isSome) {
          suspended.push(addresses[i]);
        }
      });

      setSuspendedCandidates(suspended);
    });
  }, [
    api.query.society,
    api.query.society.suspendedCandidates,
    keyring,
    members,
    candidates,
    status
  ]);

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
