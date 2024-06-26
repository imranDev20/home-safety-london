// components/Counter.tsx
import { Typography, useTheme } from "@mui/joy";
import React, { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";

interface CounterProps {
  end: number;
  duration: number;
}

const Counter: React.FC<CounterProps> = ({ end, duration }) => {
  const theme = useTheme();
  const [count, setCount] = useState<number>(0);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  useEffect(() => {
    if (inView) {
      let start = 0;
      const increment = end / (duration / 100);

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.ceil(start));
        }
      }, 100);

      return () => clearInterval(timer);
    }
  }, [inView, end, duration]);

  return (
    <div ref={ref}>
      <Typography
        color="primary"
        fontWeight={800}
        sx={{
          fontSize: 36,
          mb: 1,
        }}
      >
        {count} +
      </Typography>
      <Typography
        level="title-lg"
        sx={{
          color: theme.palette.text.primary,
          fontSize: 22,
          mb: 1,
        }}
      >
        Years Experience
      </Typography>
      <Typography level="body-md" color="neutral">
        The standard chunk of Lorem Ipsum used since the 1500s below.
      </Typography>
    </div>
  );
};

export default Counter;
