const ResumeCard = ({ data }) => {
  const { id, firstName = "hey", lastName } = data;
  return (
    <article className="bg-white px-4 py-2 border-l-5 border-b-1 border-gray-300 rounded-lg hover:border-blue-500 hover:scale-[1.01] transition-all duration-100 cursor-pointer shadow-md">
      <span>{id}</span>
      <h3 className="text-xl font-semibold">{`${firstName} ${lastName}`}</h3>
    </article>
  );
};

export default ResumeCard;
