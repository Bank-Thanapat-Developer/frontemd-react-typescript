import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <section className="bg-red-300 py-20 text-center">
        <h1 className="text-4xl font-bold text-white">Welcome to Test App</h1>
        <p className="mt-4 text-xl text-yellow-50">
          Golang Echo & React Typescript
        </p>
        <div className="mt-8">
          <Link
            to="/login"
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg"
          >
            Get Started
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
