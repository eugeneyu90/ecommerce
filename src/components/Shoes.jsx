import React, { Component } from 'react'
import {Card, CardActions, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'

class Shoes extends Component {
  render() {
    const { productList } = this.props
    const productListJSX = productList.map(product => {
      const { name, price, picture } = product
      return (
        <div className="col s6 m4 l3" key={name}>
          <Card >
            <CardMedia>
              <img src={picture} alt={name} />
            </CardMedia>
            <CardTitle title={name} subtitle={`Price: $${price}`} />
            <CardText>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </CardText>
            <CardActions>
              <RaisedButton 
                label="Add to Cart" 
                onClick={() => { this.props.updateCart(product) }} 
              />
            </CardActions>
          </Card>
        </div>
      )
    })
    return (
      <main className="container">  
        <h2>Shoes Page.</h2>
        <div className="row">
          {productListJSX}
        </div>
      </main>
    )
  }
}

export default Shoes 