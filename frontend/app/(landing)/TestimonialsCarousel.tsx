"use client";

import { useEffect, useRef } from "react";

const testimonials = [
  {
    name: "Rohan Chettri",
    role: "Web Developer",
    course: "MERN Stack",
    image:
      "https://randomuser.me/api/portraits/men/32.jpg",
    quote:
      "EduFlow helped me move step by step. The lessons were clear, practical, and easy to apply in real projects.",
  },
  {
    name: "Priyanka Sharma",
    role: "UI/UX Designer",
    course: "UI/UX Design",
    image:
      "https://randomuser.me/api/portraits/women/44.jpg",
    quote:
      "The design courses felt organized and real. I could follow each lesson and build a clean portfolio workflow.",
  },
  {
    name: "Ramesh Karki",
    role: "Student",
    course: "Web Development",
    image:
      "https://randomuser.me/api/portraits/men/75.jpg",
    quote:
      "The dashboard made learning simple. I always knew what to continue and what course to pick next.",
  },
  {
    name: "Aarati Rai",
    role: "Python Learner",
    course: "Python Basics",
    image:
      "https://randomuser.me/api/portraits/women/68.jpg",
    quote:
      "The lessons were short, focused, and useful. I liked having notes, videos, and progress in one place.",
  },
  {
    name: "Bikash Thapa",
    role: "Frontend Developer",
    course: "React Mastery",
    image:
      "https://randomuser.me/api/portraits/men/46.jpg",
    quote:
      "I used EduFlow to revise React and TypeScript. The course cards and learning path made everything easy to scan.",
  },
];

const testimonialCount = testimonials.length;
const middleLoopStart = testimonialCount * 2;

export default function TestimonialsCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef(middleLoopStart);
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const loopedTestimonials = Array.from({ length: 5 }, () => testimonials).flat();

  useEffect(() => {
    requestAnimationFrame(() => {
      scrollToPosition(middleLoopStart, "auto");
    });

    return () => {
      if (resetTimerRef.current) {
        clearTimeout(resetTimerRef.current);
      }
    };
  }, []);

  function scrollToPosition(position: number, behavior: ScrollBehavior = "smooth") {
    const scroller = scrollRef.current;
    const card = scroller?.querySelector<HTMLElement>("[data-testimonial-card]");

    if (!scroller || !card) return;

    const gap = 20;
    scroller.scrollTo({
      left: position * (card.offsetWidth + gap),
      behavior,
    });
  }

  function scheduleLoopReset(position: number) {
    if (resetTimerRef.current) {
      clearTimeout(resetTimerRef.current);
    }

    resetTimerRef.current = setTimeout(() => {
      positionRef.current = position;
      scrollToPosition(position, "auto");
    }, 450);
  }

  function showPrevious() {
    positionRef.current -= 1;
    scrollToPosition(positionRef.current);

    if (positionRef.current < testimonialCount) {
      scheduleLoopReset(positionRef.current + testimonialCount * 2);
    }
  }

  function showNext() {
    positionRef.current += 1;
    scrollToPosition(positionRef.current);

    if (positionRef.current >= testimonialCount * 4) {
      scheduleLoopReset(positionRef.current - testimonialCount * 2);
    }
  }

  return (
    <div className="relative mt-8 px-12 md:px-16">
      <button
        aria-label="Previous testimonial"
        className="absolute left-0 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-blue-100 bg-white text-xl font-bold text-blue-600 shadow-sm transition hover:-translate-x-0.5 hover:border-blue-300 hover:bg-blue-50"
        type="button"
        onClick={showPrevious}
      >
        &lt;
      </button>

      <div
        ref={scrollRef}
        className="flex snap-x snap-mandatory gap-5 overflow-x-hidden scroll-smooth"
      >
        {loopedTestimonials.map((item, index) => (
          <article
            key={`${item.name}-${index}`}
            data-testimonial-card
            className="relative flex min-h-[245px] w-full shrink-0 snap-start flex-col rounded-xl border border-blue-100 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md md:w-[calc((100%_-_2.5rem)/3)]"
          >
            <div className="flex items-start gap-4">
              <div
                aria-label={item.name}
                className="h-12 w-12 shrink-0 rounded-full bg-cover bg-center ring-4 ring-blue-50"
                role="img"
                style={{ backgroundImage: `url(${item.image})` }}
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-base font-bold text-slate-950">{item.name}</h3>
                    <p className="mt-0.5 text-xs font-semibold text-slate-500">{item.role}</p>
                  </div>
                  <span className="shrink-0 rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-bold uppercase text-blue-700">
                    Verified
                  </span>
                </div>
                <p className="mt-2 text-xs font-semibold text-blue-600">{item.course}</p>
              </div>
            </div>

            <div className="mt-4 flex gap-1 text-amber-500">
              {Array.from({ length: 5 }).map((_, starIndex) => (
                <StarIcon key={starIndex} />
              ))}
            </div>

            <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">&quot;{item.quote}&quot;</p>

            <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4 text-xs font-semibold text-slate-500">
              <span>5.0 rating</span>
              <span>Completed learner</span>
            </div>
          </article>
        ))}
      </div>

      <button
        aria-label="Next testimonial"
        className="absolute right-0 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-blue-100 bg-white text-xl font-bold text-blue-600 shadow-sm transition hover:translate-x-0.5 hover:border-blue-300 hover:bg-blue-50"
        type="button"
        onClick={showNext}
      >
        &gt;
      </button>

    </div>
  );
}

function StarIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="m12 3.5 2.65 5.37 5.93.86-4.29 4.18 1.01 5.9L12 17.02 6.7 19.81l1.01-5.9-4.29-4.18 5.93-.86L12 3.5Z" />
    </svg>
  );
}
