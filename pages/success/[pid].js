import React from 'react';
import { useRouter } from 'next/router'
import { Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';


const Success = (props) => {
    const router = useRouter()
    const { pid } = router.query;
  return (
    <section className="h-100 m-5">
            <header className="container h-100">
                <div className="d-flex align-items-center justify-content-center h-100">
                    <div className="d-flex flex-column">
                        <Card body>
                            <CardTitle tag="h5">Success</CardTitle>
                            <CardText>You can go to the course page by clicking below.</CardText>
                            <Button color="dark" href ={"/course/"+pid}>Show course page</Button>
                        </Card>
                    </div>
                </div>
            </header>
        </section>
      
  );
};


export default Success;

