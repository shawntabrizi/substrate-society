import React, { useEffect, useState } from 'react';
import { Grid, Card } from 'semantic-ui-react';

import { useSubstrate } from '../substrate-lib';
import SuspendedMemberCard from './Cards/SuspendedMemberCard';

function Main(props) {
  const { api, keyring } = useSubstrate();
  const [status, setStatus] = useState(null);

  const { accountPair, founder, suspendedMembers, setSuspendedMembers } = props;

  useEffect(() => {
    const addresses = keyring.getPairs().map(account => account.address);
    let unsubscribe = null;
    api.query.society.suspendedMembers
      .multi(addresses, suspendedStatuses => {
        const suspended = [];
        for (const i in suspendedStatuses) {
          if (suspendedStatuses[i].isTrue) {
            suspended.push(addresses[i]);
          }
        }
        setSuspendedMembers(suspended);
      })
      .then(u => {
        unsubscribe = u;
      })
      .catch(console.error);
    return () => unsubscribe && unsubscribe();
  }, [api.query.society.suspendedMembers, keyring, setSuspendedMembers]);

  return (
    <div>
      {suspendedMembers.length > 0 ?
        <h2>Suspended Members
      <Card.Group>
            <SuspendedMemberCard
              users={suspendedMembers}
              accountPair={accountPair}
              setStatus={setStatus}
              judgementOrigin={founder}
            />
          </Card.Group>
        </h2>
        : ''}
      {status}
    </div>
  );
}

export default function Suspended(props) {
  const { api } = useSubstrate();
  return api.query.society && api.query.society.suspendedMembers ? (
    <Main {...props} />
  ) : null;
}
