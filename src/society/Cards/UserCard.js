import React from 'react';
import { Card } from 'semantic-ui-react';

export default function UserCard (props) {
  if (props.users.length !== 0) {
    return props.users.map(user => (
      <Card
        header={user.toString()}
        meta={props.userType}
        description={'Description'}
        extra={'Extra'}
        color={
          props.accountPair.address === user.toString() ? 'green' : ''
        }
      />
    ));
  } else {
    return null;
  }
}
