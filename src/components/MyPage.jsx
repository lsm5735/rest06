import React, { useState } from 'react'
import { PROJECTS, MY_DONATIONS, TIMELINE, decorateProject, won } from '../data.js'

const STATUS_COLOR = {
  '진행 중':  { c: 'var(--accent)', bg: 'color-mix(in srgb, var(--accent) 15%, var(--card))' },
  '목표 달성': { c: '#2E8B6F', bg: 'rgba(46,139,111,0.15)' },
  '마감 임박': { c: '#C2643E', bg: 'rgba(217,142,99,0.18)' },
  '완료':     { c: 'var(--muted)', bg: 'var(--track)' },
}

function Chip({ label, active, onClick }) {
  const base = { padding: '7px 15px', borderRadius: 999, fontSize: 13, cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all .15s', fontFamily: 'inherit' }
  const on  = { ...base, fontWeight: 700, border: '1px solid var(--ink)', background: 'var(--ink)', color: 'var(--bg)' }
  const off = { ...base, fontWeight: 500, border: '1px solid var(--line)', background: 'var(--card)', color: 'var(--muted)' }
  return <div style={active ? on : off} onClick={onClick}>{label}</div>
}

export default function MyPage({ liked }) {
  const [myTab, setMyTab] = useState('전체')

  const byId = id => PROJECTS.find(p => p.id === id)

  let my = MY_DONATIONS
  if (myTab === '진행 중') my = my.filter(m => m.status !== '완료')
  else if (myTab === '완료') my = my.filter(m => m.status === '완료')

  const myList = my.map(m => {
    const p = decorateProject(byId(m.pid), liked)
    const sc = STATUS_COLOR[m.status] || STATUS_COLOR['진행 중']
    return { ...p, status: m.status, tier: m.tier, date: m.date, amountStr: won(m.amount), sc }
  })

  const totalAmt   = MY_DONATIONS.reduce((a, m) => a + m.amount, 0)
  const myStats = {
    total:    won(totalAmt),
    projects: MY_DONATIONS.length + '',
    artists:  new Set(MY_DONATIONS.map(m => byId(m.pid).artist)).size + '',
    rewards:  MY_DONATIONS.filter(m => m.status !== '완료').length + '',
  }

  return (
    <div className="theo-fade" style={{ maxWidth: 1100, margin: '0 auto', width: '100%' }}>
      <section style={{ padding: '60px 48px 36px', display: 'flex', alignItems: 'center', gap: 22 }}>
        <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'linear-gradient(145deg,var(--accent),color-mix(in srgb,var(--accent) 50%, #000))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 28, fontWeight: 800, flexShrink: 0 }}>김</div>
        <div>
          <div style={{ fontSize: 13, color: 'var(--accent)', fontWeight: 700, marginBottom: 4 }}>골드 후원자 · 2024년부터 함께</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: 'var(--ink)', letterSpacing: '-0.8px', margin: 0 }}>안녕하세요, 김후원님</h1>
        </div>
      </section>

      <section style={{ padding: '0 48px 40px', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 18 }}>
        <div style={{ background: 'var(--ink)', borderRadius: 16, padding: '24px 22px' }}>
          <div style={{ fontSize: 13, color: 'color-mix(in srgb,var(--bg) 65%, transparent)', marginBottom: 10 }}>총 후원액</div>
          <div style={{ fontSize: 30, fontWeight: 800, color: 'var(--bg)', letterSpacing: '-0.8px' }}>{myStats.total}</div>
        </div>
        {[['후원 프로젝트', myStats.projects], ['함께한 작가', myStats.artists]].map(([l, v]) => (
          <div key={l} style={{ background: 'var(--card)', border: '1px solid var(--line)', borderRadius: 16, padding: '24px 22px' }}>
            <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 10 }}>{l}</div>
            <div style={{ fontSize: 30, fontWeight: 800, color: 'var(--ink)', letterSpacing: '-0.8px' }}>{v}</div>
          </div>
        ))}
        <div style={{ background: 'var(--card)', border: '1px solid var(--line)', borderRadius: 16, padding: '24px 22px' }}>
          <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 10 }}>받을 리워드</div>
          <div style={{ fontSize: 30, fontWeight: 800, color: 'var(--accent)', letterSpacing: '-0.8px' }}>{myStats.rewards}</div>
        </div>
      </section>

      <section style={{ padding: '0 48px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 22, flexWrap: 'wrap', gap: 14 }}>
          <h2 style={{ fontSize: 24, fontWeight: 800, color: 'var(--ink)', letterSpacing: '-0.6px', margin: 0 }}>후원한 프로젝트</h2>
          <div style={{ display: 'flex', gap: 8 }}>
            {['전체', '진행 중', '완료'].map(t => <Chip key={t} label={t} active={t === myTab} onClick={() => setMyTab(t)} />)}
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {myList.map(m => (
            <div key={m.id + m.tier} style={{ background: 'var(--card)', border: '1px solid var(--line)', borderRadius: 16, padding: 16, display: 'grid', gridTemplateColumns: '96px 1fr auto', gap: 20, alignItems: 'center' }}>
              <div style={{ position: 'relative', width: 96, height: 96, borderRadius: 11, overflow: 'hidden', background: m.grad, flexShrink: 0 }}>
                <img src={m.imgUrl} alt="" crossOrigin="anonymous" loading="lazy" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 5 }}>
                  <span style={{ fontSize: 11.5, fontWeight: 700, padding: '3px 10px', borderRadius: 999, whiteSpace: 'nowrap', color: m.sc.c, background: m.sc.bg }}>{m.status}</span>
                  <span style={{ fontSize: 12.5, color: 'var(--muted2)' }}>{m.medium} · {m.artist}</span>
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--ink)', margin: '0 0 10px', letterSpacing: '-0.3px' }}>{m.title}</h3>
                <div style={{ height: 5, background: 'var(--track)', borderRadius: 99, overflow: 'hidden', maxWidth: 340, marginBottom: 7 }}>
                  <div style={{ width: m.barW, height: '100%', borderRadius: 99, background: 'var(--accent)' }} />
                </div>
                <div style={{ fontSize: 12.5, color: 'var(--muted)' }}>
                  <span style={{ color: 'var(--accent)', fontWeight: 700 }}>{m.pctStr}</span> 달성 · 리워드 · {m.tier}
                </div>
              </div>
              <div style={{ textAlign: 'right', paddingRight: 8 }}>
                <div style={{ fontSize: 19, fontWeight: 800, color: 'var(--ink)' }}>{m.amountStr}</div>
                <div style={{ fontSize: 12, color: 'var(--muted2)', marginTop: 4 }}>{m.date} 후원</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: '48px 48px 96px' }}>
        <h2 style={{ fontSize: 24, fontWeight: 800, color: 'var(--ink)', letterSpacing: '-0.6px', margin: '0 0 24px' }}>최근 활동</h2>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {TIMELINE.map((e, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '104px 1fr', gap: 22, padding: '0 0 4px' }}>
              <div style={{ fontSize: 13, color: 'var(--muted2)', paddingTop: 1, textAlign: 'right' }}>{e.date}</div>
              <div style={{ position: 'relative', padding: '0 0 26px 26px', borderLeft: '1.5px solid var(--line)' }}>
                <span style={{ position: 'absolute', left: -6.5, top: 3, width: 11, height: 11, borderRadius: '50%', background: 'var(--accent)', border: '2.5px solid var(--bg)' }} />
                <div style={{ fontSize: 14.5, color: 'var(--ink)', lineHeight: 1.6 }}>{e.text}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
