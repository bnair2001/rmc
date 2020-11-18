import React from 'react';
import { Spinner } from 'reactstrap';

const LoadingSm = (props) => {
    return (
        <section className="h-100 m-5">
        <header className="container h-100">
          <div className="d-flex align-items-center justify-content-center h-100">
            <div className="d-flex flex-column">
            <Spinner color="dark" style={{ width: "2rem", height: "2rem" }} />
            </div>
          </div>
        </header>
      </section>
    );
}

export default LoadingSm;