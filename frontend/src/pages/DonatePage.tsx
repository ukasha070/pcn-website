import React from "react";
import Container from "@/components/Container";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";

const DonatePage = () => {
  const [ammount, setAmmount] = React.useState<number | null>(null);
  return (
    <>
      <Navbar />
      <Container>
        <div>
          <div>
            <h1 className="font-black text-2xl pb-2">Donate</h1>
            <span className="w-[4rem] rounded-full h-[.2rem] bg-primary block mb-10"></span>
          </div>
          <h3 className="mt-6 mb-2 ">Why Donate to Us?</h3>
          <p className="mb-2 max-w-4xl">
            Your donation helps us share the love of Christ through action.
            Every gift supports the vulnerable, feeds the hungry, educates
            children, and brings hope to communities in need. Together, we can
            be the hands and feet of Jesus in this world.
          </p>

          <p className="text-base">
            Join us in helping people survive and rebuild their lives.
          </p>
          <b className="bold block mt-3">
            Give today — change a life forever.{" "}
          </b>
          <section className="mt-10  relative p-10">
            <ul className="flex items-center gap-5">
              <li>
                <Button onClick={() => setAmmount(10)} className="px-5 py-6">
                  $ 10
                </Button>
              </li>
              <li>
                <Button onClick={() => setAmmount(30)} className="px-5 py-6">
                  $ 30
                </Button>
              </li>
              <li>
                <Button onClick={() => setAmmount(40)} className="px-5 py-6">
                  $ 40
                </Button>
              </li>
              <li>
                <Button onClick={() => setAmmount(50)} className="px-5 py-6">
                  $ 50
                </Button>
              </li>
              <li>
                <Button onClick={() => setAmmount(100)} className="px-5 py-6">
                  $ 100
                </Button>
              </li>
            </ul>

            <div className="relative mt-10">
              <span className="absolute top-[3.1rem] left-3">$</span>
              <h3>Amount</h3>
              <input
                type="number"
                placeholder="$ 0.00"
                value={ammount ? ammount : ""}
                onChange={(e) => setAmmount(Number(e.target.value))}
                className="w-full border-2 border-primary mt-2 oultine-none h-14 pl-7 px-5 rounded-md"
              />
            </div>

            <Button className="mt-10 p-8 py-6 text-white border-2 border-primary rounded-full bg-transparent">
              <h2 className="text-base">Continue</h2>
            </Button>

            <div className="absolute h-full w-full bg-primary/50 top-0 left-0 flex items-center justify-center">
              <div className="bg-primary-foreground text-primary p-5 rounded-lg tex-center max-w-xs flex flex-col space-y-3">
                <p>This is page is not working updates are coming over it</p>
                <h4 className="text-center">Thank You</h4>
              </div>
            </div>
          </section>
        </div>
      </Container>
    </>
  );
};

export default DonatePage;
