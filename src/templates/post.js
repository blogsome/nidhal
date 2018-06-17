import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'gatsby';
import styled from 'styled-components';
import Layout from '../components/Layout';
import Wrapper from '../components/Wrapper';
import Header from '../components/Header';
import Subline from '../components/Subline';
import { media } from '../utils/media';

import config from '../../config/SiteConfig';
import '../utils/prismjs-theme.css';

const Content = styled.article`
  grid-column: 2;
  box-shadow: 0 4px 120px rgba(0, 0, 0, 0.1);
  border-radius: 1rem;
  padding: 2rem 4rem;
  background-color: ${props => props.theme.bg};
  z-index: 9000;
  margin-top: -3rem;
  @media ${media.tablet} {
    padding: 3rem 3rem;
  }
  @media ${media.phone} {
    padding: 2rem 1.5rem;
  }
`;

const Title = styled.h1`
  margin-bottom: 1rem;
`;

const PostContent = styled.div`
  margin-top: 4rem;
`;

const Post = props => {
  const postNode = props.data.contentfulBlogPost;
  console.log(props);
  return (
    <Layout>
      <Wrapper>
        {/* <SEO postPath={slug} postNode={postNode} postSEO /> */}
        <Helmet title={`${postNode.title} | ${config.siteTitle}`} />
        <Header>
          <Link to="/">{config.siteTitle}</Link>
        </Header>
        <Content>
          <Title>{postNode.title}</Title>
          <Subline>{postNode.publishTime} &mdash;</Subline>
          <PostContent dangerouslySetInnerHTML={{ __html: postNode.content.childMarkdownRemark.html }} />
        </Content>
      </Wrapper>
    </Layout>
  );
};

export default Post;

/* eslint no-undef: off */
export const postQuery = graphql`
  query postBySlug($slug: String!) {
    contentfulBlogPost(slug: { eq: $slug }) {
      title
      publishTime(formatString: "MMMM Do, YYYY")
      content {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`;
