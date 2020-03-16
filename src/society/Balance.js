import React, { useEffect, useState } from 'react';
import { Grid } from 'semantic-ui-react';
import { stringToU8a, formatBalance } from '@polkadot/util';
import { encodeAddress } from '@polkadot/util-crypto';

import { useSubstrate } from '../substrate-lib';
import { TxButton } from '../substrate-lib/components';

export default function BlockNumber(props) {
  const { accountPair } = props;
  const { api } = useSubstrate();
  const [pot, setPot] = useState(0);
  const [status, setStatus] = useState('');

  const TREASURY_ACCOUNT = stringToU8a('modlpy/socie'.padEnd(32, '\0'));

  useEffect(() => {
    let unsubscribeAll = null;

    api.query.system
      .account(TREASURY_ACCOUNT, accountData => {
        setPot(accountData.data.free.toString());
      })
      .then(unsub => {
        unsubscribeAll = unsub;
      })
      .catch(console.error);

    return () => unsubscribeAll && unsubscribeAll();
  }, [TREASURY_ACCOUNT, api.query.system.account]);

  return (
    <Grid.Column>

      <a style={{ "color": "inherit" }} target="_blank" href={'https://polkascan.io/pre/kusama/account/' + encodeAddress(TREASURY_ACCOUNT)}>
        <div>BALANCE</div>
        <div>{formatBalance(pot)}</div>
      </a>
    </Grid.Column>

  );
}
