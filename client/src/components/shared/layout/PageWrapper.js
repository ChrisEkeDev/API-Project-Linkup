import React from 'react';
import './styles.scss';

function PageWrapper({children, props}) {
  const { center } = props
  return (
    <main
      className={`page--wrapper ${center && 'page-centered'}`}>
        {children}
    </main>
  )
}

export default PageWrapper
