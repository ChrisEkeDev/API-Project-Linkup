
import useSessions from "../views/sessions/hooks/useSessions";
import { sortValues } from "../constants/constants";
import { useApp } from "../context/AppContext";
import './styles.scss';


const SessionsSort = () => {
    const [ setSessions ] = useSessions();
    const { setSortBy } = useApp();

    return (
        <div className='sessions--sort'>
            <select onChange={(x) => setSortBy(x.target.value)} className='sessions--select'>
                {Object.keys(sortValues).map(key => (
                    <option value={key}>{sortValues[key]}</option>
                ))}
            </select>
        </div>
    )
}

export default SessionsSort;
