import React, { useEffect } from 'react'

import '../css/retomar-scroll-tooltip.css'

const RetomarScrollTooltip = ({ postTitle }) => {
  const [showTooltip, setShowTooltip] = React.useState(false)

  let interval

  function savePostScrolling(postTitle) {
    interval = setInterval(function() {
      localStorage.setItem(postTitle, window.scrollY)
    }, 5000)
  }

  useEffect(() => {
    const lastScroll = parseInt(localStorage.getItem(postTitle))
    if (
      localStorage.getItem(postTitle) !== null &&
      lastScroll > 300 &&
      window.scrollY < lastScroll - 100
    ) {
      setShowTooltip(true)
    } else {
      localStorage.removeItem(postTitle)
      savePostScrolling(postTitle)
    }
    return () => {
      clearInterval(interval)
    }
  }, [postTitle])

  const onClick = (option /* si | no */) => () => {
    setShowTooltip(false)
    if (option === 'si') {
      const top = parseInt(localStorage.getItem(postTitle))
      window.scrollTo({ behavior: 'smooth', top })
    }
    savePostScrolling(postTitle)
  }

  return (
    <div
      id="retomar"
      style={{
        opacity: showTooltip ? '1' : '0',
        display: showTooltip ? 'block' : 'none',
      }}
    >
      <div className="arrow" />
      <div className="body">
        <p>¿Querés retomar desde donde dejaste?</p>
        <div className="options">
          <span onClick={onClick('si')}>Si</span>
          <span onClick={onClick('no')}>No</span>
        </div>
      </div>
    </div>
  )
}

export default RetomarScrollTooltip
