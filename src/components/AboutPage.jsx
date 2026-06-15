import React from 'react'

const steps = [
  { no: '01', title: '발견', desc: '회화·조각·사진, 마음이 가는 작업을 둘러보고 작가의 이야기를 만납니다.' },
  { no: '02', title: '후원', desc: '원하는 만큼 후원하고, 리워드를 선택합니다. 모든 후원은 투명하게 공개됩니다.' },
  { no: '03', title: '보답', desc: '작업이 완성되면 작품과 리워드로 돌아옵니다. 그 여정의 일부가 됩니다.' },
]

const values = [
  { title: '투명한 후원', desc: '모든 후원금의 사용처와 작업 진행 상황을 후원자에게 투명하게 공유합니다.' },
  { title: '작가 중심', desc: '수수료를 최소화하고, 작가가 작업에만 집중할 수 있는 환경을 만듭니다.' },
  { title: '지속가능한 예술', desc: '일회성 거래가 아니라, 작가의 다음 작업으로 이어지는 관계를 지향합니다.' },
]

const StepIcon = ({ no }) => {
  if (no === '01') return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></svg>
  if (no === '02') return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21s-7.5-4.6-10-9.3C.5 8.4 2.1 5 5.5 5 8 5 9.5 6.8 12 9.5 14.5 6.8 16 5 18.5 5 21.9 5 23.5 8.4 22 11.7 19.5 16.4 12 21 12 21z" /></svg>
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="8" width="18" height="13" rx="2" /><path d="M3 12h18M12 8v13M12 8S9 3 6.5 4.5 8 8 12 8zM12 8s3-5 5.5-3.5S16 8 12 8z" /></svg>
}

export default function AboutPage({ onStart }) {
  return (
    <div className="theo-fade">
      <section style={{ maxWidth: 1240, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 0.92fr', gap: 56, alignItems: 'center', padding: '76px 48px 64px' }}>
        <div>
          <div style={{ fontFamily: "'Newsreader', serif", fontStyle: 'italic', fontSize: 21, color: 'var(--accent)', marginBottom: 16 }}>About Theo</div>
          <h1 style={{ fontSize: 50, lineHeight: 1.14, color: 'var(--ink)', fontWeight: 800, letterSpacing: '-1.8px', margin: '0 0 22px' }}>예술이 시작되는<br />순간을 함께 만듭니다</h1>
          <p style={{ fontSize: 17, color: 'var(--muted)', lineHeight: 1.8, margin: '0 0 18px' }}>Theo는 작가와 후원자를 잇는 시각예술 후원 플랫폼입니다. 우리는 한 점의 작품이 세상에 나오기까지 필요한 시간과 비용을, 그 가치를 알아보는 사람들의 마음으로 채웁니다.</p>
          <p style={{ fontSize: 17, color: 'var(--muted)', lineHeight: 1.8, margin: 0 }}>완성된 결과물이 아니라, <b style={{ color: 'var(--ink)' }}>만들어지는 과정</b>에 투자하는 것. 그것이 Theo가 예술을 대하는 방식입니다.</p>
        </div>
        <div style={{ position: 'relative', aspectRatio: '4/5', borderRadius: 20, overflow: 'hidden', background: 'linear-gradient(145deg,#E9C46A,#D98E63)' }}>
          <img src="https://picsum.photos/seed/theo-about/800/1000" alt="" crossOrigin="anonymous" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      </section>

      <section style={{ background: 'color-mix(in srgb, var(--accent) 9%, var(--bg))', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', padding: '56px 48px', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 24 }}>
          {[['₩4.2억', '누적 후원액'], ['320+', '후원받은 작가'], ['1,100+', '완성된 작품'], ['28,000+', '함께한 후원자']].map(([v, l]) => (
            <div key={l}>
              <div style={{ fontSize: 40, fontWeight: 800, color: 'var(--ink)', letterSpacing: '-1px' }}>{v}</div>
              <div style={{ fontSize: 14, color: 'var(--muted)', marginTop: 6 }}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ maxWidth: 1240, margin: '0 auto', padding: '80px 48px 24px' }}>
        <div style={{ fontFamily: "'Newsreader', serif", fontStyle: 'italic', fontSize: 20, color: 'var(--accent)', marginBottom: 12 }}>How it works</div>
        <h2 style={{ fontSize: 34, fontWeight: 800, color: 'var(--ink)', letterSpacing: '-1px', margin: '0 0 48px' }}>후원은 이렇게 이어집니다</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 28 }}>
          {steps.map(s => (
            <div key={s.no} style={{ background: 'var(--card)', border: '1px solid var(--line)', borderRadius: 18, padding: '34px 30px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 22 }}>
                <span style={{ width: 50, height: 50, borderRadius: 14, background: 'color-mix(in srgb, var(--accent) 14%, var(--card))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <StepIcon no={s.no} />
                </span>
                <span style={{ fontFamily: "'Newsreader', serif", fontStyle: 'italic', fontSize: 34, color: 'var(--line)' }}>{s.no}</span>
              </div>
              <h3 style={{ fontSize: 20, fontWeight: 800, color: 'var(--ink)', margin: '0 0 10px' }}>{s.title}</h3>
              <p style={{ fontSize: 14.5, color: 'var(--muted)', lineHeight: 1.7, margin: 0 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ maxWidth: 1240, margin: '0 auto', padding: '64px 48px 24px' }}>
        <h2 style={{ fontSize: 34, fontWeight: 800, color: 'var(--ink)', letterSpacing: '-1px', margin: '0 0 48px' }}>우리가 지키는 약속</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 28 }}>
          {values.map(v => (
            <div key={v.title} style={{ borderTop: '2px solid var(--accent)', paddingTop: 24 }}>
              <h3 style={{ fontSize: 21, fontWeight: 800, color: 'var(--ink)', margin: '0 0 12px', letterSpacing: '-0.4px' }}>{v.title}</h3>
              <p style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.75, margin: 0 }}>{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ maxWidth: 1240, margin: '0 auto', padding: '72px 48px 96px' }}>
        <div style={{ background: 'var(--ink)', borderRadius: 24, padding: '64px 56px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 28 }}>
          <div>
            <h2 style={{ fontSize: 34, fontWeight: 800, color: 'var(--bg)', letterSpacing: '-1px', margin: '0 0 12px' }}>지금, 첫 후원을 시작하세요</h2>
            <p style={{ fontSize: 16, color: 'color-mix(in srgb, var(--bg) 70%, transparent)', margin: 0, lineHeight: 1.7 }}>마음이 가는 작업을 찾고, 작가의 다음 한 걸음을 함께 만들어요.</p>
          </div>
          <button onClick={onStart} style={{ background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: 999, padding: '16px 34px', fontSize: 16, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap' }}>진행 중인 프로젝트 보기 →</button>
        </div>
      </section>
    </div>
  )
}
