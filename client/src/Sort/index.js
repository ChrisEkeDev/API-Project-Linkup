
import useSessions from "../Sessions/hooks/useSessions";
import { sortValues } from "../Shared/constants/predefinedValues";
import { useApp } from "../App/Context/AppContext";

const SessionsSort = () => {
    const [ setSessions ] = useSessions();
    const { setSortBy } = useApp();

    return (
        <div className='sessions__results_sort'>
            <span className='sessions__results_sort--label'>Sort</span>
            <select onChange={(x) => setSortBy(x.target.value)} className='sessions__results_sort--select'>
                {Object.keys(sortValues).map(key => (
                    <option value={key}>{sortValues[key]}</option>
                ))}
            </select>
        </div>
    )
}

export default SessionsSort;
