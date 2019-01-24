import Header from "../components/header";
import { families } from "./deviceData";

const Family = ({ name, devices }) => (
  <tr className="device_row">
    <style jsx>
      {`
        td,
        th {
          padding: 1em;
        }
      `}
    </style>
    <td>
      <th>{name}</th>
    </td>
    <td>{devices ? devices.map(d => <li>{d}</li>) : null}</td>
  </tr>
);

export const Content = () => (
  <section>
    <h2>GPU Families</h2>
    <p>
      I found the tables from Apple pretty hard to read, so I built a cleaner
      table you can check out below.
    </p>

    <table>
      <tbody>
        {Object.entries(families).map(([key, value]) => (
          <Family {...value} />
        ))}
      </tbody>
    </table>
    <Sources />
  </section>
);

export default () => (
  <main>
    <Header />
    <Content />
  </main>
);

const Sources = () => (
  <>
    <p>Sources are:</p>
    <ul>
      <li>
        <a href="https://developer.apple.com/documentation/metal/mtlfeatureset?language=objc">
          MTLFeatureSet
        </a>
      </li>
      <li>
        <a href="https://developer.apple.com/metal/Metal-Feature-Set-Tables.pdf">
          Metal Feature Set tables
        </a>
      </li>
      <li>
        <a href="https://en.wikipedia.org/wiki/Apple-designed_processors">
          wikipedia
        </a>
      </li>
    </ul>
  </>
);
