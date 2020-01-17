import React from 'react';
import { Card } from 'semantic-ui-react';

export default function MemberCard (props) {
  if (props.users.length !== 0) {
    return props.users.map(user => (
      <Card
        key={user.toString()}
        header={user.toString()}
        meta={props.userType}
        description={'Description'}
        extra={'Extra'}
        color={
          props.accountPair.address === user.toString() ? 'green' : null
        }
      />
    ));
  } else {
    return null;
  }
}
