import styled from "styled-components";
const FindPw = () => {
    return(
        <div>
            <InputBox>
        <section>
          <input type='text' placeholder='전화번호' />
          
        </section>
      </InputBox>
        </div>
    )

}

const InputBox = styled.div`
  padding-bottom: 226px;
  section {
    display: flex;
    flex-direction: column;

    input {
      font-family: 'AppleSDGothicNeoL';
      font-size: 12px;
      line-height: 22px;
      padding: 13px 20px;
      background: var(--WHITE);
      border: 2px solid #eeeeee;
      border-radius: 50px;  
      outline: none;
      ::placeholder {
        color: var(--DEFAULT);
      }
      :focus{
        border: 2px solid var(--LIGHTER);
      }
    }
    
  }
`
export default FindPw