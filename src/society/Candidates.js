import React, { useEffect, useState } from 'react';
import { Card, Grid } from 'semantic-ui-react';

import { useSubstrate } from '../substrate-lib';
import CandidateCard from './Cards/CandidateCard';
import PeriodCard from './Cards/PeriodCard';

function Main (props) {
  const { api } = useSubstrate();
  const [status, setStatus] = useState(null);
  const [votes, setVotes] = useState([]);
  const { accountPair, members, candidates, setCandidates, blockNumber, indices, proofs } = props;

  const rotationPeriod = api.consts.society.rotationPeriod.toNumber();

  useEffect(() => {
    let unsubscribe = null;

    api.query.society
      .candidates(setCandidates)
      .then(u => {
        unsubscribe = u;
      })
      .catch(console.error);

    return () => unsubscribe && unsubscribe();
  }, [api.query.society, setCandidates]);

  useEffect(() => {
    var unsubscribe = null;

    var promises = [];

    for (var candidate of candidates) {
      for (var member of members) {
        promises.push([api.query.society.votes, [candidate.who, member]]);
      }
    }

    api
      .queryMulti(promises, results => {
        var votes = [];
        let count = 0;
        for (var candidate of candidates) {
          for (var member of members) {
            votes.push({
              candidate: candidate.who,
              member: member,
              vote: results[count]
            });
            count += 1;
          }
        }
        setVotes(votes);
      })
      .then(u => {
        unsubscribe = u;
      })
      .catch(console.error);

    return () => unsubscribe && unsubscribe();
  }, [api, api.query.society, candidates, members]);

  return (
    <Grid.Column>
      <h2>Candidates</h2>
      <Card.Group>
        <PeriodCard
          enabled={candidates.length > 0}
          period={rotationPeriod}
          blockNumber={blockNumber}
          name={'Candidate rotation'}
        />
        <CandidateCard
          users={candidates}
          votes={votes}
          accountPair={accountPair}
          setStatus={setStatus}
          members={members}
          indices={indices}
          proofs={proofs}
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
