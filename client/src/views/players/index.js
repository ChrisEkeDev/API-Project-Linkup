import React, {useState} from 'react'
import { useSelector } from "react-redux";
import Button from '../../components/shared/button';
import PlayerItem from './components/playerItem';
import PlayerList from './components/playerList'
import "./styles.scss";
import PageSection from '../../components/shared/Layout/PageSection';
import SectionHeader from '../../components/shared/Layout/SectionHeader';

function Players() {
    const data = useSelector(state => state.checkIns.sessionCheckIns)
    const players = Object.values(data);

    return (
        <PageSection>
            <SectionHeader>
                <h2>{players.length} Players</h2>
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
