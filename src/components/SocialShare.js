import React from 'react';
import Styled from 'styled-components';
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
} from 'react-share';

import { media } from '../utils/media';
import config from '../../config/SiteConfig';

const ShareComponent = Styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 1em 0 0;
  @media ${media.phone} {
    flex-direction: column;
  };
`;

const SocialLinks = Styled.div`
  display: flex;
  flex-direction: row;
  > .SocialMediaShareButton {
    margin: 0 .8em;
    cursor: pointer;
  };
`;

const Label = Styled.span`
  font-size: 1.2em;
  margin: 0 1em;
  @media ${media.phone} {
    margin: 0 1em 1em;
  },
`;

const SocialShare = props => {
  const { title, slug, label } = props;
  const url = config.siteUrl + config.pathPrefix + slug;

  return (
    <ShareComponent>
      <Label>{label}</Label>
      <SocialLinks>
        <TwitterShareButton url={url} title={title}>
          <TwitterIcon round size={36} />
        </TwitterShareButton>
        <FacebookShareButton
          url={url}
          quote={title}
          aria-label="Facebook share"
        >
          <FacebookIcon round size={36} />
        </FacebookShareButton>
        <LinkedinShareButton url={url} title={title}>
          <LinkedinIcon round size={36} />
        </LinkedinShareButton>
      </SocialLinks>
    </ShareComponent>
  );
};

export default SocialShare;
