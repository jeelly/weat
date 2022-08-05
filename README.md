# 🍚 맛집 공유 히스토리 플랫폼, 위잇 (WEat) 🍔

## ⛏ 개발환경 | Development Enviornment

#### Language
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)

#### Framework
<img src='https://img.shields.io/badge/React-v18.1.0-61DAFB?logo=React' alt='react'/>

#### Infrastructure
![AWS](https://img.shields.io/badge/AWS-%23232F3E.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)
<img alt="s3" src ="https://img.shields.io/badge/Amazon S3-569A31.svg?&style=for-the-badge&logo=Amazon S3&logoColor=white"/>

#### Dev tools
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)
<img src="https://img.shields.io/badge/VSCode-007ACC?style=for-the-badge&logo=Visual Studio Code&logoColor=white"/>

### library
<p align='left'>
<img src='https://img.shields.io/badge/yarn-v1.22.17-yellow?logo=yarn'/>
<img src='https://img.shields.io/badge/ReactRouter-v6.3.0-pink?logo=React Router'/>
  <img src='https://img.shields.io/badge/StyledComponents-v5.3.5-violet?logo=styled-components'/>
  
  <img src='https://img.shields.io/badge/Redux-v8.0.2-764ABC?logo=Redux'/> 
  <img src='https://img.shields.io/badge/Redux/toolkit-v1.8.3-764ABC?logo=Redux'/> 
  <img src='https://img.shields.io/badge/React_Query-v3.39.1-FF4154?logo=React Query'/>
  
   <img src='https://img.shields.io/badge/socket.io-v4.5.1-white?logo=Socket.io'/>
   <img src='https://img.shields.io/badge/Axios-v0.27.2-pink?'/>
   
   <img src='https://img.shields.io/badge/react_kakao_maps_sdk-v1.1.1-FFCD00?logo=KakaoTalk'/>
   <img src='https://img.shields.io/badge/react_geolocation-v1.0.4-61DAFB?logo=React'/>
   <img src='https://img.shields.io/badge/react_easy_sort-v1.0.4-61DAFB?logo=React'/>
   <img src='https://img.shields.io/badge/array_move-v3.0.1-61DAFB?logo=React'/>
   <img src='https://img.shields.io/badge/dotenv-v16.0.1-61DAFB?logo=React'/>
   <img src='https://img.shields.io/badge/react_slick-v0.29.0-61DAFB?logo=React'/>
   <img src='https://img.shields.io/badge/emoji_picker_react-v3.5.1-61DAFB?logo=React'/>
</p> 
  
<br>

## 🌎 웹사이트 | Website
- [위잇(WEat) http://weat.site](https://weat.site/)
- [발표 영상](https://youtu.be/1oy_svsfoH0)

<br>

## ⌚ 개발기간 | Project Period

- 2022.06.24 ~ 2022.08.05 (6주간)

<br>


## 🔭목차 | Contents
1. [위잇 소개 | About WEat](#위잇-소개)
2. [웹사이트 | Webstie](#웹사이트--Website)
3. [주요 기능](#주요-API-기능)
4. [아키텍쳐 | Architecture](#아키텍쳐)
5. [기술적인 도전 | Technical Challenge]
6. [트러블 슈팅 | Trouble shooting](#트러블-슈팅--Trouble-shooting)
7. [고객 반응 및 개선 사항 | Customer response and Improvements](#고객-반응-및-개선-사항--Trouble-shooting)
8. [프론트엔드 팀원 | FE TEAM]
9. [More Info]

<br>
<hr>

## 🎉 위잇 소개
<img src="https://xoxokss.s3.ap-northeast-2.amazonaws.com/%E1%84%8A%E1%85%A5%E1%86%B7%E1%84%82%E1%85%A6%E1%84%8B%E1%85%B5%E1%86%AF.jpeg" width="750">
<br>

### 가고 싶은 맛집! 다시 가고 싶은 맛집을 저장하고 공유할 땐?

👉 나만 알고 있던 맛집을 저장하거나 다른 사람들과 공유하고 싶으신 분 </br>
👉 지도를 통해 맛집 위치를 쉽게 저장하고 싶으신 분 </br>
👉 지인들과 같이 작성하는 진짜 맛집 리뷰를 공유하고 싶으신 분 </br>

- 위잇(WEat)은 지인들과 공유하는 맛집 히스토리 플랫폼입니다.

<br>

## ⚔ 주요 기능
- 지인들과 함께 맛집 정보를 공유하는 방 or 나만의 맛집 리스트 비공개방 생성
- 맛집 지도 (맛집 검색, 태그 필터)
- 맛방 초대 및 게시물 등록의 실시간 알림
- 먹기록 (사용자 기록 인포그래프)

<img src="https://xoxokss.s3.ap-northeast-2.amazonaws.com/images/origin/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA+2022-08-05+%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB+1.10.41.png">

<br>

## 🛠 아키텍쳐 | Architecture
<img src="https://user-images.githubusercontent.com/105095093/182834501-d552321d-27fb-48b3-aafe-a7f974719612.png" width="750">

<br>

## 🕰️ 기술적인 도전 | Technical Challenge
 
### KAKAO MAP API 적용
   ![image](https://user-images.githubusercontent.com/105135549/182990227-823d674c-aef1-4ade-877a-26ea654c82bb.png)
#### 도입 이유
- 맛집 등록시 맛집 주소, 현재 위치와의 거리를 계산하기 위해 지도 API 활용 필요
#### 대안
- KAKAO지도, GOOGLE 지도, NAVER 지도 등 다양한 지도 API
#### 의사 결정
- Weat의 지도 API의 주요 기능 - 맛집 위치 검색 및 정보 공유
- 카카오맵 API의 검색시간이 다른 지도 API보다 빠르고 카카오 소셜 API를 통해 사용자 초대 및 공유가 쉽기 때문에 최종적으로 채택
- 
<br>

## 🏊🏻‍♂️ 트러블 슈팅 | Trouble shooting

### issue1: CI/CD npm install 오류

<details>
<summary>🙁 error message</summary>
<div markdown="1">
npm ERR! code ERESOLVE</br>
npm ERR! ERESOLVE could not resolve</br>
npm ERR! </br>
npm ERR! While resolving: react-kakao-maps-sdk@1.1.1</br>
npm ERR! Found: react@18.2.0</br>
npm ERR! node_modules/react</br>
npm ERR!   react@"^18.1.0" from the root project</br>
npm ERR!   peerOptional react@"^16.9.0 || ^17.0.0 || ^18" from @reduxjs/toolkit@1.8.3</br>
npm ERR!   node_modules/@reduxjs/toolkit</br>
npm ERR!     @reduxjs/toolkit@"^1.8.3" from the root project</br>
npm ERR!   14 more (@testing-library/react, react-beforeunload, react-dom, ...)</br>
npm ERR! </br>
npm ERR! Could not resolve dependency:</br>
npm ERR! peer react@"^17.0.2" from react-kakao-maps-sdk@1.1.1</br>
npm ERR! node_modules/react-kakao-maps-sdk</br>
npm ERR!   react-kakao-maps-sdk@"^1.1.1" from the root project</br>
npm ERR! </br>
npm ERR! Conflicting peer dependency: react@17.0.2</br>
npm ERR! node_modules/react</br>
npm ERR!   peer react@"^17.0.2" from react-kakao-maps-sdk@1.1.1</br>
npm ERR!   node_modules/react-kakao-maps-sdk</br>
npm ERR!     react-kakao-maps-sdk@"^1.1.1" from the root project</br>
npm ERR! </br>
npm ERR! Fix the upstream dependency conflict, or retry</br>
npm ERR! this command with --force, or --legacy-peer-deps</br>
npm ERR! to accept an incorrect (and potentially broken) dependency resolution.</br>
npm ERR! </br>
npm ERR! See /home/runner/.npm/eresolve-report.txt for a full report.</br>
</br>
npm ERR! A complete log of this run can be found in:</br>
npm ERR!     /home/runner/.npm/_logs/2022-07-29T16_33_40_291Z-debug-0.log</br>
Error: Process completed with exit code 1.</br>

</div>
</details>


#### 🙁 situation
- 자세히 오류를 살펴보면 아래와 같이 해석할 수 있다. @react-kakao-maps-sdk@1.1.1 모듈을 설치하던 중 react@"^17.0.2" 에 의존하는 것을 발견했다. 그러나 root project에서 발견된 react는 18.2.0 버전이라 react@"^17.0.2" 의존성을 해결하지 못했다. 


#### 🚥 solution 
- npm install 할 때 --force 또는 --legacy-peer-deps와 함께 실행하라는 것이다. 즉, npm install --legacy-peer-deps 을 실행하면 위 의존성 문제를 해결할 수 있다. npm 3버전부터 npm 6버전까지는 npm install 과정에서 peerDependencies를 무시하고 버전이 일치하지 않으면 경고 메시지만 보여줬지만 7버전부터는 실제로 peerDependencies를 설치한다. 그리고 버전이 일치하지 않으면 에러를 낸다.

* 1. **`npm install --force`**

   로컬에 다운로드 복제본이 존재하더라도 다시 온라인에서 다운로드 받는다.

* 2. `npm install --legacy-peer-deps`

   마치 6버전 이하에서 동작하던 것처럼 `peerDependencies`를 무시한다.

**-force 와 -legacy-peer-deps 차이점**

- -force 명령어를 사용하면 충돌을 우회해 package-lock.json에 몇 가지의 다른 의존 버전들을 추가한다.
- -legacy-peer-deps 명령어를 사용하면 이전 버전에서 작동하던 방식과 같이 충돌을 무시할 수 있다. 즉, peerDependency가 맞지 않아도 설치한다. 다만 예기치 못한 에러가 발생할 수 있으니 조심해야 할 듯 하다.

   예기치 못한 에러를 방지하고자 저희는 npm install에 -force를 추가했습니다.

---

### issue2: 이모지 키보드 활성화

#### 🙁 situation
- 모바일 버전 기획상 맛방 만들기 시 <img src="https://velog.velcdn.com/images/bo-oram/post/70368d50-ea88-458f-b1b4-562754f5ef1d/image.png" width='40px' alt="">을 터치하면 키보드의 이모지 부분(mobile version)이 바로 활성화 되어야 하지만, 기술적으로 문자가 아닌 이모지 키보드가 먼저 활성화시키는 것이 불가능하다고 판단. 


#### 🚥 solution 
- 선택지1 - 일반 키보드(문자열이 먼저 나오는)를 띄우고 "이모지만 입력할 수 있습니다"란 설명삽입
- 선택지2 - 이모지 피커 라이브러리 사용
- "react-emoji-picker" 라이브러리를 선택, 일반 키보드의 경우 한 탭을 더 들어가 이모지 키모드를 열어야 하므로 유저의 피로도 상승 예상되며 키보드활성화 시 문자열이 먼저 나오므로 이모지만 삽입되어야 한다는 의미가 직관적이지 않음. 많은 이모지 피커 라이브러리중 이슈가 적고, css 커스텀이 쉬운 라이브러리를 선택하여 해결함

---

<br>

## 🕰️ 고객 반응 및 개선 사항 | Customer response and Improvements

### 👉 검색 했을 때 식당 위주로 나왔으면 좋겠습니다 !
![image](https://user-images.githubusercontent.com/105135549/182991366-2e06860b-1ecb-43bc-8bc2-14d26294c860.png)

##### 개선 사항
![image](https://user-images.githubusercontent.com/105135549/182988702-3b67e1b2-ced7-461d-8f4a-94c8f9ba9906.png)
- 카카오맵 API를 사용하여 검색한 데이터를 카테고리의 음식점 또는 카페로 필터링 했다.

### 👉 화면이 자꾸 깜빡 거려요 !
#### 데이터 로드 전
![image](https://user-images.githubusercontent.com/105135549/182991434-8e438b99-eaa4-4631-85b9-36961c8373e3.png)

##### 😶‍🌫️ 개선 사항
- 데이터가 화면에 그려질 때
그려지는 과정 또는 그려지기 전 빈 화면을 그대로 유저에게 보여줄 경우 유저는 로딩이 느리다고 느낄 수 있다.
그 때문에 데이터가 그려지기 전 스플래쉬 화면을 띄워 좀 더 빠르게 반응하는 것처럼 보이게 하였으나, 과도한 사용으로 인해 오히려 깜빡거리는 현상처럼 보이게 되어 보기 불편하다는 사용자 피드백이 있었다.
- 개선을 위해  API요청이 많은 페이지 등 로딩이 느릴 것이 예상되는 부분에만 사용하도록 수정하였다

<br>

## 🤸🏻‍♀️프론트엔드 팀원 | FE TEAM

<br/>
<table>
   <tr>
    <td align="center" width="20%"><b>name</b></td>
    <td align="center"width="10%"><b>postion</b></td>
    <td align="center"width="40%"><b>work</b></td>
    <td align="center"width="40%"><b>Github</b></td>
  </tr>
  <tr>
    <td align="center"><b>김영호</b></a></td>
    <td align="center">Vice Leader</td>
    <td align="left"> 
       - 카카오, 구글 소셜 로그인 <br>
       - 이메일 인증 <br>
       - 유저 프로필 정보 관리 <br> 
       - JWT토큰 인증관리 <br> 
       - 사용자 기록 데이터 분석(먹기록)<br> 
       - 맛방 detail CRUD <br> 
       - 알림 기능(socket.io) <br> 
       - EC2 t3 HTTPS 서버 배포 <br> 
       - CICD 
      </td>
    <td align="center">https://github.com/jeelly</td>

  </tr>
    <tr>
    <td align="center"><b>김보람</b></a></td>
    <td align="center">Member</td>
    <td align="left">
       - 맛방(Room) CRUD<br> 
       - 맛집 CRUD<br> 
       - 좋아요 기능<br> 
       - 맛집 태그 검색 필터링 <br> 
       - DB 설계(NoSQL) <br> 
       - 위도경도(GeoJson) CRUD <br> 
       - AWS S3 Lambda 이미지 업로드 & 리사이징
   </td>
   <td align="center">https://github.com/Bo-oram</td>
  </tr>
</table>
<br/>

## 🍕 More Info 
[🌿 프로젝트 소개 문서](https://www.notion.so/WEat-617066c95d3f422fb10dda696d8f1b43)  
[💾 와이어프레임 Figma](https://www.figma.com/file/W4Yr7Umu4AvKSsI19LVouG/WEat?node-id=187%3A1238)  
[🔐 Back-End Github Repo](https://github.com/Ljinyh/W8_RealProject) 
