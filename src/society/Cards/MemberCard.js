import React from 'react';
import { Card, Image } from 'semantic-ui-react';

export default function MemberCard (props) {
  const { users, strikes } = props;
  if (users.length !== 0) {
    return users.map((user, index) => (
      <Card
        key={user}
        color={props.accountPair.address === user.toString() ? 'green' : null}
      >
        <Card.Content>
          <Image
            floated='right'
            size='mini'
            src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'
          />
          <Card.Header>{user.toString()}</Card.Header>
          <Card.Meta>Member</Card.Meta>
          <Card.Description>{'Description'}</Card.Description>
        </Card.Content>
        <Card.Content extra>{'Strikes: ' + strikes[index]}</Card.Content>
      </Card>
    ));
  } else {
    return null;
  }
}
