import React from 'react';
import PostItem from './PostItem';

function PostList({ posts, onEdit, onDelete, onLike, onDislike, onComment, onShare, onSave, onCancel, editingPostId }) {
  if (!posts || posts.length === 0) {
    return <div className="no-posts">No posts available. Create one!</div>;
  }

  return (
    <div className="post-list">
      {posts.map((post) => (
        <PostItem
          key={post.id}
          post={post}
          onEdit={onEdit}
          onDelete={onDelete}
          onLike={onLike}
          onDislike={onDislike}
          onComment={onComment}
          onShare={onShare}
          onSave={onSave}
          onCancel={onCancel}
          isEditing={editingPostId === post.id}
        />
      ))}
    </div>
  );
}

export default PostList;


