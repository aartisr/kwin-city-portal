'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';
import { useI18n } from '@/lib/i18n/I18nProvider';
import { pickLocalizedValue } from '@/lib/i18n/messages';

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
  const l = (values: Parameters<typeof pickLocalizedValue<string>>[1]) => pickLocalizedValue(locale, values);
  const [posts, setPosts] = useState<DiscussionPost[]>([]);
  const [session, setSession] = useState<SessionUser | null>(null);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [replyDrafts, setReplyDrafts] = useState<Record<string, string>>({});
  const [status, setStatus] = useState('');
  const [busy, setBusy] = useState(false);
  const [csrf, setCsrf] = useState('');

  const t = {
    couldNotCreatePost: l({ en: 'Could not create post.', kn: 'ಪೋಸ್ಟ್ ರಚಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ.', hi: 'पोस्ट नहीं बन सकी।', ta: 'பதிவை உருவாக்க முடியவில்லை.' }),
    discussionPosted: l({ en: 'Discussion posted.', kn: 'ಚರ್ಚೆ ಪ್ರಕಟಿಸಲಾಗಿದೆ.', hi: 'चर्चा पोस्ट हो गई।', ta: 'விவாதம் வெளியிடப்பட்டது.' }),
    requestFailed: l({ en: 'Request failed. Please try again.', kn: 'ವಿನಂತಿ ವಿಫಲವಾಗಿದೆ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.', hi: 'अनुरोध विफल हुआ। कृपया फिर प्रयास करें।', ta: 'கோரிக்கை தோல்வியடைந்தது. மீண்டும் முயற்சிக்கவும்.' }),
    couldNotAddReply: l({ en: 'Could not add reply.', kn: 'ಪ್ರತ್ಯುತ್ತರ ಸೇರಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ.', hi: 'उत्तर जोड़ना संभव नहीं हुआ।', ta: 'பதில் சேர்க்க முடியவில்லை.' }),
  };

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
        setStatus(data.error || t.couldNotCreatePost);
        return;
      }

      if (data.post) {
        setPosts((prev) => [data.post as DiscussionPost, ...prev]);
      }
      setTitle('');
      setText('');
      setStatus(t.discussionPosted);
    } catch {
      setStatus(t.requestFailed);
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
      setStatus(data.error || t.couldNotAddReply);
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
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3">{l({ en: 'Community Discussion', kn: 'ಸಮುದಾಯ ಚರ್ಚೆ', hi: 'समुदाय चर्चा', ta: 'சமூக விவாதம்' })}</h1>
          <p className="text-blue-100 max-w-2xl">
            {l({ en: 'Open conversation board for stakeholders to discuss evidence, planning signals, and next research asks.', kn: 'ಸಾಕ್ಷ್ಯ, ಯೋಜನಾ ಸೂಚನೆಗಳು ಮತ್ತು ಮುಂದಿನ ಸಂಶೋಧನಾ ಪ್ರಶ್ನೆಗಳ ಬಗ್ಗೆ ಚರ್ಚಿಸಲು ತೆರೆಯಾದ ವೇದಿಕೆ.', hi: 'प्रमाण, योजना संकेत और आगे के शोध प्रश्नों पर चर्चा के लिए खुला मंच।', ta: 'ஆதாரங்கள், திட்டச் சுட்டுக்கள் மற்றும் அடுத்த ஆய்வு கேள்விகள் குறித்து விவாதிக்க திறந்த கலந்துரையாடல் தளம்.' })}
          </p>
        </div>
      </section>

      <section className="container py-10 grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-1 space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-xs font-bold tracking-widest uppercase text-slate-500 mb-2">{l({ en: 'Thread Stats', kn: 'ಥ್ರೆಡ್ ಅಂಕಿಅಂಶಗಳು', hi: 'थ्रेड आँकड़े', ta: 'திரை விவாத புள்ளிவிவரங்கள்' })}</p>
            <p className="text-sm text-slate-700">{l({ en: 'Posts', kn: 'ಪೋಸ್ಟ್‌ಗಳು', hi: 'पोस्ट्स', ta: 'பதிவுகள்' })}: {posts.length}</p>
            <p className="text-sm text-slate-700">{l({ en: 'Replies', kn: 'ಪ್ರತ್ಯುತ್ತರಗಳು', hi: 'उत्तर', ta: 'பதில்கள்' })}: {stats.totalReplies}</p>
            <p className="text-sm text-slate-700">{l({ en: 'Likes', kn: 'ಇಷ್ಟಗಳು', hi: 'पसंद', ta: 'விருப்பங்கள்' })}: {stats.totalLikes}</p>
          </div>

          <form onSubmit={createPost} className="rounded-2xl border border-slate-200 bg-white p-5 space-y-3">
            <h2 className="text-lg font-extrabold text-slate-900">{l({ en: 'Start a Discussion', kn: 'ಚರ್ಚೆಯನ್ನು ಆರಂಭಿಸಿ', hi: 'चर्चा शुरू करें', ta: 'ஒரு விவாதத்தை தொடங்கவும்' })}</h2>
            {session ? (
              <p className="text-sm text-slate-600">{l({ en: 'Posting as', kn: 'ಈ ಹೆಸರಿನಲ್ಲಿ ಪೋಸ್ಟ್ ಮಾಡಲಾಗುತ್ತಿದೆ', hi: 'इस नाम से पोस्ट किया जा रहा है', ta: 'இந்த பெயரில் பதிவிடப்படுகிறது' })} {session.name}</p>
            ) : (
              <p className="text-sm text-amber-700">{l({ en: 'Sign in at /account to post or reply.', kn: 'ಪೋಸ್ಟ್ ಅಥವಾ ಪ್ರತಿಕ್ರಿಯೆಗಾಗಿ /account ನಲ್ಲಿ ಸೈನ್ ಇನ್ ಮಾಡಿ.', hi: 'पोस्ट या उत्तर देने के लिए /account पर साइन इन करें।', ta: 'பதிவு செய்ய அல்லது பதிலளிக்க /account இல் உள்நுழைக.' })}</p>
            )}
            <div>
              <label className="block text-xs font-bold tracking-widest uppercase text-slate-500 mb-1">{l({ en: 'Title', kn: 'ಶೀರ್ಷಿಕೆ', hi: 'शीर्षक', ta: 'தலைப்பு' })}</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2"
                placeholder={l({ en: 'What should we discuss?', kn: 'ನಾವು ಯಾವ ವಿಷಯ ಚರ್ಚಿಸಬೇಕು?', hi: 'हमें किस विषय पर चर्चा करनी चाहिए?', ta: 'நாம் எந்த விஷயத்தை விவாதிப்பது?' })}
                disabled={!session || busy}
              />
            </div>
            <div>
              <label className="block text-xs font-bold tracking-widest uppercase text-slate-500 mb-1">{l({ en: 'Message', kn: 'ಸಂದೇಶ', hi: 'संदेश', ta: 'செய்தி' })}</label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={4}
                className="w-full rounded-lg border border-slate-300 px-3 py-2"
                placeholder={l({ en: 'Share context, evidence, and your question...', kn: 'ಪರಿಸ್ಥಿತಿ, ಸಾಕ್ಷ್ಯ ಮತ್ತು ನಿಮ್ಮ ಪ್ರಶ್ನೆಯನ್ನು ಹಂಚಿಕೊಳ್ಳಿ...', hi: 'संदर्भ, प्रमाण और अपना प्रश्न साझा करें...', ta: 'சூழல், ஆதாரம் மற்றும் உங்கள் கேள்வியை பகிரவும்...' })}
                disabled={!session || busy}
              />
            </div>
            <button
              type="submit"
              disabled={!session || busy}
              className="w-full rounded-lg bg-blue-600 text-white font-semibold px-4 py-2 hover:bg-blue-700 transition-colors disabled:opacity-60"
            >
              {l({ en: 'Post', kn: 'ಪೋಸ್ಟ್ ಮಾಡಿ', hi: 'पोस्ट करें', ta: 'பதிவிடு' })}
            </button>
          </form>
        </div>

        <div className="xl:col-span-2 space-y-4">
          {posts.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-slate-600">
              {l({ en: 'No discussions yet. Be the first to post.', kn: 'ಇನ್ನೂ ಚರ್ಚೆಗಳು ಇಲ್ಲ. ಮೊದಲ ಪೋಸ್ಟ್ ಮಾಡಿ.', hi: 'अभी कोई चर्चा नहीं है। पहली पोस्ट करें।', ta: 'இன்னும் விவாதங்கள் இல்லை. முதலில் நீங்கள் பதிவிடுங்கள்.' })}
            </div>
          ) : (
            posts.map((post) => (
              <article key={post.id} className="rounded-2xl border border-slate-200 bg-white p-5">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <h3 className="text-xl font-extrabold text-slate-900">{post.title}</h3>
                    <p className="text-sm text-slate-600">
                      {l({ en: 'By', kn: 'ಬರೆದವರು', hi: 'द्वारा', ta: 'எழுதியவர்' })} {post.author} {l({ en: 'on', kn: 'ರಂದು', hi: 'को', ta: 'தேதி' })} {new Date(post.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <button
                    onClick={() => likePost(post.id)}
                    className="px-3 py-1.5 rounded-lg border border-slate-300 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    {l({ en: 'Like', kn: 'ಇಷ್ಟ', hi: 'पसंद', ta: 'விருப்பு' })} ({post.likes})
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
                    placeholder={l({ en: 'Write a reply...', kn: 'ಪ್ರತ್ಯುತ್ತರ ಬರೆಯಿರಿ...', hi: 'उत्तर लिखें...', ta: 'ஒரு பதிலை எழுதுங்கள்...' })}
                    disabled={!session}
                  />
                  <button
                    onClick={() => addReply(post.id)}
                    disabled={!session}
                    className="px-3 py-2 rounded-lg bg-slate-900 text-white font-semibold hover:bg-slate-800 disabled:opacity-60"
                  >
                    {l({ en: 'Reply', kn: 'ಪ್ರತ್ಯುತ್ತರ', hi: 'उत्तर', ta: 'பதில்' })}
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
