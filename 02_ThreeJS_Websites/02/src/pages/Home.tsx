/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from "react";
import gsap from "gsap";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import { GUI } from "dat.gui";
import { useNavigate } from "react-router-dom";

const Home = (): React.JSX.Element => {
  const navigate = useNavigate();

  const containerRef = React.useRef<HTMLDivElement>(null);

  //* Render twice only in StrictMode!
  React.useEffect(() => {
    const currentContainer = containerRef.current as HTMLDivElement;

    if (currentContainer) {
      const raycaster: THREE.Raycaster = new THREE.Raycaster();
      const scene: THREE.Scene = new THREE.Scene();
      const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);
      const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer();

      renderer.setSize(innerWidth, innerHeight);
      renderer.setPixelRatio(devicePixelRatio);
      const canvasElement = renderer.domElement as HTMLCanvasElement;
      currentContainer.appendChild(canvasElement);

      const light: THREE.DirectionalLight = new THREE.DirectionalLight(0xffffff, 1);
      light.position.set(0, -1, 1);
      scene.add(light);

      const backLight: THREE.DirectionalLight = new THREE.DirectionalLight(0xffffff, 1);
      backLight.position.set(0, 0, -1);
      scene.add(backLight);

      new OrbitControls(camera, canvasElement);
      camera.position.z = 50;

      const gui: dat.GUI = new GUI();

      const world = {
        plane: {
          width: 400,
          height: 400,
          widthSegments: 50,
          heightSegments: 50,
        },
      };

      gui.add(world.plane, "width", 1, 500).onChange(generatePlane);
      gui.add(world.plane, "height", 1, 500).onChange(generatePlane);
      gui.add(world.plane, "widthSegments", 1, 100).onChange(generatePlane);
      gui.add(world.plane, "heightSegments", 1, 100).onChange(generatePlane);

      function generatePlane(): void {
        planeMesh.geometry.dispose();
        planeMesh.geometry = new THREE.PlaneGeometry(
          world.plane.width,
          world.plane.height,
          world.plane.widthSegments,
          world.plane.heightSegments
        );

        // Vertices position randomization
        const { array }: { array: THREE.TypedArray } = planeMesh.geometry.attributes.position; //* Float32Array

        const randomValues = [] as number[];
        for (let i = 0; i < array.length; i++) {
          if (i % 3 === 0) {
            const x = array[i];
            const y = array[i + 1];
            const z = array[i + 2];

            array[i] = x + (Math.random() - 0.75) * 5;
            array[i + 1] = y + (Math.random() - 0.75) * 5;
            array[i + 2] = z + (Math.random() - 0.75) * 5;
          }
          randomValues.push(Math.random() * Math.PI * 2);
        }

        // @ts-expect-error
        planeMesh.geometry.attributes.position.randomValues = randomValues;
        // @ts-expect-error
        planeMesh.geometry.attributes.position.originalPosition = planeMesh.geometry.attributes.position.array;

        const colors = [] as number[];
        for (let i = 0; i < planeMesh.geometry.attributes.position.count; i++) {
          // Todo: refactor
          colors.push(0, 0.19, 0.4);
        }
        planeMesh.geometry.setAttribute("color", new THREE.BufferAttribute(new Float32Array(colors), 3));
      }

      const planeGeometry: THREE.PlaneGeometry = new THREE.PlaneGeometry(
        world.plane.width,
        world.plane.height,
        world.plane.widthSegments,
        world.plane.heightSegments
      );

      const planeMaterial: THREE.MeshPhongMaterial = new THREE.MeshPhongMaterial({
        side: THREE.DoubleSide,
        flatShading: true,
        vertexColors: true,
      });

      const planeMesh: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshPhongMaterial, THREE.Object3DEventMap> = new THREE.Mesh(
        planeGeometry,
        planeMaterial
      );

      scene.add(planeMesh);
      generatePlane();

      //* Stars
      const starGeometry: THREE.BufferGeometry<THREE.NormalBufferAttributes> = new THREE.BufferGeometry();
      const starMaterial: THREE.PointsMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
      });

      const starVertices = [] as number[];
      for (let i = 0; i < 10000; i++) {
        const x = (Math.random() - 0.5) * 2000;
        const y = (Math.random() - 0.5) * 2000;
        const z = (Math.random() - 0.5) * 2000;
        starVertices.push(x, y, z);
      }
      starGeometry.setAttribute("position", new THREE.Float32BufferAttribute(starVertices, 3));

      console.log("starVertices:", starVertices);
      console.log("starGeometry:", starGeometry);
      console.log("starMaterial:", starMaterial);

      const stars: THREE.Points<
        THREE.BufferGeometry<THREE.NormalBufferAttributes>,
        THREE.PointsMaterial,
        THREE.Object3DEventMap
      > = new THREE.Points(starGeometry, starMaterial);
      scene.add(stars);

      const mouse = {
        x: undefined as number | undefined,
        y: undefined as number | undefined,
      } as THREE.Vector2;

      let frame = 0;
      function animate(): void {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
        raycaster.setFromCamera(mouse as THREE.Vector2, camera);
        frame += 0.01;

        // @ts-expect-error
        const { array, originalPosition, randomValues } = planeMesh.geometry.attributes.position;
        for (let i = 0; i < array.length; i += 3) {
          // X coordinate
          array[i] = originalPosition[i] + Math.cos(frame + randomValues[i]) * 0.01;

          // Y coordinate
          array[i + 1] = originalPosition[i + 1] + Math.sin(frame + randomValues[i + 1]) * 0.001;
        }

        planeMesh.geometry.attributes.position.needsUpdate = true;

        const intersects: THREE.Intersection<THREE.Object3D<THREE.Object3DEventMap>>[] =
          raycaster.intersectObject(planeMesh);

        if (intersects.length > 0) {
          // @ts-expect-error
          const { color } = intersects[0].object.geometry.attributes;

          // Vertice 1
          color.setX(intersects[0].face?.a, 0.1);
          color.setY(intersects[0].face?.a, 0.5);
          color.setZ(intersects[0].face?.a, 1);

          // Vertice 2
          color.setX(intersects[0].face?.b, 0.1);
          color.setY(intersects[0].face?.b, 0.5);
          color.setZ(intersects[0].face?.b, 1);

          // Vertice 3
          color.setX(intersects[0].face?.c, 0.1);
          color.setY(intersects[0].face?.c, 0.5);
          color.setZ(intersects[0].face?.c, 1);

          // @ts-expect-error
          intersects[0].object.geometry.attributes.color.needsUpdate = true;

          // Todo: refactor
          const initialColor = {
            r: 0,
            g: 0.19,
            b: 0.4,
          };

          const hoverColor = {
            r: 0.1,
            g: 0.5,
            b: 1,
          };

          gsap.to(hoverColor, {
            r: initialColor.r,
            g: initialColor.g,
            b: initialColor.b,
            duration: 1,
            onUpdate: () => {
              // vertice 1
              color.setX(intersects[0].face?.a, hoverColor.r);
              color.setY(intersects[0].face?.a, hoverColor.g);
              color.setZ(intersects[0].face?.a, hoverColor.b);

              // vertice 2
              color.setX(intersects[0].face?.b, hoverColor.r);
              color.setY(intersects[0].face?.b, hoverColor.g);
              color.setZ(intersects[0].face?.b, hoverColor.b);

              // vertice 3
              color.setX(intersects[0].face?.c, hoverColor.r);
              color.setY(intersects[0].face?.c, hoverColor.g);
              color.setZ(intersects[0].face?.c, hoverColor.b);
              color.needsUpdate = true;
            },
          });
        }

        stars.rotation.x += 0.0005;
      }
      animate();

      //* Mouse move event listener
      const handleMouseMove = (event: MouseEvent): void => {
        //* Center of the screen
        mouse.x = (event.clientX / innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / innerHeight) * 2 + 1;
      };

      window.addEventListener("mousemove", handleMouseMove);

      //* Text animations (GSAP)
      gsap.to("#MR", {
        opacity: 1,
        duration: 1.5,
        y: 0,
        ease: "expo.out",
      });

      gsap.to("#oneWithAn", {
        opacity: 1,
        duration: 1.5,
        delay: 0.3,
        y: 0,
        ease: "expo.out",
      });

      gsap.to("#viewWorkBtn", {
        opacity: 1,
        duration: 1.5,
        delay: 0.6,
        y: 0,
        ease: "expo.out",
      });

      //* Camera movement on button click
      const viewWorkBtn = document.querySelector("#viewWorkBtn") as HTMLAnchorElement;

      const handleViewWorkClick = (event: MouseEvent): void => {
        event.preventDefault();
        gsap.to("#container", {
          opacity: 0,
        });

        // https://gsap.com/docs/v3/Eases
        gsap.to(camera.position, {
          z: 25,
          ease: "power3.inOut",
          duration: 2,
        });
        gsap.to(camera.rotation, {
          x: 1.57,
          ease: "power3.inOut",
          duration: 2,
        });

        gsap.to(camera.position, {
          y: 1000,
          ease: "power3.in",
          duration: 1,
          delay: 2,
          onComplete: (): void => {
            // window.location.href = "https://michal-radomski.github.io" as string & Location;
            navigate("/work");
          },
        });
      };

      if (viewWorkBtn) {
        viewWorkBtn.addEventListener("click", handleViewWorkClick);
      }

      // Resize event listener
      const handleResize = (): void => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };

      window.addEventListener("resize", handleResize);

      return () => {
        if (currentContainer && renderer.domElement) {
          currentContainer.removeChild(renderer.domElement);
          gui.destroy(); // Cleanup on unmount

          window.removeEventListener("mousemove", handleMouseMove);
          window.removeEventListener("resize", handleResize);
          if (viewWorkBtn) {
            viewWorkBtn.removeEventListener("click", handleViewWorkClick);
          }
        }
      };
    }
  }, [navigate]);

  return (
    <React.Fragment>
      <div ref={containerRef}>
        <div id="app">
          <div
            id="container"
            className="absolute text-white text-center w-full max-w-2xl px-6"
            style={{ top: "50%", transform: `translate(-50%, -50%)`, left: "50%" }}
          >
            <h1 id="MR" className="text-sm uppercase tracking-wide opacity-0" style={{ transform: "translateY(30px)" }}>
              MR
            </h1>
            <p id="oneWithAn" className="font-exo text-4xl opacity-0" style={{ transform: "translateY(30px)" }}>
              ONE WITH AN EVERLASTING DESIRE FOR THE UNKNOWN & UNTOLD
            </p>
            <a
              id="viewWorkBtn"
              // href="https://michal-radomski.github.io"
              className="border px-4 py-2 rounded-lg text-sm uppercase mt-8 hover:bg-white hover:text-gray-800 inline-block opacity-0"
              style={{ transform: "translateY(30px)", cursor: "pointer" }}
            >
              View Work
            </a>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Home;
