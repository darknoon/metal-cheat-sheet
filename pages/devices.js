import Header from "../components/header";
import {
  families,
  featureModels,
  iOSFamilies,
  macOSFamilies,
  tvOSFamilies
} from "./deviceData";
import { schemeLight } from "../components/theme";

const linkForTechName = techName =>
  `https://developer.apple.com/documentation/metal/mtlfeatureset/mtlfeatureset_${techName}`;

/*
Use cases:

# I heard about an interesting feature, CanIUse it?

Look for feature in appropriate section
*/

const PixelFormatTable = ({ value }) => {
  const setValue = new Set(value);

  return (
    <>
      {["Filter", "Write", "Color", "MSAA", "Resolve", "Blend"].map(v =>
        setValue.has(v) ? (
          <abbr
            className="pixel_format pixel_format_capable"
            title={`✓ Format can be used for ${v}`}
          >
            {v}
          </abbr>
        ) : (
          <abbr
            className="pixel_format pixel_format_missing"
            title={`∅ Format cannot be used for ${v}`}
          >
            <strikethrough>{v}</strikethrough>
          </abbr>
        )
      )}
      <style jsx>{`
        .pixel_format {
          display: block;
          padding: 0.3em 0.2em;
          font-size: 0.8em;
          border-radius: 2px;
          text-decoration: none;
          cursor: default;
        }
        .pixel_format_capable {
          color: ${schemeLight.foreground};
        }
        .pixel_format_missing {
          color: ${schemeLight.lightest};
        }
      `}</style>
    </>
  );
};

const Checkmark = ({ on }) =>
  on ? (
    <>
      <span className="boolean_true">✓</span>
    </>
  ) : (
    <span className="boolean_false" />
  );

const RenderTableValue = ({ value, type }) => {
  switch (type) {
    case "string":
      return value || "🤭";
    case "boolean":
      return <Checkmark on={value} />;
    case "pixelFormatCapability":
      return <PixelFormatTable value={value} />;
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

const RenderFamilyTable = ({ title, families }) => (
  <table>
    <caption>
      A breakdown of each family of macOS, tvOS and iOS devices and their
      respective features in iOS 12 / tvOS 12 / macOS 10.14
    </caption>
    <thead>
      <tr>
        <th scope="row">{title}</th>
        {Object.entries(families).map(([key, { techName }]) => (
          <td>
            <ul>
              <a href={linkForTechName(techName)}>{key[key.length - 1]}</a>
            </ul>
          </td>
        ))}
      </tr>
    </thead>

    <tbody>
      <tr>
        <th scope="row">Devices</th>
        {Object.entries(families).map(([key, { devices }]) => (
          <td key={key}>
            <ul>
              {devices.map(d => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </td>
        ))}
      </tr>

      <tr>
        <th scope="row">GPUs</th>
        {Object.entries(families).map(([key, { gpus }]) => (
          <td key={key}>
            <ul>
              {(gpus ? gpus : []).map(d => (
                <li className="yo" key={d}>
                  {d}
                </li>
              ))}
            </ul>
          </td>
        ))}
      </tr>

      <tr>
        <th scope="row">Latest Version</th>
        {Object.entries(families).map(([key, { featureVersion }]) => (
          <td>{featureVersion} </td>
        ))}
      </tr>

      {/* Generate feature rows */}
      {featureModels.map(({ key, name, type }, i) =>
        type == "sectionHeading" ? (
          <tr className="feature_section_title">
            <th title={key} colSpan={1 + Object.entries(families).length}>
              {name}
            </th>
          </tr>
        ) : (
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
        )
      )}
    </tbody>
    <style jsx>
      {`
        caption {
          display: none;
        }
        li {
          list-style-type: none;
        }
        ul {
          margin: 0;
          padding: 0;
        }
        .feature_row th {
          max-width: 10em;
          padding: 1em;
          text-align: right;
        }
        .feature_section_title {
          background: #eee;
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
          color: ${schemeLight.foreground};
          position: sticky;
          position: -webkit-sticky;
          top: 0;
          height: 2em;
        }
        thead td::after,
        thead th::after {
          content: "";
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 100%;
          border-bottom: 2px solid #eee;
        }
      `}
    </style>
  </table>
);

export const Content = () => (
  <>
    <section>
      <h2>iOS GPU Families</h2>
      <RenderFamilyTable title="iOS Family" families={iOSFamilies} />
    </section>
    <section>
      <h2>macOS GPU Families</h2>
      <RenderFamilyTable title="macOS Family" families={macOSFamilies} />
      <h3>Notes</h3>
      <p>
        Not all macOS Family 1v3 devices support raster order groups. You query
        MTLDevice rasterOrderGroupsSupported at runtime to check.
      </p>
    </section>
    <section>
      <h2>tvOS GPU Families</h2>
      <RenderFamilyTable title="tvOS Family" families={tvOSFamilies} />
    </section>
    <section>
      <Sources />
    </section>
  </>
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
