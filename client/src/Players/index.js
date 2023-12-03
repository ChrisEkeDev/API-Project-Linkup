import React, {useState} from 'react'
import { useSelector } from "react-redux";
import Button from '../Shared/components/Button';
import PlayerList from './playerList'
import "./Styles.scss";

function Players() {
    const data = useSelector(state => state.checkIns.sessionCheckIns)
  const playerCount = Object.values(data).length;

    return (
        <div className='players__wrapper'>
            <div className='players__contents'>
                <header className='players__header'>
                    {/* <h1>{playerCount} Players Checked In</h1> */}
                    {/* <Button
                        label="expand"
                        action={() => setExpanded(!expanded)}
                    /> */}
                </header>
                {/* { expanded && <PlayerList /> } */}
                <PlayerList />
            </div>
        </div>
  )
}

export default Players
