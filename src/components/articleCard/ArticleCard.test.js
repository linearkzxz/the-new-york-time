import React from 'react'
import { render, screen } from '@testing-library/react'
import ArticleCard from './ArticleCard'

it('renders ArticleCard correctly', () => {
  render(<ArticleCard title={'mockTitle'} desc={'mockDesc'} onClick={() => {}} />)
  expect(screen.queryByText('mockTitle')).not.toBeNull()
  expect(screen.queryByText('mockDesc')).not.toBeNull()
})
