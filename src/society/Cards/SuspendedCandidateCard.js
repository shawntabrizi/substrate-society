import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import { TxButton } from '../../substrate-lib/components';
import { useSubstrate } from '../../substrate-lib';

export default function SuspendedCandidateCard (props) {
  const { api } = useSubstrate();

  const { accountPair, setStatus, judgementOrigin, users } = props;

  if (users.length !== 0) {
    return users.map(user => (
      <Card key={user.toString()}>
        <Card.Content>
          <Image
            floated='right'
            size='mini'
            src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'
          />
          <Card.Header>{user.toString()}</Card.Header>
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
              color='red'
              basic
              attrs={{
                params: [user, 1],
                tx: api.tx.society.judgeSuspendedCandidate
              }}
              disabled={accountPair && accountPair.address !== judgementOrigin}
            />
            <TxButton
              accountPair={accountPair}
              label='Rebid'
              setStatus={setStatus}
              type='TRANSACTION'
              color='grey'
              basic
              attrs={{
                params: [user, 0],
                tx: api.tx.society.judgeSuspendedCandidate
              }}
              disabled={accountPair && accountPair.address !== judgementOrigin}
            />
            <TxButton
              accountPair={accountPair}
              label='Approve'
              setStatus={setStatus}
              type='TRANSACTION'
              color='green'
              basic
              attrs={{
                params: [user, 2],
                tx: api.tx.society.judgeSuspendedCandidate
              }}
              disabled={accountPair && accountPair.address !== judgementOrigin}
            />
          </div>
        </Card.Content>
      </Card>
    ));
  } else {
    return null;
  }
}
