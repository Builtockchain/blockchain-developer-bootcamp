import React, { Component } from 'react'
import { connect } from 'react-redux'
import { filledOrdersLoadedSelector, filledOrdersSelector } from '../store/selectors'

class Trades extends Component {
    render() {
        return (
            <div className="card bg-dark text-white">
                <div className="card-header">
                  Card Title
                </div>
                <div className="card-body">
                  <table className='table table-dark table-sm small'>
                    <thead>
                        <tr>
                            <th>Time</th>
                            <th>BUILT</th>
                            <th>BUILT/ETH</th>
                        </tr>
                    </thead>
                  </table>
                </div>
              </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        filledOrdersLoaded: filledOrdersLoadedSelector(state),
        filledOrders: filledOrdersSelector(state)
    }
}

export default connect(mapStateToProps)(Trades)