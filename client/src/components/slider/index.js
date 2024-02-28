import SlidingBar from "./components/SlidingBar";
import useSlider from "./hooks/useSlider";
import './styles.scss'

const Slider = ({children , map: Map}) => {
    const { ref, position } = useSlider();
    return (
        <section id="app_root" className="section_container">
            <div
                className="page_container"
                style={{ width: `${position}%` }}
            >
                {children}
                <SlidingBar ref={ref} layout="horizontal" />
            </div>
            <div className="map_wrapper">
                <Map />
            </div>
        </section>
    )
}


export default Slider
