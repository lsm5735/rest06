import React, { useState } from 'react'
import { PROJECTS, CATEGORIES, decorateProject } from '../data.js'

function Chip({ label, active, onClick }) {
  const base = { borderRadius: 999, cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all .15s', border: '1px solid var(--line)', fontFamily: 'inherit', padding: '9px 18px', fontSize: 14 }
  const on  = { ...base, fontWeight: 600, border: '1px solid var(--accent)', background: 'var(--accent)', color: '#fff' }
  const off = { ...base, fontWeight: 500, background: 'var(--card)', color: 'var(--muted)' }
  return <div style={active ? on : off} onClick={onClick}>{label}</div>
}

export default function ArtistsPage({ liked, followed, onToggleFollow, onStart }) {
  const [artCat, setArtCat] = useState('전체')

  const artistList = PROJECTS
    .filter(p => artCat === '전체' || p.medium === artCat)
    .map(p => ({
      ...decorateProject(p, liked),
      followed: !!followed[p.id],
      onFollow: () => onToggleFollow(p.id),
    }))

  const featured = { ...decorateProject(PROJECTS[0], liked), followed: !!followed[PROJECTS[0].id] }

  return (
    <div className="theo-fade" style={{ maxWidth: 1240, margin: '0 auto', width: '100%' }}>
      <section style={{ padding: '70px 48px 36px' }}>
        <div style={{ fontFamily: "'Newsreader', serif", fontStyle: 'italic', fontSize: 21, color: 'var(--accent)', marginBottom: 14 }}>Artists</div>
        <h1 style={{ fontSize: 46, lineHeight: 1.16, color: 'var(--ink)', fontWeight: 800, letterSpacing: '-1.5px', margin: '0 0 18px' }}>Theo와 함께하는 작가들</h1>
        <p style={{ fontSize: 17, color: 'var(--muted)', maxWidth: 540, lineHeight: 1.75, margin: 0 }}>회화, 조각, 사진. 자신만의 언어로 세계를 그려가는 동시대 작가들을 만나보세요.</p>
      </section>

      <section style={{ padding: '0 48px 40px' }}>
        <div style={{ background: 'var(--card)', border: '1px solid var(--line)', borderRadius: 22, overflow: 'hidden', display: 'grid', gridTemplateColumns: '0.85fr 1fr' }}>
          <div style={{ position: 'relative', minHeight: 420, background: 'linear-gradient(145deg,#E9C46A,#D98E63)' }}>
            <img src={featured.portraitUrl} alt="" crossOrigin="anonymous" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
            <span style={{ position: 'absolute', left: 20, top: 20, background: 'var(--accent)', color: '#fff', padding: '6px 14px', borderRadius: 999, fontSize: 12.5, fontWeight: 700 }}>이달의 작가</span>
          </div>
          <div style={{ padding: '48px 46px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ fontSize: 13, color: 'var(--muted2)', marginBottom: 10 }}>{featured.medium} · {featured.location}</div>
            <h2 style={{ fontSize: 34, fontWeight: 800, color: 'var(--ink)', letterSpacing: '-1px', margin: '0 0 14px' }}>{featured.artist}</h2>
            <p style={{ fontSize: 16, color: 'var(--muted)', lineHeight: 1.8, margin: '0 0 26px', maxWidth: 440 }}>{featured.bio}</p>
            <div style={{ display: 'flex', gap: 30, marginBottom: 28 }}>
              <div><div style={{ fontSize: 22, fontWeight: 800, color: 'var(--ink)' }}>{featured.works}점</div><div style={{ fontSize: 12.5, color: 'var(--muted2)', marginTop: 2 }}>진행·완료 작업</div></div>
              <div><div style={{ fontSize: 22, fontWeight: 800, color: 'var(--ink)' }}>{featured.raisedStr}</div><div style={{ fontSize: 12.5, color: 'var(--muted2)', marginTop: 2 }}>누적 후원액</div></div>
              <div><div style={{ fontSize: 22, fontWeight: 800, color: 'var(--ink)' }}>{featured.supStr}</div><div style={{ fontSize: 12.5, color: 'var(--muted2)', marginTop: 2 }}>후원자</div></div>
            </div>
            <button onClick={onStart} style={{ background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: 999, padding: '13px 26px', fontSize: 14.5, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', alignSelf: 'flex-start' }}>대표 작업 보기</button>
          </div>
        </div>
      </section>

      <div style={{ display: 'flex', gap: 10, padding: '8px 48px 30px' }}>
        {CATEGORIES.map(c => <Chip key={c} label={c} active={c === artCat} onClick={() => setArtCat(c)} />)}
      </div>

      <div style={{ padding: '0 48px 90px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(258px, 1fr))', gap: '30px 26px' }}>
        {artistList.map(a => {
          const followStyle = {
            fontFamily: 'inherit', fontSize: 12.5, fontWeight: 700, cursor: 'pointer', borderRadius: 999, padding: '7px 14px', transition: 'all .15s',
            border: a.followed ? '1px solid var(--accent)' : '1px solid var(--line)',
            background: a.followed ? 'var(--accent)' : 'var(--card)',
            color: a.followed ? '#fff' : 'var(--ink)',
          }
          return (
            <div key={a.id} style={{ background: 'var(--card)', border: '1px solid var(--line)', borderRadius: 16, overflow: 'hidden' }}>
              <div style={{ position: 'relative', aspectRatio: '1/1', background: 'linear-gradient(145deg,#CDBBA0,#9A8F80)' }}>
                <img src={a.portraitUrl} alt="" crossOrigin="anonymous" loading="lazy" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                <span style={{ position: 'absolute', left: 12, top: 12, background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(4px)', padding: '3px 10px', borderRadius: 999, fontSize: 11.5, color: '#1E1A17', fontWeight: 700 }}>{a.medium}</span>
              </div>
              <div style={{ padding: '18px 18px 20px' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 8, marginBottom: 6 }}>
                  <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--ink)', margin: 0, letterSpacing: '-0.3px' }}>{a.artist}</h3>
                  <span style={{ fontSize: 12, color: 'var(--muted2)', whiteSpace: 'nowrap' }}>{a.location}</span>
                </div>
                <p style={{ fontSize: 13.5, color: 'var(--muted)', lineHeight: 1.65, margin: '0 0 16px', height: 44, overflow: 'hidden' }}>{a.bio}</p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 12.5, color: 'var(--muted2)' }}>작업 {a.works}점 · {a.raisedStr}</span>
                  <button style={followStyle} onClick={a.onFollow}>{a.followed ? '팔로잉' : '+ 팔로우'}</button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
