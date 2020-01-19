import React, { useEffect, useState } from 'react';
import { Statistic, Grid, Card } from 'semantic-ui-react';
import { stringToU8a, formatBalance } from '@polkadot/util';

import { useSubstrate } from '../substrate-lib';
import { TxButton } from '../substrate-lib/components';

export default function BlockNumber (props) {
  const { accountPair } = props;
  const { api } = useSubstrate();
  const [pot, setPot] = useState(0);
  const [status, setStatus] = useState('');

  const TREASURY_ACCOUNT = stringToU8a('modlpy/socie'.padEnd(32, '\0'));

  useEffect(() => {
    let unsubscribeAll = null;

    api.query.balances
      .freeBalance(TREASURY_ACCOUNT, balance => {
        setPot(balance.toString());
      })
      .then(unsub => {
        unsubscribeAll = unsub;
      })
      .catch(console.error);

    return () => unsubscribeAll && unsubscribeAll();
  }, [TREASURY_ACCOUNT, api.query.balances]);

  return (
    <Grid.Column>
      <Card>
        <Card.Content textAlign='center'>
          <Statistic label={'Society Balance'} value={formatBalance(pot)} />
        </Card.Content>
        <Card.Content extra>
          <TxButton
            accountPair={accountPair}
            label='Donate'
            setStatus={setStatus}
            type='TRANSACTION'
            primary
            attrs={{
              params: [TREASURY_ACCOUNT, '1000000000000000'],
              tx: api.tx.balances.transfer
            }}
          />
		  <br />
          {status}
        </Card.Content>
      </Card>
    </Grid.Column>
  );
}
