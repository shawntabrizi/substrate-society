import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import { TxButton } from '../../substrate-lib/components';
import { useSubstrate } from '../../substrate-lib';

export default function CandidateCard (props) {
  const { api } = useSubstrate();

  const { accountPair, setStatus } = props;

  if (props.users.length !== 0) {
    return props.users.map(user => (
      <Card>
        <Card.Content>
          <Image
            floated='right'
            size='mini'
            src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'
          />
          <Card.Header>{user.who.toString()}</Card.Header>
          <Card.Meta>Friends of Elliot</Card.Meta>
          <Card.Description>
            {user.kind.toString()}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          {user.value.toString()}
          <div className='ui three buttons'>
            <TxButton
              accountPair={accountPair}
              label='Reject'
              setStatus={setStatus}
              type='TRANSACTION'
              color='red'
              basic
              attrs={{
                params: [user.who, false],
                tx: api.tx.society.vote
              }}
            />
            <TxButton
              accountPair={accountPair}
              label='Approve'
              setStatus={setStatus}
              type='TRANSACTION'
              color='green'
              basic
              attrs={{
                params: [user.who, true],
                tx: api.tx.society.vote
              }}
            />
          </div>
        </Card.Content>
      </Card>
    ));
  } else {
    return null;
  }
}
