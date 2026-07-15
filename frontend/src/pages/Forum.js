import React, { useState, useEffect, useContext } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';

const Forum = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const courseId = searchParams.get('courseId');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', content: '', tags: '' });
  const [replyContent, setReplyContent] = useState({});
  const [expandedPost, setExpandedPost] = useState(null);

  useEffect(() => { fetchPosts(); }, [courseId]);

  const fetchPosts = async () => {
    try {
      const params = courseId ? { courseId } : {};
      const res = await axios.get('http://localhost:5000/api/forum', { params });
      setPosts(res.data.posts);
    } catch {
      toast.error('Failed to load forum');
    } finally {
      setLoading(false);
    }
  };

  const handlePost = async (e) => {
    e.preventDefault();
    if (!user) { navigate('/login'); return; }
    try {
      await axios.post('http://localhost:5000/api/forum', {
        ...form,
        courseId,
        authorName: user.name,
        tags: form.tags.split(',').map(t => t.trim()).filter(Boolean)
      });
      toast.success('Post created!');
      setForm({ title: '', content: '', tags: '' });
      setShowForm(false);
      fetchPosts();
    } catch {
      toast.error('Failed to create post');
    }
  };

  const handleReply = async (postId) => {
    if (!user) { navigate('/login'); return; }
    try {
      await axios.post(`http://localhost:5000/api/forum/${postId}/reply`, {
        content: replyContent[postId],
        authorName: user.name
      });
      setReplyContent(prev => ({ ...prev, [postId]: '' }));
      fetchPosts();
    } catch {
      toast.error('Failed to post reply');
    }
  };

  const handleUpvote = async (postId) => {
    if (!user) { navigate('/login'); return; }
    try {
      await axios.put(`http://localhost:5000/api/forum/${postId}/upvote`);
      fetchPosts();
    } catch {}
  };

  const handleResolve = async (postId) => {
    try {
      await axios.put(`http://localhost:5000/api/forum/${postId}/resolve`);
      fetchPosts();
    } catch {}
  };

  const roleColor = { instructor: 'bg-blue-100 text-blue-700', admin: 'bg-red-100 text-red-700', student: 'bg-gray-100 text-gray-600' };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">💬 Discussion Forum</h1>
            <p className="text-gray-600">Ask questions, share knowledge</p>
          </div>
          <button onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
            + New Post
          </button>
        </div>

        {/* New Post Form */}
        {showForm && (
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Create a Post</h2>
            <form onSubmit={handlePost} className="space-y-4">
              <input type="text" placeholder="Title" required value={form.title}
                onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500" />
              <textarea placeholder="Describe your question or topic..." required value={form.content}
                onChange={e => setForm(p => ({ ...p, content: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500" rows={4} />
              <input type="text" placeholder="Tags (comma separated, e.g. java, oop)" value={form.tags}
                onChange={e => setForm(p => ({ ...p, tags: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500" />
              <div className="flex gap-3">
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700">Post</button>
                <button type="button" onClick={() => setShowForm(false)} className="border border-gray-300 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-50">Cancel</button>
              </div>
            </form>
          </div>
        )}

        {/* Posts */}
        {loading ? (
          <div className="flex justify-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm">
            <div className="text-6xl mb-4">💬</div>
            <h3 className="text-xl font-medium text-gray-900">No posts yet</h3>
            <p className="text-gray-500 mt-2">Be the first to start a discussion!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map(post => (
              <div key={post._id} className={`bg-white rounded-xl shadow-sm overflow-hidden ${post.resolved ? 'border-l-4 border-green-500' : ''}`}>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-semibold text-gray-900">{post.authorName}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${roleColor[post.authorRole] || roleColor.student}`}>
                          {post.authorRole}
                        </span>
                        {post.resolved && <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">✅ Resolved</span>}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{post.title}</h3>
                      <p className="text-gray-600 text-sm">{post.content}</p>
                      {post.tags?.length > 0 && (
                        <div className="flex gap-1 mt-2">
                          {post.tags.map(tag => (
                            <span key={tag} className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">{tag}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
                    <button onClick={() => handleUpvote(post._id)} className="flex items-center gap-1 hover:text-blue-600 transition-colors">
                      👍 {post.upvotes?.length || 0}
                    </button>
                    <button onClick={() => setExpandedPost(expandedPost === post._id ? null : post._id)}
                      className="flex items-center gap-1 hover:text-blue-600 transition-colors">
                      💬 {post.replies?.length || 0} replies
                    </button>
                    {user?.id === post.authorId && !post.resolved && (
                      <button onClick={() => handleResolve(post._id)} className="hover:text-green-600 transition-colors">
                        Mark Resolved
                      </button>
                    )}
                    <span className="ml-auto">{new Date(post.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Replies */}
                {expandedPost === post._id && (
                  <div className="border-t border-gray-100 bg-gray-50 p-5">
                    {post.replies?.map((reply, i) => (
                      <div key={i} className="mb-4 last:mb-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-sm text-gray-900">{reply.authorName}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${roleColor[reply.authorRole] || roleColor.student}`}>
                            {reply.authorRole}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700 bg-white rounded-lg p-3 border border-gray-200">{reply.content}</p>
                      </div>
                    ))}
                    {user && (
                      <div className="flex gap-2 mt-4">
                        <input type="text" placeholder="Write a reply..."
                          value={replyContent[post._id] || ''}
                          onChange={e => setReplyContent(prev => ({ ...prev, [post._id]: e.target.value }))}
                          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500" />
                        <button onClick={() => handleReply(post._id)}
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700">
                          Reply
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Forum;
