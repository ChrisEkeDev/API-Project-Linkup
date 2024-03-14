import SlidingBar from "./components/SlidingBar";
import useSlider from "./hooks/useSlider";
import './styles.scss'

const Slider = ({children}) => {
    const { ref, position } = useSlider();
    return (
        <section style={{
            position: 'relative',
            height: '100%',
            width: `${position}%`,
            transition: 'unset'
            }}>
            {children}
            <SlidingBar ref={ref} layout="horizontal" />
        </section>
    )
}


export default Slider
