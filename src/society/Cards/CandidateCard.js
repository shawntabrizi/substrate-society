import React from 'react';
import { Card, Image, Popup, Icon, Modal } from 'semantic-ui-react';
import { TxButton } from '../../substrate-lib/components';
import { useSubstrate } from '../../substrate-lib';

export default function CandidateCard (props) {
  const { api } = useSubstrate();

  const { accountPair, setStatus, users, votes, members, indices, proofs } = props;

  if (users.length !== 0) {
    return users.map(user => (
      <Card
        key={user}
        color={accountPair.address === user.who.toString() ? 'green' : null}
      >
        <Card.Content>
          <Modal
            trigger={
              <Image
                floated='right'
                size='mini'
                src={
                  proofs && proofs[user.who]
                    ? proofs[user.who].image
                    : 'https://i.imgur.com/Ip7AguC.png'
                }
              />
            }
          >
            <Modal.Content image>
              <Image
                src={
                  proofs && proofs[user.who]
                    ? proofs[user.who].image
                    : 'https://i.imgur.com/Ip7AguC.png'
                }
              />
              <Modal.Description></Modal.Description>
            </Modal.Content>
          </Modal>
          <Card.Header>
            {indices[user.who]
              ? indices[user.who].toString()
              : user.who.toString()}
          </Card.Header>
          <Card.Meta>
            {indices[user.who] ? user.who.toString() : 'Candidate'}
          </Card.Meta>
          <Card.Description>
            {user.kind.toString()}
            <br />
            {votes
              .filter(v => v.candidate === user.who)
              .map(vote => {
                if (vote.vote.toString() === '0x02') {
                  return (
                    <Popup
                      key={vote.candidate + vote.member}
                      content={vote.member.toString()}
                      header={'Approved'}
                      trigger={<Icon circular color='green' name='checkmark' />}
                    />
                  );
                } else if (vote.vote.toString() === '0x01') {
                  return (
                    <Popup
                      key={vote.candidate + vote.member}
                      content={vote.member.toString()}
                      header={'Rejected'}
                      trigger={<Icon circular color='red' name='cancel' />}
                    />
                  );
                } else if (vote.vote.toString() === '0x00') {
                  return (
                    <Popup
                      key={vote.candidate + vote.member}
                      content={vote.member.toString()}
                      header={'Skeptic'}
                      trigger={
                        <Icon circular color='yellow' name='exclamation' />
                      }
                    />
                  );
                } else {
                  return (
                    <Popup
                      key={vote.candidate + vote.member}
                      content={vote.member.toString()}
                      header={'Not Voted'}
                      trigger={<Icon circular color='grey' name='question' />}
                    />
                  );
                }
              })}
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
                params: [user.who, true],
                tx: api.tx.society.vote
              }}
              disabled={accountPair && !members.includes(accountPair.address)}
            />
          </div>
        </Card.Content>
      </Card>
    ));
  } else {
    return null;
  }
}
