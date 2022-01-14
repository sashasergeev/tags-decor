import { useState, useEffect, Suspense } from "react";

import PreviewItem from "../../common/PreviewItem";
import * as styled from "../../../styles/constructor";

const CatalogList = ({ category, usage, changeElement }) => {
  // fetch items
  const [items, setItems] = useState([]);

  const fetchItems = async () => {
    const url = `http://127.0.0.1:8000/category/${category.id}`;
    const res = await fetch(url);
    const data = await res.json();
    setItems(data.items);
  };

  useEffect(() => fetchItems(), []);

  // chosen item
  const [item, setItem] = useState(false);
  const handleItemSelect = (e) =>
    setItem(e.target.innerHTML === item ? false : e.target.innerHTML);

  // chosen item object
  const decor = item ? items.filter((e) => e.name === item)[0] : undefined;

  // item size
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  useEffect(() => {
    if (item) {
      setHeight(decor.height);
      setWidth(decor.width);
    }
  }, [item]);

  // applying chosen item
  const handleItem = () => {
    if (height !== decor.height || width !== decor.width) {
      decor.height = height;
      decor.width = width;
    }
    changeElement(decor, usage);
  };
  return (
    <>
      {/* ITEMS */}
      <styled.Catalog.Container>
        {items &&
          items.map((e, inx) => (
            <styled.Catalog.CategoryItem
              selected={item === e.name}
              onClick={handleItemSelect}
              key={inx}
            >
              {e.name}
            </styled.Catalog.CategoryItem>
          ))}
      </styled.Catalog.Container>

      {/* PREVIEW OF ITEM */}
      <Suspense fallback={null}>
        {item && (
          <>
            <styled.Input.Container>
              <label htmlFor="height">Высота</label>
              <input
                type="text"
                id="height"
                onChange={(e) => setHeight(e.target.value)}
                name="height"
                value={height}
              />
            </styled.Input.Container>
            <styled.Input.Container>
              <label htmlFor="width">Ширина</label>
              <input
                type="text"
                id="width"
                onChange={(e) => setWidth(e.target.value)}
                name="width"
                value={width}
              />
            </styled.Input.Container>
            <PreviewItem mini item={decor} />
          </>
        )}
      </Suspense>

      {/* BUTTONS */}
      <styled.Catalog.ButtonGroup>
        <styled.Button.Warn>Reset</styled.Button.Warn>
        {item && (
          <styled.Button.Apply onClick={handleItem}>Apply</styled.Button.Apply>
        )}
      </styled.Catalog.ButtonGroup>
    </>
  );
};

export default CatalogList;