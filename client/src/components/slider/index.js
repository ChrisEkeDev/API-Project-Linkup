import SlidingBar from "./components/SlidingBar";
import useSlider from "./hooks/useSlider";
import './styles.scss'

const Slider = ({children , map: Map}) => {
    const { ref, position } = useSlider();
    return (
        <section className="section_container">
            <div
                className="section_contents"
                style={{ width: `${position}%` }}
            >
                {children}
                <SlidingBar ref={ref} layout="horizontal" />
            </div>
            <div className="section_contents map_bg">
                <Map />
            </div>
        </section>
    )
}


export default Slider
