import React, { useEffect, useState } from 'react';
import { Card, Grid } from 'semantic-ui-react';

import { useSubstrate } from '../substrate-lib';
import CandidateCard from './Cards/CandidateCard';

function Main (props) {
  const { api } = useSubstrate();
  const [status, setStatus] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [votes, setVotes] = useState([]);
  const { accountPair, members } = props;

  useEffect(() => {
    let unsubscribe = null;

    api.query.society
      .candidates(setCandidates)
      .then(u => {
        unsubscribe = u;
      })
      .catch(console.error);

    return () => unsubscribe && unsubscribe();
  }, [api.query.society]);

  //   useEffect(() => {
  //     const unsubscribe = null;

  //     var promises = [];

  //     for (var candidate of candidates) {
  //       for (var member of members) {
  //         promises.push(candidate);
  //         promises.push(member);
  //         promises.push(api.query.society.votes(candidate, member));
  //       }
  //     }

  //     console.log('Promises', promises);

  // Promise.all(promises).then(results => {
  //   const votes = [];

  //   for (var i = 0; i < results.length; i += 3) {
  //     votes.push({
  //       candidate: results[i],
  //       member: results[i + 1],
  //       vote: results[i + 2]
  //     });
  //   }

  //   setVotes(votes);
  // });

  //     return () => unsubscribe && unsubscribe();
  //   }, [api.query.society, candidates, members]);

  return (
    <Grid.Column>
      <h2>Candidates</h2>
      {JSON.stringify(votes)}
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
