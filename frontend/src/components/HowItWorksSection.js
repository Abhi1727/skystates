import { FileText, Code2, BarChart, CheckCircle2 } from "lucide-react";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: "01",
    icon: FileText,
    title: "Create test & invite",
    description: "Design your coding challenge from our library or create custom problems. Send invites with just an email.",
    color: "bg-blue-500/10 text-blue-500 border-blue-500/20"
  },
  {
    number: "02",
    icon: Code2,
    title: "Candidate codes",
    description: "Candidates write, run, and submit code directly in the browser. No downloads, no setup friction.",
    color: "bg-purple-500/10 text-purple-500 border-purple-500/20"
  },
  {
    number: "03",
    icon: BarChart,
    title: "View results",
    description: "Get auto-scored results with detailed breakdowns. Compare candidates side-by-side with rich analytics.",
    color: "bg-green-500/10 text-green-500 border-green-500/20"
  },
];

const HowItWorksSection = () => {
  const containerRef = useRef(null);
  const lineRef = useRef(null);

  useGSAP(() => {
    const steps = gsap.utils.toArray(".step-card");

    // Match line height to scroll
    gsap.to(lineRef.current, {
      height: "100%",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top center",
        end: "bottom center",
        scrub: 1,
      }
    });

    steps.forEach((step, i) => {
      gsap.fromTo(step,
        { opacity: 0, y: 50, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          scrollTrigger: {
            trigger: step,
            start: "top 80%",
            end: "top 50%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="how-it-works" className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6">
            Three steps to smarter hiring
          </h2>
          <p className="text-lg text-muted-foreground">
            A streamlined workflow designed for speed and accuracy.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Connecting Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2 md:-translate-x-[1px]">
            <div ref={lineRef} className="w-full bg-primary origin-top h-0" />
          </div>

          <div className="space-y-12 md:space-y-24">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`step-card relative flex flex-col md:flex-row gap-8 items-center ${index % 2 === 0 ? "md:flex-row-reverse" : ""
                  }`}
              >
                {/* Spacers for layout alignment */}
                <div className="hidden md:block flex-1" />

                {/* Central Node */}
                <div className="relative z-10 flex-shrink-0 w-8 h-8 md:w-12 md:h-12 rounded-full bg-background border-4 border-primary shadow-lg hidden md:flex items-center justify-center">
                  <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-primary ml-[1px] md:ml-[0.5px]" />
                </div>

                {/* Mobile Node */}
                <div className="md:hidden absolute left-4 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 bg-background rounded-full">
                  <CheckCircle2 className="w-6 h-6 text-primary fill-background" />
                </div>

                {/* Content Card */}
                <div className="flex-1 w-full md:w-auto pl-8 md:pl-0">
                  <div className={`
                                        group relative p-6 sm:p-8 rounded-2xl border bg-card hover:bg-muted/50 transition-all duration-300 shadow-sm hover:shadow-md
                                        ${step.color.replace('text-', 'border-').split(' ')[2]}
                                    `}>
                    <div className={`absolute -top-4 -right-4 w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold shadow-lg ${step.color}`}>
                      {step.number}
                    </div>

                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${step.color}`}>
                      <step.icon className="w-6 h-6" />
                    </div>

                    <h3 className="text-xl font-bold text-foreground mb-3">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
