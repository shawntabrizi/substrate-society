import React, { useEffect, useState } from 'react';
import { Statistic, Grid, Card } from 'semantic-ui-react';

import { useSubstrate } from '../substrate-lib';
import { formatBalance } from '@polkadot/util';

export default function BlockNumber (props) {
  const { api } = useSubstrate();
  const [pot, setPot] = useState(0);

  useEffect(() => {
    let unsubscribeAll = null;

    api.query.society.pot(number => {
      setPot(number.toString());
    }).then(unsub => {
      unsubscribeAll = unsub;
    }).catch(console.error);

    return () => unsubscribeAll && unsubscribeAll();
  }, [api.query.society]);

  return (
    <Grid.Column>
      <Card>
        <Card.Content textAlign='center'>
          <Statistic
            label={'Society Pot'}
            value={formatBalance(pot)}
          />
        </Card.Content>
        <Card.Content extra>
          {'Extra'}
        </Card.Content>
      </Card>
    </Grid.Column>
  );
}
