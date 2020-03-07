/* eslint-disable */
import React from 'react';

export default function Banner() {
    const rulesTx =
        '0x948d3a4378914341dc7af9220a4c73acb2b3f72a70f14ee8089799da16d94c17';

    return (
        <div>
            <pre>
                <code>{`
==========================================================================================
==========================================================================================
`}
                </code>
            </pre>
            <a style={{"color": "inherit"}} target="_blank" href={'https://polkascan.io/pre/kusama-cc3/transaction/' + rulesTx}>

                <pre>
                    <code>{`
888888 88  88 888888     88""Yb 88   88 88     888888 .dP"Y8 
  88   88  88 88__       88__dP 88   88 88     88__   \`Ybo." 
  88   888888 88""       88"Yb  Y8   8P 88  .o 88""   o.\`Y8b 
  88   88  88 888888     88  Yb \`YbodP' 88ood8 888888 8bodP' 
    `}
                    </code>
                </pre>
            </a>
        </div>
    )
}