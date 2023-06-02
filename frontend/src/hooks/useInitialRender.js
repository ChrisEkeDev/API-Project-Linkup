import React, { useEffect, useRef } from 'react';

const useInitialRender = (callback, dependencies) => {
    const initialMount = useRef(false);

    useEffect(() => {
        if (initialMount.current) callback();
        else initialMount.current = true;
    }, dependencies);
}

export default useInitialRender;
