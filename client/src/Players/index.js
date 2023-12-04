import React, {useState} from 'react'
import { useSelector } from "react-redux";
import Button from '../Shared/components/Button';
import PlayerItem from './playerItem';
import PlayerList from './playerList'
import "./Styles.scss";
import PageSection from '../Shared/components/Layout/PageSection';
import SectionHeader from '../Shared/components/Layout/SectionHeader';

function Players() {
    const data = useSelector(state => state.checkIns.sessionCheckIns)
    const players = Object.values(data);

    return (
        <PageSection>
            <SectionHeader>
                <h2>5 Players</h2>
            </SectionHeader>
            <ul className='players__list'>
                {
                players.map(player => (
                    <PlayerItem player={player.player}/>
                ))
                }
            </ul>
        </PageSection>
  )
}

export default Players
