import React, { useEffect } from 'react'
import isEmpty from 'lodash-es/isEmpty'
import { useHistory } from 'react-router-dom'
import HomeIcon from '@material-ui/icons/Home'
import Container from '@material-ui/core/Container'
import './styles.scss'

function ArticleDetail({ location }) {
  const { state } = location
  const history = useHistory()

  useEffect(() => {
    if (!state) {
      history.push('/')
    }
  }, [state, history])

  return (
    <div className='article'>
      <Container maxWidth='md'>
        <div className='title'>
          <span className='title__text'>The New York Times</span>
        </div>
        <div className='title-line'>
          <hr />
        </div>
        <div>
          <HomeIcon onClick={() => history.push('/')} />
        </div>
        <div className='article__title'>
          <h1>{state?.data.title}</h1>
        </div>
        <div className='article__detail'>
          <p>{state?.data.abstract}</p>
        </div>
        {!isEmpty(state?.data.media) && !isEmpty(state.data.media[0]['media-metadata']) && (
          <Container maxWidth='sm'>
            <div className='article__image'>
              <img
                alt={state.data.media[0].caption}
                src={state.data.media[0]['media-metadata'][state.data.media[0]['media-metadata'].length - 1].url}
              />
              <span className='article__caption'>{state.data.media[0].caption}</span>
            </div>
          </Container>
        )}
      </Container>
    </div>
  )
}

export default ArticleDetail
