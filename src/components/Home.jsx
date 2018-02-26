import React, { Component } from 'react'
import $ from 'jquery'

class Home extends Component {

  componentDidMount() {
    // $(function(){ $('.carousel.carousel-slider').carousel({fullWidth: true}); });
  }

  render() {
    const { name, isLoggedIn } = this.props
    const styles = {
      carousel:{
        // height: '175px',
        backgroundColor: 'black',
        maxHeight: '40vh'
      },
      background1: {
        backgroundImage: 'url("/rogerfederer.jpg")',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        backgroundColor: 'black',
        maxHeight: '40vh'
      },
      background2: {
        backgroundImage: 'url("/nadal.jpg")',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        backgroundColor: 'black',
        maxHeight: '40vh'
      },
      firstPanel: {
        float: 'left',
        marginTop: '10vh',
        marginLeft: '10vw'
      },
      secondPanel: {
        float: 'right',
        marginTop: '15vh',
        marginRight: '15vw'
      },
    }
    
    let welcomeMessage = ''
    welcomeMessage = isLoggedIn ? <h2>Welcome {name}!</h2> : <h2>You are not logged in!</h2>
    return (
      <div>
        <div className="carousel carousel-slider center" data-indicators="true" style={styles.carousel} >
          <div className="carousel-fixed-item center">
          </div>
          <div style={styles.background1} className="carousel-item black white-text" href="#one!">
            <h2 style={styles.firstPanel} >Welcome {name}! <br/> Your journey starts here.</h2>
          </div>
          <div style={styles.background2} className="carousel-item black white-text" href="#two!">
            <h2 style={styles.secondPanel} >Focus</h2>
          </div>
        </div>
      </div>
    )
  }
}

export default Home