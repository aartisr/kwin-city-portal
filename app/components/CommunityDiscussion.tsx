'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';
import { useI18n } from '@/lib/i18n/I18nProvider';

type SessionUser = {
  id: string;
  name: string;
  email: string;
};

type Reply = {
  id: string;
  author: string;
  text: string;
  createdAt: string;
};

type DiscussionPost = {
  id: string;
  author: string;
  title: string;
  text: string;
  likes: number;
  createdAt: string;
  replies: Reply[];
};

export default function CommunityDiscussion() {
  const { locale } = useI18n();
  const isKn = locale === 'kn';
  const isHi = locale === 'hi';
  const [posts, setPosts] = useState<DiscussionPost[]>([]);
  const [session, setSession] = useState<SessionUser | null>(null);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [replyDrafts, setReplyDrafts] = useState<Record<string, string>>({});
  const [status, setStatus] = useState('');
  const [busy, setBusy] = useState(false);
  const [csrf, setCsrf] = useState('');

  const loadSession = async () => {
    const res = await fetch('/api/auth/me', { cache: 'no-store' });
    if (!res.ok) {
      setSession(null);
      return;
    }
    const data = (await res.json()) as { user: SessionUser | null; csrf?: string };
    setSession(data.user);
    if (data.csrf) setCsrf(data.csrf);
  };

  const loadPosts = async () => {
    const res = await fetch('/api/community', { cache: 'no-store' });
    if (!res.ok) return;
    const data = (await res.json()) as { posts: DiscussionPost[] };
    setPosts(data.posts);
  };

  useEffect(() => {
    loadSession().catch(() => setSession(null));
    loadPosts().catch(() => setPosts([]));
  }, []);

  const createPost = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setStatus('');

    try {
      const res = await fetch('/api/community', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-csrf-token': csrf,
        },
        body: JSON.stringify({ title, text }),
      });
      const data = (await res.json()) as { error?: string; post?: DiscussionPost };
      if (!res.ok) {
        setStatus(data.error || 'Could not create post.');
        return;
      }

      if (data.post) {
        setPosts((prev) => [data.post as DiscussionPost, ...prev]);
      }
      setTitle('');
      setText('');
      setStatus('Discussion posted.');
    } catch {
      setStatus('Request failed. Please try again.');
    } finally {
      setBusy(false);
    }
  };

  const likePost = async (postId: string) => {
    const res = await fetch(`/api/community/${postId}/like`, {
      method: 'POST',
      headers: { 'x-csrf-token': csrf },
    });
    const data = (await res.json()) as { likes?: number };
    if (!res.ok || typeof data.likes !== 'number') return;

    setPosts((prev) => prev.map((p) => (p.id === postId ? { ...p, likes: data.likes as number } : p)));
  };

  const addReply = async (postId: string) => {
    const draft = (replyDrafts[postId] || '').trim();
    if (!draft) return;

    const res = await fetch(`/api/community/${postId}/reply`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-csrf-token': csrf,
      },
      body: JSON.stringify({ text: draft }),
    });
    const data = (await res.json()) as { error?: string; reply?: Reply };
    if (!res.ok || !data.reply) {
      setStatus(data.error || 'Could not add reply.');
      return;
    }

    setPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, replies: [...p.replies, data.reply as Reply] } : p))
    );
    setReplyDrafts((prev) => ({ ...prev, [postId]: '' }));
  };

  const stats = useMemo(() => {
    const totalReplies = posts.reduce((sum, p) => sum + p.replies.length, 0);
    const totalLikes = posts.reduce((sum, p) => sum + p.likes, 0);
    return { totalReplies, totalLikes };
  }, [posts]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-[#F7FAFC]">
      <section className="bg-gradient-to-r from-[#0F172A] to-[#1E3A8A] text-white py-14">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3">{isKn ? 'ಸಮುದಾಯ ಚರ್ಚೆ' : isHi ? 'समुदाय चर्चा' : 'Community Discussion'}</h1>
          <p className="text-blue-100 max-w-2xl">
            {isKn ? 'ಸಾಕ್ಷ್ಯ, ಯೋಜನಾ ಸೂಚನೆಗಳು ಮತ್ತು ಮುಂದಿನ ಸಂಶೋಧನಾ ಪ್ರಶ್ನೆಗಳ ಬಗ್ಗೆ ಚರ್ಚಿಸಲು ತೆರೆಯಾದ ವೇದಿಕೆ.' : isHi ? 'प्रमाण, योजना संकेत और आगे के शोध प्रश्नों पर चर्चा के लिए खुला मंच।' : 'Open conversation board for stakeholders to discuss evidence, planning signals, and next research asks.'}
          </p>
        </div>
      </section>

      <section className="container py-10 grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-1 space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-xs font-bold tracking-widest uppercase text-slate-500 mb-2">Thread Stats</p>
            <p className="text-sm text-slate-700">Posts: {posts.length}</p>
            <p className="text-sm text-slate-700">Replies: {stats.totalReplies}</p>
            <p className="text-sm text-slate-700">Likes: {stats.totalLikes}</p>
          </div>

          <form onSubmit={createPost} className="rounded-2xl border border-slate-200 bg-white p-5 space-y-3">
            <h2 className="text-lg font-extrabold text-slate-900">Start a Discussion</h2>
            {session ? (
              <p className="text-sm text-slate-600">Posting as {session.name}</p>
            ) : (
              <p className="text-sm text-amber-700">Sign in at /account to post or reply.</p>
            )}
            <div>
              <label className="block text-xs font-bold tracking-widest uppercase text-slate-500 mb-1">Title</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2"
                placeholder="What should we discuss?"
                disabled={!session || busy}
              />
            </div>
            <div>
              <label className="block text-xs font-bold tracking-widest uppercase text-slate-500 mb-1">Message</label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={4}
                className="w-full rounded-lg border border-slate-300 px-3 py-2"
                placeholder="Share context, evidence, and your question..."
                disabled={!session || busy}
              />
            </div>
            <button
              type="submit"
              disabled={!session || busy}
              className="w-full rounded-lg bg-blue-600 text-white font-semibold px-4 py-2 hover:bg-blue-700 transition-colors disabled:opacity-60"
            >
              Post
            </button>
          </form>
        </div>

        <div className="xl:col-span-2 space-y-4">
          {posts.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-slate-600">
              No discussions yet. Be the first to post.
            </div>
          ) : (
            posts.map((post) => (
              <article key={post.id} className="rounded-2xl border border-slate-200 bg-white p-5">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <h3 className="text-xl font-extrabold text-slate-900">{post.title}</h3>
                    <p className="text-sm text-slate-600">
                      By {post.author} on {new Date(post.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <button
                    onClick={() => likePost(post.id)}
                    className="px-3 py-1.5 rounded-lg border border-slate-300 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    Like ({post.likes})
                  </button>
                </div>
                <p className="text-slate-800 mb-4">{post.text}</p>

                <div className="space-y-2 mb-3">
                  {post.replies.map((reply) => (
                    <div key={reply.id} className="rounded-lg bg-slate-50 border border-slate-200 px-3 py-2">
                      <p className="text-sm text-slate-900">{reply.text}</p>
                      <p className="text-xs text-slate-500 mt-1">
                        {reply.author} · {new Date(reply.createdAt).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <input
                    value={replyDrafts[post.id] || ''}
                    onChange={(e) => setReplyDrafts((prev) => ({ ...prev, [post.id]: e.target.value }))}
                    className="flex-1 rounded-lg border border-slate-300 px-3 py-2"
                    placeholder="Write a reply..."
                    disabled={!session}
                  />
                  <button
                    onClick={() => addReply(post.id)}
                    disabled={!session}
                    className="px-3 py-2 rounded-lg bg-slate-900 text-white font-semibold hover:bg-slate-800 disabled:opacity-60"
                  >
                    Reply
                  </button>
                </div>
              </article>
            ))
          )}
        </div>
      </section>

      {status ? (
        <div className="container pb-10">
          <p className="rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-800">{status}</p>
        </div>
      ) : null}
    </main>
  );
}
