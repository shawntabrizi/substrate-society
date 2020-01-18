import React, { useState } from 'react';
import { Grid, Form, Input } from 'semantic-ui-react';

import { useSubstrate } from '../substrate-lib';
import { TxButton } from '../substrate-lib/components';

function Main (props) {
  const { api } = useSubstrate();
  const [status, setStatus] = useState(null);
  const [formState, setFormState] = useState({
    value: '',
    tip: '',
    who: ''
  });
  const { accountPair, members } = props;

  const onChange = (_, data) =>
    setFormState(formState => ({ ...formState, [data.state]: data.value }));

  const { value, tip, who } = formState;

  return (
    <Grid.Column>
      <h2>Actions</h2>
      {accountPair && members.includes(accountPair.address) ? (
        <Form>
          <Input
            onChange={onChange}
            placeholder='Who'
            state='who'
            type='text'
            action
          />
          <Input
            onChange={onChange}
            placeholder='Bid Amount'
            state='value'
            type='text'
            action
          />
          <Input
            onChange={onChange}
            placeholder='Tip Amount'
            state='tip'
            type='text'
            action
          />
          <TxButton
            accountPair={accountPair}
            label='Place Vouch'
            setStatus={setStatus}
            type='TRANSACTION'
            attrs={{
              params: [who, value, tip],
              tx: api.tx.society.vouch
            }}
          />
        </Form>
      ) : (
        <Form>
          <Input
            onChange={onChange}
            placeholder='Bid Amount'
            state='value'
            type='text'
            action
          />
          <TxButton
            accountPair={accountPair}
            label='Place Bid'
            setStatus={setStatus}
            type='TRANSACTION'
            attrs={{
              params: [value],
              tx: api.tx.society.bid
            }}
          />
        </Form>
      )}
      {status}
    </Grid.Column>
  );
}

export default function Bids (props) {
  const { api } = useSubstrate();
  return api.query.society && api.query.society.bids ? (
    <Main {...props} />
  ) : null;
}
