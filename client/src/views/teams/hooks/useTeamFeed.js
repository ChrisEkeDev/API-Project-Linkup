import React from 'react'
import io from 'socket.io-client';

function useTeamFeed() {
    const socket = io('http://localhost:3030/team');

    useEffect(() => {
        socket.on('connect', () => {
            console.log('Connected to server');
          });

          return () => socket.disconnect();
    }, [])

    return { socket }
}

export default useTeamFeed
