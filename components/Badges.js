import React from "react";
import styles from "../styles/Badges.module.css";

class Badges extends React.Component {
  render() {
    return (
      // <Container width="100" height="100">
        <div className={styles.main}>
          <p className={styles.badge}>Friendly</p>
          <p className={styles.badge}>Lecture-heavy</p>
          <p className={styles.badge}>Homework</p>
          <p className={styles.badge}>Makes you work</p>
          <p className={styles.badge}>Tough Grader</p>
        </div>
      // </Container>
      );
  }
}

export default Badges;