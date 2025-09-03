import { useEffect, useState } from 'react';
import Visual from '../../components/main/Visual';

import BubbleLanding from '../../components/main/BubbleLanding';

const Main = () => {
    const [landingOn, setLandingOn] = useState(true);

    return (
        <>
            {landingOn && <BubbleLanding onClose={() => setLandingOn(false)} />}
            <Visual />
        </>
    );
};

export default Main;
