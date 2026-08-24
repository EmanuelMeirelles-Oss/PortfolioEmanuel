import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
}

const Character: React.FC<{
  char: string;
  progress: any;
  range: [number, number];
}> = ({ char, progress, range }) => {
  const opacity = useTransform(progress, range, [0.2, 1]);

  return (
    <span className="relative inline-block">
      <span className="opacity-20">{char === ' ' ? '\u00A0' : char}</span>
      <motion.span
        style={{ opacity }}
        className="absolute left-0 top-0 text-[#D7E2EA]"
      >
        {char === ' ' ? '\u00A0' : char}
      </motion.span>
    </span>
  );
};

export const AnimatedText: React.FC<AnimatedTextProps> = ({ text, className = '' }) => {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.2']
  });

  const totalChars = text.length;
  const words = text.split(' ');

  // Precompute each word's starting offset in the full string (including
  // the space that follows) so the per-character reveal timing stays
  // identical to a flat character-by-character split.
  const wordStartIndices = words.reduce<number[]>((acc, _word, i) => {
    const previous = i === 0 ? 0 : acc[i - 1] + words[i - 1].length + 1;
    acc.push(previous);
    return acc;
  }, []);

  return (
    <p ref={containerRef} className={`flex flex-wrap ${className}`}>
      {words.map((word, wordIndex) => {
        const wordStartIndex = wordStartIndices[wordIndex];

        return (
          <span key={wordIndex} className="inline-flex whitespace-nowrap">
            {word.split('').map((char, i) => {
              const idx = wordStartIndex + i;
              const start = idx / totalChars;
              const end = start + 1 / totalChars;
              return (
                <Character
                  key={i}
                  char={char}
                  progress={scrollYProgress}
                  range={[start, end]}
                />
              );
            })}
            {wordIndex < words.length - 1 && (
              <Character
                char=" "
                progress={scrollYProgress}
                range={[
                  (wordStartIndex + word.length) / totalChars,
                  (wordStartIndex + word.length + 1) / totalChars,
                ]}
              />
            )}
          </span>
        );
      })}
    </p>
  );
};
