import React from 'react';
import FacebookProvider, { Comments } from 'react-facebook';
import styled from 'styled-components';

import config from '../../config/SiteConfig';

const CommentsWrapper = styled.div`
  margin: 3em 0 0;
  padding: 3em 0 0;
  border-top: 1px solid #ddd;
`;

const CommentSection = props => {
  const { slug, facebook } = props;

  return (
    <CommentsWrapper id="post-comments">
      <FacebookProvider language="ar_AR" appId={facebook}>
        <Comments
          href={`${config.siteUrl}/${slug}`}
          width="100%"
          colorScheme="dark"
        />
      </FacebookProvider>
    </CommentsWrapper>
  );
};

export default CommentSection;
