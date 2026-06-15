import React, { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase.js'

function formatDate(iso) {
  const d = new Date(iso)
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`
}

function PostList({ posts, loading, onSelect, onNew }) {
  return (
    <div className="theo-fade" style={{ maxWidth: 860, margin: '0 auto', padding: '60px 48px 96px', width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 40 }}>
        <div>
          <div style={{ fontFamily: "'Newsreader', serif", fontStyle: 'italic', fontSize: 21, color: 'var(--accent)', marginBottom: 10 }}>Community</div>
          <h1 style={{ fontSize: 40, fontWeight: 800, color: 'var(--ink)', letterSpacing: '-1.2px', margin: 0 }}>게시판</h1>
        </div>
        <button
          onClick={onNew}
          style={{ background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: 999, padding: '12px 24px', fontSize: 14.5, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap' }}
        >글 쓰기</button>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--muted)', fontSize: 15 }}>불러오는 중...</div>
      ) : posts.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--muted2)', fontSize: 15 }}>아직 게시글이 없어요. 첫 글을 남겨보세요!</div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto auto', gap: '0 24px', padding: '10px 20px', fontSize: 12.5, fontWeight: 700, color: 'var(--muted2)', borderBottom: '2px solid var(--line)' }}>
            <span>제목</span><span>작성자</span><span>날짜</span>
          </div>
          {posts.map((p, i) => (
            <div
              key={p.id}
              onClick={() => onSelect(p)}
              style={{
                display: 'grid', gridTemplateColumns: '1fr auto auto', gap: '0 24px',
                padding: '18px 20px', cursor: 'pointer', transition: 'background .15s',
                borderBottom: '1px solid var(--line)',
                background: i % 2 === 0 ? 'transparent' : 'color-mix(in srgb, var(--ink) 2%, transparent)',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'color-mix(in srgb, var(--accent) 6%, var(--card))'}
              onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? 'transparent' : 'color-mix(in srgb, var(--ink) 2%, transparent)'}
            >
              <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--ink)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.title}</span>
              <span style={{ fontSize: 13, color: 'var(--muted2)', whiteSpace: 'nowrap' }}>{p.author}</span>
              <span style={{ fontSize: 13, color: 'var(--muted2)', whiteSpace: 'nowrap' }}>{formatDate(p.created_at)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function PostDetail({ post, onBack }) {
  return (
    <div className="theo-fade" style={{ maxWidth: 860, margin: '0 auto', padding: '60px 48px 96px', width: '100%' }}>
      <button
        onClick={onBack}
        style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', color: 'var(--muted)', fontSize: 14, cursor: 'pointer', fontFamily: 'inherit', marginBottom: 36, padding: 0 }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
        목록으로
      </button>

      <div style={{ borderBottom: '2px solid var(--line)', paddingBottom: 24, marginBottom: 32 }}>
        <h1 style={{ fontSize: 34, fontWeight: 800, color: 'var(--ink)', letterSpacing: '-1px', margin: '0 0 16px' }}>{post.title}</h1>
        <div style={{ display: 'flex', gap: 16, fontSize: 13.5, color: 'var(--muted2)' }}>
          <span style={{ fontWeight: 600, color: 'var(--muted)' }}>{post.author}</span>
          <span>{formatDate(post.created_at)}</span>
        </div>
      </div>

      <div style={{ fontSize: 16, color: 'var(--ink)', lineHeight: 1.85, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
        {post.content}
      </div>
    </div>
  )
}

function NewPostForm({ onSubmit, onCancel, saving }) {
  const [form, setForm] = useState({ title: '', content: '', author: '' })
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const inputStyle = {
    width: '100%', padding: '12px 16px', fontSize: 15, fontFamily: 'inherit',
    color: 'var(--ink)', background: 'var(--card)', border: '1px solid var(--line)',
    borderRadius: 12, outline: 'none', transition: 'border-color .15s',
  }

  return (
    <div className="theo-fade" style={{ maxWidth: 860, margin: '0 auto', padding: '60px 48px 96px', width: '100%' }}>
      <button
        onClick={onCancel}
        style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', color: 'var(--muted)', fontSize: 14, cursor: 'pointer', fontFamily: 'inherit', marginBottom: 36, padding: 0 }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
        취소
      </button>

      <div style={{ fontFamily: "'Newsreader', serif", fontStyle: 'italic', fontSize: 21, color: 'var(--accent)', marginBottom: 10 }}>Community</div>
      <h1 style={{ fontSize: 34, fontWeight: 800, color: 'var(--ink)', letterSpacing: '-1px', margin: '0 0 36px' }}>새 글 쓰기</h1>

      <form onSubmit={e => { e.preventDefault(); onSubmit(form) }} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        <div>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: 'var(--muted)', marginBottom: 8 }}>닉네임</label>
          <input
            style={inputStyle}
            placeholder="닉네임을 입력하세요"
            value={form.author}
            onChange={e => set('author', e.target.value)}
            required
            maxLength={30}
          />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: 'var(--muted)', marginBottom: 8 }}>제목</label>
          <input
            style={inputStyle}
            placeholder="제목을 입력하세요"
            value={form.title}
            onChange={e => set('title', e.target.value)}
            required
            maxLength={100}
          />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: 'var(--muted)', marginBottom: 8 }}>내용</label>
          <textarea
            style={{ ...inputStyle, minHeight: 220, resize: 'vertical' }}
            placeholder="내용을 입력하세요"
            value={form.content}
            onChange={e => set('content', e.target.value)}
            required
          />
        </div>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', marginTop: 8 }}>
          <button type="button" onClick={onCancel} style={{ padding: '12px 24px', borderRadius: 999, border: '1px solid var(--line)', background: 'var(--card)', color: 'var(--muted)', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>취소</button>
          <button type="submit" disabled={saving} style={{ padding: '12px 28px', borderRadius: 999, border: 'none', background: 'var(--accent)', color: '#fff', fontSize: 14, fontWeight: 700, cursor: saving ? 'not-allowed' : 'pointer', fontFamily: 'inherit', opacity: saving ? 0.7 : 1 }}>
            {saving ? '저장 중...' : '게시하기'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default function BoardPage() {
  const [view, setView] = useState('list')
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState(null)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)

  const fetchPosts = useCallback(async () => {
    setLoading(true)
    setError(null)
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) setError(error.message)
    else setPosts(data || [])
    setLoading(false)
  }, [])

  useEffect(() => { fetchPosts() }, [fetchPosts])

  const handleSubmit = async (form) => {
    setSaving(true)
    setError(null)
    const { error } = await supabase.from('posts').insert([{
      title:   form.title.trim(),
      content: form.content.trim(),
      author:  form.author.trim() || '익명',
    }])
    setSaving(false)
    if (error) {
      setError(error.message)
    } else {
      await fetchPosts()
      setView('list')
    }
  }

  const handleSelect = (post) => {
    setSelected(post)
    setView('detail')
    window.scrollTo(0, 0)
  }

  return (
    <div style={{ minHeight: '60vh' }}>
      {error && (
        <div style={{ background: '#fde8e8', color: '#b00020', padding: '12px 24px', fontSize: 13.5, borderBottom: '1px solid #f5c6cb', textAlign: 'center' }}>
          오류: {error}
        </div>
      )}
      {view === 'list'   && <PostList posts={posts} loading={loading} onSelect={handleSelect} onNew={() => setView('new')} />}
      {view === 'detail' && selected && <PostDetail post={selected} onBack={() => setView('list')} />}
      {view === 'new'    && <NewPostForm onSubmit={handleSubmit} onCancel={() => setView('list')} saving={saving} />}
    </div>
  )
}
