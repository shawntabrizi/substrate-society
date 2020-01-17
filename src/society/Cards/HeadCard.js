import React from 'react';
import { Card, Image } from 'semantic-ui-react';

export default function FounderCard (props) {
  const { head, accountPair } = props;

  if (head) {
    return (
      <Card>
        <Card.Content>
          <Image
            floated='right'
            size='mini'
            src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'
          />
          <Card.Header>{head.toString()}</Card.Header>
          <Card.Meta>Head</Card.Meta>
          <Card.Description>
            {'description'}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          {'extra'}
        </Card.Content>
      </Card>
    );
  } else {
    return null;
  }
}
