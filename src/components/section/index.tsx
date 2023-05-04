import Card from "../card";

interface Props {
  items: {
    id: string;
    title: string;
    imageSrc: string;
    description: string;
  }[];
  size: CardSize;
  title: string;
}

const Section = (props: Props) => {
  return (
    <section>
      <h3 className="text-xl font-bold px-4 lg:px-8 top-4 relative">
        {props.title}
      </h3>
      <div className="px-4 lg:px-8 py-6 flex gap-3 w-screen max-w-[100vw] overflow-x-auto">
        {props.items.map((i) => (
          <Card
            key={i.id}
            size={props.size}
            description={i.description}
            title={i.title}
            imageSrc={i.imageSrc}
          />
        ))}
      </div>
    </section>
  );
};

export default Section;
