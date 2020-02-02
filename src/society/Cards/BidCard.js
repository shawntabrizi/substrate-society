import React from 'react';
import { Card, Image } from 'semantic-ui-react';

export default function BidCard (props) {
  const { accountPair, users, indices, proofs } = props;
  if (users.length !== 0) {
    return users.map(user => (
      <Card
        key={user.who.toString()}
        color={accountPair.address === user.who.toString() ? 'green' : null}
      >
        <Card.Content>
          <Image
            floated='right'
            size='mini'
            src={proofs && proofs[user.who] ? proofs[user.who].image : 'https://i.imgur.com/Ip7AguC.png'}
          />
          <Card.Header>
            {indices[user.who]
              ? indices[user.who].toString()
              : user.who.toString()}
          </Card.Header>
          <Card.Meta>
            {indices[user.who] ? user.who.toString() : 'Candidate'}
          </Card.Meta>
          <Card.Description>
            {user.kind.isDeposit ? (
              'Deposit Amount: ' + user.kind.asDeposit.toString()
            ) : (
              <>
                {'Vouching Member: ' + user.kind.asVouch[0].toString()}
                <br />
                {'Vouching Tip: ' + user.kind.asVouch[1].toString()}
              </>
            )}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>{user.value.toString()}</Card.Content>
      </Card>
    ));
  } else {
    return null;
  }
}
