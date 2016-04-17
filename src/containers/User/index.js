/**
 * Created by youyifan on 2016/4/15.
 */
import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button'

export default class User extends React.Component {
    constructor(props) {
        super(props)
    }

    componentWillMount(){

    }

    render() {
        return (
            <div >
                <RaisedButton label="Default" />
            </div>
        )
    }
}