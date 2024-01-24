import React from 'react'
import { CgSpinner } from 'react-icons/cg';
import { AnimatePresence, motion } from 'framer-motion';
import { loading_transitions } from '../../../constants/animations'
import './styles.scss'

function LoadingData() {
  return (
    <AnimatePresence>
      <motion.div {...loading_transitions}
        className='loading'>
          <CgSpinner className='spinner'/>
      </motion.div>
    </AnimatePresence>
  )
}

export default LoadingData
