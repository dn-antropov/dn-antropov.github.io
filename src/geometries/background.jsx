import { FullScreenQuad } from 'three/addons/postprocessing/Pass.js';
import {Euler, Quaternion, ShaderMaterial, Vector2, Vector3} from 'three';
import {useMemo} from "react";


const vertexShader = `
void main() {
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;
import fragmentShader from '../shaders/background.glsl';
import {useFrame} from "@react-three/fiber";

export default function Background(props) {
    
    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        winResolution: {
            value: new Vector2(
                window.innerWidth,
                window.innerHeight
            ).multiplyScalar(Math.min(window.devicePixelRatio, 2))
        },
        desaturation: {value: 0},
    }), []);

    const shaderMaterial = useMemo(() => new ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms,
    }), [uniforms]);

    useFrame((state) => {
        const { gl} = state;
        shaderMaterial.uniforms.uTime.value = state.clock.getElapsedTime();
        gl.getDrawingBufferSize(shaderMaterial.uniforms.winResolution.value);
        shaderMaterial.uniforms.desaturation.value = 0.5;
    });
    
    return (
        <mesh material={shaderMaterial} frustumCulled={false} renderOrder={-1}>
            <planeGeometry args={[2, 2]} />
        </mesh>
    )
}