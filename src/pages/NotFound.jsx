import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="vh_md_100 d-flex justify-content-center">
      <div className="">
        <h1 className="my-5">404 - Page Not Found</h1>
        <p>We couldn't find the page you were looking for. Here are some options:</p>
        <ul>
          <li>Go back to the <Link to="/">homepage</Link>.</li>
          <li>Check the URL for any typos.</li>
        </ul>
      </div>
    </div>
  );
};

export default NotFound;