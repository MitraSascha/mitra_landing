import { motion } from "motion/react";

export function CalendarSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-[#F2F0E9] px-4 py-32">
      <div className="max-w-6xl w-full">
        {/* Tear-Off Calendar Animation */}
        <div className="flex items-start justify-center">
          <div className="relative w-80">
            {/* Calendar Holder/Top */}
            <div className="bg-[#2c4a5f] h-8 rounded-t-2xl relative z-10 flex items-center justify-center">
              <div className="w-16 h-3 bg-[#CC5833] rounded-full"></div>
            </div>

            {/* Stacked Calendar Sheets */}
            <div className="relative">
              {Array.from({ length: 12 }).map((_, index) => {
                const delay = index * 4.5; // Each sheet falls after 4.5 seconds
                const reverseIndex = 11 - index; // Stack from back to front visually

                return (
                  <motion.div
                    key={index}
                    className="absolute top-0 left-0 w-full bg-white rounded-b-2xl shadow-lg border-2 border-[#2c4a5f]/20"
                    style={{
                      zIndex: reverseIndex,
                      transform: `translateY(${reverseIndex * 2}px)`, // Stack effect
                    }}
                    initial={{
                      y: reverseIndex * 2,
                      opacity: 1,
                      rotateX: 0,
                    }}
                    animate={{
                      y: [
                        reverseIndex * 2,
                        reverseIndex * 2,
                        600,
                      ],
                      opacity: [1, 1, 0],
                      rotateX: [0, 0, 45],
                    }}
                    transition={{
                      duration: 4.5,
                      delay: delay,
                      repeat: Infinity,
                      repeatDelay: 20,
                      ease: "easeIn",
                    }}
                  >
                    {/* Calendar Sheet Content */}
                    <div className="p-8 flex flex-col items-center">
                      {/* Day Number */}
                      <div className="text-6xl font-bold text-[#2c4a5f] mb-2">
                        {index + 1}
                      </div>

                      {/* Beach Umbrella Icon */}
                      <svg
                        viewBox="0 0 60 60"
                        className="w-24 h-24 mt-4"
                      >
                        {/* Umbrella top - striped pattern */}
                        <defs>
                          <pattern
                            id={`stripes-${index}`}
                            patternUnits="userSpaceOnUse"
                            width="8"
                            height="8"
                            patternTransform="rotate(45)"
                          >
                            <rect
                              width="4"
                              height="8"
                              fill="#e89a4d"
                            />
                            <rect
                              x="4"
                              width="4"
                              height="8"
                              fill="#CC5833"
                            />
                          </pattern>
                        </defs>

                        {/* Main umbrella canopy */}
                        <path
                          d="M30 15 C15 15 10 25 10 35 L50 35 C50 25 45 15 30 15 Z"
                          fill={`url(#stripes-${index})`}
                          stroke="#CC5833"
                          strokeWidth="2"
                        />

                        {/* Umbrella scallops */}
                        <path
                          d="M10 35 Q15 30 20 35 Q25 30 30 35 Q35 30 40 35 Q45 30 50 35"
                          fill="none"
                          stroke="#CC5833"
                          strokeWidth="2"
                        />

                        {/* Umbrella pole */}
                        <line
                          x1="30"
                          y1="35"
                          x2="30"
                          y2="52"
                          stroke="#2c4a5f"
                          strokeWidth="3"
                          strokeLinecap="round"
                        />

                        {/* Umbrella handle curve */}
                        <path
                          d="M30 52 Q35 52 35 55 Q35 57 33 57"
                          stroke="#2c4a5f"
                          strokeWidth="3"
                          fill="none"
                          strokeLinecap="round"
                        />
                      </svg>

                      {/* "Urlaubstag" label */}
                      <div className="mt-4 px-4 py-2 bg-[#a8d4a8] rounded-full">
                        <span className="text-white font-outfit font-semibold text-sm">
                          Urlaubstag
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}