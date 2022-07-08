const FindId = () => {
  return (
    <div>
      <div>
        <p>
          가입했던 휴대전화번호를 입력해주세요
          <br />
          인증번호를 보내드립니다.
        </p>
      </div>
      <div>
        <section>
          <label htmlFor="">Email</label>
          <input
            type="text"
            placeholder="정확한 이메일 주소를 써주세요"

          />
        </section>
        <section>
          <label htmlFor="">Password</label>
          <input
            type="password"
            placeholder="6글자 이상 적어주셔야 해요"

          />
          <input
            type="password"
            placeholder="다시 한번 입력해주세요"

          />
        </section>
      </div>
    </div>
  );
};

export default FindId;
