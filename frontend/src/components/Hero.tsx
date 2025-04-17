import { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import { TYEventPost } from "@/lib/types";
import SearchBox from "./SearchBox";
import { bgImage } from "@/assets";
import { Button } from "./ui/button";
import Container from "./Container";
import { callApi } from "@/lib/callApi";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const Hero = () => {
  const calculateTimeLeft = (): TimeLeft => {
    if (!event) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

    const now = new Date().getTime();
    const eventTime = new Date(event?.start_datetime).getTime();
    const difference = eventTime - now;

    // If the event time has already passed, return 0 for all
    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    // Calculate time components
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  };

  const [event, setEvent] = useState<TYEventPost>();
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const response = await callApi({ endpoint: "events/latest/" });
        setEvent(response);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      }
    }

    fetchBlogs();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft);
    }, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [event]);

  return (
    <Container className="h-fit relative bg-primary/50 overflow-hidden">
      <div className="z-20 h-full w-full flex items-center justify-start text-primary-foreground">
        <div>
          <SearchBox />

          <div className="mt-6">
            <h1 className="font-black text-3xl sm:text-4xl pb-10 leading-[3rem] sm:leading-[4rem]">
              Prosfyges Christian Network
            </h1>
          </div>
          {event && (
            <>
              <Link to={`/events/${event.slug}/`}>
                <h1 className="font-black text-2xl mb-5 bg-primary-foreground/80 text-primary/90 p-3 w-fit rounded-xl">
                  {event.title}
                </h1>
                <p className="text-lg sm:max-w-[80%] md:max-w-4xl text-gray-300 line-clamp-3">
                  {event.description}
                </p>
              </Link>

              <section className="w-full mt-5">
                <div className="grid grid-cols-3 lg:grid-cols-4 grid-rows-1 w-full gap-4 pb-5">
                  <div className="text-2xl text-center">
                    <h3>Days</h3>
                  </div>
                  <div className="text-2xl text-center">
                    <h3>Hours</h3>
                  </div>
                  <div className="text-2xl text-center">
                    <h3>Minutes</h3>
                  </div>
                  <div className="text-2xl text-center hidden lg:block">
                    <h3>Seconds</h3>
                  </div>
                </div>

                <div className="grid grid-cols-3 lg:grid-cols-4 grid-rows-1 w-full gap-4 ">
                  <div className="text-6xl text-center font-bold">
                    <p>
                      {String(timeLeft.days).padStart(2, event.start_datetime)}
                    </p>
                  </div>
                  <div className="text-6xl text-center font-bold">
                    <p>
                      {String(timeLeft.hours).padStart(2, event.start_datetime)}
                    </p>
                  </div>
                  <div className="text-6xl text-center font-bold">
                    <p>
                      {String(timeLeft.minutes).padStart(
                        2,
                        event.start_datetime
                      )}
                    </p>
                  </div>
                  <div className="text-6xl text-center font-bold hidden lg:block">
                    <p>
                      {String(timeLeft.seconds).padStart(
                        2,
                        event.start_datetime
                      )}
                    </p>
                  </div>
                </div>
              </section>

              <div className="flex justify-center lg:justify-start gap-5 mt-5">
                <Link
                  to="tel:+256767990709"
                  className="py-8 w-fit px-16 cursor-pointer bg-primary rounded-xl"
                >
                  <h4 className="text-neutral-100 text-2xl">Buy Ticket</h4>
                </Link>
              </div>
            </>
          )}

          <div className="flex  items-center w-fit space-x-4 mt-10">
            <Button className="aspect-square h-12 cursor-pointer hover:bg-primary/70 duration-300 bg-primary">
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button className="aspect-square h-12 cursor-pointer hover:bg-primary/70 duration-300 bg-primary">
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute h-full w-full bg-red-500 px-0 left-0 top-0 object-cover -z-10">
        {event ? (
          <img
            src={event.thumbnail}
            alt="imag"
            className="w-full h-full object-cover"
          />
        ) : (
          ""
        )}
        <img src={bgImage} alt="imag" className="w-full h-full object-cover" />
      </div>
    </Container>
  );
};

export default Hero;
