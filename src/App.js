import React, { useState, useEffect } from 'react';
import PostList from './components/PostList';
import CreatePost from './components/CreatePost';
import Header from './components/Header';
import './App.css';

function App() {
  const [posts, setPosts] = useState(() => {
    
    const savedPosts = localStorage.getItem('posts');
    return savedPosts ? JSON.parse(savedPosts) : [];
  });
  const [isCreating, setIsCreating] = useState(false);
  const [editingPostId, setEditingPostId] = useState(null);

  useEffect(() => {
    localStorage.setItem('posts', JSON.stringify(posts));
  }, [posts]);

  const addPost = (newPost) => {
    setPosts((prevPosts) => [
      ...prevPosts,
      {
        ...newPost,
        id: Date.now(),
        likes: 0,
        dislikes: 0,
        comments: [],
        liked: false,
        disliked: false,
      },
    ]);
    setIsCreating(false);
  };

  const updatePost = (updatedPost) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => (post.id === updatedPost.id ? updatedPost : post))
    );
    setEditingPostId(null);
  };

  const deletePost = (id) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
  };

  const likePost = (id) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === id) {
          if (post.liked) {
            return { ...post, likes: post.likes - 1, liked: false };
          } else {
            return {
              ...post,
              likes: post.likes + 1,
              liked: true,
              disliked: false,
              dislikes: post.disliked ? post.dislikes - 1 : post.dislikes,
            };
          }
        }
        return post;
      })
    );
  };

  const dislikePost = (id) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === id) {
          if (post.disliked) {
            return { ...post, dislikes: post.dislikes - 1, disliked: false };
          } else {
            return {
              ...post,
              dislikes: post.dislikes + 1,
              disliked: true,
              liked: false,
              likes: post.liked ? post.likes - 1 : post.likes,
            };
          }
        }
        return post;
      })
    );
  };

  const commentPost = (id, comment) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === id ? { ...post, comments: [...post.comments, comment] } : post
      )
    );
  };

  const sharePost = (id) => {
    const post = posts.find((post) => post.id === id);
    if (post) {
      alert(`Sharing post: ${post.title}`);
    }
  };

  return (
    <div className="App">
      <Header />
      <main>
        {isCreating ? (
          <CreatePost
            onSave={addPost}
            onCancel={() => setIsCreating(false)}
          />
        ) : (
          <button onClick={() => setIsCreating(true)} className="create-post-button">
            Create New Post
          </button>
        )}
        <PostList
          posts={posts}
          onEdit={(id) => setEditingPostId(id)}
          onDelete={deletePost}
          onLike={likePost}
          onDislike={dislikePost}
          onComment={commentPost}
          onShare={sharePost}
          onSave={updatePost}
          onCancel={() => setEditingPostId(null)}
          editingPostId={editingPostId}
        />
      </main>
    </div>
  );
}

export default App;