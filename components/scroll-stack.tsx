"use client";

import React, { useLayoutEffect, useRef, useCallback } from "react";
import type { ReactNode, CSSProperties } from "react";

export interface ScrollStackItemProps {
  children: ReactNode;
  itemClassName?: string;
  style?: CSSProperties;
}

const cardBaseStyle: CSSProperties = {
  transformOrigin: "top center",
  willChange: "transform",
  backfaceVisibility: "hidden",
  transformStyle: "preserve-3d",
  boxShadow: "0 0 30px rgba(0,0,0,0.1)",
  height: "20rem",
  width: "100%",
  maxWidth: "1100px",
  margin: "0 auto",
  padding: "3rem",
  borderRadius: "40px",
  boxSizing: "border-box",

  position: "sticky",
  top: "120px",

  transform: "translateZ(0)"
};

export const ScrollStackItem: React.FC<ScrollStackItemProps> = ({
  children,
  itemClassName = "",
  style
}) => (
  <div
    className={`scroll-stack-card ${itemClassName}`.trim()}
    style={{ ...cardBaseStyle, ...style }}
  >
    {children}
  </div>
);

interface ScrollStackProps {
  children: ReactNode;
  className?: string;
  itemScale?: number;
  itemStackDistance?: number;
  stackPosition?: string;
  scaleEndPosition?: string;
  baseScale?: number;
}

const ScrollStack: React.FC<ScrollStackProps> = ({
  children,
  className = "",
  itemScale = 0.02,
  itemStackDistance = 10,
  stackPosition = "40%",
  scaleEndPosition = "5%",
  baseScale = 0.9
}) => {
  const cardsRef = useRef<HTMLElement[]>([]);
  const cardOffsetsRef = useRef<number[]>([]);

  const clamp = useCallback(
    (v: number, min: number, max: number) =>
      Math.max(min, Math.min(max, v)),
    []
  );

  const calculateProgress = useCallback(
    (scrollTop: number, start: number, end: number) => {
      if (scrollTop < start) return 0;
      if (scrollTop > end) return 1;
      return clamp((scrollTop - start) / (end - start), 0, 1);
    },
    [clamp]
  );

  const parsePercentage = useCallback(
    (value: string | number, height: number) => {
      if (typeof value === "string" && value.includes("%")) {
        return (parseFloat(value) / 100) * height;
      }
      return parseFloat(value as string);
    },
    []
  );

  const getElementOffset = (card: HTMLElement) =>
    card.getBoundingClientRect().top + window.scrollY;

  const updateCardOffsets = () => {
    cardOffsetsRef.current = cardsRef.current.map((card) =>
      getElementOffset(card)
    );
  };

  const updateCardTransforms = () => {
    const cards = cardsRef.current;
    if (!cards.length) return;

    const scrollTop = window.scrollY;
    const containerHeight = window.innerHeight;

    const stackPos = parsePercentage(stackPosition, containerHeight);
    const scaleEnd = parsePercentage(scaleEndPosition, containerHeight);

    cards.forEach((card, i) => {
      const cardTop =
        cardOffsetsRef.current[i] ?? getElementOffset(card);

      const start = cardTop - stackPos;
      const end = cardTop - scaleEnd;

      const progress = calculateProgress(scrollTop, start, end);
      const eased = 1 - Math.pow(1 - progress, 3);

      const targetScale = baseScale + i * itemScale;
      const translateY = eased * (i * itemStackDistance);
      const scale = 1 - eased * (1 - targetScale);

      card.style.transform = `
        translateY(${translateY}px)
        scale(${scale})
      `;

      card.style.zIndex = `${i}`;
    });
  };

  useLayoutEffect(() => {
    const cards = Array.from(
      document.querySelectorAll(".scroll-stack-card")
    ) as HTMLElement[];

    cardsRef.current = cards;

    updateCardOffsets();
    updateCardTransforms();

    const handleScroll = () => updateCardTransforms();
    const handleResize = () => updateCardOffsets();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={className}>
      <div
        style={{
          padding: "10vh 0 60vh", 
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default ScrollStack;