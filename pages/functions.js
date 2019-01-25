import Link from "next/link";
import Header from "../components/header";

const Type = ({ children }) => (
  <>
    <style jsx>
      {`
        code.type_name {
          padding: 0.25em;
          border-radius: 4em;
          background: #eee;
          font-weight: bold;
          color: purple;
        }
      `}
    </style>
    <code className="type_name">{children}</code>{" "}
  </>
);

const MetalTypes = () => (
  <ul>
    <style jsx>
      {`
        li {
          padding: 0.5em;
        }
      `}
    </style>
    <li>
      {["float", "float2", "float3", "float4"].map(c => (
        <Type>{c}</Type>
      ))}
    </li>
    <li>
      {["half", "half2", "half3", "float4"].map(c => (
        <Type>{c}</Type>
      ))}
    </li>
  </ul>
);

const MetalCode = ({ children }) => (
  <pre className="code">
    <style jsx>
      {`
        pre {
          padding: 1em;
          background: #eee;
          overflow: scroll;
        }
      `}
    </style>
    <code>{children}</code>
  </pre>
);

export const Content = () => (
  <section>
    <h2>Metal Shading Language</h2>
    <MetalTypes />
    <MetalCode>
      {`fragment half4 fragShader(
        VertexStruct in         [[ stage_in   ]],
        texture2d<half> texture [[ texture(0) ]],
        constant Uniforms& u    [[ buffer(0)  ]])
{
  half3 color = texture.read(...);
  half3 final = u.brightness * color;
  return half4(final, 1.0);
}`}
    </MetalCode>
    <p />
  </section>
);

export default () => (
  <main>
    <Header />
    <Content />
  </main>
);
