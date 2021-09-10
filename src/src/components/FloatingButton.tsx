import React from 'react'
import Link from 'next/link'

const FloatingButton = (props: { buttonText: string, linkTo: string}) => {

  return (
    <div className="floating-button-container">
      <Link href={props.linkTo}>
        <button className="floating-button-container__button button is-large is-primary is-rounded">{props.buttonText}</button>
      </Link>
      
    </div>
  )
}

export default FloatingButton
