import React from 'react';
import { Spinner } from 'reactstrap';

const Loading = (props) => {
    return (
        <section className="h-100 m-5">
        <header className="container h-100">
          <div className="d-flex align-items-center justify-content-center h-100">
            <div className="d-flex flex-column">
            <Spinner color="dark" style={{ width: "5rem", height: "5rem" }} />
            </div>
          </div>
        </header>
      </section>
    );
}

export default Loading;