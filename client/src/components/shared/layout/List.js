import React from 'react'
import { AnimatePresence, motion } from 'framer-motion';
import { parent_variants, base_animations } from '../../../constants/animations';

function List({children, pad}) {
  return (
    <motion.ul variants={parent_variants} {...base_animations} className={`list ${pad && 'list_pad'}`} >
        <AnimatePresence>
            {children}
        </AnimatePresence>
    </motion.ul>
  )
}

export default List
