import React from 'react';
import styled from 'styled-components/macro';

import { COLORS, WEIGHTS } from '../../constants';
import { formatPrice, pluralize, isNewShoe } from '../../utils';
import Spacer from '../Spacer';

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default';

  const FLAGS = {
    "on-sale": {
      "--flagColor": COLORS.primary,
      "--flagDisplay": "inline-block",
      "--salesDisplay": "inline-block",
      "--priceStyle": "line-through",
      "--priceColor": COLORS.gray[700]
    },
    "new-release": {
      "--flagColor": COLORS.secondary,
      "--flagDisplay": "inline-block",
      "--salesDisplay": "none",
      "--priceStyle": "normal",
      "--priceColor": "black"
    },
    "default": {
      "--flagColor": "transparent",
      "--flagDisplay": "none",
      "--salesDisplay": "none",
      "--priceStyle": "normal",
      "--priceColor": "black"
    }
  };

  const placeFlag = () => {
    if(variant === "on-sale") {
      return <Flag>Sale</Flag>;
    }
    else if(variant === "new-release") {
      return <Flag>Just Released!</Flag>;
    }
    else {
      return;
    }
  };

  // Okay, I think all of this needs to be done through variables, though I'm feeling kind of stupid: regpricestyle and sales display
  return (
    <Link href={`/shoe/${slug}`} style={ FLAGS[variant] }>
      <Wrapper>
        <ImageWrapper>
          <Image alt="" src={imageSrc} />
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price>{formatPrice(price)}</Price>
        </Row>
        <Row>
          <ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>
          <SalePrice>{formatPrice(salePrice)}</SalePrice>
        </Row>
        {placeFlag()}
      </Wrapper>
    </Link>
  );
};

const Link = styled.a`
  display: block;
  position: relative;
  text-decoration: none;
  color: inherit;
  flex: 1 1 340px;
`;

const Wrapper = styled.article``;

const ImageWrapper = styled.div`
  position: relative;
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
  text-decoration: var(--priceStyle);
  color: var(--priceColor);
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
  display: var(--salesDisplay);
`;

const Flag = styled.span`
  position: absolute;
  display: var(--flagDisplay);
  background-color: var(--flagColor);
  padding: 7px 9px 9px 11px;
  font-weight: bold;
  color: white;
  border-radius: 2px;
  top: 12px;
  right: -4px;
`;

export default ShoeCard;
