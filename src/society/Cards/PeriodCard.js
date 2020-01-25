import React from 'react';
import { Card, Statistic, Icon } from 'semantic-ui-react';

export default function PeriodCard (props) {
  const { enabled = true, period, blockNumber, name } = props;
  if (enabled) {
    return (
      <Card>
        <Card.Content textAlign='center'>
          <Statistic
            label={'Blocks Left'}
            value={period - (blockNumber % period)}
          />
        </Card.Content>
        <Card.Content extra>
          <Icon name='time' /> {name} every {period} blocks.
        </Card.Content>
      </Card>
    );
  } else {
    return null;
  }
}
