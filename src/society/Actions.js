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
  const {
    accountPair,
    members,
    bids,
    candidates,
    suspendedMembers,
    suspendedCandidates
  } = props;

  console.log(bids);
  const onChange = (_, data) =>
    setFormState(formState => ({ ...formState, [data.state]: data.value }));

  const { value, tip, who } = formState;

  if (accountPair && members.includes(accountPair.address)) {
    return (
      <Grid.Column>
        <h2>You are a Member of the Society</h2>
        <h3>Vouch for Others</h3>
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
        {status}
      </Grid.Column>
    );
  } else if (
    accountPair &&
    bids.some(bid => bid.who.toString() === accountPair.address)
  ) {
    return (
      <Grid.Column>
        <h2>You are a Bid</h2>
        <h3>Wait for your bid to be accepted or unbid.</h3>
        <Form>
          <TxButton
            accountPair={accountPair}
            label='Unbid'
            setStatus={setStatus}
            type='TRANSACTION'
            attrs={{
              params: [],
              tx: api.tx.society.unbid
            }}
          />
        </Form>
        {status}
      </Grid.Column>
    );
  } else if (
    accountPair &&
    candidates.some(
      candidate => candidate.who.toString() === accountPair.address
    )
  ) {
    return (
      <Grid.Column>
        <h2>You are a Candidate</h2>
        <h3>Ask members to vote for you!</h3>
      </Grid.Column>
    );
  } else {
    return (
      <Grid.Column>
        <h2>Join the Society</h2>
        <h3>Make a Bid</h3>
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
        {status}
      </Grid.Column>
    );
  }
}

export default function Bids (props) {
  const { api } = useSubstrate();
  return api.query.society && api.query.society.bids ? (
    <Main {...props} />
  ) : null;
}
