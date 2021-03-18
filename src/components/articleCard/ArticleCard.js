import React from 'react'
import { isEmpty } from 'lodash-es'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import './styles.scss'

function ArticleCard({ title, desc, media, section, onClick }) {
  return (
    <div className='article-card'>
      <Card onClick={onClick}>
        <CardContent>
          <div></div>
          <Grid container spacing={2}>
            {!isEmpty(media) && !isEmpty(media[0]['media-metadata']) && (
              <Grid item>
                <img
                  className='card__img'
                  alt='article'
                  src={media[0]['media-metadata'][media[0]['media-metadata'].length - 1].url}
                />
              </Grid>
            )}
            <Grid item xs={12} sm container>
              <Grid item xs container direction='column' spacing={2}>
                <Grid item xs>
                  <Typography gutterBottom variant='subtitle1'>
                    {title}
                  </Typography>
                  <Typography variant='body2' color='textSecondary'>
                    {desc}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant='body2'>{section}</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  )
}

export default ArticleCard
