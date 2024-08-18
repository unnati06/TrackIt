import styled from 'styled-components';

const Wrapper = styled.section`
  nav {
    width: var(--fluid-width);
    max-width: var(--max-width);
    margin: 0 auto;
    height: var(--nav-height);
    display: flex;
    align-items: center;
  }
  .page {
    min-height: 100vh;
    display: grid;
    align-items: center;
    margin-top: -3rem;
  }
    .two {
    min-height: 100vh;
    display: grid;
    align-items: center;
    margin-top: -3rem;
  }
  

  .hero{
    width: 100%;
    height: 100%;
    margin-bottom: 50px;

    grid-area: content;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;
  }
  h1 {
    font-weight: 700;
    span {
      color: pink;
    }
    margin-bottom: 1.5rem;
  }
  p {
    line-height: 2;
    color: var(--text-primary-color);
    margin-bottom: 1.5rem;
    max-width: 35em;
  }
  .register-link {
    margin-right: 1rem;
    
  }
  .main-img {
    display: none;
  }
  .btn {
    padding: 0.75rem 1rem;
    background-color: pink;
  }
  @media (min-width: 992px) {
    .page {
      grid-template-columns: 1fr 400px;
      column-gap: 3rem;
    }
    .main-img {
      display: block;
    }
  }
`;
export default Wrapper;
