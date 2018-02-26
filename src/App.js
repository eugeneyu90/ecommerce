import React, { Component } from 'react'
import { Route, Link, Switch } from 'react-router-dom'
import './App.css';
import { Home, Shop } from './components'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton';
// import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

class App extends Component {
  constructor() {
    super()
    this.state = {
      user: {
        name: '',
      },
      isLoggedIn: false,
      open: false
    }
  }

  componentDidUpdate() {
    localStorage.setItem('user', JSON.stringify(this.state.user))
  }

  componentWillMount() {
    let user = JSON.parse(localStorage.getItem('user'))
    if(user) {
      this.setState({
        user: user,
        isLoggedIn: true
      })
    }
  }

  handleOpen = () => {
    this.setState({
      open: true
    })
  }

  handleClose = () => {
    this.setState({
      open: false
    })
  }
  updateUsername = (e) => {
    this.setState({
      user: {
        name: e.target.value
      }
    })
  }
  userLogin = () => {
    if(this.state.user.name !== '') {
      this.setState({
        isLoggedIn: true,
      })
      this.handleClose()
    } else {
      alert('Please enter your name!')
    }
  }

  userLogout = () => {
    this.setState({
      user: '',
      isLoggedIn: false
    })
  }

  render() {
    const { match } = this.props
    const actions = [
      <FlatButton
        label='Cancel'
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label='Signup'
        primary={true}
        keyboardFocused={true}
        onClick={this.userLogin}
      />,
    ]
    const loggedInActions = [
      <FlatButton
        label='Cancel'
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label='Logout'
        primary={true}
        onClick={this.userLogout}
      />,
    ]

    return (
      <MuiThemeProvider>
        <div >
          <nav>
            <div className="nav-wrapper">
              <a href="#" className="brand-logo">
                <i className="material-icons">cloud</i>
                eCommerce Store
              </a>
              <ul className="right">
                <li><Link to={match.url}>Home</Link></li>
                <li><Link to={match.url + 'shop'}>Shop</Link></li>
                <li>
                  <a onClick={this.handleOpen}>
                    <i className="material-icons material-icons.md-24">account_box</i>
                  </a>
                  {!this.state.isLoggedIn ? 
                  ( <Dialog
                      title="Customer Signup"
                      actions={actions}
                      modal={false}
                      open={this.state.open}
                      onRequestClose={this.handleClose}
                    >
                      <form onSubmit={this.userLogin} target="/home">
                        <TextField
                          name="fullname"
                          floatingLabelText="Full Name"
                          type="text"
                          onChange={this.updateUsername}
                          onKeyDown={(e) => {if(e.keyCode === 13) this.userLogin()}}
                        />
                      </form>
                    </Dialog>) : 
                  ( <Dialog
                      title={`You are logged in as ${this.state.user.name}.`}
                      action={loggedInActions}
                      modal={false}
                      open={this.state.open}
                      onRequestClose={this.handleClose}
                      >
                    </Dialog>
                  )}
                </li>
              </ul>
            </div>
          </nav>
          <Switch>
            <Route 
              path={match.url + '/'} 
              render={(routeProps) => {
                return (
                  <Home 
                    name={this.state.user.name}
                    isLoggedIn={this.state.isLoggedIn}
                    {...routeProps} />
                  )
              }}
            />
            <Route path={match.url + 'shop'} component={Shop} />
          </Switch>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default App;