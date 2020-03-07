import React, { useState } from 'react';
import { Grid, Form, Input, Popup } from 'semantic-ui-react';

import { useSubstrate } from '../substrate-lib';
import { TxButton } from '../substrate-lib/components';

function Main(props) {
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

  const onChange = (_, data) =>
    setFormState(formState => ({ ...formState, [data.state]: data.value }));

  const { value, tip, who } = formState;

  if (accountPair && members.includes(accountPair.address)) {
    return (
      <div>
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
      </div>
    );
  } else if (
    accountPair &&
    bids.some(bid => bid.who.toString() === accountPair.address)
  ) {
    return (
      <div>
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
      </div>
    );
  } else if (
    accountPair &&
    candidates.some(
      candidate => candidate.who.toString() === accountPair.address
    )
  ) {
    return (
      <div>
        <h2>You are a Candidate</h2>
        <h3>Ask members to vote for you!</h3>
      </div>
    );
  } else {
    return (
      <div>
        <Popup
          hoverable
          trigger={
            <h1>&gt;&gt; Join the Society &lt;&lt;</h1>
          }
        >
          <Popup.Content>

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

          </Popup.Content>
        </Popup>
      </div>
    );
  }
}

export default function Bids(props) {
  const { api } = useSubstrate();
  return api.query.society && api.query.society.bids ? (
    <Main {...props} />
  ) : null;
}
