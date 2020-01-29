import React from 'react';
import { Card, Image, Modal } from 'semantic-ui-react';

export default function FounderCard (props) {
  const { founder, accountPair, indicies, proofs } = props;

  if (founder) {
    return (
      <Card
        color={
          accountPair && accountPair.address === founder.toString()
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
                  proofs && proofs[founder]
                    ? proofs[founder].image
                    : 'https://i.imgur.com/Ip7AguC.png'
                }
              />
            }
          >
            <Modal.Content image>
              <Image
                src={
                  proofs && proofs[founder]
                    ? proofs[founder].image
                    : 'https://i.imgur.com/Ip7AguC.png'
                }
              />
              <Modal.Description></Modal.Description>
            </Modal.Content>
          </Modal>
          <Card.Header>
            {indicies[founder]
              ? indicies[founder].toString()
              : founder.toString()}
          </Card.Header>
          <Card.Meta>
            {indicies[founder] ? founder.toString() : 'Founder'}
          </Card.Meta>
          <Card.Description>
            {proofs[founder] ? proofs[founder].description : ''}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>{'Founder'}</Card.Content>
      </Card>
    );
  } else {
    return null;
  }
}
