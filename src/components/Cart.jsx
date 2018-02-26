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


class Cart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      selectedRows: [],
    }
  }
  
  handleToggle = () => this.setState({
    open: true
  })

  handleClose = () => this.setState({
    open: false
  })
  
  handleSelected = (selectedRow) => {
    this.setState({
      selectedRows: selectedRow
    })
  }

  removeFromCart = () => {
    const selectedRows = this.state.selectedRows
    let updatedCart = this.props.cartList
    for(let i = selectedRows.length-1; i >= 0; i--) {
      updatedCart.splice(selectedRows[i], 1)
    }

    this.props.updateCartFromDelete(updatedCart)
    this.setState({
      selectedRows: []
    })
  }


  render() {
    const { cartList } = this.props
    let totalPrice = 0
    let productsJSX = ''
    cartList &&
      (totalPrice = cartList.reduce((acc, cur) => {
        return acc + Number(cur.price)
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
        width: "50%",
        whiteSpace: 'normal',
        wordWrap: 'break-word',
        lineHeight: '1.5'
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
        <TableRow key={i} selected={this.state.selectedRows.indexOf(i) !== -1}>
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
          <AppBar title="Your Cart" showMenuIconButton={false} style={{backgroundColor: 'black'}} titleStyle={{textAlign: 'center'}}/>
          <Table 
            fixedFooter={true} 
            style={styles.tableLayout}
            multiSelectable={true} 
            onRowSelection={(event) => { this.handleSelected(event)}}
          >
            <TableHeader displaySelectAll={false}>
              <TableRow>
                <TableHeaderColumn style={styles.itemNameCol}>Item</TableHeaderColumn>
                <TableHeaderColumn style={styles.otherCols}>Price</TableHeaderColumn>
                <TableHeaderColumn style={styles.otherCols}>Type</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={true} deselectOnClickaway={false}>
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
          <div style={{textAlign: 'center'}}>
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