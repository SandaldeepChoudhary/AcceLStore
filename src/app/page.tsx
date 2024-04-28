import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ProductReel from "@/components/ProductReel";
import { buttonVariants } from "@/components/ui/button";
import { Button } from "@/components/ui/button";
import { ArrowDownToLine, CheckCircle, Leaf, Shield } from "lucide-react";
import Link from "next/link";

const perks = [
  {
    name: "Instant Delivery",
    Icon: ArrowDownToLine,
    description:
      "Your assets will be delivered to your email in seconds, and you can immediately download them.",
  },
  {
    name: "Guaranteed Quality",
    Icon: CheckCircle,
    description:
      "Our team verifies every asset on our platform to ensure that it meets our high quality standards. Not happy? We offer a 30-days refund guarantee.",
  },
  {
    name: "For the planet",
    Icon: Leaf,
    description:
      "We have pledged 1% of our sales to environmental preservation and restoration.",
  },
  {
    name: "100% Virus free",
    Icon: Shield,
    description:
      "Our team thoroughly tests each asset to ensure that the product you receive is free of any harm.",
  },
];

export default function Home() {
  return (
    <>
      <MaxWidthWrapper>
        <div className="py-20 mx-auto text-center flex flex-col items-center max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Your online store for premium {" "}
            <span className="text-[#3BB270]">digital assets</span>.
          </h1>
          <p className="mt-6 text-lg max-w-prose text-muted-foreground">
          AcceLStore welcomes you. Our team verifies each asset on the platform to guarantee that it meets our strict quality standards.{" "}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Link href="/products" className={buttonVariants()}>
              Browse Trending
            </Link>
            <Button variant="ghost">Our Quality Promise &rarr;</Button>
          </div>
        </div>

        <ProductReel
          query={{ sort: "desc", limit: 4 }}
          title="Brand new"
          href="/products"
        />
      </MaxWidthWrapper>
      <section className="border-t border-gray-200 bg-gray-50">
        <MaxWidthWrapper className="py-20">
          <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-col-3 lg:gap-x-8 lg:gap-y-0">
            {perks.map((perk) => (
              <div
                key={perk.name}
                className="text-center md:flex md:items-start md:text-left lg:block lg:text-center"
              >
                <div className="md:flex-shrink-0 flex justify-center">
                  <div className="h-16 w-16 flex items-center justify-center rounded-full bg-green-100 text-[#3BB270]">
                    {<perk.Icon className="w-1/3 h-1/3" />}
                  </div>
                </div>
                <div className="mt-6 mb-4 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6">
                  <h3 className="text-base font-medium text-gray-900">
                    {perk.name}
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground">
                    {perk.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </MaxWidthWrapper>
      </section>
    </>
  );
}
