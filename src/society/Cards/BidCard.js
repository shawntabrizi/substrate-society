import React from 'react';
import { Card } from 'semantic-ui-react';

export default function BidCard (props) {
  if (props.users.length !== 0) {
    return props.users.map(user => (
      <Card
        header={user.who.toString()}
        meta={'Bid'}
        description={user.kind.toString()}
        extra={user.value.toString()}
        color={
          props.accountPair.address === user.who.toString() ? 'green' : ''
        }
      />
    ));
  } else {
    return null;
  }
}
