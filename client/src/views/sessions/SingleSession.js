import Back from '../../components/shared/button/Back';


function SingleSession() {
    // const { id } = useParams();
    // const  { handleAlerts, navigate, setLoading } = useApp();
    // const [ data, loading ] = useGetSession(id);
    // const [ deleteSessionModal, setDeleteSessionModal ] = useState(false);
    // const [ checkInModal, setCheckInModal ] = useState(false);
    // const player = useSelector(state => state.auth.player)
    // const session = useSelector(state => state.sessions.singleSession);
    // const isCreator = player?.id == session?.creatorId;
    // const { deleteSessionSuccess, deleteSessionError, checkInSuccess, checkInError } = sessionsAlerts;
    // const dispatch = useDispatch();




    // const deleteSession = async () => {
    //     setLoading(true)
    //     try {
    //         const response = await dispatch(thunkDeleteSession(session));
    //         if (response.status === 200) {
    //             handleAlerts(deleteSessionSuccess)
    //             navigate("/")
    //         } else {
    //             throw new Error();
    //         }
    //     } catch(error) {
    //         handleAlerts(deleteSessionError);
    //         console.error(error)
    //     } finally {
    //         setLoading(false)
    //     }

    // }

    // const checkIn = async () => {
    //     setLoading(true);
    //     try {
    //         const response = await dispatch(thunkAddCheckIn(session.id));
    //         if (response.status === 201) {
    //             handleAlerts(checkInSuccess)
    //             navigate("/")
    //         } else {
    //             throw new Error();
    //         }
    //     } catch (error) {
    //         handleAlerts(checkInError);
    //         console.error(error)
    //     } finally {
    //         setLoading(false)
    //     }
    // }


    // if (loading) return <DataLoading />
    // if (data === false || !session ) return <div>Not Found</div>

    return (
        <main className='page new-session'>
        <header className='header'>
            <Back/>
            <div className='actions'>

            </div>
        </header>
    </main>
        // <PageWrapper>
        //     {
        //         deleteSessionModal &&
        //         <Modal
        //             title="Delete Session"
        //             message="Are you sure you want to delete this sessions?"
        //             confirm={() => deleteSession()}
        //             decline={() => setDeleteSessionModal(false)}
        //         />
        //      }
        //     {
        //         checkInModal &&
        //         <Modal
        //             title="Check In"
        //             message="Let everyone know youll be there and encourage others to check in too."
        //             confirm={() => checkIn()}
        //             decline={() => setCheckInModal(false)}
        //         />
        //     }
        //     <PageSection>
        //     <SectionHeader>
        //         <Back/>
        //         <div className='page--actions'>
        //             {
        //             isCreator ?
        //             <>
        //                 <Button
        //                     styles='primary page--button'
        //                     label="Edit Session"
        //                     icon={TbEdit}
        //                     action={() => navigate(`/sessions/${session.id}/update`)}
        //                 />
        //                 <Button
        //                     styles='secondary page--button'
        //                     icon={TbTrash}
        //                     label="Delete Session"
        //                     action={() => setDeleteSessionModal(true)}
        //                 />
        //               </> :
        //               <>
        //                 <Button
        //                     styles='primary page--button'
        //                     label="Check In"
        //                     icon={TbCheck}
        //                     action={() => setCheckInModal(true)}
        //                 />
        //               </>
        //             }
        //         </div>
        //     </SectionHeader>
        //     <div className='section--flex'>
        //         <SessionCreator />
        //         <SessionDetails />
        //     </div>
        //     </PageSection>
        //     <Players />
        //     <Comments />
        // </PageWrapper>
    )
}

export default SingleSession
