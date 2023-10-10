import Loader from 'react-loader-spinner'
import {Component} from 'react'
import './index.css'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

class GithubPopularRepos extends Component {
  state = {
    isActiveTab: languageFiltersData[0].language,
    isLoading: false,
    repositories: [],
    isError: false,
  }

  componentDidMount() {
    this.fetchRepositories()
  }

  /* onSubmitFailure = () => (
    <div className="error-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="img-erorr"
      />
      <h1 className="error-heading">Something Went Wrong</h1>
    </div>
  ) */

  fetchRepositories = async () => {
    const {isActiveTab} = this.state
    this.setState({isLoading: true, isError: false})
    const response = await fetch(
      `https://apis.ccbp.in/popular-repos?language=${isActiveTab}`,
    )
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.popular_repos.map(eachRespo => ({
        avatarUrl: eachRespo.avatar_url,
        forksCount: eachRespo.forks_count,
        id: eachRespo.id,
        issuesCount: eachRespo.issues_count,
        name: eachRespo.name,
        starsCount: eachRespo.stars_count,
      }))
      console.log(updatedData)
      this.setState({
        repositories: updatedData,
        isLoading: false,
      })
    } else {
      this.setState({isError: true, isLoading: false})
    }
  }

  changedLanguage = language => {
    this.setState({isActiveTab: language}, this.fetchRepositories)
  }

  renderRespoList = () => {
    const {repositories} = this.state
    return (
      <div className="respo-container">
        <ul className="output-container">
          {repositories.map(eachApi => (
            <RepositoryItem key={eachApi.id} apiDetails={eachApi} />
          ))}
        </ul>
      </div>
    )
  }

  renderLoader = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  render() {
    const {isActiveTab, isLoading, isError} = this.state

    let content
    if (isLoading) {
      content = this.renderLoader()
    } else if (isError) {
      content = (
        <div className="error-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
            alt="failure view"
            className="img-error"
          />
          <h1 className="error-heading">Something Went Wrong</h1>
        </div>
      )
    } else {
      content = this.renderRespoList()
    }

    return (
      <div className="app-container">
        <h1 className="main-heading">Popular</h1>
        <ul>
          <LanguageFilterItem
            languageFiltersData={languageFiltersData}
            changedLanguage={this.changedLanguage}
            isActiveTab={isActiveTab}
          />
        </ul>
        {content}
      </div>
    )
  }
}

export default GithubPopularRepos
