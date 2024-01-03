export const parent_variants = {
    visible: {
        opacity: 1,
        transition: {
            when: "beforeChildren",
            staggerChildren: 0.10
        }
    },
    hidden: {
        opacity: 0,
        transition: {
            when: "afterChildren"
        }
    }
}

export const base_variants = {
    visible: {
        opacity: 1,
    },
    hidden: {
        opacity: 0,
    }
}

export const base_animations = {
    initial: "hidden",
    animate: "visible",
    exit: "hidden"
}

export const child_variants = {
    visible: { opacity: 1},
    hidden: { opacity: 0},
}


export const page_transitions = {
    animate: { opacity: 1},
    initial: { opacity: 0},
    exit: { opacity: 0},
    transition: { type: "tween", ease: "anticipate", duration: .25}
}

export const loading_transitions = {
    animate: { opacity: 1},
    initial: { opacity: 0},
    exit: { opacity: 0}
}

export const fadeIn = {
    opacity: 1
}

export const fadeOut = {
    opacity: 0
}

export const comment_variants = {
    visible: {
        x: 0,
        opacity: 1,
    },
    hidden: {
        x: -100,
        opacity: 0,
    }
}
