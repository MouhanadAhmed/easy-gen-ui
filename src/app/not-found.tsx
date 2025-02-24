
import { Link } from "react-router-dom";


const NotFound = () => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-y-4">
      {/* 404 image */}
      {/* <img
        src={"/illustrations/404.svg"}
        width={1920 / 4}
        height={1080 / 4}
        alt="404 image"
      /> */}
      {/* 404 text */}
      <h2
        className="text-9xl font-bold"
        
      >
        404
      </h2>
      {/* 404 description */}
      <p>Oopz page not found</p>
      {/* go home link */}
      <Link to="/">
        <button >Go Home</button>
      </Link>
    </div>
  );
};
export default NotFound;
