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
  }

  componentDidMount() {
    this.fetchRepositories()
  }

  fetchRepositories = async () => {
    const {language} = this.state
    this.setState({apiStatus: 'loading'})

    try {
      const githubReposApiUrl = 'https://apis.ccbp.in/popular-repos'

      const response = await fetch(`${githubReposApiUrl}?language=${language}`)
      if (response.ok) {
        const fetchedData = await response.json()
        const updatedData = fetchedData.map(product => ({
          name: product.name,
          id: product.id,
          issuesCount: product.issues_count,
          forksCount: product.forks_count,
          starsCount: product.stars_countl,
          avatarUrl: product.avatar_url,
        }))
        console.log(updatedData)
        this.setState({
          repositories: updatedData,
          isLoading: false,
        })
      } else {
        this.setState({apiStatus: 'failure'})
      }
    } catch (error) {
      this.setState({apiStatus: 'failure'})
    }
  }

  handleLanguageChange = language => {
    this.setState({language}, this.fetchRepositories)
  }

  handleButtonClick = language => {
    this.setState({isActiveTab: language})
  }

  render() {
    const {isActiveTab} = this.state

    return (
      <div className="app-container">
        <h1 className="main-heading">Popular</h1>
        <nav className="nav-bar">
          {languageFiltersData.map(eachLanguage => (
            <button
              key={eachLanguage.id} // Add a key to each button
              className={`button ${
                eachLanguage.language === isActiveTab ? 'active' : ''
              }`}
              type="button"
              onClick={() => this.handleButtonClick(eachLanguage.language)} // Pass the ID to the handler
            >
              {eachLanguage.language}
            </button>
          ))}
        </nav>
      </div>
    )
  }
}

export default GithubPopularRepos
