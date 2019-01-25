import { Component } from "react";
import Link from "next/link";
import Header from "../components/header";

class AboutPage extends Component {
  render() {
    return (
      <main>
        <Header />
        <section>
          by{" "}
          <p>
            <Link href="https://darknoon.com">
              <a>Andrew Pouliot</a>
            </Link>
          </p>
        </section>
      </main>
    );
  }
}

export default AboutPage;
