export const getStaticPaths = async () => {
  const url = "http://127.0.0.1:8000/category/all";
  const res = await fetch(url);
  const data = await res.json();
  const paths = data.map((e) => ({
    params: {
      id: e.id.toString(),
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const url = `http://127.0.0.1:8000/category/${params.id}`;
  const res = await fetch(url);
  const data = await res.json();
  return {
    props: {
      category: data.name,
      items: data.items,
    },
  };
};

import { useState } from "react";
import Head from "next/head";
import Link from "next/link";

import {
  Container,
  SectionTitle,
  Item,
  BackBtn,
  Icon,
} from "../../../styles/catalog";
import ItemModal from "../../../modules/catalog/ItemModal";
import ItemDetails from "../../../modules/catalog/ItemDetails";

const CategoryDetail = ({ category, items }) => {
  // modal
  const [modal, setModal] = useState(false);

  const closeModal = () => setModal(false);

  return (
    <>
      <Head>
        <title>{category} - Категории - Decolight</title>
        <meta name="description" content="Generated by create next app" />
      </Head>
      <SectionTitle>{category}</SectionTitle>
      <Link href="/catalog" passHref>
        <BackBtn>
          <Icon.Back /> Обратно в категории
        </BackBtn>
      </Link>
      <Container>
        {items.map((e, inx) => (
          <Item.Box key={inx} onClick={() => setModal(e)}>
            <Item.Picture src={e.image} width={250} height={150} />
            <ItemDetails elem={e} />
          </Item.Box>
        ))}
        <ItemModal item={modal} close={closeModal} />
      </Container>
    </>
  );
};

export default CategoryDetail;