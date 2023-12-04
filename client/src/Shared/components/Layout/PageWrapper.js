import React from 'react';
import './Styles.scss';

function PageWrapper({children}) {
  return (
    <main className='page--wrapper'>{children}</main>
  )
}

export default PageWrapper
