import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import ArticleDetail from './ArticleDetail'

const mockHistoryPush = jest.fn()
jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}))

it('renders ArticleDetail correctly', () => {
  const { container } = render(<ArticleDetail />)
  expect(container.textContent).toBe('The New York Times')
})

it('should go to home page if does not have data', () => {
  render(<ArticleDetail />)
  expect(mockHistoryPush).toHaveBeenCalled()
})

it('renders content correctly', () => {
  const mockData = {
    state: {
      data: {
        title: 'mockTitle',
        abstract: 'mockAbstract',
        media: [
          {
            caption: 'mockCaption',
            'media-metadata': [
              {
                url: 'mockUrl',
              },
            ],
          },
        ],
      },
    },
  }
  render(<ArticleDetail location={mockData} />)
  expect(screen.queryByText(mockData.state.data.title)).not.toBeNull()
  expect(screen.queryByText(mockData.state.data.abstract)).not.toBeNull()
  expect(screen.queryByText(mockData.state.data.media[0].caption)).not.toBeNull()
  expect(screen.getByRole('img')).not.toBeNull()
})

it('should go to home page when click home icon', () => {
  const mockData = {
    state: {
      data: {
        title: 'mockTitle',
        abstract: 'mockAbstract',
        media: [
          {
            caption: 'mockCaption',
            'media-metadata': [
              {
                url: 'mockUrl',
              },
            ],
          },
        ],
      },
    },
  }
  const { container } = render(<ArticleDetail location={mockData} />)
  const homeIcon = container.querySelector('svg')
  fireEvent.click(homeIcon)
  expect(mockHistoryPush).toHaveBeenCalled()
})
