import { Card } from "@/src/components/card";
import realisations from "@/public/realisations.json";
import { Realisation } from "@/app/mes-realisations/page";

export function CardsList(props: { filter: string }) {
  return (
    <>
      {realisations.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-9">
          {realisations
            .filter((item) =>
              props.filter !== "all" ? item.type === props.filter : item
            )
            .map((el: Realisation, index) => {
              return (
                <div className="fade-in" key={index}>
                  <Card card={el} />
                </div>
              );
            })}
        </div>
      )}
    </>
  );
}
