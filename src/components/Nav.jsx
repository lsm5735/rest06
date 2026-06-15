import React from 'react'
import { PALETTES } from '../theme.js'

const PAGES = [
  { key: 'about',   label: 'About' },
  { key: 'artists', label: '아티스트' },
  { key: 'story',   label: '스토리' },
  { key: 'mypage',  label: '후원내역' },
  { key: 'board',   label: '게시판' },
]

export default function Nav({ page, palette, mode, onPage, onPalette, onToggleMode }) {
  const isDark = mode === 'dark'

  return (
    <nav style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '18px 48px', borderBottom: '1px solid var(--line)',
      background: 'var(--bg)', position: 'sticky', top: 0, zIndex: 50,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 46 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }} onClick={() => onPage('story')}>
          <svg width="27" height="27" viewBox="0 0 26 26" fill="none">
            <rect width="26" height="26" rx="8" style={{ fill: 'var(--accent)' }} />
            <circle cx="13" cy="13" r="6.5" stroke="#fff" strokeWidth="2" />
            <circle cx="13" cy="13" r="1.8" fill="#fff" />
          </svg>
          <span style={{ fontFamily: "'Newsreader', serif", fontStyle: 'italic', fontSize: 27, color: 'var(--ink)', letterSpacing: '0.3px' }}>Theo</span>
        </div>
        <div style={{ display: 'flex', gap: 28 }}>
          {PAGES.map(pg => (
            <span
              key={pg.key}
              onClick={() => onPage(pg.key)}
              style={{
                fontSize: 14.5, cursor: 'pointer', whiteSpace: 'nowrap', transition: 'color .15s',
                color: pg.key === page ? 'var(--ink)' : 'var(--muted)',
                fontWeight: pg.key === page ? 700 : 500,
              }}
            >{pg.label}</span>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" strokeWidth="2">
          <circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" />
        </svg>
        <span style={{ fontSize: 14, color: 'var(--muted)', cursor: 'pointer', whiteSpace: 'nowrap' }}>로그인</span>
        <button
          onClick={() => onPage('story')}
          style={{ background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: 999, padding: '10px 20px', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap' }}
        >후원 시작하기</button>
        <div style={{ width: 1, height: 24, background: 'var(--line)' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 9 }} title="컬러 테마">
          {Object.entries(PALETTES).map(([k, p]) => (
            <button
              key={k}
              title={p.name}
              onClick={() => onPalette(k)}
              style={{
                width: 22, height: 22, borderRadius: '50%', cursor: 'pointer',
                background: p.swatch, border: 'none', padding: 0,
                boxShadow: k === palette
                  ? '0 0 0 2px var(--bg), 0 0 0 3.5px var(--ink)'
                  : '0 0 0 1px var(--line)',
                transition: 'box-shadow .15s',
              }}
            />
          ))}
        </div>
        <button
          onClick={onToggleMode}
          title="라이트 / 다크"
          style={{ width: 38, height: 38, borderRadius: '50%', border: '1px solid var(--line)', background: 'var(--card)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}
        >
          {isDark
            ? <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--ink)" strokeWidth="2"><path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z" /></svg>
            : <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--ink)" strokeWidth="2"><circle cx="12" cy="12" r="4.2" /><path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M19.1 4.9l-1.8 1.8M6.7 17.3l-1.8 1.8" /></svg>
          }
        </button>
      </div>
    </nav>
  )
}
