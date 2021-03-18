import React from 'react'
import { render, fireEvent, screen, within } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import HomePage from './HomePage'
import * as article from '../../actions/article'

const mockHistoryPush = jest.fn()
jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}))

const mockResponse = {
  results: [
    {
      id: 'mockId1',
      title: 'mockTitle',
      abstract: 'mockAbstract',
      section: 'Arts',
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
    {
      id: 'peopleId',
      title: 'people',
      abstract: 'peopleAbs',
      section: 'Blogs',
      media: [
        {
          caption: 'peopleCaption',
          'media-metadata': [
            {
              url: 'peopleUrl',
            },
          ],
        },
      ],
    },
  ],
}

beforeEach(() => {
  jest.spyOn(article, 'getArticle').mockImplementation(() => Promise.resolve(mockResponse))
})

it('renders HomePage correctly', async () => {
  await act(async () => {
    const { container } = render(<HomePage />)
    expect(container.textContent).toContain('The New York Times')
  })
})

it('should set article value correctly', async () => {
  await act(async () => {
    render(<HomePage />)
  })
  expect(screen.queryByText('mockTitle')).not.toBeNull()
})

it('should filter by search correctly', async () => {
  await act(async () => {
    render(<HomePage />)
  })

  fireEvent.change(screen.getByLabelText(/Search Articles/i), {
    target: { value: 'not found' },
  })
  expect(screen.queryByText('mockTitle')).toBeNull()

  fireEvent.change(screen.getByLabelText(/Search Articles/i), {
    target: { value: 'mockTitle' },
  })
  expect(screen.queryByText('mockTitle')).not.toBeNull()
  expect(screen.queryByText('people')).toBeNull()

  fireEvent.change(screen.getByLabelText(/Search Articles/i), {
    target: { value: 'people' },
  })
  expect(screen.queryByText('mockTitle')).toBeNull()
  expect(screen.queryByText('people')).not.toBeNull()
})

it('should filter by section correctly', async () => {
  await act(async () => {
    render(<HomePage />)
  })

  fireEvent.mouseDown(screen.getByRole('button', { name: /Section/i }))
  const listbox = within(screen.getByRole('listbox'))
  fireEvent.click(listbox.getByText(/Corrections/i))
  expect(screen.queryByText('mockTitle')).toBeNull()
  expect(screen.queryByText('people')).toBeNull()

  fireEvent.click(listbox.getByText(/Arts/i))
  expect(screen.queryByText('mockTitle')).not.toBeNull()
  expect(screen.queryByText('people')).toBeNull()

  fireEvent.click(listbox.getByText(/Blogs/i))
  expect(screen.queryByText('mockTitle')).toBeNull()
  expect(screen.queryByText('people')).not.toBeNull()
})

it('should call api again with selected period when change period value', async () => {
  await act(async () => {
    render(<HomePage />)
  })

  fireEvent.mouseDown(screen.getByRole('button', { name: /Period/i }))
  const listbox = within(screen.getByRole('listbox'))
  fireEvent.click(listbox.getByText(/7/i))
  expect(article.getArticle).toHaveBeenCalledTimes(2)
})

it('should go to article detail page when click a card', async () => {
  await act(async () => {
    render(<HomePage />)
  })

  fireEvent.click(screen.getByText(/peopleAbs/i))
  expect(mockHistoryPush).toHaveBeenCalled()
})
