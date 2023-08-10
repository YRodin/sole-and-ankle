import React from "react";
import styled from "styled-components/macro";

import { COLORS, WEIGHTS } from "../../constants";
import { formatPrice, pluralize, isNewShoe } from "../../utils";
import Spacer from "../Spacer";

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  const variant =
    typeof salePrice === "number"
      ? "on-sale"
      : isNewShoe(releaseDate)
      ? "new-release"
      : "default";

  const getFlagText = (variant) => {
    if (variant === "on-sale") {
      return "Sale";
    } else if (variant === "new-release") {
      return "Just released!";
    }
    return null; // default case, if needed
  };
  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          <Image alt="" src={imageSrc} />
          <Flag variant={variant}>{getFlagText(variant)}</Flag>
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <PriceWrapper>
            <Price salePrice={salePrice}>{formatPrice(price)}</Price>
            <SalePrice>{salePrice ? formatPrice(salePrice) : null}</SalePrice>
          </PriceWrapper>
        </Row>
        <Row>
          <ColorInfo>{pluralize("Color", numOfColors)}</ColorInfo>
        </Row>
      </Wrapper>
    </Link>
  );
};

const Flag = styled.div`
  background-color: ${(props) => {
    if (props.variant === "on-sale") {
      return "hsl(354, 91%, 45%)";
    } else if (props.variant === "new-release") {
      return "hsl(267, 91%, 45%)";
    }
    return null;
  }};
  padding: 4px 8px;
  font-size: 0.5rem;
  position: absolute;
  border-radius: 4px;
  color: ${COLORS.white};
  top: 0.5rem;
  right: 0.5rem;
  flex: 1;
`;

const Link = styled.a`
  text-decoration: none;
  color: inherit;
  min-width: 200px;
  flex: 1 1 0;
`;

const Wrapper = styled.article``;
const PriceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  `;

const ImageWrapper = styled.div`
  position: relative;
  display: flex;
`;

const Image = styled.img`
  width: 100%;
`;

const Row = styled.div`
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span`
  text-decoration-line: ${(props) =>
    props.salePrice ? "line-through" : "none"};
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`;

export default ShoeCard;
