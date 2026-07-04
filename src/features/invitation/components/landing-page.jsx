import { useConfig } from "@/features/invitation/hooks/use-config";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  useMotionPreset,
  staggerContainer,
  useReducedMotionFlag,
} from "@/lib/motion";
import { cn } from "@/lib/utils";

const LandingPage = ({ onOpenInvitation }) => {
  const config = useConfig(); // Use hook to get config from API or fallback to static
  const [isOpening, setIsOpening] = useState(false);
  const reduceMotion = useReducedMotionFlag();
  const fade = useMotionPreset("fade");
  const fadeUp = useMotionPreset("fadeUp");

  useEffect(() => {
    if (!isOpening) return;

    const animationDuration = reduceMotion ? 0 : 500;
    const timer = setTimeout(() => {
      onOpenInvitation();
    }, animationDuration);

    return () => clearTimeout(timer);
  }, [isOpening, onOpenInvitation, reduceMotion]);

  const handleOpenLetter = () => {
    if (isOpening) return;
    setIsOpening(true);
  };

  return (
    <motion.div
      variants={fade}
      initial="hidden"
      animate="visible"
      className={cn("min-h-screen relative overflow-hidden")}
    >
      {/* Decorative Background */}
      <div
        className={cn(
          "absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(251,207,232,0.28),transparent_45%),radial-gradient(circle_at_80%_80%,rgba(254,205,211,0.25),transparent_40%),linear-gradient(180deg,#fff6fa_0%,#fffafb_45%,#fff1f6_100%)]",
        )}
      />
      <div
        className={cn(
          "absolute -top-12 -left-10 h-48 w-48 rounded-full bg-rose-100/40 blur-3xl",
        )}
      />
      <div
        className={cn(
          "absolute -bottom-10 right-0 h-56 w-56 rounded-full bg-rose-100/40 blur-3xl",
        )}
      />

      {/* Main Content */}
      <div
        className={cn(
          "relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-10",
        )}
      >
        <motion.div
          variants={staggerContainer()}
          initial="hidden"
          animate="visible"
          className={cn("w-full max-w-lg")}
        >
          <motion.div variants={fadeUp} className={cn("text-center mb-8")}> 
            <p
              className={cn(
                "text-sm sm:text-base uppercase tracking-[0.6em] text-rose-700/70 mb-3",
              )}
            >
              بسم الله الرحمن الرحيم
            </p>
            <p className={cn("mt-6 text-center text-base sm:text-lg text-rose-900/80")}>
              {config.description}
            </p>
            <h6
              className={cn(
                "text-lg sm:text-xl md:text-2xl font-serif text-rose-950 leading-relaxed",
              )}
            >
              الرجاء فتح هذه الدعوة لتشريفنا بحضوركم ومشاركتنا فرحتنا
            </h6>
          </motion.div>

          <motion.div variants={fadeUp} className={cn("relative mx-auto max-w-md")}>
            <motion.div
              animate={
                isOpening
                  ? { opacity: 0, scale: 0.96, y: 14 }
                  : reduceMotion
                    ? undefined
                    : { y: [0, -6, 0], rotate: [0, -0.4, 0.4, 0] }
              }
              transition={
                isOpening
                  ? { duration: reduceMotion ? 0 : 0.55, ease: "easeInOut" }
                  : { repeat: Infinity, duration: 5, ease: "easeInOut" }
              }
              className={cn("relative drop-shadow-[0_22px_30px_rgba(157,23,77,0.22)]")}
            >
              <div
                className={cn(
                  "relative pt-[58%] rounded-2xl bg-[linear-gradient(160deg,#fff9fc_0%,#ffeaf2_45%,#ffdbe8_100%)] border border-rose-200/80",
                )}
              />

              <motion.div
                animate={
                  isOpening
                    ? { rotateX: reduceMotion ? 0 : -170 }
                    : { rotateX: 0 }
                }
                transition={{ duration: reduceMotion ? 0 : 0.85, ease: "easeInOut" }}
                style={{ transformOrigin: "top center" }}
                className={cn(
                  "absolute inset-x-0 top-0 z-20 h-1/2 origin-top [clip-path:polygon(0_0,100%_0,50%_100%)] rounded-t-2xl bg-[linear-gradient(180deg,#fff2f7_0%,#ffcfe2_100%)] border-x border-t border-rose-200/90",
                )}
              />

              <div
                className={cn(
                  "pointer-events-none absolute inset-x-0 bottom-0 z-20 h-1/2 [clip-path:polygon(0_100%,50%_0,100%_100%)] bg-[linear-gradient(180deg,#ffd6e7_0%,#ffbfd8_100%)] border-x border-b border-rose-300/80 rounded-b-2xl",
                )}
              />

              <motion.button
                whileHover={isOpening ? undefined : { scale: 1.06 }}
                whileTap={isOpening ? undefined : { scale: 0.95 }}
                onClick={handleOpenLetter}
                disabled={isOpening}
                aria-label="Buka undangan"
                className={cn(
                  "absolute left-1/2 top-[49%] z-30 -translate-x-1/2 -translate-y-1/2 inline-flex h-16 w-16 items-center justify-center rounded-full border-4 border-rose-100 bg-[radial-gradient(circle_at_28%_26%,#b91c1c_0%,#8b0f16_55%,#62090f_100%)] shadow-[0_10px_18px_rgba(120,17,27,0.35)] transition-opacity",
                  isOpening && "opacity-0",
                )}
              >
                <span className={cn("font-serif text-xl text-rose-100")}>S</span>
              </motion.button>

              <motion.div
                initial={{ opacity: 0, y: 12, scale: 0.96 }}
                animate={
                  isOpening
                    ? { opacity: 1, y: 0, scale: 1 }
                    : { opacity: 0, y: 12, scale: 0.96 }
                }
                transition={{
                  duration: reduceMotion ? 0 : 0.15,
                  delay: reduceMotion ? 0 : 0.15,
                  ease: "easeOut",
                }}
                className={cn(
                  "pointer-events-none absolute left-[10%] right-[10%] top-[12%] z-40 rounded-xl border border-rose-200 bg-[linear-gradient(180deg,#fffefe_0%,#fff3f8_100%)] px-4 py-4 text-center shadow-lg",
                )}
              >
                <p className={cn("text-xs tracking-[0.2em] text-rose-500 mb-2")}>
                  بطاقة الدعوة
                </p>
                <p className={cn("text-sm text-rose-900/90 leading-relaxed")}>
                  {config.description}
                </p>
              </motion.div>
            </motion.div>

          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LandingPage;
