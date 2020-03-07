import React from 'react';
import { Card, Image, Modal, Popup } from 'semantic-ui-react';

export default function MemberCard(props) {
  const { users, strikes, indices, proofs } = props;
  if (users.length !== 0) {
    return users.map((user, index) => (
      <Popup
        hoverable
        trigger={
          <span> {indices[user] ? indices[user].toString() : user.toString()}</span>
        }
      >
        <Popup.Content>
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
                {indices[user] ? indices[user].toString() : user.toString()}
              </Card.Header>
              <Card.Meta>{indices[user] ? user.toString() : 'Member'}</Card.Meta>
              <Card.Description>{'Description'}</Card.Description>
            </Card.Content>
            <Card.Content extra>{'Strikes: ' + strikes[index]}</Card.Content>
          </Card>
        </Popup.Content>
      </Popup>
    ));
  } else {
    return null;
  }
}
