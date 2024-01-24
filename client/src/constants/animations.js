

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

export const checkin_variants = {
    visible: {
        opacity: 1,
        y: 0
    },
    hidden: {
        opacity: 0,
        y: 20
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

export const slide_variants = {
    visible: {
        x: 0,
        opacity: 1,
    },
    hidden: {
        x: -100,
        opacity: 0,
    }
}

export const slide_small_variants = {
    visible: {
        x: 0,
        opacity: 1,
    },
    hidden: {
        x: -50,
        opacity: 0,
    }
}

export const fadeOutAnimation = (controls) => {
    controls.start({x: -100, opacity: 0 })
}

export const chat_variants = {
    visible: {
        x: 0,
        opacity: 1,
    },
    hidden: {
        x: -100,
        opacity: 0,
    }
}

export const list_item_animations = {
    initial: "hidden",
    animate: "visible",
    exit: "hidden"
}
