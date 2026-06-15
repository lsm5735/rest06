import React, { useState, useEffect } from 'react'
import { PALETTES, MODES } from './theme.js'
import Nav from './components/Nav.jsx'
import StoryPage from './components/StoryPage.jsx'
import AboutPage from './components/AboutPage.jsx'
import ArtistsPage from './components/ArtistsPage.jsx'
import MyPage from './components/MyPage.jsx'
import BoardPage from './components/BoardPage.jsx'

function Footer() {
  return (
    <footer style={{ background: 'var(--footer-bg)', color: '#B5AEA3', padding: '50px 48px 42px' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 32 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <svg width="24" height="24" viewBox="0 0 26 26" fill="none"><rect width="26" height="26" rx="8" fill="#E5832F" /><circle cx="13" cy="13" r="6.5" stroke="#fff" strokeWidth="2" /><circle cx="13" cy="13" r="1.8" fill="#fff" /></svg>
            <span style={{ fontFamily: "'Newsreader', serif", fontStyle: 'italic', fontSize: 24, color: '#fff', letterSpacing: '0.3px' }}>Theo</span>
          </div>
          <p style={{ fontSize: 13.5, lineHeight: 1.7, maxWidth: 300, margin: 0 }}>작가와 후원자를 잇는 시각예술 후원 플랫폼. 한 점의 작품이 세상에 나오기까지 함께합니다.</p>
        </div>
        <div style={{ display: 'flex', gap: 56 }}>
          {[['플랫폼', ['About', '아티스트', '프로젝트', '게시판']], ['후원자', ['후원 방법', '리워드 안내', '후원내역', '자주 묻는 질문']], ['작가', ['입점 신청', '작가 가이드', '수수료 안내']]].map(([title, items]) => (
            <div key={title}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', marginBottom: 14 }}>{title}</div>
              {items.map(item => <div key={item} style={{ fontSize: 13, color: '#B5AEA3', marginBottom: 9, cursor: 'pointer' }}>{item}</div>)}
            </div>
          ))}
        </div>
      </div>
      <div style={{ maxWidth: 1240, margin: '32px auto 0', paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.1)', fontSize: 12.5, color: '#6B6460' }}>
        © 2026 Theo. All rights reserved.
      </div>
    </footer>
  )
}

export default function App() {
  const [page, setPage]       = useState('story')
  const [palette, setPalette] = useState('sunset')
  const [mode, setMode]       = useState('light')
  const [liked, setLiked]     = useState({})
  const [followed, setFollowed] = useState({})

  const pal  = PALETTES[palette]
  const modeVars = MODES[mode]

  const cssVars = {
    '--accent':    pal.accent,
    '--accent-ink': pal.accentInk,
    '--bg':        modeVars.bg,
    '--card':      modeVars.card,
    '--ink':       modeVars.ink,
    '--muted':     modeVars.muted,
    '--muted2':    modeVars.muted2,
    '--line':      modeVars.line,
    '--track':     modeVars.track,
    '--footer-bg': modeVars.footerBg,
  }

  const toggleLike   = id => setLiked(s => ({ ...s, [id]: !s[id] }))
  const toggleFollow = id => setFollowed(s => ({ ...s, [id]: !s[id] }))

  const handlePage = p => { setPage(p); window.scrollTo(0, 0) }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--ink)', ...cssVars }}>
      <Nav
        page={page}
        palette={palette}
        mode={mode}
        onPage={handlePage}
        onPalette={setPalette}
        onToggleMode={() => setMode(m => m === 'light' ? 'dark' : 'light')}
      />

      {page === 'story'   && <StoryPage liked={liked} onToggleLike={toggleLike} />}
      {page === 'about'   && <AboutPage onStart={() => handlePage('story')} />}
      {page === 'artists' && <ArtistsPage liked={liked} followed={followed} onToggleFollow={toggleFollow} onStart={() => handlePage('story')} />}
      {page === 'mypage'  && <MyPage liked={liked} />}
      {page === 'board'   && <BoardPage />}

      <Footer />
    </div>
  )
}
