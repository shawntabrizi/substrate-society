import React from 'react';
import { Card, Image, Modal } from 'semantic-ui-react';

export default function MemberCard (props) {
  const { users, strikes, indicies, proofs } = props;
  if (users.length !== 0) {
    return users.map((user, index) => (
      <Card
        key={user}
        color={props.accountPair.address === user.toString() ? 'green' : null}
      >
        <Card.Content>
          <Modal
            trigger={
              <Image
                floated='right'
                size='mini'
                src={
                  proofs && proofs[user]
                    ? proofs[user].image
                    : 'https://i.imgur.com/Ip7AguC.png'
                }
              />
            }
          >
            <Modal.Content image>
              <Image
                src={
                  proofs && proofs[user]
                    ? proofs[user].image
                    : 'https://i.imgur.com/Ip7AguC.png'
                }
              />
              <Modal.Description></Modal.Description>
            </Modal.Content>
          </Modal>
          <Card.Header>
            {indicies[user] ? indicies[user].toString() : user.toString()}
          </Card.Header>
          <Card.Meta>{indicies[user] ? user.toString() : 'Member'}</Card.Meta>
          <Card.Description>{'Description'}</Card.Description>
        </Card.Content>
        <Card.Content extra>{'Strikes: ' + strikes[index]}</Card.Content>
      </Card>
    ));
  } else {
    return null;
  }
}
