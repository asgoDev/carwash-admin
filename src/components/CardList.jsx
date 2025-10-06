import ResumeCard from "./ResumeCard";

const CardList = ({ entityName, items, path }) => {
  return (
    <>
      {items.length === 0 ? (
        <p>{`No hay ${entityName} que mostrar.`}</p>
      ) : (
        <ul className="flex flex-col gap-4">
          {items.map((item) => {
            return <ResumeCard key={item._id} data={item} path={`${path}`} />;
          })}
        </ul>
      )}
    </>
  );
};

export default CardList;
