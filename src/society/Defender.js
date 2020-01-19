import React, { useEffect, useState } from 'react';
import { Card, Grid } from 'semantic-ui-react';

import { useSubstrate } from '../substrate-lib';
import DefenderCard from './Cards/DefenderCard';

function Main (props) {
  const { api } = useSubstrate();
  const [status, setStatus] = useState(null);
  const [defender, setDefender] = useState('');
  const [votes, setVotes] = useState([]);

  const { accountPair, members } = props;

  useEffect(() => {
    let unsubscribe = null;

    api.query.society
      .defender(setDefender)
      .then(u => {
        unsubscribe = u;
      })
      .catch(console.error);

    return () => unsubscribe && unsubscribe();
  }, [api.query.society]);

  useEffect(() => {
    let unsubscribe = null;

    api.query.society.defenderVotes
      .multi(members, votes => {
        const votesMap = members.reduce(
          (acc, address, index) => ({
            ...acc,
            [address]: votes[index]
          }),
          {}
        );
        setVotes(votesMap);
      })
      .then(u => {
        unsubscribe = u;
      })
      .catch(console.error);

    return () => unsubscribe && unsubscribe();
  }, [api.query.society, members]);

  return (
    <Grid.Column>
      <h2>Defender</h2>
      <Card.Group>
        <DefenderCard
          defender={defender}
          votes={votes}
          accountPair={accountPair}
          setStatus={setStatus}
          members={members}
        />
      </Card.Group>
      {status}
    </Grid.Column>
  );
}

export default function Candidates (props) {
  const { api } = useSubstrate();
  return api.query.society &&
    api.query.society.defender &&
    api.query.society.defenderVotes ? (
      <Main {...props} />
    ) : null;
}
