import Carousel from "@/components/Carousel";

export default function Home() {
  return (
    <main>
      <Carousel />
      <section className="mx-auto max-w-[95vw] lg:max-w-[80vw] my-20 bg-neutral p-[3vw] rounded-lg">
        <h2 className="text-4xl font-bold text-center my-3">
          Mission and vission
        </h2>
        <p className="text-lg my-3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat
          suscipit facilis natus inventore non nostrum debitis delectus
          praesentium quibusdam ullam optio accusamus quaerat placeat, minus
          fuga reprehenderit corrupti. Maiores repellendus hic deleniti a rerum
          fugit blanditiis ab rem, totam itaque minima qui eveniet harum
          suscipit odit, laborum ut vitae illo?
        </p>
      </section>
    </main>
  );
}
