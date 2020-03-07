import React from 'react';
import { Grid } from 'semantic-ui-react';

import { useSubstrate } from '../substrate-lib';

function Main(props) {
    const { api } = useSubstrate();
    const { blockNumber } = props;

    const rotationPeriod = api.consts.society.rotationPeriod.toNumber();

    return (
        <Grid.Column>
            <div>ROTATION</div>
            <div>{rotationPeriod - (blockNumber % rotationPeriod)}</div>
        </Grid.Column>
    );
}

export default function Rotation(props) {
    const { api } = useSubstrate();
    return api.query.society && api.query.society.bids ? (
        <Main {...props} />
    ) : null;
}
