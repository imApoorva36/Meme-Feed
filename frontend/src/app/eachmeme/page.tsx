'use client'
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import s from './eachmeme.module.css';

interface MemeDisplayProps {
  randomImage: string;
  topText: string;
  bottomText: string;
  likes: number[];
  onLike: () => void;
}

const MemeDisplay: React.FC<MemeDisplayProps> = ({ randomImage, topText, bottomText, likes, onLike }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [users, setUsers] = useState<string[]>([]);

  const handleLike = () => {
    if (!isLiked) {
      onLike();
      setIsLiked(true);
    }
  };

  const numberoflikes = likes.length;

  useEffect(() => {
    // Fetch user data based on user IDs here
    const fetchUserData = async () => {
      try {
        const userResponse = await axios.get('http://127.0.0.1:8000/api/save_meme/', {
          params: { userIds: likes },
        });
        const userNames = userResponse.data.map((user: any) => user.owner); // Assuming your user data structure
        const uniqueUserNames = Array.from(new Set<string>(userNames));
        
        setUsers(uniqueUserNames);
      } catch (error) {
        console.error('Failed to fetch user data', error);
      }
    };

    if (likes.length > 0) {
      fetchUserData();
    }
  }, [likes]);
  const adjustedLikes = likes.map((userId) => userId - 1);
  const usernamesForLikes = adjustedLikes.map((userId) => users[userId]);

  return (
    <div className={s.meme_container}>
      <div className={s.meme}>
        <img src={randomImage} alt="Meme" className={s.memeimage} />
        <br />
        <h2 className={s.memetexttop}>{topText}</h2>
        <h2 className={s.memetextbottom}>{bottomText}</h2>
        <button onClick={handleLike}>
          {isLiked ? 'Liked' : 'Like'}
        </button>
        <span>Likes: {numberoflikes}</span>
        {numberoflikes > 0 && (
          <div>
            Liked by: {usernamesForLikes.map((username, index) => (
            <span key={index}>
              {username}{index < usernamesForLikes.length - 1 ? ', ' : ''}
            </span>
          ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MemeDisplay;
