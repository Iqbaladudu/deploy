import { ShaderMaterial } from "three";

const DarkFilterShaderMaterial = new ShaderMaterial({
  uniforms: {
    tDiffuse: { value: null },
    uBoundingBox: { value: [0, 0, 1, 1] },
    uDarkenFactor: { value: 0.7 },
  },
  vertexShader: `
    varying vec2 vUv; 
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform vec4 uBoundingBox;
    uniform float uDarkenFactor;
    varying vec2 vUv;

    void main() {
      vec4 color = texture2D(tDiffuse, vUv);

      if (
        vUv.x >= uBoundingBox.x &&
        vUv.y >= uBoundingBox.y &&
        vUv.x <= uBoundingBox.x + uBoundingBox.z &&
        vUv.y <= uBoundingBox.y + uBoundingBox.w
      ) {
        // Inside the bounding box, so leave the color as is
      } else {
        // Outside the bounding box, apply the darkening effect
        color.rgb *= 1.0 - uDarkenFactor; 
      }

      gl_FragColor = color; 
    }
  `,
});

export default DarkFilterShaderMaterial;
