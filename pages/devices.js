import Header from "../components/header";
import { families, featureModels } from "./deviceData";

/*
Use cases:

# I heard about an interesting feature, CanIUse it?

Look for feature in appropriate section
*/

const FamilyTable = ({ children }) => (
  <div>
    {/*
    Good guide for tables here:
  https://developer.mozilla.org/en-US/docs/Learn/CSS/Styling_boxes/Styling_tables
    */}
    <style jsx>
      {`
        table {
          border-collapse: collapse;
          border: clear;
        }
        td,
        th {
          border-top: 2px solid #eee;
          padding: 0.5em;
        }
        th[scope="row"] {
          text-align: right;
        }
        td {
          font-size: 0.75em;
          text-align: center;
        }
        thead {
          position: -webkit-sticky;
        }
      `}
    </style>

    <table>
      <caption>
        A breakdown of each family of macOS, tvOS and iOS devices and their
        respective features in iOS 12 / tvOS 12 / macOS 10.14
      </caption>
      <thead>
        <tr>
          <th>Family</th>
          <th />
          <th>Devices</th>
          {featureModels.map(({ name }) => (
            <th>{name}</th>
          ))}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  </div>
);

const RenderTableValue = ({ value, type }) => {
  switch (type) {
    case "string":
      return value || "";
    case "boolean":
      return value ? "YES" : "NO";
    default:
      return value || "null";
  }
};

const Family = ({ name, tvName, gpu, devices, features }) => (
  <tr className="device_row">
    <style jsx>
      {`
        td ul li {
          list-style-type: none;
        }
      `}
    </style>
    <th scope="row">
      {name}
      {tvName ? (
        <>
          <br />
          {tvName}
        </>
      ) : null}
    </th>
    <td>
      <ul>
        {(gpu ? gpu : []).map(d => (
          <li key={d}>{d}</li>
        ))}
      </ul>
    </td>
    <td>
      <ul>
        {devices.map(d => (
          <li key={d}>{d}</li>
        ))}
      </ul>
    </td>
    {featureModels.map(({ type, key }) => (
      <td>
        <RenderTableValue type={type} key={key} />
      </td>
    ))}
  </tr>
);

export const Content = () => (
  <section>
    <h2>GPU Families</h2>
    <FamilyTable>
      {Object.entries(families).map(([key, value]) => (
        <Family key={key} {...value} />
      ))}
    </FamilyTable>

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
    <p>Sources:</p>
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
