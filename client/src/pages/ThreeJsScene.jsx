import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import gsap from 'gsap';

const ThreeScene = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    const loadingBarElement = document.querySelector('.loading-bar');
    const bodyElement = document.querySelector('body');

    const scene = new THREE.Scene();

    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight
    };

    const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 1000);
    camera.position.z = 5;
    scene.add(camera);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true
    });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 2, 0);
    scene.add(directionalLight);

    const textureLoader = new THREE.TextureLoader();
    const alphaShadow = textureLoader.load('/assets/texture/simpleShadow.jpg');

    const sphereShadow = new THREE.Mesh(
      new THREE.PlaneGeometry(1.5, 1.5),
      new THREE.MeshBasicMaterial({
        transparent: true,
        color: 0x000000,
        opacity: 0.5,
        alphaMap: alphaShadow
      })
    );
    sphereShadow.rotation.x = -Math.PI * 0.5;
    sphereShadow.position.y = -1;
    sphereShadow.position.x = 1.5;
    scene.add(sphereShadow);

    const overlayGeometry = new THREE.PlaneGeometry(2, 2, 1, 1);
    const overlayMaterial = new THREE.ShaderMaterial({
      vertexShader: `
        void main() {
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uAlpha;
        void main() {
          gl_FragColor = vec4(0.0, 0.0, 0.0, uAlpha);
        }
      `,
      uniforms: {
        uAlpha: { value: 1.0 }
      },
      transparent: true
    });

    const overlay = new THREE.Mesh(overlayGeometry, overlayMaterial);
    scene.add(overlay);

    let donut = null;

    const loadingManager = new THREE.LoadingManager(
      () => {
        setTimeout(() => {
          gsap.to(overlayMaterial.uniforms.uAlpha, {
            duration: 3,
            value: 0,
            delay: 1
          });
          loadingBarElement.classList.add('ended');
          bodyElement.classList.add('loaded');
          loadingBarElement.style.transform = '';
        }, 500);
      },
      (itemUrl, itemsLoaded, itemsTotal) => {
        const progressRatio = itemsLoaded / itemsTotal;
        loadingBarElement.style.transform = `scaleX(${progressRatio})`;
      },
      () => {}
    );

    const gltfLoader = new GLTFLoader(loadingManager);
    gltfLoader.load('/assets/donut/scene.gltf', (gltf) => {
      donut = gltf.scene;
      const radius = 8.5;
      donut.position.x = 1.5;
      donut.rotation.x = Math.PI * 0.2;
      donut.rotation.z = Math.PI * 0.15;
      donut.scale.set(radius, radius, radius);
      scene.add(donut);
    });

    const clock = new THREE.Clock();
    let lastElapsedTime = 0;

    const tick = () => {
      const elapsedTime = clock.getElapsedTime();
      const deltaTime = elapsedTime - lastElapsedTime;
      lastElapsedTime = elapsedTime;

      if (donut) {
        donut.position.y = Math.sin(elapsedTime * 0.5) * 0.1 - 0.1;
        sphereShadow.material.opacity = (1 - Math.abs(donut.position.y)) * 0.3;
      }

      renderer.render(scene, camera);
      window.requestAnimationFrame(tick);
    };

    tick();

    window.addEventListener('resize', () => {
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();
      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });

    window.onbeforeunload = function () {
      window.scrollTo(0, 0);
    };
  }, []);

  return <canvas ref={canvasRef} className="webgl"></canvas>;
};

export default ThreeScene;
