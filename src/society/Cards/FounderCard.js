import React from 'react';
import { Card, Image } from 'semantic-ui-react';

export default function FounderCard (props) {
  const { founder, accountPair } = props;

  if (founder) {
    return (
      <Card color={accountPair && accountPair.address === founder.toString() ? 'green' : null}>
        <Card.Content>
          <Image
            floated='right'
            size='mini'
            src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'
          />
          <Card.Header>{founder.toString()}</Card.Header>
          <Card.Meta>Founder</Card.Meta>
          <Card.Description>{'description'}</Card.Description>
        </Card.Content>
        <Card.Content extra>{'extra'}</Card.Content>
      </Card>
    );
  } else {
    return null;
  }
}
