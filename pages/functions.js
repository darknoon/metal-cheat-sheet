import Link from "next/link";
import Header from "../components/header";

export const Content = () => (
  <section>
    <h2>Metal Shading Language</h2>

    <p>
      <pre>
        {`
fragment half4 fragShader(VertexStruct in [[stage_in]],
        texture2d<half> texture [[ texture(0) ]],
        constant Uniforms<half_t>& uniforms [[ buffer(BufferIndexUniforms) ]])
{
  half3 rgb = ...;
  return half4(rgb, 1.0);
}
`}
      </pre>
    </p>
  </section>
);

export default () => (
  <main>
    <Header />
    <Content />
  </main>
);
