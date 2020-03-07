import React from 'react';
import { Grid, Popup } from 'semantic-ui-react';

import { useSubstrate } from '../substrate-lib';

import SocietyDefender from './Defender';

function Main(props) {
    const { api } = useSubstrate();
    const { blockNumber, accountPair, members, indices, proofs } = props;

    const challengePeriod = api.consts.society.challengePeriod.toNumber();

    return (
        <Grid.Column>
            <Popup
                hoverable
                trigger={
                    <div>
                        <div>CHALLENGE</div>
                        <div>{challengePeriod - (blockNumber % challengePeriod)}</div>
                    </div>
                }
            >
                <Popup.Content>
                    <SocietyDefender
                        accountPair={accountPair}
                        members={members}
                        blockNumber={blockNumber}
                        indices={indices}
                        proofs={proofs}
                    />
                </Popup.Content>
            </Popup>

        </Grid.Column>
    );
}

export default function Rotation(props) {
    const { api } = useSubstrate();
    return api.query.society && api.query.society.bids ? (
        <Main {...props} />
    ) : null;
}
