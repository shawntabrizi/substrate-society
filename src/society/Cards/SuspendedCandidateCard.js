import React, { useEffect, useState } from 'react';
import { Card, Image } from 'semantic-ui-react';
import { TxButton } from '../../substrate-lib/components';

export default function SuspendedCard (props) {
  const [status, setStatus] = useState(null);

  const { accountPair } = props;

  if (props.users.length !== 0) {
    return props.users.map(user => (
      <Card>
        <Card.Content>
          <Image
            floated='right'
            size='mini'
            src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'
          />
          <Card.Header>{user}</Card.Header>
          <Card.Meta>Friends of Elliot</Card.Meta>
          <Card.Description>
          Steve wants to add you to the group <strong>best friends</strong>
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <div className='ui three buttons'>
            <TxButton
              accountPair={accountPair}
              label='Reject'
              setStatus={setStatus}
              type='TRANSACTION'
              attrs={{
                params: [user, 1],
                tx: api.tx.society.judgeSuspendedCandidate
              }}
            />
            <TxButton
              accountPair={accountPair}
              label='Rebid'
              setStatus={setStatus}
              type='TRANSACTION'
              attrs={{
                params: [user, 0],
                tx: api.tx.society.judgeSuspendedCandidate
              }}
            />
            <TxButton
              accountPair={accountPair}
              label='Approve'
              setStatus={setStatus}
              type='TRANSACTION'
              attrs={{
                params: [user, 2],
                tx: api.tx.society.judgeSuspendedCandidate
              }}
            />
          </div>
          {status}
        </Card.Content>
      </Card>
    ));
  } else {
    return null;
  }
}
