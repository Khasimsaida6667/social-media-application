import React, { useState } from 'react';
import { FaThumbsUp, FaThumbsDown, FaComment, FaShare } from 'react-icons/fa';
import CreatePost from './CreatePost';

function PostItem({ post, onEdit, onDelete, onLike, onDislike, onComment, onShare, onSave, onCancel, isEditing }) {
  const [comment, setComment] = useState('');
  const [showComments, setShowComments] = useState(false);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    onComment(post.id, comment);
    setComment('');
  };

  const safePost = {
    ...post,
    likes: post.likes || 0,
    dislikes: post.dislikes || 0,
    comments: post.comments || [],
    liked: post.liked || false,
    disliked: post.disliked || false,
  };

  return (
    <div className="post-item">
      {isEditing ? (
        <CreatePost
          post={post}
          onSave={onSave}
          onCancel={onCancel}
        />
      ) : (
        <>
          <h2>{safePost.title}</h2>
          <p>{safePost.content}</p>
          {safePost.image && <img src={safePost.image} alt={safePost.title} />}
          <div className="post-actions">
            <button
              className={`action-btn ${safePost.liked ? 'active' : ''}`}
              onClick={() => onLike(safePost.id)}
            >
              <FaThumbsUp /> {safePost.likes}
            </button>
            <button
              className={`action-btn ${safePost.disliked ? 'active' : ''}`}
              onClick={() => onDislike(safePost.id)}
            >
              <FaThumbsDown /> {safePost.dislikes}
            </button>
            <button className="action-btn" onClick={() => onShare(safePost.id)}>
              <FaShare /> Share
            </button>
            <button
              className="action-btn"
              onClick={() => setShowComments((prev) => !prev)}
            >
              {showComments ? 'Hide Comments' : 'Show Comments'}
            </button>
          </div>
          {showComments && (
            <div className="post-comments">
              <h3>Comments ({safePost.comments.length})</h3>
              <ul>
                {safePost.comments.map((comment, index) => (
                  <li key={index}>{comment}</li>
                ))}
              </ul>
            </div>
          )}
          <form onSubmit={handleCommentSubmit}>
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a comment..."
              className='comment-input'
            />
            <button type="submit" className='comment-btn'>
              <FaComment /> Add Comment
            </button>
          </form>
          <div className="post-edit-actions">
            <button onClick={() => onEdit(post.id)}>Edit</button>
            <button onClick={() => onDelete(post.id)}>Delete</button>
          </div>
        </>
      )}
    </div>
  );
}

export default PostItem;

