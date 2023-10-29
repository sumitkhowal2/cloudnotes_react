import React from "react";
// import { Link } from "react-router-dom";
export default function Footer(props) {
  return (
    <div>
      <footer className="bg-dark text-light py-3">
        <div className="container">
          <div className="row">
            <div className="col-md-6 text-md-start text-center">
              <p>
                &copy; 2023{" "}
                <strong>
                  <a className="navbar-brand" href="/">{props.title}</a>
                  {/* <Link className="navbar-brand" to="/">
                    {props.title}
                  </Link> */}
                </strong>
                . All rights reserved.
              </p>
            </div>
            <div className="col-md-6 text-md-end text-center">
              <p>
                Design & Development by{" "}
                <strong>
                  <a className="navbar-brand" href="https://sumit-khowal-tech-company.business.site/" rel="noreferrer" target='_blank'>{props.name}</a>
                  {/* <Link
                    className="navbar-brand"
                    to="https://sumit-khowal-tech-company.business.site/"
                    target="_blank"
                  >
                    {props.name}
                  </Link> */}
                </strong>
              </p>
              <a className="nav-link active" aria-current="page" href="/">{props.homeText}</a>
              {/* <Link className="nav-link active" aria-current="page" to="/">
                {props.homeText}
              </Link> */}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}