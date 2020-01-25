import React, { useEffect, useState } from 'react';
import { Grid, Modal, Button } from 'semantic-ui-react';
import { blake2AsHex } from '@polkadot/util-crypto';

import { useSubstrate } from '../substrate-lib';

function Main (props) {
  const { api } = useSubstrate();
  const [rules, setRules] = useState('');

  useEffect(() => {
    let unsubscribe = null;

    api.query.society
      .rules(setRules)
      .then(u => {
        unsubscribe = u;
      })
      .catch(console.error);

    return () => unsubscribe && unsubscribe();
  }, [api.query.society]);

  const rulesTx =
    '0x948d3a4378914341dc7af9220a4c73acb2b3f72a70f14ee8089799da16d94c17';

  const rulesText =
    '# Kappa Sigma Mu (KΣM): The Kusama Fratority #### Or, _Kusama Human Blockchain Project_ ## Preamble Kappa Sigma Mu is a membership club using the the Substrate _Society_ pallet. Society pallet defines most of the process behind becoming a member, however it leaves undefined the specific qualities by which members should be judging member-candidates and challenged-members. This is what is refered to by the `rules` that are passed into the `found` transaction. ## `rules`: Convention of Approval of Membership New candidate members shall be judged on their ability to provide *Proof-of-Ink* to existing members, where the *Ink* shall be a **permanent tattoo** including at least two elements: 1. **An identifier of the Kusama network.** One or more of: the Kusama network\'s canary symbol; the typography; the full logo; or the Kusama genesis hash. Designs may be filled and in outline. The hash must be rendered in full as a barcode, binary or in hex. An artistic derivative of one or more of these is also acceptable, but may not deviate from the style, design or content sufficently that it be no longer obviously identifiable as Kusama. 2. **An identifier of the parent member.** The parent member, as defined by the society pallet instance\'s `Head` storage item at the time of candidacy. This should be rendered as one of: an SS58 account or index address; decimal accout index; binary account ID; or a machine-readable image capable of being recognised by a mainstream Kusama wallet. The proof should contain compelling evidence that the tattoo: - exists on the body; - could fit into a circle no smaller than 2.54cm; and - is permanent. In proving each of these, we recommend: - at least two high-quality well-lit photographs; - a video of it being done where the equipment is visible is better; - live witnessing by other members is best, together with pre-publication of the location and time that the tattooing takes place to allow other members to gather and witness. The identity of the member need *not* be discernable nor the specific part of the body on which it is placed. ### Founder Exactly as per the standard convention, but there is no need for the second, "identifier of the parent member" since there is no parent member to identify. ### Existing Members (Challenges) Evidence of the continued existence of the tattoo should be provided; high-resolution photographic evidence in good light from a variety of angles and with proof that it was taken after the challenge as announced, such as a recent kusama block hash in frame.';

  return (
    <Grid.Column>
      <h2>The Rules of Society</h2>
      <p>
        Transaction{' '}
        <a href={'https://polkascan.io/pre/kusama-cc3/transaction/' + rulesTx}>
          {rulesTx}
        </a>
      </p>
      <Modal trigger={<Button>Show Rules</Button>}>
        <Modal.Header>Society Rules</Modal.Header>
        <Modal.Content scrolling>
          <Modal.Description>
            <pre>
              <code>Rules Hash: {rules.toString()}</code>
              <br />
              <code>Text Hash: {' '}{blake2AsHex(rulesText)}</code>
            </pre>
            <p>{rulesText}</p>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    </Grid.Column>
  );
}

export default function Rules (props) {
  const { api } = useSubstrate();
  return api.query.society && api.query.society.rules ? (
    <Main {...props} />
  ) : null;
}
