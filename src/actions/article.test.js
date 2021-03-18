import axios from 'axios'
import { getArticle } from './article'

jest.mock('axios')

const mockResponse = {
  data: [
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

it('fetches article successfully', async () => {
  axios.get.mockImplementationOnce(() => Promise.resolve(mockResponse))
  await expect(getArticle(1)).resolves.toEqual(mockResponse.data)
})

it('fetches successfully data from an API', async () => {
  axios.get.mockRejectedValueOnce(new Error('call article error'))
  await expect(getArticle(1)).rejects.toThrow(new Error('call article error'))
})
