import { useEffect } from "react";
import { useLocation, useHistory, withRouter } from "react-router-dom";

const ScrollToTop = ({ children }) => {
    const { pathname } = useLocation();
    const history = useHistory();

    useEffect(() => {
        const unlisten = history.listen(() => {
            if(history.action !== "POP") {
                const top = document.getElementById('top-ref');
                top.scrollIntoView();
            }
        })
        return () => {
            unlisten()
        }

    }, []);

    return <>{children}</>
};

export default withRouter(ScrollToTop);
