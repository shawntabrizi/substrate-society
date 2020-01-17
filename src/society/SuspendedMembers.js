import React, { useEffect, useState } from 'react';
import { Grid, Card } from 'semantic-ui-react';

import { useSubstrate } from '../substrate-lib';
import { TxButton } from '../substrate-lib/components';
import SuspendedMemberCard from './Cards/SuspendedMemberCard';

function Main (props) {
  const { api, keyring } = useSubstrate();
  const [suspendedMembers, setSuspendedMembers] = useState([]);

  const { accountPair } = props;

  useEffect(() => {
    const addresses = keyring.getPairs().map(account => account.address);
    api.query.society.suspendedMembers
      .multi(addresses, suspendedStatuses => {
        const suspended = [];
        for (const i in suspendedStatuses) {
          if (suspendedStatuses[i].isSome) {
            suspended.push(addresses[i]);
          }
        }
        setSuspendedMembers(suspended);
      });
  }, [api.query.society, keyring]);

  return (
    <Grid.Column>
      <h2>Suspended Members</h2>
      <Card.Group>
        <SuspendedMemberCard users={suspendedMembers} accountPair={accountPair}/>
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
