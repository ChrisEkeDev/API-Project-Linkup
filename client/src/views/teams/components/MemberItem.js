import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { list_item_animations, slide_variants, child_variants } from '../../../constants/animations';
import ProfileImage from '../../../components/shared/profileImage'
import IconButton from '../../../components/shared/button/IconButton'
import DeleteMembershipModal from './DeleteMembershipModal';
import useMemberships from '../hooks/useMemberships';
import Modal from '../../../components/shared/modal';
import useModal from '../../../hooks/useModal';
import { format, parseISO } from 'date-fns';
import { TbUserCheck  , TbUserUp , TbUserOff  } from 'react-icons/tb'

function MemberItem({member, status}) {
    const { name } = member.Player
    const formatDate = format(parseISO(member.createdAt), 'MM/yyyy')
    const isPlayerHost = status === 'host'
    const isPlayerCoHost = status === 'co-host'
    const isMemberHost = member.status === 'host';
    const isMemberCoHost = member.status === 'co-host';
    const isMemberPending = member.status === 'pending';
    const isMemberMember = member.status === 'member';
    const showStatus = isMemberHost || isMemberCoHost;
    const { isModalOpen, onOpenModal, onCloseModal } = useModal();
    const { onAddToTeam, onPromoteToCoHost, onRemoveFromTeam }= useMemberships();


    return (
        <>
    <motion.li  variants={child_variants} {...list_item_animations} className='member_item'>
        <div className='float_left'>
        <ProfileImage player={member.Player}/>
        <div>
            <div className='flex'>
                <p className='bold md'>{name}</p>
                {/* {
                    showStatus &&
                    <div className={`member_status member-${member.status}`}>
                    {isMemberHost ? <PiStarFill className='xs'/> : isMemberCoHost ? <PiStarBold className="xs"/> : null }
                    {showStatus ? <p className='xxs bold'>{member.status}</p> : null}
                    </div>
                } */}
            </div>
            <p className='xs'>Joined {formatDate}</p>
        </div>

        </div>
        {
            isPlayerHost || isPlayerCoHost ?
            <div className='member_actions'>
                <AnimatePresence>
                    {
                        isMemberPending ?
                        <IconButton
                            label='Approve Member'
                            icon={TbUserCheck}
                            action={() => onAddToTeam(member.Player.id)}
                        /> : null
                    }
                </AnimatePresence>
                <AnimatePresence>
                    {
                        isMemberMember ?
                        <IconButton
                            label='Promote to Co-Host'
                            icon={TbUserUp}
                            action={() => onPromoteToCoHost(member.Player.id)}
                        /> : null
                    }
                </AnimatePresence>
                <AnimatePresence>
                    {
                        (!isMemberPending && !isMemberHost && isPlayerHost) ||
                        (!isMemberPending && isPlayerCoHost && !isMemberCoHost) ?
                        <IconButton
                            label='Kick off team'
                            icon={TbUserOff}
                            action={onOpenModal}
                        /> : null
                    }
                </AnimatePresence>
        </div> :
        null
        }
        </motion.li>
        <Modal
            isModalOpen={isModalOpen}
            onCloseModal={onCloseModal}
        >
            <DeleteMembershipModal
                member={member}
                deleteMembership={() => onRemoveFromTeam(member.Player.id)}
                close={onCloseModal}
            />
        </Modal>
        </>
    )
}

export default MemberItem
