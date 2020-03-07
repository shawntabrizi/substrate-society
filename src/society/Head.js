import React, { useEffect } from 'react';
import { Grid, Popup } from 'semantic-ui-react';

import { useSubstrate } from '../substrate-lib';

import HeadCard from './Cards/HeadCard';

export default function Founder(props) {
  const { api } = useSubstrate();
  const { accountPair, head, setHead, indices, proofs } = props;

  useEffect(() => {
    let unsubscribeAll = null;

    api.query.society.head(head => {
      setHead(head.toString());
    }).then(unsub => {
      unsubscribeAll = unsub;
    }).catch(console.error);

    return () => unsubscribeAll && unsubscribeAll();
  }, [api.query.society, head, setHead]);

  const headDisplay = indices[head] ? indices[head].toString() : head.toString();

  return (
    <Grid.Column>

      <Popup
        hoverable
        trigger={
          <div>
            <div>HEAD</div>
            <div>{headDisplay}</div>
          </div>
        }
      >
        <Popup.Content>
          <HeadCard
            head={head}
            accountPair={accountPair}
            indices={indices}
            proofs={proofs}
          />
        </Popup.Content>
      </Popup>
    </Grid.Column>
  );
}
