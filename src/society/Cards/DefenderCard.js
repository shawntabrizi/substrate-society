import React from 'react';
import { Card, Image, Icon } from 'semantic-ui-react';
import { TxButton } from '../../substrate-lib/components';
import { useSubstrate } from '../../substrate-lib';

export default function DefenderCard (props) {
  const { defender, setStatus, accountPair, votes } = props;
  const { api } = useSubstrate();

  if (defender) {
    return (
      <Card>
        <Card.Content>
          <Image
            floated='right'
            size='mini'
            src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'
          />
          <Card.Header>{defender.toString()}</Card.Header>
          <Card.Meta>Friends of Elliot</Card.Meta>
          <Card.Description>
            {Object.keys(votes).map(voter => {
              if (votes[voter].toString() === '0x02') {
                return (<Icon circular color='green' name='checkmark' />);
              } else if (votes[voter].toString() === '0x01') {
                return (<Icon circular color='red' name='cancel' />);
              } else {
                return (<Icon circular color='grey' name='question' />);
              }
            })}
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
                params: [false],
                tx: api.tx.society.defenderVote
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
                params: [true],
                tx: api.tx.society.defenderVote
              }}
            />
          </div>
        </Card.Content>
      </Card>
    );
  } else {
    return null;
  }
}
