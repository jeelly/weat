import styled from 'styled-components';


const PageNotFound = () => {
  return (
    <NotFoundWrap>
      <h1>해당 페이지를 찾을 수 없습니다.</h1>
    </NotFoundWrap>
  );
};

export default PageNotFound;

const NotFoundWrap = styled.div`
  display: flex;
  flex-direction:column;
  width:100vw;
  height:80vh;
  text-align:center;
  align-items: center;
  justify-content:center;
`;