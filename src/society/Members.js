import React, { useEffect, useState } from 'react';
import { Grid, Card } from 'semantic-ui-react';

import { useSubstrate } from '../substrate-lib';
import { TxButton } from '../substrate-lib/components';
import UserCard from './Cards/UserCard';

function Main (props) {
  const { api } = useSubstrate();
  const [members, setMembers] = useState([]);
  const [strikes, setStrikes] = useState([]);

  const { accountPair } = props;

  useEffect(() => {
    api.query.society.members(setMembers);
  }, [api.query.society]);

  useEffect(() => {
    api.query.society.strikes.multi(members, setStrikes);
  }, [api.query.society, members]);

  return (
    <Grid.Column>
      <h2>Members</h2>
      <Card.Group>
        <UserCard users={members} userType={'Member'} strikes={strikes} accountPair={accountPair}/>
      </Card.Group>
    </Grid.Column>
  );
}

export default function Members (props) {
  const { api } = useSubstrate();
  return api.query.society && api.query.society.members ? (
    <Main {...props} />
  ) : null;
}
