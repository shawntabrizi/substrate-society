import React, { useState, createRef } from 'react';
import { Container, Dimmer, Loader, Grid, Sticky } from 'semantic-ui-react';

import 'semantic-ui-css/semantic.min.css';
import { SubstrateContextProvider, useSubstrate } from './substrate-lib';
import { DeveloperConsole } from './substrate-lib/components';

import AccountSelector from './AccountSelector';
import BlockNumber from './BlockNumber';
// import Events from './Events';
// import Metadata from './Metadata';
// import NodeInfo from './NodeInfo';
import Indices from './Indices';
import SocietyActions from './society/Actions';
import SocietyBalance from './society/Balance';
import SocietyBids from './society/Bids';
import SocietyCandidates from './society/Candidates';
import SocietyChallenge from './society/Challenge';
// import SocietyDefender from './society/Defender';
import SocietyMembers from './society/Members';
import SocietyFounder from './society/Founder';
import SocietyHead from './society/Head';
import SocietyPot from './society/Pot';
import SocietyRotation from './society/Rotation';
// import SocietyRules from './society/Rules';
import SocietySuspendedCandidates from './society/SuspendedCandidates';
import SocietySuspendedMembers from './society/SuspendedMembers';
import { formatBalance } from '@polkadot/util';

// import Break from './ascii/break';
import SocietyBanner from './ascii/society';
import RulesBanner from './ascii/rules';

import proofs from './config/proofs.json';

function Main() {
  const [accountAddress, setAccountAddress] = useState(null);
  const { apiState, keyring, keyringState } = useSubstrate();
  const [head, setHead] = useState([]);
  const [founder, setFounder] = useState([]);
  const [bids, setBids] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [members, setMembers] = useState([]);
  const [suspendedCandidates, setSuspendedCandidates] = useState([]);
  const [suspendedMembers, setSuspendedMembers] = useState([]);
  const [blockNumber, setBlockNumber] = useState(0);
  const [finalizedBlockNumber, setfinalizedBlockNumber] = useState(0);
  const [indices, setIndices] = useState({});

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
      <Sticky context={contextRef} hidden>
        <AccountSelector setAccountAddress={setAccountAddress} />
      </Sticky>
      <Container>
        <Grid stackable columns='equal'>
          <Grid.Row>
            <BlockNumber
              blockNumber={blockNumber}
              setBlockNumber={setBlockNumber}
            />
            <BlockNumber
              blockNumber={finalizedBlockNumber}
              setBlockNumber={setfinalizedBlockNumber}
              finalized
            />
            <SocietyRotation blockNumber={blockNumber} />
            <SocietyChallenge
              blockNumber={blockNumber}
              accountPair={accountPair}
              members={members}
              indices={indices}
              proofs={proofs}
            />
            <SocietyPot />
            <SocietyBalance accountPair={accountPair} />
            <SocietyFounder
              accountPair={accountPair}
              founder={founder}
              setFounder={setFounder}
              indices={indices}
              proofs={proofs}
            />
            <SocietyHead
              accountPair={accountPair}
              head={head}
              setHead={setHead}
              indices={indices}
              proofs={proofs}
            />
          </Grid.Row>
          <Grid.Row centered>
            <SocietyBanner />
          </Grid.Row>
          <Grid.Row centered>
            <SocietyMembers
              accountPair={accountPair}
              members={members}
              setMembers={setMembers}
              indices={indices}
              proofs={proofs}
            />
          </Grid.Row>
          <Grid.Row centered>
            <RulesBanner />
          </Grid.Row>
          <Grid.Row centered>
            <SocietyActions
              accountPair={accountPair}
              members={members}
              candidates={candidates}
              suspendedCandidates={suspendedCandidates}
              suspendedMembers={suspendedMembers}
              bids={bids}
              proofs={proofs}
            />
          </Grid.Row>
          <Grid.Row centered>
            <SocietyBids
              accountPair={accountPair}
              bids={bids}
              setBids={setBids}
              blockNumber={blockNumber}
              indices={indices}
              proofs={proofs}
            />
          </Grid.Row>
          <Grid.Row centered>
            <SocietyCandidates
              accountPair={accountPair}
              members={members}
              candidates={candidates}
              setCandidates={setCandidates}
              blockNumber={blockNumber}
              indices={indices}
              proofs={proofs}
            />
          </Grid.Row>
          <Grid.Row centered>
            <SocietySuspendedCandidates
              accountPair={accountPair}
              suspendedCandidates={suspendedCandidates}
              setSuspendedCandidates={setSuspendedCandidates}
              founder={founder}
              indices={indices}
              proofs={proofs}
            />
          </Grid.Row>
          <Grid.Row centered>
            <SocietySuspendedMembers
              accountPair={accountPair}
              suspendedMembers={suspendedMembers}
              setSuspendedMembers={setSuspendedMembers}
              founder={founder}
              indices={indices}
              proofs={proofs}
            />
          </Grid.Row>
        </Grid>
        <DeveloperConsole />
        <Indices
          users={[
            ...bids.map(b => b.who),
            ...candidates.map(c => c.who),
            ...members
          ]}
          indices={indices}
          setIndices={setIndices}
        />
      </Container>
    </div>
  );
}

export default function App() {
  return (
    <SubstrateContextProvider>
      <Main />
    </SubstrateContextProvider>
  );
}
