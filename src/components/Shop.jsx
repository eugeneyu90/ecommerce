import React, { Component } from 'react'
import { Route, Link, Switch } from 'react-router-dom'
import { Shoes, Hats, Cart } from './'
import axios from 'axios' 


class Shop extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cart: props.cart,
      shoes: [
        {
          name: 'High Top Sneaker', 
          price: 15, 
          picture: './../public/imgs/shoe1.png', 
          type: 'shoe'
        },
        {
          name: 'Basketball Shoes', 
          price: 100, 
          picture: './../public/imgs/shoe2.png', 
          type: 'shoe'
        },
        {
          name: 'Tennis Shoes', 
          price: 150, 
          picture: './../public/imgs/shoe3.png', 
          type: 'shoe'
        },
        {
          name: 'Heels',
          price: 60,
          picture: './../public/imgs/shoe3.png',
          type: 'shoe'
          
        },
        {
          name: 'Hiking Shoes',
          price: 90,
          picture: './../public/imgs/shoe3.png',
          type: 'shoe'
        },
        {
          name: 'Boxing Shoes',
          price: 80,
          picture: './../public/imgs/shoe3.png',
          type: 'shoe'
        }
      ],
      hats: [
        {
          name: 'Cap', 
          price: 20, 
          picture: './../public/imgs/hat1.png', 
          type: 'hat'
        },
        {
          name: 'Fedora', 
          price: 25, 
          picture: 'https://target.scene7.com/is/image/Target/11215030?wid=520&hei=520&fmt=pjpeg', 
          type: 'hat'
        },
        {
          name: 'Helmet', 
          price: 100, 
          picture: './../public/imgs/hat3.png', 
          type: 'hat'
        },
        {
          name: 'Cowboy Hat',
          price: 5,
          picture: './../public/imgs/hat1.png',
          type: 'hat'
        },
        {
          name: 'Snapback',
          price: 30,
          picture: './../public/imgs/hat1.png',
          type: 'hat'
        },
        {
          name: 'Pirate Hat',
          price: 100,
          picture: './../public/imgs/hat1.png',
          type: 'hat'
        }
      ],
      rackets: [
        {
          name: 'Pure Aero + Tennis Racquet',
          brand: 'Babolat',
          price: '219.00',
          type: 'racket',
          picture: 'https://www.tennisexpress.com/prodimages/alt_images/B102254-1.jpg'
        },
        {
          name: 'Six.One 95 18X20 Prestrung Tennis Racquet',
          brand: 'Wilson',
          price: '190.00',
          type: 'racket',
          picture: 'https://www.tennisexpress.com/prodimages/alt_images/WRT73650U-x.jpg'
        },
        {
          name: 'Graphene Touch Radical PWR Tennis Racquet',
          brand: 'Head',
          price: '210.00',
          type: 'racket',
          picture: 'https://www.tennisexpress.com/prodimages/72116-DEFAULT-l.jpg'
        },
        {
          name: 'Thunder Rip 114 Prestrung Tennis Racquet',
          brand: 'Prince',
          price: '99.00',
          type: 'racket',
          picture: 'https://www.tennisexpress.com/prodimages/alt_images/7T43Y-505-X.jpg'
        },
      ],
      balls: [
        {
          name: 'US Open Green Tournament Tennis Ball Case',
          brand: 'Wilson',
          price: '79.99',
          type: 'ball',
          picture: 'https://www.tennisexpress.com/prodimages/45037-DEFAULT-l.jpg'
        },
        {
          name: 'Fort All Court Tennis Balls 24 Can Case',
          brand: 'Dunlop',
          price: '96.00',
          type: 'ball',
          picture: 'https://www.tennisexpress.com/prodimages/51889-DEFAULT-l.jpg'
        },
        {
          name: 'Championship Tennis Ball Case',
          brand: 'Babolat',
          price: '59.95',
          type: 'ball',
          picture: 'https://www.tennisexpress.com/prodimages/67208-DEFAULT-l.jpg'
        },
        {
          name: 'Pro Penn Marathon Reg Duty Case Tennis Balls',
          brand: 'Penn',
          price: '78.99',
          type: 'ball',
          picture: 'https://www.tennisexpress.com/prodimages/45041-DEFAULT-l.jpg'
        },
      ]

    }
  }

  componentWillMount() {
    axios({
      method: 'GET',
      url: 'http://localhost:8080/cart',
    }).then(res => {
      console.log(res)
      this.setState({
        cart: res.data
      })
    })
  }

  updateCart = (item) => {
    this.setState({
      cart: this.state.cart.concat(item)
    })
  }

  componentDidUpdate() {
    axios({
      method: 'POST',
      url: 'http://localhost:8080/cart',
      data: {
        cart: this.state.cart
      }
    }).then(res => {
      console.log(res)
    })
  }

  updateCartFromDelete = (cart) => {
    this.setState({
      cart: cart
    })
  }


  render() {
    let { match } = this.props
    console.log(match.path)
    console.log(match.url)
    return (
      <div>
        <nav style={{height: '40px', lineHeight: '40px'}}>
          <ul className="right">
            <li> <Link to={match.url + '/shoes'}>Shoes</Link></li>
            <li> <Link to={match.url + '/hats'}>Hats</Link></li>
            <li> <Cart cartList={this.state.cart} updateCartFromDelete={this.updateCartFromDelete}/> </li>
          </ul>
        </nav>
        <Switch>
          <Route exact path={match.path} render={() => { return <h1>This is the main shopping page.</h1>}} />
          <Route 
            path={match.path + '/shoes'}
            render={() => { return <Shoes productList={this.state.shoes} updateCart={this.updateCart} /> } 
          } />
          <Route 
            path={match.path + '/hats'}
            render={() => { return <Hats productList={this.state.hats} updateCart={this.updateCart}/> }
          } />
        </Switch>
      </div>
    )
  }
}

export default Shop 