import React, { Component } from 'react'


class Home extends Component {
  render() {
    const name = this.props.name
    
    let welcomeMessage = ''
    welcomeMessage = name ? <h2>Welcome {name}!</h2> : <h2>You are not logged in!</h2>
    return (
      <section>
        {welcomeMessage}
      </section>
    )
  }
}

export default Home