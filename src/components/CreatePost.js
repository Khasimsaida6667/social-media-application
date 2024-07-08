import React, { useState, useEffect } from 'react';

function CreatePost({ onSave, onCancel, post }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
      setImage(post.image);
    }
  }, [post]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ id: post ? post.id : null, title, content, image });
    setTitle('');
    setContent('');
    setImage(null);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form className="create-post-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
      />
      {image && <img src={image} alt="Preview" className="image-preview" />}
      <div className="form-actions">
        <button type="submit">{post ? 'Update' : 'Create'} Post</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}

export default CreatePost;