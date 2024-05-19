import { useSelector } from "react-redux";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <div>
      {user && <h1 className="heading center"> Welcome {user.name} </h1>}
    </div>
  );
};

export default Dashboard;
