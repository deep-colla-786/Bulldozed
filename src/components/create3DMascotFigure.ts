import * as THREE from "three";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";
import { MASCOT_PATH_DATA, EYE_PATH_DATA } from "./drawBulldozedLogoOnCanvas";

/**
 * Builds a realistic 3D Extruded Bulldozed Mascot Runner Mesh Group
 */
export function create3DMascotFigure(options: {
  depth?: number;
  bevelSize?: number;
  scale?: number;
  material?: THREE.Material;
} = {}): THREE.Group {
  const group = new THREE.Group();

  const {
    depth = 0.22,
    bevelSize = 0.035,
    scale = 0.022,
    material,
  } = options;

  const svgLoader = new SVGLoader();
  const svgMarkup = `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <path d="${MASCOT_PATH_DATA}" />
  </svg>`;

  const svgData = svgLoader.parse(svgMarkup);

  const defaultMat = material || new THREE.MeshPhysicalMaterial({
    color: 0xf5f5f5,
    metalness: 0.88,
    roughness: 0.18,
    clearcoat: 1.0,
    clearcoatRoughness: 0.08,
    reflectivity: 1.0,
  });

  svgData.paths.forEach((path) => {
    const shapes = path.toShapes();
    shapes.forEach((shape) => {
      const geometry = new THREE.ExtrudeGeometry(shape, {
        depth,
        bevelEnabled: true,
        bevelSegments: 5,
        steps: 1,
        bevelSize,
        bevelThickness: bevelSize,
      });

      geometry.center();
      // SVGLoader coordinates are flipped along Y
      geometry.rotateZ(Math.PI);
      geometry.rotateY(Math.PI);

      const mesh = new THREE.Mesh(geometry, defaultMat);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      group.add(mesh);
    });
  });

  group.scale.set(scale, scale, scale);

  return group;
}
