import Back from '../../components/shared/button/Back';
import { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import Button from '../../components/shared/button';
import Modal from '../../components/shared/modal';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import useModal from '../../hooks/useModal';
import LoadingData from '../../components/shared/loading';
import { thunkGetSingleTeam } from '../../store/teams';
import Scroll from '../../components/shared/scroll';
import { PiXBold, PiUserPlusBold , PiUserMinusBold, PiPencilSimpleLineBold, PiTrashBold  } from 'react-icons/pi'
import { base_animations, child_variants, parent_variants } from '../../constants/animations';

function SingleTeam({team}) {
  return (
    <motion.main {...base_animations} className='page single_session'>
        <motion.header variants={child_variants} className='header'>
            <Back route={`/teams`}/>
            <div className='actions'>
                {/* BUTTONS BASED ON user */}
                <p>TEAM SINLGE PAGE</p>
            </div>
        </motion.header>
        <Scroll>

        </Scroll>
    </motion.main>
  )
}

function SingleTeamWrapper() {
    const { id } = useParams();
    const { dispatch } = useApp();
    const [ loading, setLoading ] = useState(true);
    const team = useSelector(state => state.teams.singleTeam)

    useEffect(() => {
        const loadTeam = async () => {
            try {
                const teamData = await dispatch(thunkGetSingleTeam(id));
                if (teamData.status === 200 && team) {
                    setLoading(false);
                }
                console.log()
            } catch(e) {
                console.log(e)
            }
        }
        loadTeam();

    }, [dispatch, id])

    if (loading) return <LoadingData/>

    return (
        <SingleTeam team={team}/>
    )
}

export default SingleTeamWrapper
