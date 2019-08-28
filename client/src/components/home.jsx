import React from "react";
import Button from "react-bootstrap/Button";
import { getCurrentUser } from './../services/authService';

const Home = () => {

  const user = getCurrentUser();

  return (
    <div className="container-fluid mainContent">
      <div className="container">
        <div className="row">
          <div className="col col-5">
            <h1>Welcome to Helping</h1>
            {user && (
              <React.Fragment>
                <Button style={{"marginTop":"150px"}}className="btn btn-info btn-block" href="/planner">
                  Plan
                </Button>
                <Button style={{"marginTop":"10px"}}className="btn btn-info btn-block" href="/menuItem/new">
                  Create
                </Button>
              </React.Fragment>
            )}
            {!user && (
              <React.Fragment>
                <Button style={{"marginTop":"150px"}}className="btn btn-info btn-block" href="/login">
                  Login
                </Button>
                <Button style={{"marginTop":"10px"}}className="btn btn-info btn-block" href="/register">
                  Register
                </Button>
              </React.Fragment>
            )}
          </div>
          <div className="col col-7">
            <img
              className="img-thumbnail"
              style={{ width: "100%" }}
              src="/helpingGraphic.jpg"
              alt="Hands holding beautiful grapes."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
