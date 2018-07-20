import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import apolloClient from './client'
import { connect } from 'react-redux'

const GQLToRedux = (query, getVariables, action) => {
  return Component => connect(
    null,
    (dispatch) => ({ doAction: data => dispatch(action(data)) })
  )(class GQLToRedux extends React.Component {

    query = () => apolloClient.query({ query, variables: getVariables(this.props) }).then(data => this.props.doAction(data))

    componentDidMount() {
      this.query()
    }

    componentDidUpdate(prevProps) {
      if(prevProps.id !== this.props.id) {
        this.query()
      }
    }

    render() {
      return <Component />
    }
  })
}

export default GQLToRedux
