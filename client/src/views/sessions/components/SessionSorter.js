
import { sortValues } from "../../../constants/constants";
import '../styles.scss';


const SessionsSorter = ({setSortBy}) => {
    return (
        <div className='sessions_sorter'>
            <select onChange={(x) => setSortBy(x.target.value)} className='select'>
                {Object.keys(sortValues).map(key => (
                    <option value={key}>{sortValues[key]}</option>
                ))}
            </select>
        </div>
    )
}

export default SessionsSorter;
