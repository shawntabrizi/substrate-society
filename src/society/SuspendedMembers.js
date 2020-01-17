import React, { useEffect, useState } from 'react';
import { Grid, Card } from 'semantic-ui-react';

import { useSubstrate } from '../substrate-lib';
import SuspendedMemberCard from './Cards/SuspendedMemberCard';

function Main (props) {
  const { api, keyring } = useSubstrate();
  const [status, setStatus] = useState(null);
  const [suspendedMembers, setSuspendedMembers] = useState([]);

  const { accountPair } = props;

  useEffect(() => {
    const addresses = keyring.getPairs().map(account => account.address);
    let unsubscribeAll = null;

    api.query.society.suspendedMembers
      .multi(addresses, suspendedStatuses => {
        const suspendedMap = addresses.reduce(
          (acc, address, index) => ({
            ...acc, [address]: suspendedStatuses[index]
          }), {});
        setSuspendedMembers(suspendedMap);
      }).then(unsub => {
        unsubscribeAll = unsub;
      }).catch(console.error);

    return () => unsubscribeAll && unsubscribeAll();
  }, [setSuspendedMembers, keyring, api.query.society.suspendedMembers]);

  return (
    <Grid.Column>
      <h2>Suspended Members</h2>
      <Card.Group>
        <SuspendedMemberCard
          users={suspendedMembers}
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
  return api.query.society && api.query.society.suspendedMembers ? (
    <Main {...props} />
  ) : null;
}
