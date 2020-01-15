import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import config from '../../config'

class ProjectOverView extends Component {
  constructor (props) {
    super(props)
    this.state = {
      projects: []
    }
  }

  componentDidMount () {
    console.log('projectOverView', this.props.idToken)
    axios
      .get(config.url + `/api/projects/`, {
        headers: {
          Authentication: 'Bearer ' + this.props.idToken
        }
      })
      .then(response => {
        this.setState({
          projects: response.data
        })
      })
      .catch(error => {
        console.log(error)
      })
  }

  render () {
    return (
      <div className='container'>
        <h1>Projects</h1>
        {this.state.projects.map(project => (
          <Link
            to={
              '/' +
              project.name
                .toString()
                .split(' ')
                .join('-')
            }
          >
            <div className='row project-list-item'>
              <h3>{project.name}</h3>{' '}
            </div>
          </Link>
        ))}
      </div>
    )
  }
}

export default ProjectOverView
