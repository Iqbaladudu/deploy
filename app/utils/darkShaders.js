// eslint-disable-next-line import/no-anonymous-default-export
export default `
  precision mediump float;
  varying vec2 vTextureCoord;
  uniform sampler2D uSampler;
  uniform vec2 uBoundingBoxTopLeft;
  uniform vec2 uBoundingBoxBottomRight;
  uniform float uDarknessFactor; // Add this line

  void main() {
    vec4 color = texture2D(uSampler, vTextureCoord);

    if (vTextureCoord.x >= uBoundingBoxTopLeft.x && vTextureCoord.x <= uBoundingBoxBottomRight.x &&
        vTextureCoord.y >= uBoundingBoxTopLeft.y && vTextureCoord.y <= uBoundingBoxBottomRight.y) {
        // Inside the box, don't darken
        gl_FragColor = color; 
    } else {
        // Outside the box, apply darkening
        gl_FragColor = vec4(color.rgb * (1.0 - uDarknessFactor), color.a); 
    }
  }
`;
