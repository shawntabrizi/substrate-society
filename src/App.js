import React, { useState, createRef } from 'react';
import { Container, Dimmer, Loader, Grid, Sticky } from 'semantic-ui-react';

import 'semantic-ui-css/semantic.min.css';
import { SubstrateContextProvider, useSubstrate } from './substrate-lib';
import { DeveloperConsole } from './substrate-lib/components';

import AccountSelector from './AccountSelector';
import BlockNumber from './BlockNumber';
import Events from './Events';
import Metadata from './Metadata';
import NodeInfo from './NodeInfo';
import SocietyBalance from './society/Balance';
import SocietyBids from './society/Bids';
import SocietyCandidates from './society/Candidates';
import SocietyDefender from './society/Defender';
import SocietyMembers from './society/Members';
import SocietyFounder from './society/Founder';
import SocietyHead from './society/Head';
import SocietyPot from './society/Pot';
import SocietySuspendedCandidates from './society/SuspendedCandidates';
import SocietySuspendedMembers from './society/SuspendedMembers';
import { formatBalance } from '@polkadot/util';

function Main () {
  const [accountAddress, setAccountAddress] = useState(null);
  const { apiState, keyring, keyringState } = useSubstrate();
  const [members, setMembers] = useState([]);
  const accountPair =
    accountAddress &&
    keyringState === 'READY' &&
    keyring.getPair(accountAddress);

  const loader = text => (
    <Dimmer active>
      <Loader size='small'>{text}</Loader>
    </Dimmer>
  );

  if (apiState === 'ERROR') return loader('Error connecting to the blockchain');
  else if (apiState !== 'READY') return loader('Connecting to the blockchain');

  if (keyringState !== 'READY') {
    return loader(
      "Loading accounts (please review any extension's authorization)"
    );
  }

  const contextRef = createRef();

  formatBalance.setDefaults({ decimals: 12, unit: '' });

  return (
    <div ref={contextRef}>
      <Sticky context={contextRef}>
        <AccountSelector setAccountAddress={setAccountAddress} />
      </Sticky>
      <Container>
        <Grid stackable columns='equal'>
          <Grid.Row stretched>
            <NodeInfo />
            <Metadata />
            <BlockNumber />
            <BlockNumber finalized />
          </Grid.Row>
          <Grid.Row stretched>
            <h1>Society</h1>
          </Grid.Row>
          <Grid.Row stretched>
            <SocietyPot />
            <SocietyBalance accountPair={accountPair} />
            <SocietyFounder accountPair={accountPair} />
            <SocietyHead accountPair={accountPair} />
          </Grid.Row>
          <Grid.Row stretched>
            <SocietyBids accountPair={accountPair} />
          </Grid.Row>
          <Grid.Row stretched>
            <SocietyCandidates accountPair={accountPair} />
          </Grid.Row>
          <Grid.Row stretched>
            <SocietySuspendedCandidates accountPair={accountPair} />
          </Grid.Row>
          <Grid.Row stretched>
            <SocietyMembers
              accountPair={accountPair}
              members={members}
              setMembers={setMembers}
            />
          </Grid.Row>
          <Grid.Row stretched>
            <SocietyDefender accountPair={accountPair} members={members} />
          </Grid.Row>
          <Grid.Row stretched>
            <SocietySuspendedMembers accountPair={accountPair} />
          </Grid.Row>
          <Grid.Row stretched>
            <Events />
          </Grid.Row>
        </Grid>
        <DeveloperConsole />
      </Container>
    </div>
  );
}

export default function App () {
  return (
    <SubstrateContextProvider>
      <Main />
    </SubstrateContextProvider>
  );
}
