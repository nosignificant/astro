---
description: 'Lorem ipsum dolor sit amet'
isLink: false
---

좀 적어야겠다 싶어서 만들었음

[이 사람](https://bepyan.me/) 블로그를 많이 참고해서 만들어서 형태가 좀 비슷하다.
조금이 아니긴 한데 참 고맙게도 모든 코드를 github에 공개해두어주셨고 블로그도 astro로 만드셨다.
근데 참새가 황새 따라간다고 이 분이 만들어둔 정교한 코드들 따라해보려다가 된탕 망했다. 그래서 하나하나 일일히 하드 코딩하고 있다.

그리고 [솔미네 블로그](https://www.solmee.xyz/)도 열심히 기웃거리고 있다. 솔미는 멋있다!

--

### 해야하는 것

1. 텅 빈 여백을 좀 어케 처리하고 싶다.
2. work탭 레이아웃 만들고 무언가 넣기
3. note에 필터 기능을 넣고 싶음?
4. 게시글 내부에 목차를 만들고 싶다.
5. study 상위의 제목이 있고 그 아래 토글 형식의 게시글을 만들어서 여러개의 자식 게시글이 묶여있게 만들고 싶다. 지금 가독성이 지린다.
6. snake game 실행이 됐는데 food를 먹는 게 작동이 안된다.
7. 아니 내부 글 가독성도 지린다. 이걸 일일히 만져야 하나?

### 해결한 것

0531

1. md 파일에서 사용할 수 있는 포맷들이 내가 무슨 css를 적용했는지는 몰라도 적용이 안 된다. 어디서 뭔 짓을 했는지 알아내야한다. 하고 기타 등등 css 만지기
   :slug파일 안에 prose라는? css를 붙여줬다. 뭔지는 모름
2. 이 study들 일단 무조건 link 버튼을 달아놨는데 없는 공부 기록도 있을 수 있으니 그거 조건부 달고

--

고민인 건 카테고리를 만들다보니까 이 세 개의 카테고리가 모호하다는 생각이 들기 시작했다는 점이다. 근데 나는 분류하고 카테고리화하는 게 좋아서 어떻게든 분류해서 집어넣고싶은 마음이다. 어찌됐던 정갈하게 만들고 싶다.

## 0531

[이 사람](https://bepyan.me/)은 헤더 메뉴 로딩이 거의 안 되는 것처럼 보이는데 어떻게 했지

### study 탭 링크 버튼

솔미의 코드를 훔쳐보고 study탭에 링크 버튼이 필요한 거에만 달려 있게 했다.
근데 이러니까 제목이랑 링크 버튼이 너무 멀리 떨어져 있어 보인다.

### 헤더 네비게이션

일일히 study, note, work로 적어놨다가 map함수로 나열이 되게끔 바꿨다.

원래는 이렇게 생겼었다.

```
---
import "../styles/global.css";
const currentPath = Astro.url.pathname;
---

<div class="navigation flex flex-row mb-[100px] space-x-4">
    <a href="/" class={currentPath === '/' ? 'headmenu' : ''}>nosignificant</a>
    <a href="/study/" class={currentPath.startsWith('/study') ? 'headmenu' : ''}>study</a>
        <a href="/note/" class={currentPath.startsWith('/note') ? 'headmenu' : ''}>note</a>
   <a href="/work/" class={currentPath.startsWith('/work') ? 'headmenu' : ''}>work</a>
  </div>
</div>

```

그리고 지금 헤더 메뉴에 글자색 넣는 방식이 이렇게인데

```
          class={
            currentPath === menu.url
              ? 'headmenu'
              : ' text-gray-400 hover:text-gray-700'
          }
```

이러니까 게시글 내부 url랑 일치하지가 않아서 헤더에 css가 안 붙는다.
그래서 `currentPath.startsWith(menu.url) 으로바꿨더니 index.astro의 경로가 '/'이라서 여기에도 불이들어온다. 가장 첫 페이지를 home으로 바꿔줘야겠다.

고쳤다.

그리고 각 페이지 설명도 따로 ts파일에 넣어서 정리했다.
애니메이션도 넣었는데 웃기다. 웃겨서 나중에 고칠 거다.
