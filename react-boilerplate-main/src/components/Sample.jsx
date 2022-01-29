import { useEffect } from 'react'
import './Sample.css'

const Sample = () => {
  useEffect(() => {
    const el = document.querySelector('#sample')
    el?.classList?.add('show')
    setTimeout(() => {
      el?.classList?.remove('show')
    }, 3000)
  }, [])

  return (
    <div id="sample">
      Backend running on: <strong>{'/service_backend'}</strong>
    </div>
  )
}

export default Sample
