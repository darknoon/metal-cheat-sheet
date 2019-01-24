import Link from "next/link";
import Theme from "./theme";
export default () => (
  <header>
    <Theme />
    <Link href="/">
      <h1>
        <a>Metal Cheat Sheet</a>
      </h1>
    </Link>

    <Link href="/about">
      <a>About Me</a>
    </Link>
  </header>
);
