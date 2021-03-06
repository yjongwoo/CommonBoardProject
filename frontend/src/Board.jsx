import React, { useEffect, useState } from 'react'
import useAxios from "./useAxios";

const Board = () => {
  const [result, setResult] = useState([])

  const {response, error, loading} = useAxios({
    url: '/posts',
    method: 'get'
  })

  useEffect(() => {
    setResult(response)
  }, [response, error])

  return (
    <div>
      <div>자유게시판</div>
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>제목</th>
            <th>글쓴이</th>
            <th>작성시간</th>
          </tr>
        </thead>
        <tbody>
          {result?.length > 0 ? (
            result.map((record, index) => (
              <tr key={index}>
                <td>{record.id}</td>
                <td>{record.title}</td>
                <td>{record.author}</td>
                <td>{record.createdAt}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td>작성된 글이 없습니다</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Board
