export type LinkItem = {
  /** 클릭 수 집계에 쓰이는 고유 ID (바꾸면 기존 집계와 연결이 끊어집니다) */
  id: string;
  title: string;
  url: string;
};

export type Profile = {
  name: string;
  bio: string;
  image: string;
  links: LinkItem[];
};

// 여기만 수정하면 페이지 내용이 바뀝니다.
// TODO: 아래는 보여주기용 더미값입니다. 실제 이름·소개·사진·링크로 교체하세요.
export const profile: Profile = {
  name: "김클로",
  bio: "세계 최강 바이브코더",
  image: "/profile.svg", // 실제 사진은 public/ 에 넣고 경로만 바꾸면 됩니다 (예: /me.jpg)
  links: [
    { id: "github", title: "GitHub", url: "https://github.com/" },
    { id: "linkedin", title: "LinkedIn", url: "https://www.linkedin.com/" },
    { id: "blog", title: "Blog", url: "https://velog.io/" },
  ],
};
