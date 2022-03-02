# Free to Game List 🎮
- 무료로 플레이할 수 있는 게임 리스트를 보여주고 즐겨찾기로 저장할 수 있는 Open API를 이용한 `개인 Next JS Project` 입니다.

<br />

## ✨ 배포 사이트

> https://free-to-game-list.vercel.app/

<br />

## 📌 프로젝트 구성
  - Project: `create-next-app`, `Typescript`
  - Convention: `ESLint`, `Prettier`
  - Style: `SCSS module`, `mui`
  - State: `react-redux`, `reduxjs/toolkit`
  - network: `axios`
  - deploy: `vercel`

<br />

## 📃 프로젝트 기간

> 2022/02/16 ~ 2022/03/02 (15일)

<br />

## 🛫 사용한 API 및 설명
1. 로그인, 회원가입 (Token Auth Rest API)
   - 로그인 시 Token을 발급하고, Token이 있는 경우에만 즐겨찾기 기능이 정상적으로 동작합니다.
   - `firebase` Auth REST API email/password
     - https://firebase.google.com/docs/reference/rest/auth#section-create-email-password
2. 즐겨찾기
   - 즐겨찾기 기능은 로그인 시(Token을 발급받은 상태일 때) 활성화 됩니다.
   - 로그인된 아이디에 따라 즐겨찾기에 저장한 게임 리스트를 확인할 수 있습니다.
   - `firebase` realtime database with Auth
     - https://firebase.google.com/docs/database/rest/auth#authenticate_with_an_id_token
3. 무료 게임 리스트 받아오기
   - `rapidapi` free to game list
     - https://rapidapi.com/digiwalls/api/free-to-play-games-database/


<br />

## 🔎 기능

<table align="center">
<tr>
<td align="center">최초 페이지</td>
<td align="center">게임 검색</td>
</tr>
<tr>
<td>
<img src = "https://user-images.githubusercontent.com/85148549/156393386-f886f8bf-eb29-40d6-b410-82191fcad9ae.gif" width="500px" height="200px" />
</td>
<td>
<img src = "https://user-images.githubusercontent.com/85148549/156393384-c2876e87-b751-48af-9c8b-28198e8f8191.gif" width="500px" height= "200px" />
</td>
</tr>
<tr>
<td align="center">검색 페이지 페이지네이션</td>
<td align="center">로그인</td>
</tr>
<tr>
<td>
<img src="https://user-images.githubusercontent.com/85148549/156393379-e9de3ae9-fb15-440e-b352-2922193bdd40.gif" width="500px" height= "200px" />
</td>
<td>
<img src="https://user-images.githubusercontent.com/85148549/156393377-e085aa3f-fb46-4937-bad9-2c692c27da4d.gif" width="500px" height= "200px" />
</td>
</tr>
<tr>
<td align="center">즐겨찾기 추가</td>
<td align="center">추가된 즐겨찾기 확인 및 제거</td>
</tr>
<tr>
<td>
<img src="https://user-images.githubusercontent.com/85148549/156393371-90463bab-991d-4899-9c02-a821e3aa624d.gif" width="500px" height= "200px" />
</td>
<td>
<img src="https://user-images.githubusercontent.com/85148549/156393393-e80f4425-5623-429c-9c76-a52c1e7f50d1.gif" width="500px" height= "200px" />
</td>
</tr>
</table>
