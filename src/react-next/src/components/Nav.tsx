import React from 'react'
import Link from 'next/link'

const Nav = (props: { buttonText: string, linkTo: string}) => {

  return (
    <div className="columns is-vcentered mt-1 is-mobile">
      <div className="column">
        <h1 className="title is-size-1-tablet">Only cats</h1>          
      </div>
      <div className="column is-narrow is-vcentered">
        <Link href={props.linkTo}>
          <button className="button is-primary is-rounded">{props.buttonText}</button>
        </Link>
      </div>
    </div>
  )
}

export default Nav
