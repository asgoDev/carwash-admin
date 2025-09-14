import { Link } from "react-router-dom";

const ResumeCard = ({ data, path }) => {
  const { id, firstName = "hey", lastName } = data;
  return (
    <li className="bg-white border-l-5 border-b-1 border-gray-300 rounded-lg hover:border-blue-500 hover:scale-[1.01] transition-all duration-100 cursor-pointer shadow-md">
      <Link to={`${path}/${id}`} className="block px-4 py-2">
        <span>{id}</span>
        <h3 className="text-xl font-semibold">{`${firstName} ${lastName}`}</h3>
      </Link>
    </li>
  );
};

export default ResumeCard;
