import './index.css'

const LanguageFilterItem = props => {
  const {languageFiltersData, isActiveTab, changedLanguage} = props

  const handleButtonClick = language => {
    changedLanguage(language)
  }

  return (
    <li className="list">
      <nav className="nav-bar">
        {languageFiltersData.map(eachLanguage => (
          <button
            key={eachLanguage.id}
            className={`button ${
              eachLanguage.language === isActiveTab ? 'active' : ''
            }`}
            type="button"
            onClick={() => handleButtonClick(eachLanguage.language)}
          >
            {eachLanguage.language}
          </button>
        ))}
      </nav>
    </li>
  )
}
export default LanguageFilterItem
