import Link from "next/link";
import Header from "../components/header";

import { Content as Devices } from "./devices";

import { Content as Functions } from "./functions";

export default () => (
  <main>
    <Header />
    <Functions />
    <Devices />
  </main>
);
