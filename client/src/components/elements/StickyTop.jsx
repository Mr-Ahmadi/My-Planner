import { Component } from 'react'

import CurrentUTC from './CurrentUTC'

export default class StickyTop extends Component {
    render() {
        
        return (
            <div className='sticky-top pt-2 rounded-bottom'>
                {this.props.error
                ? <div className='bg-danger text-light p-3 mb-2 rounded'>{this.props.error + ' '}
                    <label onClick={this.props.setData} className='link-light'>
                        Try Again
                    </label>
                </div>
                : <div className='bg-secondary text-light p-3 mb-2 rounded'>
                    Today: <CurrentUTC/>
                </div>}
            </div>
        )
    }
}