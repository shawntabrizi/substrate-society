import React, { useEffect, useState } from 'react';
import { Grid, Card } from 'semantic-ui-react';

import { useSubstrate } from '../substrate-lib';
import SuspendedCandidateCard from './Cards/SuspendedCandidateCard';

function Main(props) {
  const { api, keyring } = useSubstrate();
  const [status, setStatus] = useState(null);

  const {
    accountPair,
    founder,
    suspendedCandidates,
    setSuspendedCandidates
  } = props;

  useEffect(() => {
    const addresses = keyring.getPairs().map(account => account.address);
    let unsubscribe = null;
    api.query.society.suspendedCandidates
      .multi(addresses, suspendedStatuses => {
        const suspended = [];
        for (const i in suspendedStatuses) {
          if (suspendedStatuses[i].isSome) {
            suspended.push(addresses[i]);
          }
        }
        setSuspendedCandidates(suspended);
      })
      .then(u => {
        unsubscribe = u;
      })
      .catch(console.error);
    return () => unsubscribe && unsubscribe();
  }, [api.query.society.suspendedCandidates, keyring, setSuspendedCandidates]);

  return (
    <div>
      {suspendedCandidates.length > 0 ?
        <div>Suspended Candidates:
      <Card.Group>
            <SuspendedCandidateCard
              users={suspendedCandidates}
              accountPair={accountPair}
              setStatus={setStatus}
              judgementOrigin={founder}
            />
          </Card.Group>
        </div>
        : ''}
      {status}
    </div>
  );
}

export default function Suspended(props) {
  const { api } = useSubstrate();
  return api.query.society && api.query.society.suspendedCandidates ? (
    <Main {...props} />
  ) : null;
}
