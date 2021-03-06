import React from "react";
import { Sky } from "@react-three/drei";
import Controls from "../Controls";

import FrameBox from "../elements/FrameBox";
import DecorItem from "../elements/DecorItem";
import Door from "../elements/Door";
import Wall from "../elements/Wall";
import { CanvasProps } from "../../../api/ConstructorInterfaces";

const Canvas = ({ size, decor }: CanvasProps) => {
  let { height, width } = size;
  width = width / 50; // translate cm to units in 3d
  height = height / 50; // translate cm to units in 3d
  const bigFrame = 0.2; // ширина широкой внешней рамки

  const upperMiddlePoint = height - bigFrame / 2; // позиция на оси y, куда должна ставиться верхняя рамка
  const vertMiddlePoint = height / 2; // позиция середины для элементов по y оси
  const widthOfInnersHor = width - bigFrame * 2;
  const heightOfInnerVert = height - bigFrame * 2;

  // objects of chosen decor
  const topDecor = decor?.Top?.chosen;
  const middleDecor = decor?.Middle?.chosen;
  const baseDecor = decor?.Base?.chosen;

  // calculating specific sizes/positions
  const isTopDec11 = topDecor && topDecor?.category_id === 11;
  const isTopDec9baseDec = isTopDec11 && baseDecor;
  const sidesY_pos = isTopDec9baseDec
    ? vertMiddlePoint +
      topDecor.height / 200 -
      bigFrame / 2 +
      baseDecor.height / 100
    : isTopDec11
    ? vertMiddlePoint + topDecor.height / 200 - bigFrame / 2
    : baseDecor
    ? vertMiddlePoint - bigFrame / 2 + baseDecor.height / 100
    : vertMiddlePoint - bigFrame / 2;
  const sidesX_size = isTopDec9baseDec
    ? heightOfInnerVert +
      topDecor.height / 100 +
      bigFrame -
      baseDecor.height / 50
    : isTopDec11
    ? heightOfInnerVert + topDecor.height / 100 + bigFrame
    : baseDecor
    ? heightOfInnerVert + bigFrame - baseDecor.height / 50
    : heightOfInnerVert + bigFrame;

  return (
    <>
      <directionalLight
        color="#FFFFFF"
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
            height - bigFrame + topDecor.height / 200,
            topDecor.width / 200,
          ]}
          id={topDecor.id}
          size={[
            width - bigFrame * 2 + topDecor.height / 50,
            topDecor.height / 100,
            topDecor.width / 100,
          ]}
          usage="Top"
        />
      ) : (
        <FrameBox
          position={[0, upperMiddlePoint, -0.04]}
          variant="big"
          size={[width, bigFrame, 0.15]}
          usage="Top"
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
            id={middleDecor.id}
            size={[
              sidesX_size,
              middleDecor.height / 100,
              middleDecor.width / 100,
            ]}
            rotate={1.5707963268}
            usage="Middle"
          />
          <DecorItem
            position={[
              width / 2 - bigFrame + middleDecor.height / 200,
              sidesY_pos,
              middleDecor.width / 200,
            ]}
            id={middleDecor.id}
            size={[
              sidesX_size,
              middleDecor.height / 100,
              middleDecor.width / 100,
            ]}
            rotate={-1.5707963268}
            usage="Middle"
          />
        </>
      ) : (
        <>
          <FrameBox
            position={[
              -(width / 2 - bigFrame / 2),
              vertMiddlePoint - bigFrame / 2,
              -0.04,
            ]}
            variant="big"
            size={[bigFrame, height - bigFrame, 0.15]}
            usage="Middle"
          />
          <FrameBox
            position={[
              width / 2 - bigFrame / 2,
              vertMiddlePoint - bigFrame / 2,
              -0.04,
            ]}
            variant="big"
            size={[bigFrame, height - bigFrame, 0.15]}
            usage="Middle"
          />
        </>
      )}

      {/* БАЗЫ */}
      {baseDecor && (
        <>
          <DecorItem
            position={[
              middleDecor
                ? -(width / 2 - bigFrame) - middleDecor.height / 200
                : 1,
              baseDecor.height / 100,
              baseDecor.width / 200,
            ]}
            id={baseDecor.id}
            size={[
              middleDecor ? middleDecor.height / 100 : 0.2,
              baseDecor.height / 50,
              baseDecor.width / 100,
            ]}
            usage="Base"
          />
          <DecorItem
            position={[
              middleDecor ? width / 2 - bigFrame + middleDecor.height / 200 : 1,
              baseDecor.height / 100,
              baseDecor.width / 200,
            ]}
            id={baseDecor.id}
            size={[
              middleDecor ? middleDecor.height / 100 : 0.2,
              baseDecor.height / 50,
              baseDecor.width / 100,
            ]}
            usage="Base"
          />
        </>
      )}

      <Sky
        distance={40}
        sunPosition={[0, 5, 5]}
        inclination={0}
        azimuth={16.3}
        turbidity={10}
        rayleigh={0.04}
      />
      {/* door */}
      <Door
        position={[0, vertMiddlePoint - bigFrame / 2, 0]}
        size={[widthOfInnersHor, heightOfInnerVert + bigFrame, 0.01]}
      />

      {/* PLANE AS WALL */}
      <Wall position={[0, 2.5, 0]} size={[10, 5, 1]} />

      {/* make it interactive */}
      <Controls
        defCamPoint={vertMiddlePoint}
        defRotation={[-0.6, 1.5, false]}
      />
    </>
  );
};

export default Canvas;
