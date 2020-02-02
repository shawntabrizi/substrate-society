import React from 'react';
import { Card, Image, Modal } from 'semantic-ui-react';

export default function FounderCard (props) {
  const { head, accountPair, indices, proofs } = props;

  if (head) {
    return (
      <Card
        color={
          accountPair && accountPair.address === head.toString()
            ? 'green'
            : null
        }
      >
        <Card.Content>
          <Modal
            trigger={
              <Image
                floated='right'
                size='mini'
                src={
                  proofs && proofs[head]
                    ? proofs[head].image
                    : 'https://i.imgur.com/Ip7AguC.png'
                }
              />
            }
          >
            <Modal.Content image>
              <Image
                src={
                  proofs && proofs[head]
                    ? proofs[head].image
                    : 'https://i.imgur.com/Ip7AguC.png'
                }
              />
              <Modal.Description></Modal.Description>
            </Modal.Content>
          </Modal>
          <Card.Header>
            {indices[head] ? indices[head].toString() : head.toString()}
          </Card.Header>
          <Card.Meta>{indices[head] ? head.toString() : 'Head'}</Card.Meta>
          <Card.Description>{'description'}</Card.Description>
        </Card.Content>
        <Card.Content extra>{'Head'}</Card.Content>
      </Card>
    );
  } else {
    return null;
  }
}
