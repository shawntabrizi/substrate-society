import React, { useEffect, useState } from 'react';
import { Card, Grid, Form, Input } from 'semantic-ui-react';

import { useSubstrate } from '../substrate-lib';
import { TxButton } from '../substrate-lib/components';
import BidCard from './Cards/BidCard';

function Main (props) {
  const { api } = useSubstrate();
  const [status, setStatus] = useState(null);
  const [bids, setBids] = useState([]);
  const [formState, setFormState] = useState({
    input: ''
  });
  const { accountPair } = props;

  useEffect(() => {
    api.query.society.bids(setBids);
  }, [api.query.society]);

  const onChange = (_, data) =>
    setFormState(formState => ({ ...formState, [data.state]: data.value }));

  const { input } = formState;

  return (
    <Grid.Column>
      <h2>Bids</h2>
      <Form>
        <Form.Field>
          <Input
            onChange={onChange}
            label='Bid'
            fluid
            placeholder='Bid Amount'
            state='input'
            type='text'
            action
          >
            <input />
            <TxButton
              accountPair={accountPair}
              label='Place Bid'
              setStatus={setStatus}
              type='TRANSACTION'
              attrs={{
                params: input ? [input] : null,
                tx: api.tx.society.bid
              }}
            />
          </Input>
        </Form.Field>
        {status}
      </Form>
	  <Card.Group>
        <BidCard users={bids} userType={'Bid'} accountPair={accountPair}/>
      </Card.Group>
    </Grid.Column>
  );
}

export default function Bids (props) {
  const { api } = useSubstrate();
  return api.query.society && api.query.society.bids ? (
    <Main {...props} />
  ) : null;
}
