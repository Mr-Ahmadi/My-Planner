import { Component } from 'react'

import Form from 'react-bootstrap/Form'

export default class AddDetailItem extends Component {
    render() {
        return (
            <abbr onClick={this.props.onClick}>
                <Form.Check type='checkbox' label={<abbr className='text-muted'>Add detail item...</abbr>} onChange={e => e.target.checked = false}/>
            </abbr>
        )
    }
}