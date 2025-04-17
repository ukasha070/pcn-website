import Container from "./Container";
// import {
//   arseneKakaImg,
//   igetMahesheImg,
//   ukashaHacksImg,
//   kimzImg,
// } from "@/assets";

// import { Link } from "react-router-dom";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
// import { Facebook, Instagram, Youtube } from "lucide-react";

export function ValuesAccordion() {
  return (
    <Accordion type="single" collapsible className="w-full max-w-2xl">
      <AccordionItem value="item-1">
        <AccordionTrigger className="text-lg">
          1. Love and Compassion
        </AccordionTrigger>
        <AccordionContent className="text-base">
          Love and have compassion for refugees as Jesus Christ did for us.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-2">
        <AccordionTrigger className="text-lg">
          2. Service and Sacrifice
        </AccordionTrigger>
        <AccordionContent className="text-base">
          Serve refugees and sacrifice for their well-being, as Jesus Christ
          sacrificed for us.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-3">
        <AccordionTrigger className="text-lg">
          3. Hospitality and Welcome
        </AccordionTrigger>
        <AccordionContent className="text-base">
          Welcome refugees with hospitality and generosity, as the early church
          did for strangers and travelers.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-4">
        <AccordionTrigger className="text-lg">
          4. Faith and Hope
        </AccordionTrigger>
        <AccordionContent className="text-base">
          Live by faith and maintain hope in God, even in the most difficult and
          desperate situations.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-5">
        <AccordionTrigger className="text-lg">
          5. Integrity and Transparency
        </AccordionTrigger>
        <AccordionContent className="text-base">
          Act with integrity and transparency in all our actions and decisions,
          in accordance with the highest standards of responsibility and
          management.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-6">
        <AccordionTrigger className="text-lg">
          6. Respect and Dignity
        </AccordionTrigger>
        <AccordionContent className="text-base">
          Treat refugees with respect and dignity inherent as children of God.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-7">
        <AccordionTrigger className="text-lg">
          7. Solidarity and Community
        </AccordionTrigger>
        <AccordionContent className="text-base">
          Create a supportive and inclusive community for refugees, where they
          can find hope, strength, and opportunities to rebuild their lives.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-8">
        <AccordionTrigger className="text-lg">
          8. Justice and Equity
        </AccordionTrigger>
        <AccordionContent className="text-base">
          Promote justice and equity for refugees, providing them with equal
          opportunities and defending their rights.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

const AboutUs = () => {
  return (
    <Container>
      <div className="animate-onscroll">
        <h1 className="font-black text-2xl pb-2">About Us</h1>
        <span className="w-[4rem] rounded-full h-[.2rem] bg-primary block mb-10"></span>

        <p className="text-lg max-w-4xl">
          <b className="font-chealse">Prosfygas Christian Network</b> is a
          faith-based community dedicated to supporting Christian refugees.
          Guided by the love and teachings of Jesus Christ, we offer both
          spiritual and practical help to those in exile.
          <span className="block mt-2">
            We are committed to creating a welcoming space where refugees are
            treated with dignity, find hope, and have the opportunity to rebuild
            their lives.
          </span>
        </p>
      </div>

      {/* <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-10 my-14">
        <div className="w-full aspect-[4/5] relative rounded-3xl overflow-hidden cursor-pointer group animate-onscroll">
          <img
            src={igetMahesheImg}
            className="w-full h-full object-cover"
            alt="iget"
          />

          <div className="absolute h-full w-full bg-black/40 top-0 left-0 flex flex-end items-end justify-start p-10 opacity-0 delay-100 duration-300 ease-in group-hover:opacity-100 ">
            <div>
              <h3 className="text-2xl text-neutral-200 mb-5">
                Huggeti Maheshe
              </h3>
              <p className="text-neutral-200 text-lg">
                Founder and director of Prosfyges Network, dedicated to
                providing hope and opportunities for Christian refugees to
                rebuild their lives.
              </p>
            </div>
          </div>
        </div>
        <div className="w-full aspect-[4/5] relative rounded-3xl overflow-hidden cursor-pointer group animate-onscroll">
          <img
            src={arseneKakaImg}
            className="w-full h-full object-cover"
            alt="arsene kaka image"
          />

          <div className="absolute h-full w-full bg-black/40 top-0 left-0 flex flex-end items-end justify-start p-10 opacity-0 delay-100 duration-300 ease-in group-hover:opacity-100">
            <div>
              <h3 className="text-2xl text-neutral-200 mb-5">Arsene Kaka</h3>
              <p className="text-neutral-200 text-lg">
                Manager at Prosfges Christian make working work run smooth.
              </p>

              <div className="mt-10 flex gap-5">
                <Link
                  to="https://www.youtube.com/@arsenekakamusic1145"
                  target="_blank"
                  className="h-10 w-10 bg-neutral-100 rounded-xl flex items-center justify-center hover:bg-primary hover:text-primary-foreground duration-300 transition-ease-in"
                >
                  <div>
                    <Youtube className="w-5 h-5 fill-none duration-300 transition-ease-in" />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full aspect-[4/5] relative rounded-3xl overflow-hidden cursor-pointer group animate-onscroll">
          <img
            src={kimzImg}
            className="w-full h-full object-cover"
            alt="iget"
          />

          <div className="absolute h-full w-full bg-black/40 top-0 left-0 flex flex-end items-end justify-start p-10 opacity-0 delay-100 duration-300 ease-in group-hover:opacity-100 ">
            <div>
              <h3 className="text-2xl text-neutral-200 mb-5">
                Fredy musafiri Byamungu
              </h3>
              <p className="text-neutral-200 text-lg">
                Hi am the Project Manager at Prosfyges Christian Network
              </p>
            </div>
          </div>
        </div>
        <div className="w-full aspect-[4/5] relative rounded-3xl overflow-hidden cursor-pointer group animate-onscroll">
          <img
            src={ukashaHacksImg}
            className="w-full h-full object-cover"
            alt="arsene kaka image"
          />

          <div className="absolute h-full w-full bg-black/40 top-0 left-0 flex flex-end items-end justify-start p-10 opacity-0 delay-100 duration-300 ease-in group-hover:opacity-100">
            <div>
              <h3 className="text-2xl text-neutral-200 mb-5">Ukasha Katuntu</h3>
              <p className="text-neutral-200 text-lg">
                Simple Free Guy who works as a secretray and ICT personel at
                Prosfges Christian.
              </p>

              <div className="mt-10 flex gap-5">
                <Link
                  to="https://www.facebook.com/ukasha.kat.16"
                  target="_blank"
                  className="h-10 w-10 bg-neutral-100 rounded-xl flex items-center justify-center hover:bg-primary hover:text-primary-foreground duration-300 transition-ease-in"
                >
                  <div>
                    <Facebook className="w-5 h-5 stroke-none fill-current duration-300 transition-ease-in" />
                  </div>
                </Link>
                <Link
                  to="https://www.instagram.com/ukasha_hacks/"
                  target="_blank"
                  className="h-10 w-10 bg-neutral-100 rounded-xl flex items-center justify-center hover:bg-primary hover:text-primary-foreground duration-300 transition-ease-in"
                >
                  <div>
                    <Instagram className="w-5 h-5 fill-none duration-300 transition-ease-in" />
                  </div>
                </Link>
                <Link
                  to="https://www.youtube.com/@UkashaHacksCommunity"
                  target="_blank"
                  className="h-10 w-10 bg-neutral-100 rounded-xl flex items-center justify-center hover:bg-primary hover:text-primary-foreground duration-300 transition-ease-in"
                >
                  <div>
                    <Youtube className="w-5 h-5 fill-none duration-300 transition-ease-in" />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      <div className="animate-onscroll mt-10">
        <h1 className="font-black text-xl pb-2">Mission</h1>
        <span className="w-[4rem] rounded-full h-[.2rem] bg-primary block mb-10"></span>

        <div className="flex items-start gap-5 mb-10">
          <h3 className="font-black text-4xl">01</h3>
          <p className="text-lg max-w-4xl">
            We are called To be the hands and feet of jesus christ for christian
            refugees, providing them with concrete and spiritual support to
            overcome the challenges of life in exile.
          </p>
        </div>
      </div>

      <div className="animate-onscroll">
        <h1 className="font-black text-xl pb-2">Vision</h1>
        <span className="w-[4rem] rounded-full h-[.2rem] bg-primary block mb-10"></span>

        <div className="flex items-start gap-5 mb-10">
          <h3 className="font-black text-4xl">01</h3>
          <p className="text-lg max-w-4xl">
            Create a supportive and inclusive community for Christian refugees
            where they can find hope, strength and opportunities to rebuild
            their lives.
          </p>
        </div>
      </div>

      <div className="animate-onscroll">
        <h1 className="font-black text-xl pb-2">Our Values</h1>
        <span className="w-[4rem] rounded-full h-[.2rem] bg-primary block mb-10"></span>

        <ValuesAccordion />
      </div>
    </Container>
  );
};

export default AboutUs;
