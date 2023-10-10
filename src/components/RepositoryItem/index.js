import './index.css'

const RepositoryItem = props => {
  const {apiDetails} = props
  const {avatarUrl, forksCount, issuesCount, name, starsCount} = apiDetails
  return (
    <li className="list">
      <dil className="api-container">
        <img className="img-pic" src={avatarUrl} alt={name} />
        <p className="name">{name}</p>
        <div className="stars-count">
          <img
            className="stars"
            src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
            alt="stars"
          />
          <p className="star-count">{starsCount}</p>
        </div>
        <div className="stars-count">
          <img
            className="stars"
            src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png "
            alt="forks"
          />
          <p className="star-count">{forksCount}</p>
        </div>
        <div className="stars-count">
          <img
            className="stars"
            src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
            alt="open issues"
          />
          <p className="star-count">{issuesCount}</p>
        </div>
      </dil>
    </li>
  )
}
export default RepositoryItem
