import { useState } from "react";
import styled from "styled-components";
import { instance } from "../../shared/axios";
import { BlackButton } from "../../css/Style";
import { useNavigate } from "react-router-dom";

const FindPw = () => {
  const navigate = useNavigate()
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");

  const pwFind = async () => {
    try {
      const res = await instance.post("/api/users/findPass", {
        email: email,
        customerId: id,
      });
      console.log(res)
      await navigate('/finduser/findpwdescription',{state:{email, id}})
    } catch (e) {
      alert("아이디와 이메일을 확인해주세요.");
      console.log(e);
    }
  };

  return (
    <div>
      <InputBox>
        <section>
          <input
            type="text"
            placeholder="Id"
            onChange={(e) => setId(e.target.value)}
          />
          <input
            type="text"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </section>
      </InputBox>

      <BlackButton onClick={pwFind}>발 송</BlackButton>
    </div>
  );
};

const InputBox = styled.div`
  padding-bottom: 226px;
  section {
    display: flex;
    flex-direction: column;

    input {
      font-family: "AppleSDGothicNeoL";
      font-size: 14px;
      line-height: 22px;
      padding: 12px 20px;
      background: var(--WHITE);
      border: 2px solid #eeeeee;
      border-radius: 50px;
      outline: none;
      margin-bottom: 10px;
      ::placeholder {
        color: var(--DEFAULT);
      }
      :focus {
        border: 2px solid var(--LIGHTER);
      }
    }
  }
`;
export default FindPw;
