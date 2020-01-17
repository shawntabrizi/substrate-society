import React from 'react';
import { Card } from 'semantic-ui-react';

export default function MemberCard (props) {
  const { users, strikes } = props;
  if (users.length !== 0) {
    return users.map((user, index) => (
      <Card
        key={user.toString()}
        header={user.toString()}
        meta={props.userType}
        description={'Description'}
        extra={'Strikes: ' + strikes[index]}
        color={
          props.accountPair.address === user.toString() ? 'green' : null
        }
      />
    ));
  } else {
    return null;
  }
}
