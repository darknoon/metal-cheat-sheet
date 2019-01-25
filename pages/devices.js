import Header from "../components/header";
import { families, featureModels, iOSFamilies } from "./deviceData";

/*
Use cases:

# I heard about an interesting feature, CanIUse it?

Look for feature in appropriate section
*/

const RenderTableValue = ({ value, type }) => {
  switch (type) {
    case "string":
      return value || "🤭";
    case "boolean":
      return value ? (
        <span className="boolean_true">✓</span>
      ) : (
        <span className="boolean_false" />
      );
    case "array":
      return (
        <ul>
          {value ? value.map(v => <li>{v}</li>) : "[]"}{" "}
          <style jsx>
            {`
              li {
                list-style-type: none;
              }
              ul {
                margin: 0;
                padding: 0;
              }
            `}
          </style>
        </ul>
      );
    case "number":
      return <span className="number">{value}</span>;
    default:
      return value || "null";
  }
};

const RenderFamilyTable = ({ families }) => (
  <table>
    <caption>
      A breakdown of each family of macOS, tvOS and iOS devices and their
      respective features in iOS 12 / tvOS 12 / macOS 10.14
    </caption>
    <thead>
      <tr>
        <th scope="row">GPUs</th>
        {Object.entries(families).map(([key, { gpu }]) => (
          <td>
            <ul>
              {(gpu ? gpu : []).map(d => (
                <li className="yo" key={d}>
                  {d}
                </li>
              ))}
            </ul>
          </td>
        ))}
      </tr>
    </thead>

    <tbody>
      {/* Generate header with each GPU family */}
      <tr>
        <th scope="row">Devices</th>
        {Object.entries(families).map(([key, { devices }]) => (
          <td>
            <ul>
              {devices.map(d => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </td>
        ))}
      </tr>

      {/* Generate feature rows */}
      {featureModels.map(({ key, name, type }, i) => (
        <tr className="feature_row">
          <th title={key}>{name}</th>
          {Object.entries(families)
            .map(([_, family]) => family.features[key])
            .map(featureValue => (
              <td>
                <RenderTableValue
                  type={type}
                  value={featureValue}
                  key={key + i}
                />
              </td>
            ))}
        </tr>
      ))}
    </tbody>
    <style jsx>
      {`
        caption {
          display: none;
        }
        li {
          list-style-type: none;
        }
        .feature_row th {
          max-width: 10em;
          padding: 1em;
          text-align: right;
        }
        table {
          border-collapse: collapse;
          border: clear;
        }
        td,
        th {
          border-bottom: 2px solid #eee;
          padding: 0.5em;
        }
        th[scope="row"] {
          text-align: right;
        }
        td {
          text-align: center;
        }
        tbody {
          font-size: 0.75em;
        }
        thead tr {
          background: white;
        }
        thead th,
        thead td {
          background: white;
          color: black;
          position: sticky;
          position: -webkit-sticky;
          top: 0;
          z-index: 10;
        }
      `}
    </style>
  </table>
);

export const Content = () => (
  <section>
    <h2>iOS GPU Families</h2>
    <RenderFamilyTable families={iOSFamilies} />
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
