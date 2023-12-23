import SlidingBar from "./components/SlidingBar";
import useSlider from "./hooks/useSlider";
import ScrollWindow from "../shared/scroll";
import './styles.scss'

const Slider = ({router: Router, map: Map}) => {
    const { ref, position } = useSlider();
    return (
        <section className="section_container">
            <div
                className="section_contents"
                style={{ width: `${position}%` }}
            >
                <Router />
                <SlidingBar ref={ref} layout="horizontal" />
            </div>
            <div className="section_contents map_bg">
                <Map />
            </div>
        </section>
    )
}


export default Slider
