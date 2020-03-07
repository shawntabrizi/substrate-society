import React, { useEffect, useState } from 'react';
import { Grid } from 'semantic-ui-react';

import { useSubstrate } from './substrate-lib';

export default function BlockNumber(props) {
  const { api } = useSubstrate();
  const { finalized, blockNumber, setBlockNumber } = props;
  const [blockNumberTimer, setBlockNumberTimer] = useState(0);

  const bestNumber = finalized
    ? api.derive.chain.bestNumberFinalized
    : api.derive.chain.bestNumber;

  useEffect(() => {
    let unsubscribeAll = null;

    bestNumber(number => {
      setBlockNumber(number.toNumber());
      setBlockNumberTimer(0);
    })
      .then(unsub => {
        unsubscribeAll = unsub;
      })
      .catch(console.error);

    return () => unsubscribeAll && unsubscribeAll();
  }, [bestNumber, setBlockNumber]);

  const timer = () => {
    setBlockNumberTimer(time => time + 1);
  };

  useEffect(() => {
    const id = setInterval(timer, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <Grid.Column>
      <div>{finalized ? "FINALIZED " : "BLOCK "}</div>
      <div>{blockNumber}</div>
    </Grid.Column>
  );
}
