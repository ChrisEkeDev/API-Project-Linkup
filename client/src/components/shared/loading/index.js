import React from 'react'
import { useApp } from '../../../context/AppContext';
import { CgSpinner } from 'react-icons/cg';
import { AnimatePresence, motion } from 'framer-motion';
import { loading_transitions } from '../../../constants/animations'
import './styles.scss'

function LoadingData({section}) {
  const { theme } = useApp();
  return (
    <AnimatePresence>
      <motion.div {...loading_transitions}
        className={`loading loading-${theme}`}>
          <CgSpinner className='spinner'/>
      </motion.div>
    </AnimatePresence>
  )
}

export default LoadingData
