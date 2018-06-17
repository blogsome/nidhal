import React from 'react';
import styled from 'styled-components';
import Layout from '../components/Layout';
import Article from '../components/Article';
import Wrapper from '../components/Wrapper';
import SectionTitle from '../components/SectionTitle';

import { media } from '../utils/media';

const Content = styled.div`
  grid-column: 2;
  box-shadow: 0 4px 120px rgba(0, 0, 0, 0.1);
  border-radius: 1rem;
  padding: 3rem 6rem;
  @media ${media.tablet} {
    padding: 3rem 2rem;
  }
  @media ${media.phone} {
    padding: 2rem 1.5rem;
  }
  overflow: hidden;
`;

const Hero = styled.div`
  grid-column: 2;
  padding: 3rem 2rem 6rem 2rem;
  text-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
  color: ${props => props.theme.dark};

  p {
    font-size: 1.68rem;
    margin-top: -1rem;
    @media ${media.phone} {
      font-size: 1.25rem;
    }
    @media ${media.tablet} {
      font-size: 1.45rem;
    }
  }
`;

const IndexPage = props => {
  const postEdges = props.data.allContentfulBlogPost.edges;

  return (
    <Layout>
      <Wrapper>
        <Hero />
        <Content>
          <SectionTitle>مقالاتي</SectionTitle>
          {postEdges.map(post => (
            <Article
              title={post.node.title}
              date={post.node.publishTime}
              timeToRead={post.node.timeToRead}
              slug={post.node.slug}
              key={post.node.slug}
            />
          ))}
        </Content>
      </Wrapper>
    </Layout>
  );
};

export default IndexPage;

/* eslint no-undef: off */
export const IndexQuery = graphql`
  query IndexQuery {
    allContentfulBlogPost(sort: { fields: [publishTime], order: DESC }) {
      edges {
        node {
          title
          slug
          publishTime(formatString: "MMMM Do, YYYY")
          tags
        }
      }
    }
  }
`;
