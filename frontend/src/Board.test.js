import { render, waitFor } from '@testing-library/react'
import Board from './Board'
import * as HttpClient from './HttpClient'

describe('render', () => {
  let app
  beforeEach(async () => {
    jest.spyOn(HttpClient, 'get').mockResolvedValue([])
    await waitFor(() => {
      app = render(<Board />)
    })
  })

  it('shows "자유게시판"', () => {
    expect(app.getByText('자유게시판')).toBeInTheDocument()
  })

  it('shows "No", "제목", "글쓴이", "작성시간" as head column', () => {
    const table = app.container.querySelector('table')
    expect(table.querySelector('thead > tr')).toBeInTheDocument()
    const tableHeadings = table.querySelectorAll('th')
    const tableHeadingTitle = ['No', '제목', '글쓴이', '작성시간']
    tableHeadingTitle.forEach((title, index) => expect(tableHeadings[index].textContent).toBe(title))
  })

  it('show "작성된 글이 없습니다" when list empty', () => {
    const table = app.container.querySelector('table')
    expect(table.querySelector('tbody > tr > td').textContent).toBe('작성된 글이 없습니다')
  })
})

describe('fetch data', () => {
  it('renders multiple rows of contents for "No", "제목", "글쓴이", "작성시간"', async () => {
    const now = 1234567890
    const now2 = 1234567891
    jest.spyOn(HttpClient, 'get').mockResolvedValue([
      {
        id: 1,
        title: 'Some title',
        author: 'Some author',
        createdAt: now,
      },
      {
        id: 2,
        title: 'Some title2',
        author: 'Some author2',
        createdAt: now2,
      },
    ])

    const app = render(<Board />)

    await waitFor(() => {
      expect(HttpClient.get).toHaveBeenCalledTimes(1)
      expect(app.getByText('1')).toBeInTheDocument()
      expect(app.getByText('Some title')).toBeInTheDocument()
      expect(app.getByText('Some author')).toBeInTheDocument()
      expect(app.getByText(now)).toBeInTheDocument()

      expect(app.getByText('2')).toBeInTheDocument()
      expect(app.getByText('Some title2')).toBeInTheDocument()
      expect(app.getByText('Some author2')).toBeInTheDocument()
      expect(app.getByText(now2)).toBeInTheDocument()

      expect(app.queryByText('작성된 글이 없습니다')).not.toBeInTheDocument()
    })
  })
})
