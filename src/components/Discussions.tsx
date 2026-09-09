import React, { useState } from "react";
import { Thread, CategoryType, CommentType, Comment } from "../types";
import { MessageSquare, ThumbsUp, Calendar, Tag, ChevronRight, Pin, Landmark, AlertCircle, FileText, PlusCircle } from "lucide-react";

interface DiscussionsProps {
  threads: Thread[];
  setThreads: React.Dispatch<React.SetStateAction<Thread[]>>;
}

export default function Discussions({ threads, setThreads }: DiscussionsProps) {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | "All">("All");
  const [selectedThreadId, setSelectedThreadId] = useState<string | null>(null);
  
  // Form states for new thread
  const [showNewThreadForm, setShowNewThreadForm] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState<CategoryType>("Knowledge");
  const [newAuthor, setNewAuthor] = useState("");
  const [newRole, setNewRole] = useState("Local Resident");
  const [newContent, setNewContent] = useState("");

  // Form states for new comment
  const [commentAuthor, setCommentAuthor] = useState("");
  const [commentRole, setCommentRole] = useState("Local Resident");
  const [commentType, setCommentType] = useState<CommentType>("citizen_perspective");
  const [commentContent, setCommentContent] = useState("");
  const [commentCitationTitle, setCommentCitationTitle] = useState("");
  const [commentCitationUrl, setCommentCitationUrl] = useState("");

  const categories: (CategoryType | "All")[] = [
    "All",
    "Knowledge",
    "Wellbeing",
    "Innovation",
    "Transit & Infrastructure",
    "Land & Environment"
  ];

  const commentTypes: { value: CommentType; label: string; color: string; desc: string }[] = [
    { value: "seeking_verification", label: "Seeking Verification", color: "bg-amber-100 text-amber-800 border-amber-200 text-xs", desc: "Flagging a local rumor or claim that needs checking." },
    { value: "adding_evidence", label: "Adding Local Evidence", color: "bg-emerald-100 text-emerald-800 border-emerald-200 text-xs", desc: "Providing a gazette, news, map, or documentation link." },
    { value: "citizen_perspective", label: "Citizen Perspective", color: "bg-slate-100 text-slate-800 border-slate-200 text-xs", desc: "Sharing personal concerns, opinions, or lived experience." },
    { value: "planner_update", label: "Planner/Official Update", color: "bg-blue-100 text-blue-800 border-blue-200 text-xs", desc: "Official response or announcement from a KWIN project liaison." }
  ];

  // Filters threads
  const filteredThreads = selectedCategory === "All"
    ? threads
    : threads.filter((t) => t.category === selectedCategory);

  // Sorted: Pinned first, then by upvotes desc
  const sortedThreads = [...filteredThreads].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return b.upvotes - a.upvotes;
  });

  const activeThread = threads.find((t) => t.id === selectedThreadId);

  // Handle Thread Upvote
  const handleThreadUpvote = (threadId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setThreads(prev => prev.map(t => {
      if (t.id === threadId) {
        return { ...t, upvotes: t.upvotes + 1 };
      }
      return t;
    }));
  };

  // Handle Comment Upvote
  const handleCommentUpvote = (commentId: string) => {
    if (!selectedThreadId) return;
    setThreads(prev => prev.map(t => {
      if (t.id === selectedThreadId) {
        return {
          ...t,
          comments: t.comments.map(c => c.id === commentId ? { ...c, upvotes: c.upvotes + 1 } : c)
        };
      }
      return t;
    }));
  };

  // Submit New Thread
  const handleCreateThread = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newAuthor.trim() || !newContent.trim()) return;

    const newThread: Thread = {
      id: `thread-${Date.now()}`,
      title: newTitle,
      category: newCategory,
      author: newAuthor,
      role: newRole,
      content: newContent,
      createdAt: new Date().toISOString(),
      upvotes: 1,
      evidenceScore: 1,
      comments: []
    };

    setThreads(prev => [newThread, ...prev]);
    
    // Reset
    setNewTitle("");
    setNewAuthor("");
    setNewContent("");
    setShowNewThreadForm(false);
    setSelectedThreadId(newThread.id);
  };

  // Submit Comment
  const handleCreateComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedThreadId || !commentAuthor.trim() || !commentContent.trim()) return;

    const hasCitation = commentCitationTitle.trim() !== "";

    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      author: commentAuthor,
      role: commentRole,
      type: commentType,
      content: commentContent,
      createdAt: new Date().toISOString(),
      upvotes: 0,
      ...(hasCitation && {
        citationTitle: commentCitationTitle,
        citationUrl: commentCitationUrl || "#"
      })
    };

    setThreads(prev => prev.map(t => {
      if (t.id === selectedThreadId) {
        // Boost evidence score if comment includes a citation and is not self-perspective
        const isEvidentiary = commentType === "adding_evidence" || commentType === "planner_update";
        const scoreBoost = isEvidentiary && hasCitation ? 1 : 0;
        return {
          ...t,
          evidenceScore: Math.min(5, t.evidenceScore + scoreBoost),
          comments: [...t.comments, newComment]
        };
      }
      return t;
    }));

    // Reset
    setCommentAuthor("");
    setCommentContent("");
    setCommentCitationTitle("");
    setCommentCitationUrl("");
  };

  const getCategoryColor = (cat: CategoryType) => {
    switch (cat) {
      case "Knowledge": return "text-indigo-600 bg-indigo-50 border-indigo-100";
      case "Wellbeing": return "text-emerald-600 bg-emerald-50 border-emerald-100";
      case "Innovation": return "text-purple-600 bg-purple-50 border-purple-100";
      case "Transit & Infrastructure": return "text-amber-600 bg-amber-50 border-amber-100";
      case "Land & Environment": return "text-teal-600 bg-teal-50 border-teal-100";
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="discussions-container">
      {/* Sidebar: Categories & Thread List */}
      <div className="lg:col-span-5 flex flex-col gap-4">
        {/* Category Pill Filters */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <h2 className="text-sm font-semibold text-slate-800 mb-3 flex items-center gap-1.5">
            <Tag className="w-4 h-4 text-slate-500" />
            Filter by Corridor Focus
          </h2>
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                id={`cat-${cat.replace(/\s+/g, "-")}`}
                onClick={() => {
                  setSelectedCategory(cat);
                  setSelectedThreadId(null); // Clear selected thread when filtering
                }}
                className={`text-[11px] font-medium px-2.5 py-1 rounded-full border transition-all ${
                  selectedCategory === cat
                    ? "bg-slate-900 text-white border-slate-900"
                    : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Create Thread Toggle Button */}
        {!showNewThreadForm ? (
          <button
            id="btn-new-thread"
            onClick={() => setShowNewThreadForm(true)}
            className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs px-4 py-2.5 rounded-xl transition-all shadow-sm shadow-emerald-700/10 cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            Raise a New Civic Inquiry / Thread
          </button>
        ) : (
          <form onSubmit={handleCreateThread} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="text-xs font-bold text-slate-800">Draft New Inquiry</h3>
              <button
                type="button"
                onClick={() => setShowNewThreadForm(false)}
                className="text-[11px] text-slate-500 hover:text-slate-800 cursor-pointer"
              >
                Cancel
              </button>
            </div>

            <div>
              <label className="block text-[10px] font-medium text-slate-500 mb-1">Inquiry Title / core Question</label>
              <input
                type="text"
                required
                placeholder="e.g. Compensation rates for Sector 3 farmland holders"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs focus:outline-none focus:border-emerald-600"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[10px] font-medium text-slate-500 mb-1">Focus Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as CategoryType)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-1.5 text-xs focus:outline-none focus:border-emerald-600"
                >
                  {categories.filter(c => c !== "All").map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-medium text-slate-500 mb-1">Your Name / Handle</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Gowda"
                  value={newAuthor}
                  onChange={(e) => setNewAuthor(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-1.5 text-xs focus:outline-none focus:border-emerald-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-1">
              <div>
                <label className="block text-[10px] font-medium text-slate-500 mb-1">Your Role in the Corridor</label>
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-1.5 text-xs focus:outline-none focus:border-emerald-600"
                >
                  <option value="Local Resident">Local Resident (Doddaballapur/Dabaspet)</option>
                  <option value="Landowner / Farmer">Landowner / Farmer</option>
                  <option value="Prospective Homebuyer">Prospective Homebuyer / Resident</option>
                  <option value="Technology & Startup Investor">Technology & Startup Investor</option>
                  <option value="Academic researcher">Academic Researcher / Scientist</option>
                  <option value="Civic activist">Civic Activist / NGO</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-medium text-slate-500 mb-1">Context / Detailed Details</label>
              <textarea
                required
                rows={3}
                placeholder="Share the facts you want verified, local rumors, or direct insights..."
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs focus:outline-none focus:border-emerald-600 resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold py-2 rounded-lg cursor-pointer"
            >
              Publish Inquiry to Discourse Board
            </button>
          </form>
        )}

        {/* Thread List */}
        <div className="flex flex-col gap-2.5 overflow-y-auto max-h-[500px] pr-1">
          {sortedThreads.length === 0 ? (
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 text-center">
              <AlertCircle className="w-6 h-6 text-slate-400 mx-auto mb-2" />
              <p className="text-xs text-slate-500">No threads in this corridor focus yet.</p>
            </div>
          ) : (
            sortedThreads.map((thread) => {
              const isSelected = thread.id === selectedThreadId;
              return (
                <div
                  key={thread.id}
                  id={`thread-card-${thread.id}`}
                  onClick={() => setSelectedThreadId(thread.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? "bg-slate-50 border-emerald-500 shadow-sm"
                      : "bg-white border-slate-200 hover:border-slate-300 hover:shadow-xs"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${getCategoryColor(thread.category)}`}>
                      {thread.category}
                    </span>
                    {thread.isPinned && (
                      <span className="flex items-center gap-0.5 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-md">
                        <Pin className="w-3 h-3 text-emerald-600 fill-emerald-600" />
                        Pinned
                      </span>
                    )}
                  </div>

                  <h3 className="text-xs font-bold text-slate-900 leading-snug hover:text-emerald-700 mb-2">
                    {thread.title}
                  </h3>

                  <div className="flex items-center justify-between text-[10px] text-slate-500 mt-3 border-t border-slate-50 pt-2">
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold text-slate-700">{thread.author}</span>
                      <span className="text-slate-300">|</span>
                      <span>{thread.role}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-1 text-[10px]">
                    <div className="flex items-center gap-3 text-slate-500">
                      <button
                        onClick={(e) => handleThreadUpvote(thread.id, e)}
                        className="flex items-center gap-1 hover:text-emerald-600 transition-colors cursor-pointer"
                      >
                        <ThumbsUp className="w-3 h-3" />
                        <span>{thread.upvotes}</span>
                      </button>
                      <span className="flex items-center gap-1">
                        <MessageSquare className="w-3 h-3" />
                        <span>{thread.comments.length}</span>
                      </span>
                    </div>
                    <div className="flex items-center gap-1 bg-slate-50 border border-slate-150 px-1.5 py-0.5 rounded-md">
                      <span className="text-slate-400 font-medium">Evidence Score:</span>
                      <span className="text-emerald-600 font-bold">{thread.evidenceScore}/5</span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Main Panel: Active Thread Details & Interactive Comments */}
      <div className="lg:col-span-7">
        {activeThread ? (
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full" id="active-thread-panel">
            {/* Thread Header */}
            <div className="bg-slate-50 p-5 border-b border-slate-200">
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${getCategoryColor(activeThread.category)}`}>
                  {activeThread.category}
                </span>
                <span className="text-[10px] text-slate-400 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {new Date(activeThread.createdAt).toLocaleDateString()}
                </span>
              </div>
              <h2 className="text-sm font-bold text-slate-900 leading-snug">
                {activeThread.title}
              </h2>
              <div className="flex items-center gap-2 mt-3 text-xs">
                <div className="bg-slate-200 w-6 h-6 rounded-full flex items-center justify-center font-bold text-[10px] text-slate-600">
                  {activeThread.author.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-slate-800 text-[11px]">{activeThread.author}</div>
                  <div className="text-[10px] text-slate-500">{activeThread.role}</div>
                </div>
              </div>
            </div>

            {/* Thread Content */}
            <div className="p-5 border-b border-slate-100 bg-white">
              <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-wrap">
                {activeThread.content}
              </p>
              <div className="flex items-center gap-3 mt-4">
                <button
                  onClick={(e) => handleThreadUpvote(activeThread.id, e)}
                  className="flex items-center gap-1.5 text-xs text-slate-600 hover:text-emerald-600 transition-all font-medium bg-slate-50 hover:bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-lg cursor-pointer"
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>Support inquiry ({activeThread.upvotes})</span>
                </button>
              </div>
            </div>

            {/* Comments Stream */}
            <div className="p-5 bg-slate-50/50 flex-1 flex flex-col gap-4 max-h-[300px] overflow-y-auto border-b border-slate-100">
              <h3 className="text-xs font-bold text-slate-800 flex items-center gap-1">
                <MessageSquare className="w-3.5 h-3.5 text-slate-500" />
                Evidence & Responses ({activeThread.comments.length})
              </h3>

              {activeThread.comments.length === 0 ? (
                <p className="text-xs text-slate-400 italic text-center py-4">No comments or evidence linked to this inquiry yet. Be the first to add evidence!</p>
              ) : (
                activeThread.comments.map((comment) => {
                  const typeObj = commentTypes.find(t => t.value === comment.type) || commentTypes[2];
                  return (
                    <div key={comment.id} className="bg-white p-3.5 rounded-xl border border-slate-150 shadow-2xs flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-800 text-[11px]">{comment.author}</span>
                          <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.2 rounded-md">
                            {comment.role}
                          </span>
                        </div>
                        <span className={`px-2 py-0.5 rounded-md font-semibold border ${typeObj.color}`}>
                          {typeObj.label}
                        </span>
                      </div>

                      <p className="text-[11px] text-slate-600 leading-relaxed">
                        {comment.content}
                      </p>

                      {/* Display citation if present */}
                      {comment.citationTitle && (
                        <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100 flex items-start gap-2 mt-1">
                          <FileText className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <div>
                            <div className="text-[10px] font-bold text-slate-700">Supporting Evidence Citable:</div>
                            <a
                              href={comment.citationUrl}
                              target="_blank"
                              referrerPolicy="no-referrer"
                              className="text-[10px] text-emerald-600 font-semibold hover:underline flex items-center gap-0.5"
                            >
                              {comment.citationTitle}
                              <ChevronRight className="w-2.5 h-2.5" />
                            </a>
                          </div>
                        </div>
                      )}

                      <div className="flex justify-between items-center text-[10px] text-slate-400 mt-1 border-t border-slate-50 pt-2">
                        <span>{new Date(comment.createdAt).toLocaleDateString()}</span>
                        <button
                          onClick={() => handleCommentUpvote(comment.id)}
                          className="flex items-center gap-1 hover:text-emerald-600 transition-all font-medium cursor-pointer"
                        >
                          <ThumbsUp className="w-3 h-3" />
                          <span>({comment.upvotes}) Helpful</span>
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Add Comment Form (Tethered to Verification Criteria) */}
            <form onSubmit={handleCreateComment} className="p-5 bg-white border-t border-slate-100 flex flex-col gap-3">
              <h4 className="text-xs font-bold text-slate-800">Submit Perspective or Evidence</h4>

              {/* Tagging comment types strictly forces structured discourse */}
              <div>
                <label className="block text-[10px] font-medium text-slate-500 mb-1">Discourse Tag</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-1.5">
                  {commentTypes.map((t) => (
                    <button
                      key={t.value}
                      type="button"
                      onClick={() => setCommentType(t.value)}
                      title={t.desc}
                      className={`text-[10px] py-1.5 px-2 rounded-lg border font-medium text-center transition-all cursor-pointer ${
                        commentType === t.value
                          ? "bg-emerald-600 text-white border-emerald-600"
                          : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[10px] font-medium text-slate-500 mb-1">Your Name / Alias</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Anand Gowda"
                    value={commentAuthor}
                    onChange={(e) => setCommentAuthor(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs focus:outline-none focus:border-emerald-600"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-medium text-slate-500 mb-1">Your Stakeholder Role</label>
                  <select
                    value={commentRole}
                    onChange={(e) => setCommentRole(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs focus:outline-none focus:border-emerald-600"
                  >
                    <option value="Local Resident">Local Resident</option>
                    <option value="Farmer / Landowner">Farmer / Landowner</option>
                    <option value="Academic Researcher">Academic Researcher</option>
                    <option value="Biotech/Tech Employee">Biotech/Tech Employee</option>
                    <option value="Venture Investor">Venture Investor</option>
                    <option value="Planner Liaison">Planning Liaison</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-medium text-slate-500 mb-1">Comment / Evidence Detail</label>
                <textarea
                  required
                  rows={2}
                  placeholder="Support your claims with specifics. Add links or names of reports in the fields below if attaching official records..."
                  value={commentContent}
                  onChange={(e) => setCommentContent(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs focus:outline-none focus:border-emerald-600 resize-none"
                />
              </div>

              {/* Citation attachment (Uniquely promotes evidence-first reporting) */}
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 flex flex-col gap-2">
                <div className="text-[10px] font-bold text-slate-700 flex items-center gap-1">
                  <Landmark className="w-3 h-3 text-slate-500" />
                  Attach Citable Source (Optional, raises thread Trust Rating)
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Source Title (e.g. KIADB Notification Gaz. 41)"
                    value={commentCitationTitle}
                    onChange={(e) => setCommentCitationTitle(e.target.value)}
                    className="bg-white border border-slate-200 rounded-md p-1.5 text-[10px] focus:outline-none focus:border-emerald-600"
                  />
                  <input
                    type="url"
                    placeholder="Verification Link (e.g. https://kiadb.in/...)"
                    value={commentCitationUrl}
                    onChange={(e) => setCommentCitationUrl(e.target.value)}
                    className="bg-white border border-slate-200 rounded-md p-1.5 text-[10px] focus:outline-none focus:border-emerald-600"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold py-2 rounded-lg cursor-pointer"
              >
                Publish Statement
              </button>
            </form>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-12 text-center flex flex-col items-center justify-center h-full">
            <MessageSquare className="w-12 h-12 text-slate-300 mb-4" />
            <h3 className="text-sm font-bold text-slate-800">No Thread Selected</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm">
              Select an active civic inquiry from the list on the left to read context details, view attached source evidence, and add your local feedback.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
