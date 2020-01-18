import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import { TxButton } from '../../substrate-lib/components';
import { useSubstrate } from '../../substrate-lib';

export default function SuspendedMemberCard (props) {
  const { api } = useSubstrate();

  const { accountPair, setStatus, users } = props;

  if (users.length !== 0) {
    return users.map(user => (
      <Card
        key={user}
        color={accountPair.address === user.toString() ? 'green' : null}
      >
        <Card.Content>
          <Image
            floated='right'
            size='mini'
            src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'
          />
          <Card.Header>{user}</Card.Header>
          <Card.Meta>Suspended Member</Card.Meta>
          <Card.Description>
            Steve wants to add you to the group <strong>best friends</strong>
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <div className='ui three buttons'>
            <TxButton
              accountPair={accountPair}
              label='Kick'
              setStatus={setStatus}
              type='TRANSACTION'
              color='red'
              basic
              attrs={{
                params: [user, false],
                tx: api.tx.society.judgeSuspendedMember
              }}
            />
            <TxButton
              accountPair={accountPair}
              label='Forgive'
              setStatus={setStatus}
              type='TRANSACTION'
              color='green'
              basic
              attrs={{
                params: [user, true],
                tx: api.tx.society.judgeSuspendedMember
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
