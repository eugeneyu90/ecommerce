import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import Drawer from 'material-ui/Drawer'
import AppBar from 'material-ui/AppBar'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
  TableFooter
} from 'material-ui/Table';

// Global Variable for deleting list.
let cartAfterDelete = []
console.log(cartAfterDelete)

class Cart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
    }
  }
  
  handleToggle = () => this.setState({
    open: true
  })

  handleClose = () => this.setState({
    open: false
  })
  
  updateItemsToDelete = (e, i) => {
    console.log(e)
    cartAfterDelete = this.props.cartList
    
    e.forEach((row, index) => {
      // deletedItems.push(this.props.cartList[row])
      cartAfterDelete.splice(row, 1)
    })
  }

  removeFromCart = () => {
    this.props.updateCartFromDelete(cartAfterDelete)
  }


  render() {
    const { cartList } = this.props
    let totalPrice = 0
    let productsJSX = ''
    cartList &&
      (totalPrice = cartList.reduce((acc, cur) => {
        return acc + cur.price
      }, 0))
    const styles = {
      root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
      },
      gridList: {
        display: 'flex',
        flexWrap: 'nowrap',
        overflowX: 'auto',
      },
      titleStyle: {
        color: 'rgb(0, 188, 212)',
      },
      tableLayoutAuto: {
        tableLayout: "auto"
      },
      itemNameCol: {
        width: "50%"
      },
      otherCols: {
        width: "25%"
      },
      cartFooterPriceLabel: {
        width: "75%",
        textAlign: "center"
      },
      cartFooterTotalPrice: {
        width: "25%"
      },
    }
    cartList &&
     (productsJSX = cartList.map((product, i) => {
      return (
        <TableRow key={i} >
          <TableRowColumn style={styles.itemNameCol}>{product.name}</TableRowColumn>
          <TableRowColumn style={styles.otherCols}>{product.price}</TableRowColumn>
          <TableRowColumn style={styles.otherCols}>{product.type}</TableRowColumn>
        </TableRow>
      )
    }))
    return (
      <div>
        <a href="#" onClick={this.handleToggle} >View Cart</a>
        <Drawer
          docked={false}
          width={400}
          open={this.state.open}
          openSecondary={true}
          onRequestChange={(open) => this.setState({open})}
        >
          <AppBar title="Your Cart" showMenuIconButton={false} />
          <Table 
            fixedFooter={true} 
            style={styles.tableLayout}
            multiSelectable={true} 
            onRowSelection={(event, id) => { this.updateItemsToDelete(event, id)}}
          >
            <TableHeader displaySelectAll={false}>
              <TableRow>
                <TableHeaderColumn style={styles.itemNameCol}>Item</TableHeaderColumn>
                <TableHeaderColumn style={styles.otherCols}>Price</TableHeaderColumn>
                <TableHeaderColumn style={styles.otherCols}>Type</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={true}>
              {productsJSX}
            </TableBody>
            <TableFooter adjustForCheckbox={this.state.showCheckboxes}>
              <TableRow>
                <TableRowColumn style={styles.cartFooterPriceLabel}>
                  Total Price:
                </TableRowColumn>
                <TableRowColumn style={styles.cartFooterTotalPrice}>
                  {totalPrice}
                </TableRowColumn>
              </TableRow>
            </TableFooter>
          </Table>
          <div>
            <RaisedButton
              label="Remove"
              containerElement="label"
              onClick={(event) => { this.removeFromCart(event) }}
            />
          </div>
        </Drawer>
      </div>
    )
  }
}

export default Cart 