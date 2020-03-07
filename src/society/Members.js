import React, { useEffect, useState } from 'react';

import { useSubstrate } from '../substrate-lib';
import MemberCard from './Cards/MemberCard';

function Main(props) {
  const { api } = useSubstrate();
  const [strikes, setStrikes] = useState([]);

  const { accountPair, members, setMembers, indices, proofs } = props;

  useEffect(() => {
    let unsubscribe = null;

    api.query.society
      .members(setMembers)
      .then(u => {
        unsubscribe = u;
      })
      .catch(console.error);

    return () => unsubscribe && unsubscribe();
  }, [api.query.society, setMembers]);

  useEffect(() => {
    let unsubscribe = null;

    api.query.society.strikes
      .multi(members, setStrikes)
      .then(u => {
        unsubscribe = u;
      })
      .catch(console.error);

    return () => unsubscribe && unsubscribe();
  }, [api.query.society, members, strikes]);

  return (
    <div>
      <h2>THE MEMBERS</h2>
      <h3>
        <MemberCard
          users={members}
          strikes={strikes}
          accountPair={accountPair}
          indices={indices}
          proofs={proofs}
        />
        </h3>
    </div>
  );
}

export default function Members(props) {
  const { api } = useSubstrate();
  return api.query.society && api.query.society.members ? (
    <Main {...props} />
  ) : null;
}
