import React, { useState, useEffect } from 'react'
import NProgress from 'nprogress'
import { isEmpty } from 'lodash-es'
import { useHistory } from 'react-router-dom'
import Container from '@material-ui/core/Container'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import InputAdornment from '@material-ui/core/InputAdornment'
import SearchIcon from '@material-ui/icons/Search'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Grid from '@material-ui/core/Grid'
import ArticleCard from '../../components/articleCard/ArticleCard'
import { getArticle } from '../../actions/article'
import './styles.scss'

function HomePage() {
  const history = useHistory()
  const [filterSection, setFilterSection] = useState('')
  const [filterPeriod, setFilterPeriod] = useState(1)
  const [articles, setArticles] = useState([])
  const [displayArticles, setDisplayArticles] = useState([])
  const [searchArticlesName, setSearchArticlesName] = useState('')

  useEffect(() => {
    const handleGetArticle = async () => {
      NProgress.start()
      const _article = await getArticle(1)
      setArticles(_article.results)
      NProgress.done()
    }

    handleGetArticle()
  }, [])

  useEffect(() => {
    if (isEmpty(articles)) {
      return
    }

    let _displayArticles
    if (filterSection) {
      _displayArticles = articles.filter((item) => item.section === filterSection)
    } else {
      _displayArticles = [...articles]
    }

    if (searchArticlesName) {
      _displayArticles = _displayArticles.filter((item) =>
        item.title.toLowerCase().includes(searchArticlesName.toLowerCase())
      )
    }

    setDisplayArticles(_displayArticles)
  }, [articles, filterSection, searchArticlesName])

  const handleChangeSearchArticlesName = () => (event) => {
    setSearchArticlesName(event.target.value)
  }

  const handleChangeSection = (event) => {
    setFilterSection(event.target.value)
  }

  const handleChangePeriod = async (event) => {
    setFilterPeriod(event.target.value)
    NProgress.start()
    const _article = await getArticle(event.target.value)
    setArticles(_article.results)
    NProgress.done()
  }

  return (
    <div className='home-page'>
      <Container maxWidth='md'>
        <div className='title'>
          <span className='title__text'>The New York Times</span>
        </div>
        <div className='title-line'>
          <hr />
        </div>

        <div className='search'>
          <FormControl>
            <InputLabel htmlFor='standard-adornment-seach'>Search Articles</InputLabel>
            <Input
              id='standard-adornment-seach'
              type='text'
              value={searchArticlesName}
              onChange={handleChangeSearchArticlesName()}
              endAdornment={
                <InputAdornment position='end'>
                  <SearchIcon />
                </InputAdornment>
              }
            />
          </FormControl>
        </div>

        <div className='filter'>
          <Grid item xs sm md={6} container spacing={2}>
            <Grid item xs={12} sm={6} container>
              <FormControl className='filter__form'>
                <InputLabel id='section-seclect-label'>Section</InputLabel>
                <Select
                  labelId='section-seclect-label'
                  id='section-seclect'
                  value={filterSection}
                  onChange={handleChangeSection}>
                  <MenuItem value=''>
                    <span>None</span>
                  </MenuItem>
                  {sectionsData.map((item) => (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} container>
              <FormControl className='filter__form'>
                <InputLabel id='period-seclect-label'>Period</InputLabel>
                <Select
                  labelId='period-seclect-label'
                  id='period-seclect'
                  value={filterPeriod}
                  onChange={handleChangePeriod}>
                  <MenuItem value={1}>1 days</MenuItem>
                  <MenuItem value={7}>7 days</MenuItem>
                  <MenuItem value={30}>30 days</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </div>

        <div className='article'>
          {!isEmpty(displayArticles) &&
            displayArticles.map((item) => {
              return (
                <div key={item.id} style={{ marginBottom: 20 }}>
                  <ArticleCard
                    title={item.title}
                    desc={item.abstract}
                    section={item.section}
                    media={item.media}
                    onClick={() => {
                      history.push({
                        pathname: 'article',
                        state: {
                          data: item,
                        },
                      })
                    }}
                  />
                </div>
              )
            })}
        </div>
      </Container>
    </div>
  )
}

export default HomePage

const sectionsData = [
  'Arts',
  'Automobiles',
  'Autos',
  'Blogs',
  'Books',
  'Booming',
  'Business',
  'Business Day',
  'Corrections',
  'Crosswords & Games',
  'Crosswords/Games',
  'Dining & Wine',
  'Dining and Wine',
  "Editors' Notes",
  'Education',
  'Fashion & Style',
  'Food',
  'Front Page',
  'Giving',
  'Global Home',
  'Great Homes & Destinations',
  'Great Homes and Destinations',
  'Health',
  'Home & Garden',
  'Home and Garden',
  'International Home',
  'Job Market',
  'Learning',
  'Magazine',
  'Movies',
  'Multimedia',
  'Multimedia/Photos',
  'N.Y. / Region',
  'N.Y./Region',
  'NYRegion',
  'NYT Now',
  'National',
  'New York',
  'New York and Region',
  'Obituaries',
  'Olympics',
  'Open',
  'Opinion',
  'Paid Death Notices',
  'Public Editor',
  'Real Estate',
  'Science',
  'Sports',
  'Style',
  'Sunday Magazine',
  'Sunday Review',
  'T Magazine',
  'T:Style',
  'Technology',
  'The Public Editor',
  'The Upshot',
  'Theater',
  'Times Topics',
  'TimesMachine',
  "Today's Headlines",
  'Topics',
  'Travel',
  'U.S.',
  'Universal',
  'UrbanEye',
  'Washington',
  'Week in Review',
  'World',
  'Your Money',
]
