// components/MemeDisplay.tsx
'use client'; // Add this line to mark the component as a Client Component
import React, { useState, useEffect, ChangeEvent, useRef } from 'react';
import s from './eachmeme.module.css';
import html2canvas from 'html2canvas';
import axios from 'axios';

interface MemeDisplayProps {
  randomImage: string;
  topText: string;
  bottomText: string;
}

const MemeDisplay: React.FC<MemeDisplayProps> = ({ randomImage, topText, bottomText }) => {
  return (
    <div className={s.meme_container}>
      <div className={s.meme}>
        <img src={randomImage} alt="Meme" className={s.memeimage} />
        <h2 className={s.memetexttop}>{topText}</h2>
        <h2 className={s.memetextbottom}>{bottomText}</h2>
      </div>
    </div>
  );
};

export default MemeDisplay;
