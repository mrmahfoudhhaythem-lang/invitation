import { useCallback, useEffect, useState } from "react";
import { useConfig } from "@/features/invitation/hooks/use-config";
import { motion } from "framer-motion";
import { Calendar, Clock, Heart, MapPin } from "lucide-react";
import {
  EASE,
  LOOP,
  staggerContainer,
  useMotionPreset,
  useReducedMotionFlag,
} from "@/lib/motion";
import { cn } from "@/lib/utils";
import { getGuestName } from "@/lib/invitation-storage";

const formatArabicDate = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("ar-TN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    numberingSystem: "latn",
    timeZone: "Africa/Tunis",
  }).format(date);
};

const CountdownTimer = ({ targetDate }) => {
  const calculateTimeLeft = useCallback(() => {
    const difference = +new Date(targetDate) - +new Date();

    if (difference > 0) {
      return {
        أيام: Math.floor(difference / (1000 * 60 * 60 * 24)),
        ساعات: Math.floor((difference / (1000 * 60 * 60)) % 24),
        دقائق: Math.floor((difference / 1000 / 60) % 60),
        ثوان: Math.floor((difference / 1000) % 60),
      };
    }

    return {
      أيام: 0,
      ساعات: 0,
      دقائق: 0,
      ثوان: 0,
    };
  }, [targetDate]);

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  const timerOrder = ["أيام", "ساعات", "دقائق", "ثوان"];

  return (
    <div dir="rtl" className={cn("mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4")}>
      {timerOrder.map((label) => (
        <div
          key={label}
          className={cn(
            "flex flex-col items-center rounded-xl border border-rose-100 bg-white/80 p-3 backdrop-blur-sm",
          )}
        >
          <span className={cn("text-xl font-bold text-rose-600")}>{timeLeft[label] ?? 0}</span>
          <span className={cn("text-xs text-gray-500")}>{label}</span>
        </div>
      ))}
    </div>
  );
};

export default function Events() {
  const config = useConfig(); // Use hook to get config from API or fallback to static
  const agenda = config?.agenda || [];
  const [guestName, setGuestName] = useState("");
  const reduceMotion = useReducedMotionFlag();
  const fade = useMotionPreset("fade");
  const fadeUp = useMotionPreset("fadeUp");
  const scaleIn = useMotionPreset("scaleIn");

  useEffect(() => {
    const storedGuestName = getGuestName();
    if (storedGuestName) {
      setGuestName(storedGuestName);
    }
  }, []);

  if (agenda.length === 0) return null;

  const FloatingHearts = () => {
    const [hearts] = useState(() =>
      [...Array(8)].map((_, i) => ({
        size: Math.floor(Math.random() * 2) + 8,
        color:
          i % 3 === 0
            ? "text-rose-400"
            : i % 3 === 1
              ? "text-pink-400"
              : "text-red-400",
        initialX:
          typeof window !== "undefined" ? Math.random() * window.innerWidth : 0,
        animateX:
          typeof window !== "undefined" ? Math.random() * window.innerWidth : 0,
      })),
    );

    return (
      <div
        className={cn("absolute inset-0 overflow-hidden pointer-events-none")}
      >
        {hearts.map((heart, i) => (
          <motion.div
            key={i}
            initial={{
              opacity: 0,
              scale: 0,
              x: heart.initialX,
              y: typeof window !== "undefined" ? window.innerHeight : 0,
            }}
            animate={{
              opacity: [0, 1, 1, 0],
              scale: [0, 1, 1, 0.5],
              x: heart.animateX,
              y: -100,
            }}
            transition={{
              duration: LOOP.float,
              repeat: Infinity,
              delay: i * 0.8,
              ease: EASE.out,
            }}
            className={cn("absolute")}
          >
            <Heart
              className={heart.color}
              style={{
                width: `${heart.size * 4}px`,
                height: `${heart.size * 4}px`,
              }}
              fill="currentColor"
            />
          </motion.div>
        ))}
      </div>
    );
  };

  return (
    <>
      {agenda.map((event, index) => {
        const eventTime = event.endTime
          ? `${event.startTime} - ${event.endTime}`
          : event.startTime;

        return (
          <section
            key={`${event.title}-${index}`}
            id={index === 0 ? "event" : `event-${index + 1}`}
            className={cn(
              "min-h-screen relative overflow-hidden px-4 py-10 sm:py-14",
            )}
            dir="rtl"
          >
            <div className={cn("absolute inset-0 bg-white")} />

            <motion.div
              variants={staggerContainer()}
              initial="hidden"
              animate="visible"
              className={cn(
                "relative z-10 w-full flex flex-col items-center justify-start text-center pt-2 sm:pt-4",
              )}
            >
              <div className={cn("space-y-6 relative z-10 w-full")}> 
                <motion.div variants={scaleIn} className={cn("inline-block mx-auto")}> 
                  <span
                    className={cn(
                      "px-4 py-1 text-sm bg-rose-50 text-rose-600 rounded-full border border-rose-200",
                    )}
                  >
                    {event.title}
                  </span>
                </motion.div>

                <div className={cn("space-y-4 pb-3 sm:pb-4")}> 
                  <motion.h2
                    variants={scaleIn}
                    className={cn(
                      "text-3xl sm:text-5xl leading-[1.5] sm:leading-[1.38] pb-1 font-serif bg-clip-text text-transparent bg-gradient-to-r from-rose-600 to-pink-600",
                    )}
                  >
                    {config.groomName} & {config.brideName}
                  </motion.h2>
                </div>

                <motion.div variants={fadeUp} className={cn("relative max-w-md mx-auto")}>
                  <div
                    className={cn(
                      "absolute inset-0 rounded-2xl bg-gradient-to-b from-rose-50/30 to-white/25",
                    )}
                  />

                  <div
                    className={cn(
                      "relative px-4 sm:px-5 py-5 sm:py-6 rounded-2xl border border-rose-100/50",
                    )}
                  >
                    <div
                      className={cn(
                        "absolute top-0 left-1/2 -translate-x-1/2 -translate-y-px",
                      )}
                    >
                      <div
                        className={cn(
                          "w-20 sm:w-32 h-[2px] bg-gradient-to-r from-transparent via-rose-200 to-transparent",
                        )}
                      />
                    </div>

                    <div className={cn("space-y-6 text-center")}> 
                      <div className={cn("space-y-3")}> 
                        <motion.div
                          variants={fade}
                          className={cn(
                            "flex items-center justify-center gap-2 text-gray-700",
                          )}
                        >
                          <Calendar className={cn("w-4 h-4 text-rose-400")} />
                          <span className={cn("font-medium text-sm sm:text-base")}> 
                            {formatArabicDate(event.date)}
                          </span>
                        </motion.div>

                        {eventTime ? (
                          <motion.div
                            variants={fade}
                            className={cn(
                              "flex items-center justify-center gap-2 text-gray-700",
                            )}
                          >
                            <Clock className={cn("w-4 h-4 text-rose-400")} />
                            <span className={cn("font-medium text-sm sm:text-base")}> 
                              {eventTime}
                            </span>
                          </motion.div>
                        ) : null}

                        {event.location ? (
                          <motion.div
                            variants={fade}
                            className={cn(
                              "flex items-center justify-center gap-2 text-gray-700",
                            )}
                          >
                            <MapPin className={cn("w-4 h-4 text-rose-400")} />
                            <span className={cn("font-medium text-sm sm:text-base")}> 
                              {event.location}
                            </span>
                          </motion.div>
                        ) : null}
                      </div>

                      <div className={cn("flex items-center justify-center gap-3")}> 
                        <div className={cn("h-px w-8 sm:w-12 bg-rose-200/50")} />
                        <div className={cn("w-2 h-2 rounded-full bg-rose-200")} />
                        <div className={cn("h-px w-8 sm:w-12 bg-rose-200/50")} />
                      </div>

                      <div className={cn("space-y-2")}> 
                        <p className={cn("text-gray-500 font-serif italic text-sm")}>
                          يسعدنا حضوركم
                        </p>
                        <p className={cn("text-gray-600 font-medium text-sm")}>
                          ضيفنا العزيز
                        </p>
                        <p className={cn("text-rose-500 font-semibold text-lg")}>
                          {guestName || "نتشرف بوجودكم معنا"}
                        </p>
                      </div>
                    </div>

                    <div
                      className={cn(
                        "absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-px",
                      )}
                    >
                      <div
                        className={cn(
                          "w-20 sm:w-32 h-[2px] bg-gradient-to-r from-transparent via-rose-200 to-transparent",
                        )}
                      />
                    </div>
                  </div>
                </motion.div>

                <CountdownTimer targetDate={event.date} />

                <div className={cn("pt-6 relative")}>
                  {!reduceMotion && <FloatingHearts />}
                  <motion.div
                    animate={
                      reduceMotion
                        ? undefined
                        : {
                            scale: [1, 1.1, 1],
                            rotate: [0, 5, -5, 0],
                          }
                    }
                    transition={
                      reduceMotion
                        ? undefined
                        : {
                            duration: LOOP.pulse,
                            repeat: Infinity,
                            ease: EASE.inOut,
                          }
                    }
                  >
                    <Heart
                      className={cn("w-10 sm:w-12 h-10 sm:h-12 text-rose-500 mx-auto")}
                      fill="currentColor"
                    />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </section>
        );
      })}
    </>
  );
}
