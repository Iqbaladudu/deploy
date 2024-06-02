import React, { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { TextureLoader } from "three";
// import DarkFilterShaderMaterial from "@/app/shaders";

const MAX_NUM_BOXES = 10;

function ImageDarkFilter() {
  const meshRef = useRef();
  const [texture, setTexture] = useState(null);

  const [boundingBoxes, setBoundingBoxes] = useState([
    [0.25, 0.25, 0.25, 0.25],
  ]);

  React.useEffect(() => {
    const textureLoader = new TextureLoader();
    textureLoader.load("https://dummyimage.com/600x400", (tex) => {
      // Sample image URL
      setTexture(tex);
    });
  }, []);

  const addBoundingBox = () => {
    setBoundingBoxes([...boundingBoxes, [0.25, 0.25, 0.25, 0.25]]); // Add a new box with default values
  };

  const removeBoundingBox = (index) => {
    setBoundingBoxes(boundingBoxes.filter((_, i) => i !== index));
  };

  return (
    <>
      <mesh ref={meshRef}>
        {texture && (
          <DarkFilterShaderMaterial
            tDiffuse={texture}
            uBoundingBoxes={boundingBoxes}
          />
        )}
      </mesh>
    </>
  );
}

// eslint-disable-next-line react/display-name
const DarkFilterShaderMaterial = React.forwardRef(
  ({ tDiffuse, uBoundingBoxes }, _ref) => {
    const material = useRef();

    useEffect(() => {
      if (material.current) {
        material.current.uniforms.tDiffuse.value = tDiffuse;
        material.current.uniforms.uBoundingBoxes.value = uBoundingBoxes;
      }
    }, [tDiffuse, uBoundingBoxes]);

    return (
      <shaderMaterial
        ref={material}
        attach="material"
        uniforms={{
          tDiffuse: { value: null },
          uBoundingBoxes: { value: [] },
          uDarkenFactor: { value: 0.7 },
        }}
        vertexShader={`
          varying vec2 vUv; 
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          uniform sampler2D tDiffuse;
          uniform vec4 uBoundingBoxes[${MAX_NUM_BOXES}]; 
          uniform float uDarkenFactor;
          varying vec2 vUv;
  
          bool insideAnyBox(vec2 uv) {
            for (int i = 0; i < ${MAX_NUM_BOXES}; i++) {
              if (
                uv.x >= uBoundingBoxes[i].x &&
                uv.y >= uBoundingBoxes[i].y &&
                uv.x <= uBoundingBoxes[i].x + uBoundingBoxes[i].z &&
                uv.y <= uBoundingBoxes[i].y + uBoundingBoxes[i].w
              ) {
                return true;
              }
            }
            return false;
          }
  
          void main() {
            vec4 color = texture2D(tDiffuse, vUv);
  
            if (insideAnyBox(vUv)) {
              // Inside at least one box, leave color as is
            } else {
              // Outside all boxes, apply the darkening effect
              color.rgb *= 1.0 - uDarkenFactor; 
            }
            gl_FragColor = color; 
          }
        `}
      />
    );
  }
);

export default ImageDarkFilter;
