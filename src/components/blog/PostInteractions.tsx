"use client";

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Twitter, Linkedin, Link, Check } from 'lucide-react';
import { getPostStats, incrementView, incrementLike } from '../../actions/post';

interface PostInteractionsProps {
  slug: string;
  title: string;
}

export function PostInteractions({ slug, title }: PostInteractionsProps) {
  const [views, setViews] = useState<number>(0);
  const [likes, setLikes] = useState<number>(0);
  const [userLikes, setUserLikes] = useState<number>(0);
  const [copied, setCopied] = useState(false);
  const [isLiking, setIsLiking] = useState(false);
  const [shareUrl, setShareUrl] = useState('');

  const pendingLikesRef = useRef(0);
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setShareUrl(window.location.href);

    // Fetch initial stats from Redis
    getPostStats(slug).then((stats) => {
      setViews(stats.views);
      setLikes(stats.likes);
    });

    // Load user's local likes
    const localLikes = parseInt(localStorage.getItem(`likes_${slug}`) || '0', 10);
    setUserLikes(localLikes);

    // Track view (only once per user session using a sessionStorage key)
    const viewedKey = `viewed_${slug}`;
    if (!sessionStorage.getItem(viewedKey)) {
      incrementView(slug).then(({ views: updatedViews }) => {
        if (updatedViews) {
          setViews(updatedViews);
          sessionStorage.setItem(viewedKey, 'true');
        }
      });
    }
  }, [slug]);

  const handleLike = () => {
    if (userLikes >= 10) return; // Limit to 10 likes per user

    // Optimistic UI updates
    setLikes((prev) => prev + 1);
    setUserLikes((prev) => prev + 1);
    pendingLikesRef.current += 1;
    setIsLiking(true);
    setTimeout(() => setIsLiking(false), 300);

    // Debounce database update
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = setTimeout(async () => {
      const amount = pendingLikesRef.current;
      pendingLikesRef.current = 0;

      const { likes: updatedLikes } = await incrementLike(slug, amount);
      if (updatedLikes) {
        setLikes(updatedLikes);
        localStorage.setItem(`likes_${slug}`, String(userLikes + amount));
      }
    }, 1000);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="border-y border-border/50 py-8 my-16 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
      {/* Left side: Stats & Like Button */}
      <div className="flex items-center gap-6">
        <button
          onClick={handleLike}
          disabled={userLikes >= 10}
          className={`flex items-center gap-3 px-5 py-2.5 rounded-full border transition-all duration-300 group ${
            userLikes > 0 
              ? 'bg-accent/10 border-accent/30 text-accent' 
              : 'border-border/50 text-text-secondary hover:border-text-primary/50 hover:text-text-primary'
          } ${userLikes >= 10 ? 'opacity-80 cursor-not-allowed' : 'cursor-pointer'}`}
        >
          <motion.div
            animate={isLiking ? { scale: [1, 1.4, 1] } : {}}
            transition={{ duration: 0.3 }}
          >
            <Heart className={`w-5 h-5 transition-transform group-hover:scale-110 ${userLikes > 0 ? 'fill-accent text-accent' : ''}`} />
          </motion.div>
          <span className="font-mono text-xs tracking-wider font-semibold uppercase">
            {likes} {likes === 1 ? 'Like' : 'Likes'} {userLikes > 0 && `(${userLikes}/10)`}
          </span>
        </button>

        <div className="font-mono text-xs text-text-secondary/60 uppercase tracking-widest">
          {views} {views === 1 ? 'View' : 'Views'}
        </div>
      </div>

      {/* Right side: Share Buttons */}
      <div className="flex items-center gap-4">
        <span className="font-mono text-[10px] text-text-secondary/60 uppercase tracking-widest mr-2 sm:block hidden">
          Share Article
        </span>
        
        <a
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check out this post: ${title}`)}&url=${encodeURIComponent(shareUrl)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2.5 rounded-full border border-border/50 text-text-secondary hover:border-text-primary hover:text-text-primary transition-all duration-300"
          title="Share on X"
        >
          <Twitter className="w-4 h-4" />
        </a>

        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2.5 rounded-full border border-border/50 text-text-secondary hover:border-text-primary hover:text-text-primary transition-all duration-300"
          title="Share on LinkedIn"
        >
          <Linkedin className="w-4 h-4" />
        </a>

        <button
          onClick={handleCopyLink}
          className="p-2.5 rounded-full border border-border/50 text-text-secondary hover:border-text-primary hover:text-text-primary transition-all duration-300 relative cursor-pointer"
          title="Copy link"
        >
          <AnimatePresence mode="wait">
            {copied ? (
              <motion.div
                key="check"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.15 }}
              >
                <Check className="w-4 h-4 text-emerald-500" />
              </motion.div>
            ) : (
              <motion.div
                key="copy"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.15 }}
              >
                <Link className="w-4 h-4" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>
    </div>
  );
}
