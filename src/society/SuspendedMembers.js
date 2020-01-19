import React, { useEffect, useState } from 'react';
import { Grid, Card } from 'semantic-ui-react';

import { useSubstrate } from '../substrate-lib';
import SuspendedMemberCard from './Cards/SuspendedMemberCard';

function Main (props) {
  const { api, keyring } = useSubstrate();
  const [status, setStatus] = useState(null);
  const [suspendedMembers, setSuspendedMembers] = useState([]);

  const { accountPair, members } = props;

  useEffect(() => {
    const addresses = keyring.getPairs().map(account => account.address);

    var promises = [];

    addresses.forEach(address =>
      promises.push(api.query.society.suspendedMembers(address))
    );

    Promise.all(promises).then(results => {
      var suspended = [];
      results.forEach((suspendedStatus, i) => {
        if (suspendedStatus.isTrue) {
          suspended.push(addresses[i]);
        }
      });

      setSuspendedMembers(suspended);
    });
  }, [api.query.society, api.query.society.suspendedMembers, keyring, members, status]);

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
