import React, { useState } from 'react'
import { PROJECTS, CATEGORIES, SORTS, decorateProject, won } from '../data.js'

function Chip({ label, active, onClick, sm }) {
  const base = { borderRadius: 999, cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all .15s', border: '1px solid var(--line)', fontFamily: 'inherit' }
  const size = sm ? { padding: '7px 15px', fontSize: 13 } : { padding: '9px 18px', fontSize: 14 }
  const on  = { ...base, ...size, fontWeight: sm ? 700 : 600, border: '1px solid var(--accent)', background: 'var(--accent)', color: '#fff' }
  const off = { ...base, ...size, fontWeight: 500, background: 'var(--card)', color: 'var(--muted)' }
  return <div style={active ? on : off} onClick={onClick}>{label}</div>
}

export default function StoryPage({ liked, onToggleLike }) {
  const [cat, setCat] = useState('전체')
  const [sort, setSort] = useState('인기순')

  let list = PROJECTS.filter(p => cat === '전체' || p.medium === cat)
  list = [...list].sort((a, b) => {
    if (sort === '인기순')     return b.supporters - a.supporters
    if (sort === '마감임박순') return a.daysLeft - b.daysLeft
    if (sort === '신규순')     return ((b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)) || b.daysLeft - a.daysLeft
    if (sort === '달성률순')   return (b.raised / b.goal) - (a.raised / a.goal)
    return 0
  }).map(p => decorateProject(p, liked))

  const totalRaised = PROJECTS.reduce((a, p) => a + p.raised, 0)
  const totalSup    = PROJECTS.reduce((a, p) => a + p.supporters, 0)

  return (
    <div className="theo-fade" style={{ maxWidth: 1240, margin: '0 auto', width: '100%' }}>
      <section style={{ padding: '70px 48px 38px' }}>
        <div style={{ fontFamily: "'Newsreader', serif", fontStyle: 'italic', fontSize: 21, color: 'var(--accent)', marginBottom: 14 }}>Now Supporting</div>
        <h1 style={{ fontSize: 48, lineHeight: 1.16, color: 'var(--ink)', fontWeight: 800, letterSpacing: '-1.6px', margin: '0 0 18px', maxWidth: 720 }}>
          지금, 당신의 후원을<br />기다리는 작업들
        </h1>
        <p style={{ fontSize: 17, color: 'var(--muted)', maxWidth: 540, lineHeight: 1.75, margin: '0 0 32px' }}>
          한 점의 작품이 세상에 나오기까지. Theo에서 동시대 작가들의 작업을 직접 후원하고, 완성의 순간을 함께하세요.
        </p>
        <div style={{ display: 'flex', gap: 34, alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 27, fontWeight: 800, color: 'var(--ink)' }}>{PROJECTS.length}</div>
            <div style={{ fontSize: 13, color: 'var(--muted2)', marginTop: 2 }}>진행 중 프로젝트</div>
          </div>
          <div style={{ width: 1, height: 40, background: 'var(--line)' }} />
          <div>
            <div style={{ fontSize: 27, fontWeight: 800, color: 'var(--ink)' }}>₩{Math.round(totalRaised / 10000).toLocaleString('ko-KR')}만</div>
            <div style={{ fontSize: 13, color: 'var(--muted2)', marginTop: 2 }}>누적 후원액</div>
          </div>
          <div style={{ width: 1, height: 40, background: 'var(--line)' }} />
          <div>
            <div style={{ fontSize: 27, fontWeight: 800, color: 'var(--ink)' }}>{totalSup.toLocaleString('ko-KR')}</div>
            <div style={{ fontSize: 13, color: 'var(--muted2)', marginTop: 2 }}>함께한 후원자</div>
          </div>
        </div>
      </section>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 48px 28px', flexWrap: 'wrap', gap: 16 }}>
        <div style={{ display: 'flex', gap: 10 }}>
          {CATEGORIES.map(c => <Chip key={c} label={c} active={c === cat} onClick={() => setCat(c)} />)}
        </div>
        <select value={sort} onChange={e => setSort(e.target.value)} style={{ fontFamily: 'inherit', fontSize: 14, color: 'var(--ink)', background: 'var(--card)', border: '1px solid var(--line)', borderRadius: 999, padding: '9px 16px', cursor: 'pointer' }}>
          {SORTS.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      </div>

      <div style={{ padding: '0 48px 90px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '38px 28px' }}>
        {list.map(p => (
          <div key={p.id} className="project-card" style={{ background: 'var(--card)', borderRadius: 14, overflow: 'hidden', border: '1px solid var(--line)', cursor: 'pointer' }}>
            <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden', background: p.grad }}>
              <img src={p.imgUrl} alt="" crossOrigin="anonymous" loading="lazy" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
              <span style={{ position: 'absolute', left: 14, top: 14, background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(4px)', padding: '4px 11px', borderRadius: 999, fontSize: 12, color: '#1E1A17', fontWeight: 700 }}>{p.medium}</span>
              <button
                onClick={() => onToggleLike(p.id)}
                style={{ position: 'absolute', right: 12, top: 12, width: 34, height: 34, borderRadius: '50%', border: 'none', background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
              >
                {p.isLiked
                  ? <svg width="17" height="17" viewBox="0 0 24 24" style={{ fill: 'var(--accent)' }}><path d="M12 21s-7.5-4.6-10-9.3C.5 8.4 2.1 5 5.5 5 8 5 9.5 6.8 12 9.5 14.5 6.8 16 5 18.5 5 21.9 5 23.5 8.4 22 11.7 19.5 16.4 12 21 12 21z" /></svg>
                  : <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#6B6358" strokeWidth="2"><path d="M12 21s-7.5-4.6-10-9.3C.5 8.4 2.1 5 5.5 5 8 5 9.5 6.8 12 9.5 14.5 6.8 16 5 18.5 5 21.9 5 23.5 8.4 22 11.7 19.5 16.4 12 21 12 21z" /></svg>
                }
              </button>
              {p.hasTag && (
                <span style={{ position: 'absolute', left: 14, bottom: 14, background: p.tag.bg, backdropFilter: 'blur(6px)', color: p.tag.c, padding: '4px 11px', borderRadius: 999, fontSize: 12, fontWeight: 700 }}>{p.tag.t}</span>
              )}
            </div>
            <div style={{ padding: '18px 18px 20px' }}>
              <div style={{ fontSize: 13, color: 'var(--muted2)', marginBottom: 6 }}>{p.artist} <span style={{ opacity: 0.6 }}>· 작가</span></div>
              <h3 style={{ fontSize: 18.5, fontWeight: 700, color: 'var(--ink)', margin: '0 0 16px', letterSpacing: '-0.4px' }}>{p.title}</h3>
              <div style={{ height: 6, background: 'var(--track)', borderRadius: 99, overflow: 'hidden', marginBottom: 11 }}>
                <div style={{ width: p.barW, height: '100%', borderRadius: 99, background: 'var(--accent)' }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontSize: 16, fontWeight: 800, color: 'var(--accent)' }}>
                  {p.pctStr}<span style={{ fontSize: 12, color: 'var(--muted2)', fontWeight: 500 }}> 달성</span>
                </span>
                <span style={{ fontSize: 13, color: 'var(--muted2)' }}>{p.dLabel}</span>
              </div>
              <div style={{ marginTop: 10, display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'var(--muted2)' }}>
                <span>{p.raisedStr}</span>
                <span>후원자 {p.supStr}명</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
