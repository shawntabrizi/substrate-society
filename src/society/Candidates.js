import React, { useEffect, useState } from 'react';
import { Card, Grid } from 'semantic-ui-react';

import { useSubstrate } from '../substrate-lib';
import CandidateCard from './Cards/CandidateCard';

function Main (props) {
  const { api } = useSubstrate();
  const [status, setStatus] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const { accountPair } = props;

  useEffect(() => {
    api.query.society.candidates(setCandidates);
  }, [api.query.society]);

  return (
    <Grid.Column>
      <h2>Candidates</h2>
      <Card.Group>
        <CandidateCard
          users={candidates}
          accountPair={accountPair}
          setStatus={setStatus}
        />
      </Card.Group>
      {status}
    </Grid.Column>
  );
}

export default function Candidates (props) {
  const { api } = useSubstrate();
  return api.query.society && api.query.society.bids ? (
    <Main {...props} />
  ) : null;
}
