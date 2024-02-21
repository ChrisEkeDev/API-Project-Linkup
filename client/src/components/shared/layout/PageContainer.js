import React from 'react';
import { page_transitions } from '../../../constants/animations';
import { motion } from 'framer-motion'
import './styles.scss';

function PageContainer({children}) {
  return (
    <motion.main {...page_transitions} className='page'>
        {children}
    </motion.main>
  )
}

export default PageContainer
