import { Canvas as Canvas3d } from "@react-three/fiber";
import { OrbitControls, Sky } from "@react-three/drei";

import DecorItem from "../elements/DecorItem";
import Wall from "../elements/Wall";
import Glass from "../elements/Glass";
import FrameBox from "../elements/FrameBox";

const Canvas = ({ size, decor }) => {
  let { height, width } = size;
  width = width / 50; // translate cm to units in 3d
  height = height / 50; // translate cm to units in 3d

  const bigFrame = 0.2; // ширина широкой внешней рамки

  const lowestPoint = 1.5 - bigFrame / 2; // нижняя грань
  const upperMiddlePoint = lowestPoint + height - bigFrame / 2; // позиция на оси y, куда должна ставиться верхняя рамка
  const vertMiddlePoint = height / 2 + lowestPoint; // позиция середины для элементов по y оси
  const widthOfInnersHor = width - bigFrame * 2;
  const heightOfInnerVert = height - bigFrame * 2;

  // objects of chosen decor
  const topDecor = decor.filter((e) => e.name === "Верх")[0]?.chosen;
  const middleDecor = decor.filter((e) => e.name === "Середина")[0]?.chosen;
  const bottomDecor = decor.filter((e) => e.name === "Низ")[0]?.chosen;

  // calculating specific sizes/positions
  const sidesY_pos =
    topDecor && topDecor?.category_id === 9
      ? vertMiddlePoint + topDecor.height / 200
      : vertMiddlePoint;
  const sidesX_size =
    topDecor && topDecor?.category_id === 9
      ? heightOfInnerVert + topDecor.height / 100
      : height - bigFrame * 2;

  return (
    <Canvas3d camera={{ position: [3, 5, 10], fov: 40, near: 0.01 }}>
      <directionalLight
        color="#ffffff"
        intensity={1}
        position={[-2.5, 5.4, 4.5]}
      />
      <ambientLight intensity={0.3} />
      <gridHelper />

      {/* big window frames */}

      {/* ВЕРХ */}
      {topDecor ? (
        <DecorItem
          position={[
            0,
            lowestPoint + height - bigFrame + topDecor.height / 200,
            topDecor.width / 200,
          ]}
          url={topDecor.model_3d}
          size={[
            width - bigFrame * 2 + topDecor.height / 50,
            topDecor.height / 100,
            topDecor.width / 100,
          ]}
        />
      ) : (
        <FrameBox
          position={[0, upperMiddlePoint, 0]}
          variant="big"
          size={[width, bigFrame, 0.15]}
        />
      )}

      {/* СТОРОНЫ */}
      {middleDecor ? (
        <>
          <DecorItem
            position={[
              -(width / 2 - bigFrame) - middleDecor.height / 200,
              sidesY_pos,
              middleDecor.width / 200,
            ]}
            url={middleDecor.model_3d}
            size={[
              sidesX_size,
              middleDecor.height / 100,
              middleDecor.width / 100,
            ]}
            rotate={1.5707963268}
          />
          <DecorItem
            position={[
              width / 2 - bigFrame + middleDecor.height / 200,
              sidesY_pos,
              middleDecor.width / 200,
            ]}
            url={middleDecor.model_3d}
            size={[
              sidesX_size,
              middleDecor.height / 100,
              middleDecor.width / 100,
            ]}
            rotate={-1.5707963268}
          />
        </>
      ) : (
        <>
          <FrameBox
            position={[-(width / 2 - bigFrame / 2), vertMiddlePoint, 0]}
            variant="big"
            size={[bigFrame, height, 0.15]}
          />
          <FrameBox
            position={[width / 2 - bigFrame / 2, vertMiddlePoint, 0]}
            variant="big"
            size={[bigFrame, height, 0.15]}
          />
        </>
      )}

      {/* НИЗ */}
      {bottomDecor ? (
        <DecorItem
          position={[
            0,
            1.6 - bottomDecor.height / 200,
            bottomDecor.width / 200,
          ]}
          url={bottomDecor.model_3d}
          size={[width, bottomDecor.height / 100, bottomDecor.width / 100]}
        />
      ) : (
        <FrameBox
          position={[0, 1.5, 0]}
          variant="big"
          size={[width, bigFrame, 0.15]}
        />
      )}

      {/* small details on window * bottom - top - left - right */}
      <FrameBox
        position={[0, lowestPoint + bigFrame + 0.025, 0]}
        variant="small"
        size={[widthOfInnersHor, 0.05, 0.05]}
      />
      <FrameBox
        position={[0, upperMiddlePoint - bigFrame / 2 - 0.025, 0]}
        variant="small"
        size={[widthOfInnersHor, 0.05, 0.05]}
      />
      <FrameBox
        position={[-(width / 2) + bigFrame + 0.025, vertMiddlePoint, 0]}
        variant="small"
        size={[0.05, heightOfInnerVert, 0.05]}
      />
      <FrameBox
        position={[width / 2 - bigFrame - 0.025, vertMiddlePoint, 0]}
        variant="small"
        size={[0.05, heightOfInnerVert, 0.05]}
      />

      {/* sticks in between glass * vert - hor */}
      <FrameBox
        position={[0, vertMiddlePoint, 0]}
        variant="small"
        size={[0.025, heightOfInnerVert, 0.05]}
      />
      <FrameBox
        position={[0, vertMiddlePoint, 0]}
        variant="small"
        size={[widthOfInnersHor, 0.025, 0.05]}
      />

      {/* glass */}
      <Glass
        position={[0, vertMiddlePoint, 0]}
        size={[widthOfInnersHor, heightOfInnerVert, 0.01]}
      />
      <Sky
        distance={40}
        sunPosition={[5, 5, 3]}
        inclination={0}
        azimuth={16.3}
        turbidity={10}
        rayleigh={0.04}
      />
      {/* PLANE AS WALL */}
      <Wall position={[0, 2.5, 0]} size={[10, 5, 1]} />

      {/* make it interactive */}
      <OrbitControls makeDefault dampingFactor={0.3} />
    </Canvas3d>
  );
};

export default Canvas;