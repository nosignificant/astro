---
description: 'Lorem ipsum dolor sit amet'
date: 2025-05-07
isLink: false
---

## 개요

이 글에는 웹 개발 전체 개괄을 적고 하위항목들(0531, 0601...) 에는 그날그날 개발하면서 어떻게 했는지를 적을 예정이다.

나는 내 웹을 하나의 [비바리움](https://ko.wikipedia.org/wiki/%EB%B9%84%EB%B0%94%EB%A6%AC%EC%9B%80)처럼 만들어보고 싶다. 말로만 비바리움 말고 진짜 생물체 만들고 내 웹 안에서 돌아다니게 만들어보고 싶다는 뜻이다. study 탭의 다른 글인 [생물 만들어보기](/study/생물_만들어보기/생물_만들어보기)는 이 목표에 대한 하위 목표라고 할 수 있다.

### 참고

[이 사람](https://bepyan.me/) 블로그를 많이 참고해서 만들어서 형태가 좀 비슷하다.
조금이 아니긴 한데 참 고맙게도 모든 코드를 github에 공개해두어 주셨고 블로그도 astro로 만드셨다.
근데 참새가 황새 따라간다고 이 분이 만들어둔 정교한 코드들 따라해보려다가 된탕 망했다. 거의 하드 코딩같은 수준의 코드를 만들어 집어 넣고 있다.

그리고 [솔미네 블로그](https://www.solmee.xyz/)도 열심히 기웃거리고 있다. 솔미는 멋있다!

## 해야하는 것

1. 게시글 내부 md 파일의 ##, ###들을 활용해서 목차를 만들고 싶다.
2. page.astro ...slug.astro 한 파일로 통일
3. HOME에 자기소개

## 지금 있는 버그

1. home에서 md파일들 그냥 파싱해서 넣었더니 study구조에서 만들어둔 상위 폴더의 url을 home에서 접근 할 수 없다. 
2. note - next post 에 이전 글이 없습니다. 가 배정 되어있다. 

## 해결한 것

### 0531

1. md 파일에서 사용할 수 있는 포맷들이 내가 무슨 css를 적용했는지는 몰라도 적용이 안 된다. 어디서 뭔 짓을 했는지 알아내야한다. 하고 기타 등등 css 만지기
   :slug파일 안에 prose라는? css를 붙여줬다. 뭔지는 모름
2. 이 study들 일단 무조건 link 버튼을 달아놨는데 없는 공부 기록도 있을 수 있으니 그거 조건부 달고

### 0601

1. 토글을 만들기 위해서 파일 분리를 했다. 버튼도 만들어야 한다.

### 0615

1. 작성한 날짜에 따라 내림차순으로 정렬
2. 웹에서 보이게 될 파일 구조 정리

### 0618
1. note탭에 필터 기능을 넣음 
2. study탭 상위의 폴더가 있고 그 아래 여러개의 자식 게시글이 묶여있게
3. 3. 게시글 내부에서 다음 글 이전 글 볼 수 있게
### 0625
1. work탭 레이아웃 만들고 무언가 넣기
2. 홈에서 최근에 작성한 거 보여주기, 시간 순으로 되게도 해두었다 



## 사담

고민인 건 카테고리를 만들다보니까 이 세 개의 카테고리가 모호하다는 생각이 들기 시작했다는 점이다.
객체지향프로그래밍이나 c++ 수업 들을 때 문자열 가공하는 함수들 어따 쓰나 용도가 정말 궁금했는데 여기서 쓰는 구나
