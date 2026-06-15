export const PROJECTS = [
  { id: 1, title: '빛이 머무는 자리', artist: '윤서연', medium: '회화', goal: 8000000, raised: 6240000, supporters: 142, daysLeft: 12, c1: '#E9C46A', c2: '#D98E63', mh: 340, seed: 'theo-light-9', face: 'theo-face-1', location: '서울', works: 3, bio: '빛과 정물을 통해 사라지는 순간을 붙잡는 작업을 합니다.' },
  { id: 2, title: '흙의 기억', artist: '한도경', medium: '조각', goal: 12000000, raised: 4800000, supporters: 88, daysLeft: 21, c1: '#C8B6A6', c2: '#8A6E5A', mh: 260, seed: 'theo-clay-3', face: 'theo-face-2', location: '이천', works: 2, bio: '흙과 손의 관계에서 시간의 흔적을 빚어내는 도예가입니다.' },
  { id: 3, title: '도시의 결', artist: '무라이 린', medium: '사진', goal: 5000000, raised: 5300000, supporters: 210, daysLeft: 6, c1: '#B8C0CC', c2: '#5B6470', mh: 300, seed: 'theo-city-7', face: 'theo-face-3', location: '도쿄', works: 5, bio: '도시의 표정을 흑백 프레임에 담는 다큐멘터리 사진가.' },
  { id: 4, title: '푸른 시간', artist: '이로하', medium: '회화', goal: 10000000, raised: 2100000, supporters: 47, daysLeft: 30, c1: '#A8C0FF', c2: '#5B6CF0', mh: 360, seed: 'theo-blue-2', face: 'theo-face-4', location: '부산', works: 1, isNew: true, bio: '색의 겹을 쌓아 시간의 흐름을 그리는 추상 회화 작가.' },
  { id: 5, title: '바다의 호흡', artist: '정해든', medium: '사진', goal: 6500000, raised: 3900000, supporters: 121, daysLeft: 15, c1: '#9FC8D8', c2: '#4E8BA8', mh: 270, seed: 'theo-sea-5', face: 'theo-face-5', location: '제주', works: 4, bio: '자연의 호흡을 기다려 한 장면으로 응축하는 사진가입니다.' },
  { id: 6, title: '유리의 정원', artist: '오세린', medium: '조각', goal: 15000000, raised: 9750000, supporters: 176, daysLeft: 9, c1: '#CDE3D8', c2: '#7FB59B', mh: 320, seed: 'theo-glass-4', face: 'theo-face-6', location: '서울', works: 2, bio: '유리라는 투명한 물성으로 정원을 설치하는 작가.' },
  { id: 7, title: '여름의 잔상', artist: '강민하', medium: '회화', goal: 4000000, raised: 3560000, supporters: 98, daysLeft: 4, c1: '#F4C9C0', c2: '#E08D7B', mh: 250, seed: 'theo-summer-8', face: 'theo-face-7', location: '광주', works: 6, bio: '수채의 번짐으로 계절의 잔상을 기록하는 회화 작가.' },
  { id: 8, title: '골목의 낮', artist: '서지우', medium: '사진', goal: 7000000, raised: 1400000, supporters: 33, daysLeft: 27, c1: '#D9CFC4', c2: '#9A8F80', mh: 330, seed: 'theo-alley-1', face: 'theo-face-8', location: '서울', works: 1, isNew: true, bio: '필름 카메라로 도시의 낮과 골목을 수집하는 사진가.' },
  { id: 9, title: '바람의 형태', artist: '백하늘', medium: '조각', goal: 9000000, raised: 6300000, supporters: 154, daysLeft: 18, c1: '#C2C7CE', c2: '#7C8794', mh: 280, seed: 'theo-wind-6', face: 'theo-face-9', location: '강원', works: 3, bio: '금속을 깎아 보이지 않는 바람의 형태를 만드는 조각가.' },
]

export const MY_DONATIONS = [
  { pid: 6, amount: 120000, date: '2026.04.15', tier: '유리 오브제 (소)', status: '진행 중' },
  { pid: 1, amount: 50000,  date: '2026.05.28', tier: '스페셜 에디션 판화',  status: '진행 중' },
  { pid: 9, amount: 80000,  date: '2026.03.10', tier: '미니 조각 + 도록',    status: '완료' },
  { pid: 3, amount: 30000,  date: '2026.05.20', tier: '사진집 + 엽서',        status: '목표 달성' },
  { pid: 7, amount: 20000,  date: '2026.05.30', tier: '수채 엽서 세트',       status: '마감 임박' },
]

export const TIMELINE = [
  { date: '2026.05.30', text: "'여름의 잔상'에 ₩20,000을 후원했어요." },
  { date: '2026.05.28', text: "'빛이 머무는 자리'에 ₩50,000을 후원했어요." },
  { date: '2026.05.20', text: "'도시의 결'이 목표를 달성했어요 — 리워드가 준비되고 있습니다." },
  { date: '2026.04.15', text: "'유리의 정원'에 ₩120,000을 후원했어요." },
  { date: '2026.03.10', text: "'바람의 형태'의 작품과 리워드를 수령 완료했어요." },
]

export const CATEGORIES = ['전체', '회화', '조각', '사진']
export const SORTS = ['인기순', '마감임박순', '신규순', '달성률순']

export function won(n) {
  return '₩' + n.toLocaleString('ko-KR')
}

export function decorateProject(p, liked) {
  const isLiked = !!liked[p.id]
  const pct = Math.round(p.raised / p.goal * 100)
  const reached = pct >= 100
  let tag = null
  if (reached) tag = { t: '목표 달성', c: '#fff', bg: 'rgba(46,139,111,0.88)' }
  else if (p.daysLeft <= 7) tag = { t: '마감 임박', c: '#fff', bg: 'rgba(200,80,50,0.88)' }
  else if (p.isNew) tag = { t: '신규', c: '#fff', bg: 'rgba(60,60,70,0.78)' }

  return {
    ...p, pct, pctStr: pct + '%', reached, isLiked,
    raisedStr: won(p.raised),
    supStr: (p.supporters + (isLiked ? 1 : 0)).toLocaleString('ko-KR'),
    dLabel: 'D-' + p.daysLeft,
    imgUrl: `https://picsum.photos/seed/${p.seed}/800/600`,
    portraitUrl: `https://picsum.photos/seed/${p.face}/700/800`,
    tag, hasTag: !!tag,
    grad: `linear-gradient(145deg, ${p.c1} 0%, ${p.c2} 100%)`,
    barW: Math.min(100, pct) + '%',
  }
}
