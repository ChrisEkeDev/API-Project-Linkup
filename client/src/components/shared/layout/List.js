import React from 'react'
import { AnimatePresence, motion } from 'framer-motion';
import { parent_variants, base_animations } from '../../../constants/animations';

function List({children}) {
  return (
    <motion.ul variants={parent_variants} {...base_animations} className='list' >
        <AnimatePresence>
            {children}
        </AnimatePresence>
    </motion.ul>
  )
}

export default List
