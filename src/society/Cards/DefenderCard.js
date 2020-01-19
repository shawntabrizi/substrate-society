import React from 'react';
import { Card, Image, Icon, Popup } from 'semantic-ui-react';
import { TxButton } from '../../substrate-lib/components';
import { useSubstrate } from '../../substrate-lib';

export default function DefenderCard (props) {
  const { defender, setStatus, accountPair, votes, members } = props;
  const { api } = useSubstrate();

  if (defender) {
    return (
      <Card
        color={accountPair.address === defender.toString() ? 'green' : null}
      >
        <Card.Content>
          <Image
            floated='right'
            size='mini'
            src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'
          />
          <Card.Header>{defender.toString()}</Card.Header>
          <Card.Meta>Defender</Card.Meta>
          <Card.Description>
            {Object.keys(votes).map(voter => {
              if (votes[voter].toString() === '0x02') {
                return (
                  <Popup
                    key={voter}
                    content={voter}
                    header={'Approved'}
                    trigger={<Icon circular color='green' name='checkmark' />}
                  />
                );
              } else if (votes[voter].toString() === '0x01') {
                return (
                  <Popup
                    key={voter}
                    content={voter}
                    header={'Rejected'}
                    trigger={<Icon circular color='red' name='cancel' />}
                  />
                );
              } else {
                return (
                  <Popup
                    key={voter}
                    content={voter}
                    header={'Not Voted'}
                    trigger={<Icon circular color='grey' name='question' />}
                  />
                );
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
              disabled={accountPair && !members.includes(accountPair.address)}
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
              disabled={accountPair && !members.includes(accountPair.address)}
            />
          </div>
        </Card.Content>
      </Card>
    );
  } else {
    return null;
  }
}
